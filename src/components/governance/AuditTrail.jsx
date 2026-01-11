import { useState } from 'react';
import {
  FileText,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  LogIn,
  LogOut,
  Upload,
  UserPlus,
  Shield,
  Clock,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Heart
} from 'lucide-react';

const AuditTrail = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const auditLogs = [
    {
      id: 1,
      action: 'Case File Accessed',
      actionType: 'view',
      user: 'Emma Richardson',
      userRole: 'Case Manager',
      resource: 'VS-2024-4892 (Domestic Abuse)',
      resourceType: 'case',
      ipAddress: '192.168.1.45',
      timestamp: '2024-01-15 14:32:18',
      status: 'success'
    },
    {
      id: 2,
      action: 'Staff Login',
      actionType: 'login',
      user: 'Dr Sarah Patel',
      userRole: 'Clinical Lead',
      resource: 'System Authentication',
      resourceType: 'system',
      ipAddress: '192.168.1.102',
      timestamp: '2024-01-15 14:28:05',
      status: 'success',
      details: 'MFA verified'
    },
    {
      id: 3,
      action: 'Case Report Exported',
      actionType: 'export',
      user: 'Emma Richardson',
      userRole: 'Case Manager',
      resource: 'Monthly_Case_Summary_Jan2024.pdf',
      resourceType: 'report',
      ipAddress: '192.168.1.45',
      timestamp: '2024-01-15 14:15:42',
      status: 'success'
    },
    {
      id: 4,
      action: 'Case Notes Updated',
      actionType: 'edit',
      user: 'James Wilson',
      userRole: 'Support Worker',
      resource: 'VS-2024-4890 - Session Notes',
      resourceType: 'case',
      ipAddress: '192.168.1.78',
      timestamp: '2024-01-15 13:58:33',
      status: 'success'
    },
    {
      id: 5,
      action: 'Staff Logout',
      actionType: 'logout',
      user: 'Maria Garcia',
      userRole: 'Volunteer Coordinator',
      resource: 'System Authentication',
      resourceType: 'system',
      ipAddress: '10.0.0.156',
      timestamp: '2024-01-15 13:45:12',
      status: 'success'
    },
    {
      id: 6,
      action: 'Referral Document Uploaded',
      actionType: 'upload',
      user: 'Dr Sarah Patel',
      userRole: 'Clinical Lead',
      resource: 'Referral_Assessment_VS4891.pdf',
      resourceType: 'document',
      ipAddress: '10.0.0.89',
      timestamp: '2024-01-15 12:30:55',
      status: 'success'
    },
    {
      id: 7,
      action: 'Access Rights Changed',
      actionType: 'permission',
      user: 'Tom Roberts',
      userRole: 'Data Protection Officer',
      resource: 'Lisa Chen (Staff)',
      resourceType: 'user',
      ipAddress: '192.168.1.45',
      timestamp: '2024-01-15 11:22:18',
      status: 'success',
      details: 'Access level: Read-Only granted'
    },
    {
      id: 8,
      action: 'Failed Login Attempt',
      actionType: 'login',
      user: 'Unknown',
      userRole: 'N/A',
      resource: 'System Authentication',
      resourceType: 'system',
      ipAddress: '203.45.67.89',
      timestamp: '2024-01-15 10:15:33',
      status: 'failed',
      details: 'Invalid credentials - Account: admin@safehaven.org.uk'
    },
    {
      id: 9,
      action: 'Case Archived',
      actionType: 'archive',
      user: 'Emma Richardson',
      userRole: 'Case Manager',
      resource: 'VS-2024-4785 (Resolved)',
      resourceType: 'case',
      ipAddress: '192.168.1.45',
      timestamp: '2024-01-15 09:48:22',
      status: 'success'
    },
    {
      id: 10,
      action: 'New Staff Onboarded',
      actionType: 'user_created',
      user: 'Tom Roberts',
      userRole: 'Data Protection Officer',
      resource: 'Lisa Chen (Trauma Counsellor)',
      resourceType: 'user',
      ipAddress: '192.168.1.45',
      timestamp: '2024-01-15 09:12:05',
      status: 'success',
      details: 'Role: Trauma Counsellor, Access: Read-Only'
    }
  ];

  const getActionIcon = (actionType) => {
    const icons = {
      view: Eye,
      edit: Edit,
      delete: Trash2,
      archive: FileText,
      login: LogIn,
      logout: LogOut,
      upload: Upload,
      export: Download,
      permission: Shield,
      user_created: UserPlus
    };
    return icons[actionType] || FileText;
  };

  const getActionColor = (actionType, status) => {
    if (status === 'failed') return 'bg-red-100 text-red-600';
    const colors = {
      view: 'bg-indigo-100 text-indigo-600',
      edit: 'bg-amber-100 text-amber-600',
      delete: 'bg-red-100 text-red-600',
      archive: 'bg-slate-100 text-slate-600',
      login: 'bg-emerald-100 text-emerald-600',
      logout: 'bg-slate-100 text-slate-600',
      upload: 'bg-purple-100 text-purple-600',
      export: 'bg-blue-100 text-blue-600',
      permission: 'bg-orange-100 text-orange-600',
      user_created: 'bg-teal-100 text-teal-600'
    };
    return colors[actionType] || 'bg-slate-100 text-slate-600';
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || log.actionType === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-800 to-purple-900 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur">
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Case Access Audit Trail</h2>
              <p className="text-indigo-200">Complete activity logging for safeguarding compliance</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium">Data Retention</p>
              <p className="text-xs text-indigo-200">7 Years (UK GDPR)</p>
            </div>
            <button className="inline-flex items-center gap-2.5 px-5 py-2.5 text-sm font-semibold bg-white/15 hover:bg-white/25 border border-white/20 rounded-xl transition-all duration-200 backdrop-blur-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              <Download className="w-4 h-4" />
              Export Logs
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total Events Today" value="189" icon={FileText} trend="+8%" />
        <StatCard label="Case Accesses" value="67" icon={Eye} color="indigo" />
        <StatCard label="Staff Logins" value="24" icon={LogIn} color="emerald" />
        <StatCard label="Failed Attempts" value="1" icon={Shield} color="red" />
      </div>

      {/* Log Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">Activity Log</h3>
            <div className="flex items-center gap-3">
              {/* Date Range */}
              <button className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all duration-200 shadow-sm">
                <Calendar className="w-4 h-4 text-slate-500" />
                Last 24 hours
              </button>

              {/* Filter */}
              <div className="relative flex items-center">
                <Filter className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="appearance-none pl-10 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm cursor-pointer"
                >
                  <option value="all">All Actions</option>
                  <option value="view">Case Access</option>
                  <option value="edit">Case Updates</option>
                  <option value="login">Login/Logout</option>
                  <option value="upload">Uploads</option>
                  <option value="export">Exports</option>
                  <option value="permission">Permissions</option>
                </select>
              </div>

              {/* Search */}
              <div className="relative flex items-center">
                <Search className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Log Entries */}
        <div className="divide-y divide-slate-100">
          {filteredLogs.map((log) => {
            const ActionIcon = getActionIcon(log.actionType);
            return (
              <div key={log.id} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getActionColor(log.actionType, log.status)}`}>
                    <ActionIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-slate-800">{log.action}</p>
                      {log.status === 'failed' && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                          Failed
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mt-0.5">
                      <span className="font-medium">{log.user}</span>
                      <span className="text-slate-400"> ({log.userRole})</span>
                      {log.resourceType !== 'system' && (
                        <>
                          <span className="text-slate-400"> accessed </span>
                          <span className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">{log.resource}</span>
                        </>
                      )}
                    </p>
                    {log.details && (
                      <p className="text-xs text-slate-500 mt-1">{log.details}</p>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Clock className="w-4 h-4" />
                      {log.timestamp}
                    </div>
                    <p className="text-xs text-slate-400 mt-1 font-mono">{log.ipAddress}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Showing <span className="font-medium">1-10</span> of <span className="font-medium">1,892</span> events
            </p>
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-colors border border-slate-200">
                <ChevronLeft className="w-4 h-4" />
              </button>
              {[1, 2, 3, '...', 190].map((page, idx) => (
                <button
                  key={idx}
                  className={`w-8 h-8 text-sm rounded-lg transition-colors ${
                    page === 1
                      ? 'bg-indigo-600 text-white'
                      : page === '...'
                      ? 'text-slate-400 cursor-default'
                      : 'text-slate-600 hover:bg-white border border-slate-200'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-colors border border-slate-200">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line no-unused-vars
const StatCard = ({ label, value, icon: Icon, color = 'slate', trend }) => {
  const colorClasses = {
    slate: 'bg-slate-100 text-slate-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    red: 'bg-red-100 text-red-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
            <p className="text-sm text-slate-500">{label}</p>
          </div>
        </div>
        {trend && (
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};

export default AuditTrail;
