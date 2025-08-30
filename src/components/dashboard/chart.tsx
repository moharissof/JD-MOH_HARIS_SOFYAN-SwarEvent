export default function PerformanceChart() {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#f2c14b]"></div>
              <span className="text-sm text-gray-600 font-medium">Event Sales</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#e6b143]"></div>
              <span className="text-sm text-gray-600 font-medium">Ticket Revenue</span>
            </div>
          </div>
          <select className="mt-2 sm:mt-0 text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white font-medium">
            <option>All Events</option>
            <option>Concerts</option>
            <option>Festivals</option>
            <option>Workshops</option>
          </select>
        </div>
  
        {/* Chart Placeholder */}
        <div className="h-[300px] relative">
          <svg className="w-full h-full" viewBox="0 0 800 300">
            {/* Grid lines */}
            <line x1="0" y1="0" x2="800" y2="0" stroke="#f3f4f6" strokeWidth="1" />
            <line x1="0" y1="60" x2="800" y2="60" stroke="#f3f4f6" strokeWidth="1" />
            <line x1="0" y1="120" x2="800" y2="120" stroke="#f3f4f6" strokeWidth="1" />
            <line x1="0" y1="180" x2="800" y2="180" stroke="#f3f4f6" strokeWidth="1" />
            <line x1="0" y1="240" x2="800" y2="240" stroke="#f3f4f6" strokeWidth="1" />
            <line x1="0" y1="300" x2="800" y2="300" stroke="#f3f4f6" strokeWidth="1" />
  
            {/* X-axis labels */}
            <text x="100" y="320" textAnchor="middle" fontSize="12" fill="#6b7280">
              Week 1
            </text>
            <text x="200" y="320" textAnchor="middle" fontSize="12" fill="#6b7280">
              Week 2
            </text>
            <text x="300" y="320" textAnchor="middle" fontSize="12" fill="#6b7280">
              Week 3
            </text>
            <text x="400" y="320" textAnchor="middle" fontSize="12" fill="#6b7280">
              Week 4
            </text>
            <text x="500" y="320" textAnchor="middle" fontSize="12" fill="#6b7280">
              Week 5
            </text>
            <text x="600" y="320" textAnchor="middle" fontSize="12" fill="#6b7280">
              Week 6
            </text>
            <text x="700" y="320" textAnchor="middle" fontSize="12" fill="#6b7280">
              Week 7
            </text>
  
            {/* Y-axis labels */}
            <text x="30" y="300" textAnchor="end" fontSize="12" fill="#6b7280">
              0
            </text>
            <text x="30" y="240" textAnchor="end" fontSize="12" fill="#6b7280">
              25
            </text>
            <text x="30" y="180" textAnchor="end" fontSize="12" fill="#6b7280">
              50
            </text>
            <text x="30" y="120" textAnchor="end" fontSize="12" fill="#6b7280">
              75
            </text>
            <text x="30" y="60" textAnchor="end" fontSize="12" fill="#6b7280">
              100
            </text>
  
            {/* Chart bars - Event Sales */}
            <rect x="80" y="70" width="40" height="230" rx="6" fill="url(#yellowGradient)" />
            <rect x="180" y="50" width="40" height="250" rx="6" fill="url(#yellowGradient)" />
            <rect x="280" y="90" width="40" height="210" rx="6" fill="url(#yellowGradient)" />
            <rect x="380" y="40" width="40" height="260" rx="6" fill="url(#yellowGradient)" />
            <rect x="480" y="60" width="40" height="240" rx="6" fill="url(#yellowGradient)" />
            <rect x="580" y="30" width="40" height="270" rx="6" fill="url(#yellowGradient)" />
            <rect x="680" y="50" width="40" height="250" rx="6" fill="url(#yellowGradient)" />
  
            {/* Chart bars - Revenue */}
            <rect x="120" y="90" width="40" height="210" rx="6" fill="url(#orangeGradient)" />
            <rect x="220" y="70" width="40" height="230" rx="6" fill="url(#orangeGradient)" />
            <rect x="320" y="110" width="40" height="190" rx="6" fill="url(#orangeGradient)" />
            <rect x="420" y="60" width="40" height="240" rx="6" fill="url(#orangeGradient)" />
            <rect x="520" y="80" width="40" height="220" rx="6" fill="url(#orangeGradient)" />
            <rect x="620" y="50" width="40" height="250" rx="6" fill="url(#orangeGradient)" />
            <rect x="720" y="70" width="40" height="230" rx="6" fill="url(#orangeGradient)" />
  
            {/* Gradients */}
            <defs>
              <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f2c14b" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
              <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e6b143" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    )
  }