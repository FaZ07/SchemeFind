import { useState } from 'react'

const OCCUPATIONS = [
  { value: 'student', label: 'Student' },
  { value: 'farmer', label: 'Farmer' },
  { value: 'unemployed', label: 'Unemployed' },
  { value: 'self_employed', label: 'Self Employed' },
  { value: 'entrepreneur', label: 'Entrepreneur' },
  { value: 'small_business', label: 'Small Business Owner' },
  { value: 'artisan', label: 'Artisan / Craftsperson' },
  { value: 'street_vendor', label: 'Street Vendor' },
  { value: 'salaried', label: 'Salaried Employee' },
  { value: 'other', label: 'Other' },
]

const CATEGORIES = [
  { value: 'general', label: 'General' },
  { value: 'obc', label: 'OBC' },
  { value: 'sc', label: 'SC (Scheduled Caste)' },
  { value: 'st', label: 'ST (Scheduled Tribe)' },
]

const INCOME_BRACKETS = [
  { value: '0', label: 'No Income' },
  { value: '100000', label: 'Up to ₹1 Lakh' },
  { value: '200000', label: '₹1–2 Lakh' },
  { value: '350000', label: '₹2–3.5 Lakh' },
  { value: '600000', label: '₹3.5–6 Lakh' },
  { value: '800000', label: '₹6–8 Lakh' },
  { value: '1200000', label: '₹8–12 Lakh' },
  { value: '1800000', label: '₹12–18 Lakh' },
  { value: '9999999', label: 'Above ₹18 Lakh' },
]

export default function EligibilityForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    age: '',
    gender: '',
    annual_income: '',
    category: '',
    occupation: '',
    state: 'all',
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!form.age || form.age < 0 || form.age > 120) newErrors.age = 'Enter a valid age'
    if (!form.gender) newErrors.gender = 'Select gender'
    if (!form.annual_income) newErrors.annual_income = 'Select income bracket'
    if (!form.category) newErrors.category = 'Select category'
    if (!form.occupation) newErrors.occupation = 'Select occupation'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit({
      ...form,
      age: parseInt(form.age),
      annual_income: parseInt(form.annual_income),
    })
  }

  const field = (key, value) => setForm(f => ({ ...f, [key]: value }))

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Age & Gender */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Age <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min="0"
            max="120"
            placeholder="e.g. 22"
            value={form.age}
            onChange={e => field('age', e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border-2 bg-white transition-all focus:outline-none focus:ring-2 focus:ring-orange-300
              ${errors.age ? 'border-red-400' : 'border-gray-200 focus:border-orange-400'}`}
          />
          {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Gender <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2 mt-1">
            {['male', 'female', 'other'].map(g => (
              <button
                key={g}
                type="button"
                onClick={() => field('gender', g)}
                className={`flex-1 py-3 rounded-xl border-2 text-sm font-medium capitalize transition-all
                  ${form.gender === g
                    ? 'bg-orange-500 border-orange-500 text-white shadow-md'
                    : 'border-gray-200 text-gray-600 hover:border-orange-300'}`}
              >
                {g === 'male' ? '♂ Male' : g === 'female' ? '♀ Female' : '⚧ Other'}
              </button>
            ))}
          </div>
          {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
        </div>
      </div>

      {/* Income */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Annual Household Income <span className="text-red-500">*</span>
        </label>
        <select
          value={form.annual_income}
          onChange={e => field('annual_income', e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border-2 bg-white transition-all focus:outline-none focus:ring-2 focus:ring-orange-300
            ${errors.annual_income ? 'border-red-400' : 'border-gray-200 focus:border-orange-400'}`}
        >
          <option value="">Select income bracket...</option>
          {INCOME_BRACKETS.map(b => (
            <option key={b.value} value={b.value}>{b.label}</option>
          ))}
        </select>
        {errors.annual_income && <p className="text-red-500 text-xs mt-1">{errors.annual_income}</p>}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Category <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {CATEGORIES.map(c => (
            <button
              key={c.value}
              type="button"
              onClick={() => field('category', c.value)}
              className={`py-3 px-2 rounded-xl border-2 text-sm font-medium transition-all
                ${form.category === c.value
                  ? 'bg-green-600 border-green-600 text-white shadow-md'
                  : 'border-gray-200 text-gray-600 hover:border-green-300'}`}
            >
              {c.label}
            </button>
          ))}
        </div>
        {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
      </div>

      {/* Occupation */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Occupation <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {OCCUPATIONS.map(o => (
            <button
              key={o.value}
              type="button"
              onClick={() => field('occupation', o.value)}
              className={`py-2.5 px-3 rounded-xl border-2 text-sm font-medium transition-all text-left
                ${form.occupation === o.value
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                  : 'border-gray-200 text-gray-600 hover:border-blue-300'}`}
            >
              {o.label}
            </button>
          ))}
        </div>
        {errors.occupation && <p className="text-red-500 text-xs mt-1">{errors.occupation}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-green-600 text-white font-bold text-lg
          shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            Finding Schemes...
          </span>
        ) : (
          'Find My Schemes →'
        )}
      </button>
    </form>
  )
}
