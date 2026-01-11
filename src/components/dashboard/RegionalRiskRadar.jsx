import { useState, useRef } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { Download, Maximize2, Minimize2, X } from 'lucide-react';
import { toPng } from 'html-to-image';

const RegionalRiskRadar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const chartRef = useRef(null);

  const data = [
    { region: 'London', domesticAbuse: 85, harassment: 78, sexualAssault: 65, childAbuse: 55, fullMark: 100 },
    { region: 'North West', domesticAbuse: 72, harassment: 68, sexualAssault: 48, childAbuse: 52, fullMark: 100 },
    { region: 'Midlands', domesticAbuse: 58, harassment: 55, sexualAssault: 42, childAbuse: 48, fullMark: 100 },
    { region: 'Scotland', domesticAbuse: 45, harassment: 52, sexualAssault: 38, childAbuse: 35, fullMark: 100 },
    { region: 'Wales', domesticAbuse: 42, harassment: 45, sexualAssault: 32, childAbuse: 38, fullMark: 100 },
    { region: 'South East', domesticAbuse: 68, harassment: 72, sexualAssault: 55, childAbuse: 45, fullMark: 100 },
  ];

  const regionalSummary = [
    { region: 'London', cases: 342, trend: 'up' },
    { region: 'North West', cases: 218, trend: 'up' },
    { region: 'South East', cases: 189, trend: 'down' },
    { region: 'Midlands', cases: 156, trend: 'down' },
    { region: 'Scotland', cases: 112, trend: 'up' },
    { region: 'Wales', cases: 89, trend: 'down' },
  ];

  const handleDownload = async () => {
    if (!chartRef.current) return;

    setIsExporting(true);
    try {
      const dataUrl = await toPng(chartRef.current, {
        backgroundColor: '#ffffff',
        pixelRatio: 2,
      });

      const link = document.createElement('a');
      link.download = `regional-distribution-${new Date().toISOString().split('T')[0]}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Failed to export chart:', error);
    }
    setIsExporting(false);
  };

  const chartHeight = isExpanded ? 'h-[60vh]' : 'h-80';
  const summaryItems = isExpanded ? regionalSummary : regionalSummary.slice(0, 3);

  const renderChartContent = () => (
    <div ref={chartRef} className="bg-white p-6 rounded-xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Regional Case Distribution</h3>
          <p className="text-sm text-slate-500">Relative case volume by UK region</p>
        </div>

        <div className="flex items-center gap-2">
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

      {/* Chart */}
      <div className={chartHeight}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis
              dataKey="region"
              tick={{ fill: '#64748b', fontSize: isExpanded ? 13 : 11 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: '#94a3b8', fontSize: isExpanded ? 12 : 10 }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const regionData = payload[0]?.payload;
                  return (
                    <div className="bg-white p-4 rounded-lg shadow-lg border border-slate-200">
                      <p className="font-semibold text-slate-800 mb-2">{regionData?.region}</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between gap-4">
                          <span className="text-slate-600">Domestic Abuse:</span>
                          <span className="font-medium text-purple-600">{regionData?.domesticAbuse}%</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-slate-600">Harassment:</span>
                          <span className="font-medium text-amber-600">{regionData?.harassment}%</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-slate-600">Sexual Assault:</span>
                          <span className="font-medium text-red-600">{regionData?.sexualAssault}%</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-slate-600">Child Abuse:</span>
                          <span className="font-medium text-blue-600">{regionData?.childAbuse}%</span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Radar
              name="Domestic Abuse"
              dataKey="domesticAbuse"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Radar
              name="Harassment"
              dataKey="harassment"
              stroke="#f59e0b"
              fill="#f59e0b"
              fillOpacity={0.2}
              strokeWidth={2}
            />
            <Radar
              name="Sexual Assault"
              dataKey="sexualAssault"
              stroke="#ef4444"
              fill="#ef4444"
              fillOpacity={0.15}
              strokeWidth={2}
            />
            <Radar
              name="Child Abuse"
              dataKey="childAbuse"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.1}
              strokeWidth={2}
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => <span className="text-sm text-slate-600">{value}</span>}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Regional Summary */}
      <div className="mt-4 pt-4 border-t border-slate-100">
        <div className={`grid ${isExpanded ? 'grid-cols-6' : 'grid-cols-3'} gap-4 text-center`}>
          {summaryItems.map((item) => (
            <div key={item.region} className="p-2">
              <p className="text-xs text-slate-500">{item.region}</p>
              <p className="text-lg font-bold text-slate-800">{item.cases}</p>
              <p className={`text-xs ${item.trend === 'up' ? 'text-amber-600' : 'text-emerald-600'}`}>
                {item.trend === 'up' ? 'Increasing' : 'Decreasing'}
              </p>
            </div>
          ))}
        </div>
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
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

export default RegionalRiskRadar;
