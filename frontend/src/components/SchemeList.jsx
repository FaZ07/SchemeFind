import SchemeCard from './SchemeCard'

export default function SchemeList({ result }) {
  if (!result) return null

  return (
    <div className="mt-8">
      {/* Result Summary Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-white to-green-600 p-0.5 rounded-2xl shadow-lg mb-6">
        <div className="bg-white rounded-2xl px-6 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">
                🎉 {result.total_found} Schemes Found
              </h2>
              <p className="text-gray-500 text-sm mt-0.5">{result.profile_summary}</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2 text-center">
              <p className="text-3xl font-black text-green-600">{result.total_found}</p>
              <p className="text-xs text-green-700 font-medium">Eligible Schemes</p>
            </div>
          </div>
        </div>
      </div>

      {/* No results */}
      {result.total_found === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <p className="text-5xl mb-4">🔍</p>
          <h3 className="text-xl font-bold text-gray-700">No schemes found</h3>
          <p className="text-gray-400 mt-2 text-sm">Try adjusting your income or category and search again.</p>
        </div>
      )}

      {/* Scheme Grid */}
      {result.total_found > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.schemes.map((scheme, i) => (
            <SchemeCard key={scheme.id} scheme={scheme} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
