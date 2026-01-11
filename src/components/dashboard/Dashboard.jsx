import { Users, Heart, Clock, TrendingDown } from 'lucide-react';
import KPICard from './KPICard';
import AIInsightsWidget from './AIInsightsWidget';
import IncidentTrendChart from './IncidentTrendChart';
import RegionalRiskRadar from './RegionalRiskRadar';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Active Cases"
          value="1,247"
          subtitle="Currently being supported"
          trend="up"
          trendValue="+8%"
          icon={Users}
          color="purple"
        />
        <KPICard
          title="Cases Resolved"
          value="892"
          subtitle="This quarter"
          trend="up"
          trendValue="+15%"
          icon={Heart}
          color="emerald"
        />
        <KPICard
          title="Avg Support Time"
          value="4.2 days"
          subtitle="Initial response to resolution"
          trend="down"
          trendValue="-12%"
          icon={Clock}
          color="blue"
        />
        <KPICard
          title="Repeat Cases"
          value="3.2%"
          subtitle="Returning survivors"
          trend="down"
          trendValue="-18%"
          icon={TrendingDown}
          color="amber"
        />
      </div>

      {/* AI Insights */}
      <AIInsightsWidget />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IncidentTrendChart />
        <RegionalRiskRadar />
      </div>

      {/* Recent Cases Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">Recent Cases</h3>
          <p className="text-sm text-slate-500">Cases requiring attention in the last 7 days</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Case ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Region</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Assigned To</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {[
                { id: 'VS-2024-4892', type: 'Domestic Abuse', region: 'London', status: 'In Progress', priority: 'High', assigned: 'Sarah T.' },
                { id: 'VS-2024-4891', type: 'Harassment', region: 'Manchester', status: 'Under Review', priority: 'Medium', assigned: 'James W.' },
                { id: 'VS-2024-4890', type: 'Sexual Assault', region: 'Birmingham', status: 'Urgent', priority: 'Critical', assigned: 'Dr. Patel' },
                { id: 'VS-2024-4889', type: 'Child Abuse', region: 'Leeds', status: 'In Progress', priority: 'Critical', assigned: 'Maria G.' },
                { id: 'VS-2024-4888', type: 'Elder Abuse', region: 'Bristol', status: 'Awaiting Contact', priority: 'Medium', assigned: 'Tom R.' },
              ].map((caseItem) => (
                <tr key={caseItem.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-indigo-600 font-medium">{caseItem.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-800">{caseItem.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{caseItem.region}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      caseItem.status === 'Urgent' ? 'bg-red-100 text-red-700' :
                      caseItem.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                      caseItem.status === 'Under Review' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {caseItem.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      caseItem.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                      caseItem.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                      caseItem.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {caseItem.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{caseItem.assigned}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
