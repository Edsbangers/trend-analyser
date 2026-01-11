import { useState } from 'react';
import { Brain, AlertTriangle, TrendingUp, Heart, Sparkles, RefreshCw, MapPin } from 'lucide-react';

const AIInsightsWidget = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentInsight, setCurrentInsight] = useState(0);

  const insights = [
    {
      type: 'warning',
      icon: AlertTriangle,
      title: 'Regional Increase Detected',
      message: 'Domestic abuse cases in the North West region have increased by 23% over the past 6 weeks. This correlates with seasonal patterns observed in previous years. Consider proactive outreach to local support networks.',
      confidence: 91,
      action: 'View Analysis',
      color: 'amber'
    },
    {
      type: 'trend',
      icon: TrendingUp,
      title: 'Positive Outcome Trend',
      message: 'Case resolution times have improved by 18% following the introduction of the new triage protocol. Survivors in the East Midlands are reporting higher satisfaction scores with initial contact procedures.',
      confidence: 94,
      action: 'View Report',
      color: 'emerald'
    },
    {
      type: 'support',
      icon: Heart,
      title: 'Resource Allocation Alert',
      message: 'Current caseload analysis suggests 3 additional counsellors may be needed in Greater London by Q2. Child abuse cases are showing increased complexity, requiring specialist intervention.',
      confidence: 87,
      action: 'Resource Planning',
      color: 'purple'
    },
    {
      type: 'location',
      icon: MapPin,
      title: 'Emerging Hotspot Identified',
      message: 'AI pattern analysis has identified an emerging cluster of harassment cases in South Yorkshire. Early intervention recommended - 67% of cases in this area involve workplace-related incidents.',
      confidence: 89,
      action: 'View Map',
      color: 'rose'
    }
  ];

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setCurrentInsight((prev) => (prev + 1) % insights.length);
    }, 2000);
  };

  const insight = insights[currentInsight];
  const InsightIcon = insight.icon;

  const colorClasses = {
    amber: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      icon: 'bg-amber-100 text-amber-600',
      badge: 'bg-amber-100 text-amber-700',
      button: 'bg-amber-500 hover:bg-amber-600'
    },
    emerald: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      icon: 'bg-emerald-100 text-emerald-600',
      badge: 'bg-emerald-100 text-emerald-700',
      button: 'bg-emerald-500 hover:bg-emerald-600'
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      icon: 'bg-purple-100 text-purple-600',
      badge: 'bg-purple-100 text-purple-700',
      button: 'bg-purple-500 hover:bg-purple-600'
    },
    rose: {
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      icon: 'bg-rose-100 text-rose-600',
      badge: 'bg-rose-100 text-rose-700',
      button: 'bg-rose-500 hover:bg-rose-600'
    }
  };

  const colors = colorClasses[insight.color];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">AI Case Intelligence</h3>
              <p className="text-xs text-slate-500">Pattern Analysis & Trend Detection</p>
            </div>
          </div>
          <button
            onClick={runAnalysis}
            disabled={isAnalyzing}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
            {isAnalyzing ? 'Analyzing...' : 'Re-analyze'}
          </button>
        </div>
      </div>

      {/* Insight Content */}
      <div className={`p-6 ${colors.bg} border-l-4 ${colors.border}`}>
        {isAnalyzing ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-indigo-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
              <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-indigo-500" />
            </div>
            <p className="mt-4 text-sm text-slate-600">AI analyzing case patterns...</p>
            <p className="text-xs text-slate-400 mt-1">Processing 12,847 anonymised records</p>
          </div>
        ) : (
          <>
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl ${colors.icon} flex items-center justify-center flex-shrink-0`}>
                <InsightIcon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-slate-800">{insight.title}</h4>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${colors.badge}`}>
                    {insight.confidence}% confidence
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{insight.message}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200/50">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs text-slate-500">Continuous pattern monitoring active</span>
              </div>
              <button className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl ${colors.button} transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5`}>
                {insight.action}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Insight Navigation */}
      <div className="px-6 py-3 bg-slate-50 border-t border-slate-200">
        <div className="flex items-center justify-center gap-2">
          {insights.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentInsight(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentInsight ? 'bg-indigo-500 w-6' : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIInsightsWidget;
