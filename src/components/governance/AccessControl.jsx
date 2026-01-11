import { useState } from 'react';
import {
  Users,
  Shield,
  ShieldCheck,
  UserPlus,
  Mail,
  Key,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Edit2,
  Trash2,
  Search,
  Heart,
  X,
  User,
  Briefcase,
  Lock
} from 'lucide-react';

const AccessControl = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddUser, setShowAddUser] = useState(false);

  const users = [
    {
      id: 1,
      name: 'Emma Richardson',
      email: 'e.richardson@safehaven.org.uk',
      role: 'Case Manager',
      access: 'Full Admin',
      mfaEnabled: true,
      lastActive: '2 minutes ago',
      status: 'online',
      avatar: 'ER'
    },
    {
      id: 2,
      name: 'Dr Sarah Patel',
      email: 's.patel@safehaven.org.uk',
      role: 'Clinical Lead',
      access: 'Full Admin',
      mfaEnabled: true,
      lastActive: '15 minutes ago',
      status: 'online',
      avatar: 'SP'
    },
    {
      id: 3,
      name: 'James Wilson',
      email: 'j.wilson@safehaven.org.uk',
      role: 'Support Worker',
      access: 'Read-Only',
      mfaEnabled: true,
      lastActive: '1 hour ago',
      status: 'away',
      avatar: 'JW'
    },
    {
      id: 4,
      name: 'Maria Garcia',
      email: 'm.garcia@safehaven.org.uk',
      role: 'Volunteer Coordinator',
      access: 'Read-Only',
      mfaEnabled: false,
      lastActive: '3 hours ago',
      status: 'offline',
      avatar: 'MG'
    },
    {
      id: 5,
      name: 'Tom Roberts',
      email: 't.roberts@safehaven.org.uk',
      role: 'Data Protection Officer',
      access: 'Full Admin',
      mfaEnabled: true,
      lastActive: '1 day ago',
      status: 'offline',
      avatar: 'TR'
    },
    {
      id: 6,
      name: 'Lisa Chen',
      email: 'l.chen@safehaven.org.uk',
      role: 'Trauma Counsellor',
      access: 'Read-Only',
      mfaEnabled: false,
      lastActive: '2 days ago',
      status: 'offline',
      avatar: 'LC'
    }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const mfaStats = {
    enabled: users.filter(u => u.mfaEnabled).length,
    disabled: users.filter(u => !u.mfaEnabled).length,
    total: users.length
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          label="Total Staff"
          value={users.length}
          color="purple"
        />
        <StatCard
          icon={ShieldCheck}
          label="Full Admin"
          value={users.filter(u => u.access === 'Full Admin').length}
          color="emerald"
        />
        <StatCard
          icon={Shield}
          label="Read-Only"
          value={users.filter(u => u.access === 'Read-Only').length}
          color="slate"
        />
        <MFAStatCard enabled={mfaStats.enabled} total={mfaStats.total} />
      </div>

      {/* MFA Warning */}
      {mfaStats.disabled > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-4">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-amber-800">MFA Compliance Required</h4>
            <p className="text-sm text-amber-700 mt-1">
              {mfaStats.disabled} staff member(s) have not enabled Multi-Factor Authentication.
              UK GDPR requires strong authentication for access to sensitive victim data.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-amber-800 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-xl transition-all duration-200 shadow-sm hover:shadow">
            <Mail className="w-4 h-4" />
            Send Reminder
          </button>
        </div>
      )}

      {/* User Management */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Staff Access Management</h3>
              <p className="text-sm text-slate-500">Manage staff permissions and case access rights</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative flex items-center">
                <Search className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search staff..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
              </div>
              <button
                onClick={() => setShowAddUser(true)}
                className="group inline-flex items-center gap-2.5 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5"
              >
                <div className="w-5 h-5 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <UserPlus className="w-3.5 h-3.5" />
                </div>
                Add Staff Member
              </button>
            </div>
          </div>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Staff Member</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Access Level</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">MFA Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Last Active</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {user.avatar}
                        </div>
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                          user.status === 'online' ? 'bg-emerald-500' :
                          user.status === 'away' ? 'bg-amber-500' :
                          'bg-slate-400'
                        }`}></div>
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{user.name}</p>
                        <p className="text-sm text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-700">{user.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.access === 'Full Admin'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {user.access === 'Full Admin' ? (
                        <ShieldCheck className="w-3 h-3" />
                      ) : (
                        <Shield className="w-3 h-3" />
                      )}
                      {user.access}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.mfaEnabled ? (
                      <span className="inline-flex items-center gap-1.5 text-sm text-emerald-600">
                        <CheckCircle className="w-4 h-4" />
                        Enabled
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-sm text-red-500">
                        <XCircle className="w-4 h-4" />
                        Disabled
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-500">{user.lastActive}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <AddUserModal onClose={() => setShowAddUser(false)} />
      )}
    </div>
  );
};

// eslint-disable-next-line no-unused-vars
const StatCard = ({ icon: Icon, label, value, color }) => {
  const colorClasses = {
    purple: 'bg-purple-100 text-purple-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    slate: 'bg-slate-100 text-slate-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-2xl font-bold text-slate-800">{value}</p>
          <p className="text-sm text-slate-500">{label}</p>
        </div>
      </div>
    </div>
  );
};

const MFAStatCard = ({ enabled, total }) => {
  const percentage = Math.round((enabled / total) * 100);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            percentage === 100 ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
          }`}>
            <Key className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">{enabled}/{total}</p>
            <p className="text-sm text-slate-500">MFA Enabled</p>
          </div>
        </div>
        <div className="relative w-12 h-12">
          <svg className="w-12 h-12 transform -rotate-90">
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="4"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke={percentage === 100 ? '#10b981' : '#f59e0b'}
              strokeWidth="4"
              strokeDasharray={`${percentage * 1.256} 125.6`}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-700">
            {percentage}%
          </span>
        </div>
      </div>
    </div>
  );
};

const AddUserModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <UserPlus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Add New Staff Member</h3>
                <p className="text-sm text-slate-500">Create a new account with access permissions</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Full Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <User className="w-4 h-4 text-slate-400" />
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent transition-all placeholder:text-slate-400"
              placeholder="Enter staff member's full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <Mail className="w-4 h-4 text-slate-400" />
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent transition-all placeholder:text-slate-400"
              placeholder="name@safehaven.org.uk"
            />
          </div>

          {/* Role */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <Briefcase className="w-4 h-4 text-slate-400" />
              Role
            </label>
            <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent transition-all text-slate-700 appearance-none cursor-pointer">
              <option value="" className="text-slate-400">Select a role...</option>
              <option value="case-manager">Case Manager</option>
              <option value="support-worker">Support Worker</option>
              <option value="counsellor">Trauma Counsellor</option>
              <option value="volunteer">Volunteer Coordinator</option>
              <option value="clinical">Clinical Lead</option>
              <option value="dpo">Data Protection Officer</option>
            </select>
          </div>

          {/* Access Level */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <Shield className="w-4 h-4 text-slate-400" />
              Access Level
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="relative flex items-center p-4 bg-slate-50 border-2 border-slate-200 rounded-xl cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/50 transition-all group">
                <input type="radio" name="access" value="read-only" className="sr-only peer" defaultChecked />
                <div className="peer-checked:border-indigo-500 peer-checked:bg-indigo-50 absolute inset-0 border-2 border-transparent rounded-xl transition-all"></div>
                <div className="relative flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-200 group-hover:bg-indigo-100 rounded-lg flex items-center justify-center transition-colors">
                    <Shield className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">Read-Only</p>
                    <p className="text-xs text-slate-500">View cases only</p>
                  </div>
                </div>
              </label>
              <label className="relative flex items-center p-4 bg-slate-50 border-2 border-slate-200 rounded-xl cursor-pointer hover:border-emerald-300 hover:bg-emerald-50/50 transition-all group">
                <input type="radio" name="access" value="full-admin" className="sr-only peer" />
                <div className="peer-checked:border-emerald-500 peer-checked:bg-emerald-50 absolute inset-0 border-2 border-transparent rounded-xl transition-all"></div>
                <div className="relative flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-200 group-hover:bg-emerald-100 rounded-lg flex items-center justify-center transition-colors">
                    <ShieldCheck className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">Full Admin</p>
                    <p className="text-xs text-slate-500">Full case access</p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* MFA Checkbox */}
          <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <div className="flex items-center h-5 mt-0.5">
              <input
                type="checkbox"
                id="require-mfa"
                className="w-4 h-4 text-emerald-600 border-emerald-300 rounded focus:ring-emerald-500 cursor-pointer"
                defaultChecked
              />
            </div>
            <div className="flex-1">
              <label htmlFor="require-mfa" className="text-sm font-semibold text-emerald-800 cursor-pointer flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Require MFA on first login
              </label>
              <p className="text-xs text-emerald-700 mt-0.5">Recommended for UK GDPR compliance when handling sensitive data</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-all duration-200 hover:shadow-sm"
          >
            Cancel
          </button>
          <button className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30">
            <UserPlus className="w-4 h-4" />
            Add Staff Member
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessControl;
