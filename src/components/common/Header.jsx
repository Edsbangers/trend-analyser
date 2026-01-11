import { Bell, Search, Shield, CheckCircle, Heart } from 'lucide-react';

const Header = ({ title }) => {
  return (
    <header className="bg-white border-b border-slate-200 px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between max-w-[1600px] mx-auto">
        {/* Page Title & Breadcrumb */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
          <p className="text-sm text-slate-500">
            Secure Case Management for Victim Support
          </p>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search cases, survivors..."
              className="pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Compliance Status */}
          <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">UK GDPR Compliant</span>
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-800">Emma Richardson</p>
              <p className="text-xs text-slate-500">Case Manager</p>
            </div>
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                ER
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                <Heart className="w-2 h-2 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
