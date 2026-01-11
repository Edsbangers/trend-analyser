import { useState, useRef } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Calendar, ChevronDown, Download, Maximize2, Minimize2, X } from 'lucide-react';
import { toPng } from 'html-to-image';

const IncidentTrendChart = () => {
  const [timeRange, setTimeRange] = useState('12months');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const chartRef = useRef(null);

  // Historical data by time period
  const dataByPeriod = {
    '3months': [
      { month: 'Oct 2024', domesticAbuse: 168, harassment: 101, sexualAssault: 44, childAbuse: 35 },
      { month: 'Nov 2024', domesticAbuse: 195, harassment: 112, sexualAssault: 51, childAbuse: 38 },
      { month: 'Dec 2024', domesticAbuse: 212, harassment: 98, sexualAssault: 47, childAbuse: 32 },
    ],
    '6months': [
      { month: 'Jul 2024', domesticAbuse: 178, harassment: 97, sexualAssault: 45, childAbuse: 31 },
      { month: 'Aug 2024', domesticAbuse: 156, harassment: 88, sexualAssault: 39, childAbuse: 24 },
      { month: 'Sep 2024', domesticAbuse: 143, harassment: 92, sexualAssault: 36, childAbuse: 28 },
      { month: 'Oct 2024', domesticAbuse: 168, harassment: 101, sexualAssault: 44, childAbuse: 35 },
      { month: 'Nov 2024', domesticAbuse: 195, harassment: 112, sexualAssault: 51, childAbuse: 38 },
      { month: 'Dec 2024', domesticAbuse: 212, harassment: 98, sexualAssault: 47, childAbuse: 32 },
    ],
    '12months': [
      { month: 'Jan', domesticAbuse: 145, harassment: 89, sexualAssault: 34, childAbuse: 28 },
      { month: 'Feb', domesticAbuse: 132, harassment: 95, sexualAssault: 41, childAbuse: 31 },
      { month: 'Mar', domesticAbuse: 158, harassment: 78, sexualAssault: 38, childAbuse: 25 },
      { month: 'Apr', domesticAbuse: 142, harassment: 82, sexualAssault: 35, childAbuse: 29 },
      { month: 'May', domesticAbuse: 167, harassment: 91, sexualAssault: 42, childAbuse: 33 },
      { month: 'Jun', domesticAbuse: 189, harassment: 104, sexualAssault: 48, childAbuse: 27 },
      { month: 'Jul', domesticAbuse: 178, harassment: 97, sexualAssault: 45, childAbuse: 31 },
      { month: 'Aug', domesticAbuse: 156, harassment: 88, sexualAssault: 39, childAbuse: 24 },
      { month: 'Sep', domesticAbuse: 143, harassment: 92, sexualAssault: 36, childAbuse: 28 },
      { month: 'Oct', domesticAbuse: 168, harassment: 101, sexualAssault: 44, childAbuse: 35 },
      { month: 'Nov', domesticAbuse: 195, harassment: 112, sexualAssault: 51, childAbuse: 38 },
      { month: 'Dec', domesticAbuse: 212, harassment: 98, sexualAssault: 47, childAbuse: 32 },
    ],
    '2years': [
      { month: 'Q1 2023', domesticAbuse: 412, harassment: 245, sexualAssault: 98, childAbuse: 72 },
      { month: 'Q2 2023', domesticAbuse: 478, harassment: 267, sexualAssault: 112, childAbuse: 85 },
      { month: 'Q3 2023', domesticAbuse: 445, harassment: 289, sexualAssault: 105, childAbuse: 78 },
      { month: 'Q4 2023', domesticAbuse: 521, harassment: 312, sexualAssault: 128, childAbuse: 91 },
      { month: 'Q1 2024', domesticAbuse: 435, harassment: 262, sexualAssault: 113, childAbuse: 84 },
      { month: 'Q2 2024', domesticAbuse: 498, harassment: 277, sexualAssault: 125, childAbuse: 89 },
      { month: 'Q3 2024', domesticAbuse: 477, harassment: 277, sexualAssault: 120, childAbuse: 83 },
      { month: 'Q4 2024', domesticAbuse: 575, harassment: 311, sexualAssault: 142, childAbuse: 105 },
    ],
    '5years': [
      { month: '2020', domesticAbuse: 1456, harassment: 823, sexualAssault: 312, childAbuse: 245 },
      { month: '2021', domesticAbuse: 1678, harassment: 912, sexualAssault: 378, childAbuse: 289 },
      { month: '2022', domesticAbuse: 1823, harassment: 1045, sexualAssault: 412, childAbuse: 312 },
      { month: '2023', domesticAbuse: 1856, harassment: 1113, sexualAssault: 443, childAbuse: 326 },
      { month: '2024', domesticAbuse: 1985, harassment: 1127, sexualAssault: 500, childAbuse: 361 },
    ],
    'all': [
      { month: '2018', domesticAbuse: 1123, harassment: 645, sexualAssault: 234, childAbuse: 178 },
      { month: '2019', domesticAbuse: 1289, harassment: 723, sexualAssault: 278, childAbuse: 212 },
      { month: '2020', domesticAbuse: 1456, harassment: 823, sexualAssault: 312, childAbuse: 245 },
      { month: '2021', domesticAbuse: 1678, harassment: 912, sexualAssault: 378, childAbuse: 289 },
      { month: '2022', domesticAbuse: 1823, harassment: 1045, sexualAssault: 412, childAbuse: 312 },
      { month: '2023', domesticAbuse: 1856, harassment: 1113, sexualAssault: 443, childAbuse: 326 },
      { month: '2024', domesticAbuse: 1985, harassment: 1127, sexualAssault: 500, childAbuse: 361 },
    ],
  };

  const timeRangeOptions = [
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: '12months', label: 'Last 12 Months' },
    { value: '2years', label: 'Last 2 Years' },
    { value: '5years', label: 'Last 5 Years' },
    { value: 'all', label: 'All Time' },
  ];

  const data = dataByPeriod[timeRange];
  const selectedOption = timeRangeOptions.find(opt => opt.value === timeRange);

  // Calculate totals for selected period
  const totals = data.reduce((acc, item) => ({
    domesticAbuse: acc.domesticAbuse + item.domesticAbuse,
    harassment: acc.harassment + item.harassment,
    sexualAssault: acc.sexualAssault + item.sexualAssault,
    childAbuse: acc.childAbuse + item.childAbuse,
  }), { domesticAbuse: 0, harassment: 0, sexualAssault: 0, childAbuse: 0 });

  const totalCases = totals.domesticAbuse + totals.harassment + totals.sexualAssault + totals.childAbuse;

  const handleDownload = async () => {
    if (!chartRef.current) return;

    setIsExporting(true);
    try {
      const dataUrl = await toPng(chartRef.current, {
        backgroundColor: '#ffffff',
        pixelRatio: 2,
      });

      const link = document.createElement('a');
      link.download = `case-trends-${timeRange}-${new Date().toISOString().split('T')[0]}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Failed to export chart:', error);
    }
    setIsExporting(false);
  };

  const chartHeight = isExpanded ? 'h-[70vh]' : 'h-80';

  const renderChartContent = () => (
    <div ref={chartRef} className="bg-white p-6 rounded-xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Case Trends</h3>
          <p className="text-sm text-slate-500">Anonymised case type analysis across the UK</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Time Range Filter */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all duration-200 shadow-sm"
            >
              <Calendar className="w-4 h-4 text-slate-500" />
              {selectedOption?.label}
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showDropdown && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowDropdown(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-20">
                  {timeRangeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setTimeRange(option.value);
                        setShowDropdown(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                        timeRange === option.value
                          ? 'bg-indigo-50 text-indigo-700 font-medium'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all duration-200 shadow-sm disabled:opacity-50"
            title="Download chart as image"
          >
            <Download className={`w-4 h-4 text-slate-500 ${isExporting ? 'animate-pulse' : ''}`} />
            {!isExpanded && <span className="hidden sm:inline">Export</span>}
          </button>

          {/* Expand/Collapse Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all duration-200 shadow-sm"
            title={isExpanded ? 'Collapse chart' : 'Expand chart'}
          >
            {isExpanded ? (
              <Minimize2 className="w-4 h-4 text-slate-500" />
            ) : (
              <Maximize2 className="w-4 h-4 text-slate-500" />
            )}
          </button>
        </div>
      </div>

      {/* Period Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6 p-4 bg-slate-50 rounded-xl">
        <div className="text-center">
          <p className="text-xs text-slate-500 mb-1">Total Cases</p>
          <p className="text-lg font-bold text-slate-800">{totalCases.toLocaleString()}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-500 mb-1">Domestic Abuse</p>
          <p className="text-lg font-bold text-purple-600">{totals.domesticAbuse.toLocaleString()}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-500 mb-1">Harassment</p>
          <p className="text-lg font-bold text-amber-600">{totals.harassment.toLocaleString()}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-500 mb-1">Sexual Assault</p>
          <p className="text-lg font-bold text-red-600">{totals.sexualAssault.toLocaleString()}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-500 mb-1">Child Abuse</p>
          <p className="text-lg font-bold text-blue-600">{totals.childAbuse.toLocaleString()}</p>
        </div>
      </div>

      {/* Chart */}
      <div className={chartHeight}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="month"
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-4 rounded-lg shadow-lg border border-slate-200">
                      <p className="font-semibold text-slate-800 mb-2">{label}</p>
                      {payload.map((entry, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-slate-600">{entry.name}:</span>
                          <span className="font-medium text-slate-800">{entry.value.toLocaleString()} cases</span>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => <span className="text-sm text-slate-600">{value}</span>}
            />
            <Line
              type="monotone"
              dataKey="domesticAbuse"
              name="Domestic Abuse"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="harassment"
              name="Harassment"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="sexualAssault"
              name="Sexual Assault"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="childAbuse"
              name="Child Abuse"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  // Expanded Modal View
  if (isExpanded) {
    return (
      <>
        {/* Placeholder to maintain layout */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-[500px] flex items-center justify-center">
          <p className="text-slate-500">Chart expanded to full screen</p>
        </div>

        {/* Fullscreen Modal */}
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 lg:p-8">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden">
            <div className="relative">
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              {renderChartContent()}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {renderChartContent()}
    </div>
  );
};

export default IncidentTrendChart;
