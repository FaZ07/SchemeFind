import { useState } from 'react'

const MINISTRY_COLORS = {
  'Ministry of Agriculture': 'bg-green-100 text-green-800',
  'Ministry of Finance': 'bg-blue-100 text-blue-800',
  'Ministry of Health': 'bg-red-100 text-red-800',
  'Ministry of Education': 'bg-purple-100 text-purple-800',
  'Ministry of Housing': 'bg-yellow-100 text-yellow-800',
  'Ministry of Women': 'bg-pink-100 text-pink-800',
  'Ministry of MSME': 'bg-orange-100 text-orange-800',
  'Ministry of Skill': 'bg-teal-100 text-teal-800',
  'Ministry of Rural': 'bg-lime-100 text-lime-800',
  'Ministry of Defence': 'bg-gray-100 text-gray-800',
  'default': 'bg-indigo-100 text-indigo-800',
}

function getMinistryColor(ministry) {
  for (const key of Object.keys(MINISTRY_COLORS)) {
    if (ministry.includes(key)) return MINISTRY_COLORS[key]
  }
  return MINISTRY_COLORS['default']
}

function getScoreBadge(score) {
  if (score >= 20) return { label: 'Best Match', color: 'bg-green-500 text-white' }
  if (score >= 15) return { label: 'Strong Match', color: 'bg-blue-500 text-white' }
  return { label: 'Eligible', color: 'bg-orange-400 text-white' }
}

export default function SchemeCard({ scheme, index }) {
  const [expanded, setExpanded] = useState(false)
  const badge = getScoreBadge(scheme.relevance_score)
  const ministryColor = getMinistryColor(scheme.ministry)

  return (
    <div
      className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-200 overflow-hidden"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Card Header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${badge.color}`}>
                {badge.label}
              </span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${ministryColor}`}>
                {scheme.ministry.replace('Ministry of ', 'MoA: ').replace('AICTE / ', '')}
              </span>
            </div>
            <h3 className="font-bold text-gray-900 text-base leading-snug">{scheme.name}</h3>
            <p className="text-gray-500 text-sm mt-1 line-clamp-2">{scheme.description}</p>
          </div>
          <div className="text-2xl flex-shrink-0">
            {scheme.ministry.includes('Agriculture') ? '🌾' :
             scheme.ministry.includes('Health') ? '🏥' :
             scheme.ministry.includes('Finance') ? '💰' :
             scheme.ministry.includes('Education') ? '🎓' :
             scheme.ministry.includes('Housing') ? '🏠' :
             scheme.ministry.includes('Women') ? '👩' :
             scheme.ministry.includes('MSME') ? '🏭' :
             scheme.ministry.includes('Skill') ? '⚡' :
             scheme.ministry.includes('Rural') ? '🌿' :
             scheme.ministry.includes('Defence') ? '🛡️' : '📋'}
          </div>
        </div>

        {/* Benefits highlight */}
        <div className="mt-3 bg-gradient-to-r from-orange-50 to-green-50 rounded-xl p-3 border border-orange-100">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Benefits</p>
          <p className="text-sm text-gray-800 font-medium">{scheme.benefits}</p>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition-colors"
        >
          {expanded ? '▲ Show less' : '▼ How to apply & more'}
        </button>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-gray-50 pt-4 space-y-3 bg-gray-50">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">How to Apply</p>
            <p className="text-sm text-gray-700">{scheme.how_to_apply}</p>
          </div>
          <a
            href={scheme.official_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Apply Now →
          </a>
        </div>
      )}
    </div>
  )
}
