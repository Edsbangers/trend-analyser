import { useState } from 'react';
import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';
import Dashboard from './components/dashboard/Dashboard';
import DataIngestion from './components/ingestion/DataIngestion';
import FileDatabase from './components/files/FileDatabase';
import AccessControl from './components/governance/AccessControl';
import AuditTrail from './components/governance/AuditTrail';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const getPageTitle = () => {
    const titles = {
      dashboard: 'Case Dashboard',
      ingestion: 'Secure Data Ingestion',
      files: 'Secure File Database',
      governance: 'Staff Access Control',
      audit: 'Case Access Audit'
    };
    return titles[activeView] || 'Dashboard';
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'ingestion':
        return <DataIngestion />;
      case 'files':
        return <FileDatabase />;
      case 'governance':
        return <AccessControl />;
      case 'audit':
        return <AuditTrail />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-200 p-2 lg:p-3">
      <div className="flex flex-1 bg-slate-100 rounded-xl overflow-hidden shadow-xl">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getPageTitle()} />
        <main className="flex-1 overflow-auto p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
      </div>
    </div>
  );
}

export default App;
