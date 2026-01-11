import {
  LayoutDashboard,
  Upload,
  Users,
  FileText,
  Heart,
  ChevronLeft,
  ChevronRight,
  Globe,
  Lock,
  HardDrive
} from 'lucide-react';

const Sidebar = ({ activeView, setActiveView, collapsed, setCollapsed }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Case Dashboard', icon: LayoutDashboard },
    { id: 'ingestion', label: 'Data Ingestion', icon: Upload },
    { id: 'files', label: 'File Database', icon: HardDrive },
    { id: 'governance', label: 'Access Control', icon: Users },
    { id: 'audit', label: 'Audit Trail', icon: FileText },
  ];

  return (
    <aside
      className={`bg-gradient-to-b from-indigo-900 to-slate-900 text-white transition-all duration-300 flex flex-col rounded-l-xl ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo & Brand */}
      <div className="p-4 border-b border-indigo-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Heart className="w-6 h-6" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-bold text-lg leading-tight">Trend Analyser</h1>
              <p className="text-xs text-indigo-300">Victim Support Platform</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span className="font-medium">{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Data Residency Badge */}
      <div className="p-4 border-t border-indigo-800">
        {!collapsed ? (
          <div className="bg-indigo-800/50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-xs text-indigo-300 mb-2">
              <Globe className="w-4 h-4" />
              <span>Data Protection</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇬🇧</span>
              <div>
                <p className="font-semibold text-sm">United Kingdom</p>
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Secure Cloud Storage
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <span className="text-2xl" title="Data Residency: UK">🇬🇧</span>
          </div>
        )}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-4 border-t border-indigo-800 flex items-center justify-center hover:bg-indigo-800/50 transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-5 h-5 text-slate-400" />
        ) : (
          <ChevronLeft className="w-5 h-5 text-slate-400" />
        )}
      </button>
    </aside>
  );
};

export default Sidebar;
