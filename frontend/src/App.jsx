import { useState } from 'react'
import axios from 'axios'
import EligibilityForm from './components/EligibilityForm'
import SchemeList from './components/SchemeList'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

export default function App() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (profile) => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const { data } = await axios.post(`${API_BASE}/match`, profile)
      setResult(data)
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } catch (err) {
      setError('Could not reach the server. Make sure the backend is running at localhost:8000')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setError(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🇮🇳</span>
            <span className="font-black text-xl text-gray-900">
              Scheme<span className="text-orange-500">Find</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            {result && (
              <button
                onClick={handleReset}
                className="text-sm text-gray-500 hover:text-gray-800 transition font-medium"
              >
                ← Search Again
              </button>
            )}
            <a
              href="https://myscheme.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-orange-100 text-orange-700 font-semibold px-3 py-1.5 rounded-full hover:bg-orange-200 transition"
            >
              myScheme.gov.in ↗
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            <span>🏛️</span> 50+ Central Government Schemes
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight">
            Find schemes you
            <span className="block text-gradient">actually qualify for</span>
          </h1>
          <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
            India has hundreds of government schemes. Most people don't know which ones
            they're eligible for. Enter your details — find out in seconds.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-gray-400">
            <span className="flex items-center gap-1"><span className="text-green-500">✓</span> Free to use</span>
            <span className="flex items-center gap-1"><span className="text-green-500">✓</span> No login required</span>
            <span className="flex items-center gap-1"><span className="text-green-500">✓</span> Instant results</span>
            <span className="flex items-center gap-1"><span className="text-green-500">✓</span> Verified schemes only</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Schemes Tracked', value: '50+', icon: '📋' },
            { label: 'Ministries Covered', value: '15+', icon: '🏛️' },
            { label: 'Beneficiaries (Crores)', value: '80+', icon: '👥' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="font-black text-2xl text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-0.5 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="bg-orange-100 text-orange-600 rounded-lg p-1.5">📝</span>
            Enter Your Details
          </h2>
          <EligibilityForm onSubmit={handleSubmit} loading={loading} />
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 text-red-700 text-sm font-medium mb-4">
            ⚠️ {error}
          </div>
        )}

        {/* Results */}
        <div id="results">
          <SchemeList result={result} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-16 py-8 text-center text-sm text-gray-400">
        <p>
          Data sourced from official government portals. Always verify eligibility at{' '}
          <a href="https://myscheme.gov.in" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline font-medium">
            myscheme.gov.in
          </a>
        </p>
        <p className="mt-2">
          Built with ❤️ by{' '}
          <a href="https://github.com/FaZ07" target="_blank" rel="noopener noreferrer" className="text-gray-600 font-semibold hover:underline">
            Mohamed Fazil
          </a>
        </p>
      </footer>
    </div>
  )
}
