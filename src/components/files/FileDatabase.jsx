import { useState } from 'react';
import {
  FolderOpen,
  File,
  FileSpreadsheet,
  FileText,
  FileLock,
  Search,
  Filter,
  Download,
  Trash2,
  Eye,
  Upload,
  Lock,
  Shield,
  Clock,
  User,
  ChevronRight,
  ChevronDown,
  MoreVertical,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calendar,
  HardDrive,
  Users
} from 'lucide-react';

const FileDatabase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [expandedFolders, setExpandedFolders] = useState(['case-data', 'reports']);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Current user permissions (would come from auth context in real app)
  const currentUser = {
    name: 'Emma Richardson',
    role: 'Case Manager',
    permissions: ['view', 'download', 'upload'], // No 'delete' or 'admin'
  };

  const folders = [
    {
      id: 'case-data',
      name: 'Case Data Imports',
      icon: FileSpreadsheet,
      color: 'emerald',
      fileCount: 48,
      accessLevel: 'restricted',
      files: [
        {
          id: 'f1',
          name: 'January_2024_Cases_Anonymised.xlsx',
          size: '2.4 MB',
          uploadedBy: 'Dr Sarah Patel',
          uploadedAt: '2024-01-15 09:32',
          status: 'processed',
          accessLevel: 'restricted',
          downloads: 12,
        },
        {
          id: 'f2',
          name: 'February_2024_Cases_Anonymised.xlsx',
          size: '2.1 MB',
          uploadedBy: 'Dr Sarah Patel',
          uploadedAt: '2024-02-14 10:15',
          status: 'processed',
          accessLevel: 'restricted',
          downloads: 8,
        },
        {
          id: 'f3',
          name: 'March_2024_Cases_Raw.xlsx',
          size: '3.8 MB',
          uploadedBy: 'Tom Roberts',
          uploadedAt: '2024-03-12 14:22',
          status: 'pending_review',
          accessLevel: 'admin_only',
          downloads: 0,
        },
      ],
    },
    {
      id: 'reports',
      name: 'Generated Reports',
      icon: FileText,
      color: 'indigo',
      fileCount: 156,
      accessLevel: 'standard',
      files: [
        {
          id: 'f4',
          name: 'Q4_2023_Trend_Analysis_Report.pdf',
          size: '1.2 MB',
          uploadedBy: 'System Generated',
          uploadedAt: '2024-01-05 00:01',
          status: 'approved',
          accessLevel: 'standard',
          downloads: 45,
        },
        {
          id: 'f5',
          name: 'Regional_Hotspot_Analysis_NW.pdf',
          size: '856 KB',
          uploadedBy: 'AI Agent',
          uploadedAt: '2024-01-14 16:45',
          status: 'approved',
          accessLevel: 'standard',
          downloads: 23,
        },
        {
          id: 'f6',
          name: 'Annual_Safeguarding_Report_2023.pdf',
          size: '4.5 MB',
          uploadedBy: 'Emma Richardson',
          uploadedAt: '2024-01-20 11:30',
          status: 'approved',
          accessLevel: 'standard',
          downloads: 67,
        },
      ],
    },
    {
      id: 'templates',
      name: 'Document Templates',
      icon: File,
      color: 'amber',
      fileCount: 12,
      accessLevel: 'standard',
      files: [
        {
          id: 'f7',
          name: 'Case_Intake_Form_Template.docx',
          size: '124 KB',
          uploadedBy: 'Tom Roberts',
          uploadedAt: '2023-06-15 09:00',
          status: 'approved',
          accessLevel: 'standard',
          downloads: 234,
        },
        {
          id: 'f8',
          name: 'Risk_Assessment_Template.xlsx',
          size: '89 KB',
          uploadedBy: 'Dr Sarah Patel',
          uploadedAt: '2023-08-22 14:30',
          status: 'approved',
          accessLevel: 'standard',
          downloads: 189,
        },
      ],
    },
    {
      id: 'sensitive',
      name: 'Sensitive Documents',
      icon: FileLock,
      color: 'red',
      fileCount: 8,
      accessLevel: 'admin_only',
      files: [
        {
          id: 'f9',
          name: 'Staff_Background_Checks_2024.pdf',
          size: '2.1 MB',
          uploadedBy: 'Tom Roberts',
          uploadedAt: '2024-01-10 09:15',
          status: 'approved',
          accessLevel: 'admin_only',
          downloads: 3,
        },
        {
          id: 'f10',
          name: 'Incident_Investigation_Report.pdf',
          size: '567 KB',
          uploadedBy: 'Tom Roberts',
          uploadedAt: '2024-01-08 16:45',
          status: 'approved',
          accessLevel: 'admin_only',
          downloads: 2,
        },
      ],
    },
  ];

  const accessLevelConfig = {
    standard: { label: 'Standard', color: 'emerald', icon: CheckCircle },
    restricted: { label: 'Restricted', color: 'amber', icon: AlertTriangle },
    admin_only: { label: 'Admin Only', color: 'red', icon: Lock },
  };

  const statusConfig = {
    processed: { label: 'Processed', color: 'emerald' },
    approved: { label: 'Approved', color: 'emerald' },
    pending_review: { label: 'Pending Review', color: 'amber' },
    rejected: { label: 'Rejected', color: 'red' },
  };

  const canAccessFile = (file) => {
    if (file.accessLevel === 'admin_only' && !currentUser.permissions.includes('admin')) {
      return false;
    }
    return true;
  };

  const canDeleteFile = () => {
    return currentUser.permissions.includes('delete') || currentUser.permissions.includes('admin');
  };

  const toggleFolder = (folderId) => {
    setExpandedFolders((prev) =>
      prev.includes(folderId) ? prev.filter((id) => id !== folderId) : [...prev, folderId]
    );
  };

  const toggleFileSelection = (fileId) => {
    setSelectedFiles((prev) =>
      prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]
    );
  };

  const getFileIcon = (fileName) => {
    if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls') || fileName.endsWith('.csv')) {
      return FileSpreadsheet;
    }
    if (fileName.endsWith('.pdf')) {
      return FileText;
    }
    return File;
  };

  const filteredFolders = folders.map((folder) => ({
    ...folder,
    files: folder.files.filter((file) => {
      const matchesSearch =
        file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterCategory === 'all' || file.accessLevel === filterCategory;
      return matchesSearch && matchesFilter;
    }),
  }));

  const totalFiles = folders.reduce((acc, folder) => acc + folder.files.length, 0);
  const totalSize = '156.4 MB';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur">
              <HardDrive className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Secure File Database</h2>
              <p className="text-slate-300">Encrypted document storage with access controls</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right mr-4">
              <p className="text-sm font-medium">{totalFiles} Files</p>
              <p className="text-xs text-slate-400">{totalSize} Total</p>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="group inline-flex items-center gap-2.5 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5"
            >
              <Upload className="w-4 h-4" />
              Upload Files
            </button>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800">Security Notice</p>
            <p className="text-sm text-amber-700 mt-1">
              All file access is logged for UK GDPR compliance. Downloads are tracked and reported.
              Contact your Data Protection Officer for access to restricted documents.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          label="Total Files"
          value={totalFiles}
          icon={File}
          color="slate"
        />
        <StatCard
          label="Case Data Files"
          value={folders[0].fileCount}
          icon={FileSpreadsheet}
          color="emerald"
        />
        <StatCard
          label="Generated Reports"
          value={folders[1].fileCount}
          icon={FileText}
          color="indigo"
        />
        <StatCard
          label="Restricted Access"
          value={folders[3].fileCount}
          icon={Lock}
          color="red"
        />
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Toolbar */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative flex items-center">
                <Search className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm w-72 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                />
              </div>

              {/* Filter */}
              <div className="relative flex items-center">
                <Filter className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="appearance-none pl-10 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm cursor-pointer"
                >
                  <option value="all">All Access Levels</option>
                  <option value="standard">Standard Access</option>
                  <option value="restricted">Restricted</option>
                  <option value="admin_only">Admin Only</option>
                </select>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedFiles.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">{selectedFiles.length} selected</span>
                <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                  Download
                </button>
                {canDeleteFile() && (
                  <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* File Browser */}
        <div className="divide-y divide-slate-100">
          {filteredFolders.map((folder) => {
            const FolderIcon = folder.icon;
            const isExpanded = expandedFolders.includes(folder.id);
            const colorClasses = {
              emerald: 'bg-emerald-100 text-emerald-600',
              indigo: 'bg-indigo-100 text-indigo-600',
              amber: 'bg-amber-100 text-amber-600',
              red: 'bg-red-100 text-red-600',
            };

            return (
              <div key={folder.id}>
                {/* Folder Header */}
                <button
                  onClick={() => toggleFolder(folder.id)}
                  className="w-full px-6 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[folder.color]}`}>
                    <FolderIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-800">{folder.name}</h3>
                      <span className="text-xs text-slate-500">({folder.files.length} files)</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${
                        folder.accessLevel === 'admin_only'
                          ? 'bg-red-100 text-red-700'
                          : folder.accessLevel === 'restricted'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {accessLevelConfig[folder.accessLevel].label}
                      </span>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  )}
                </button>

                {/* Files */}
                {isExpanded && folder.files.length > 0 && (
                  <div className="bg-slate-50/50 border-t border-slate-100">
                    {folder.files.map((file) => {
                      const FileIcon = getFileIcon(file.name);
                      const hasAccess = canAccessFile(file);
                      const status = statusConfig[file.status];

                      return (
                        <div
                          key={file.id}
                          className={`px-6 py-3 flex items-center gap-4 border-b border-slate-100 last:border-b-0 ${
                            hasAccess ? 'hover:bg-slate-100/50' : 'opacity-60'
                          } transition-colors`}
                        >
                          {/* Checkbox */}
                          <input
                            type="checkbox"
                            checked={selectedFiles.includes(file.id)}
                            onChange={() => hasAccess && toggleFileSelection(file.id)}
                            disabled={!hasAccess}
                            className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 disabled:opacity-50"
                          />

                          {/* File Icon */}
                          <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center flex-shrink-0">
                            {hasAccess ? (
                              <FileIcon className="w-5 h-5 text-slate-500" />
                            ) : (
                              <Lock className="w-5 h-5 text-red-400" />
                            )}
                          </div>

                          {/* File Info */}
                          <div className="flex-1 min-w-0">
                            <p className={`font-medium truncate ${hasAccess ? 'text-slate-800' : 'text-slate-500'}`}>
                              {file.name}
                            </p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {file.uploadedBy}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {file.uploadedAt}
                              </span>
                              <span>{file.size}</span>
                            </div>
                          </div>

                          {/* Status & Access */}
                          <div className="flex items-center gap-3">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${status.color}-100 text-${status.color}-700`}>
                              {status.label}
                            </span>
                            <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
                              file.accessLevel === 'admin_only'
                                ? 'bg-red-100 text-red-700'
                                : file.accessLevel === 'restricted'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-emerald-100 text-emerald-700'
                            }`}>
                              {file.accessLevel === 'admin_only' && <Lock className="w-3 h-3" />}
                              {accessLevelConfig[file.accessLevel].label}
                            </span>
                          </div>

                          {/* Downloads Count */}
                          <div className="text-center w-16">
                            <p className="text-sm font-medium text-slate-700">{file.downloads}</p>
                            <p className="text-xs text-slate-400">downloads</p>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-1">
                            {hasAccess && (
                              <>
                                <button
                                  className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                  title="Preview"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                  title="Download"
                                >
                                  <Download className="w-4 h-4" />
                                </button>
                              </>
                            )}
                            {canDeleteFile() && (
                              <button
                                onClick={() => setShowDeleteConfirm(file.id)}
                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {isExpanded && folder.files.length === 0 && (
                  <div className="px-6 py-8 bg-slate-50/50 text-center">
                    <p className="text-sm text-slate-500">No files match your search criteria</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Upload className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Upload Files</h3>
                  <p className="text-sm text-indigo-200">Select files to upload securely</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Drop Zone */}
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors cursor-pointer">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-indigo-600" />
                </div>
                <p className="text-slate-800 font-medium mb-1">Drop files here</p>
                <p className="text-sm text-slate-500">or click to browse</p>
                <p className="text-xs text-slate-400 mt-2">Supports .xlsx, .xls, .csv, .pdf, .docx</p>
              </div>

              {/* Access Level Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Shield className="w-4 h-4 inline mr-1" />
                  Access Level
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(accessLevelConfig).map(([key, config]) => (
                    <label
                      key={key}
                      className="relative flex items-center justify-center p-3 bg-white border-2 border-slate-200 rounded-xl cursor-pointer hover:border-indigo-300 transition-colors"
                    >
                      <input type="radio" name="accessLevel" value={key} className="sr-only peer" />
                      <div className="text-center peer-checked:text-indigo-600">
                        <config.icon className={`w-5 h-5 mx-auto mb-1 text-${config.color}-500`} />
                        <span className="text-xs font-medium">{config.label}</span>
                      </div>
                      <div className="absolute inset-0 rounded-xl border-2 border-transparent peer-checked:border-indigo-500 pointer-events-none"></div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Folder Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <FolderOpen className="w-4 h-4 inline mr-1" />
                  Destination Folder
                </label>
                <select className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  {folders.map((folder) => (
                    <option key={folder.id} value={folder.id}>
                      {folder.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25">
                Upload Files
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 text-center mb-2">Delete File?</h3>
              <p className="text-sm text-slate-600 text-center">
                This action cannot be undone. The file will be permanently removed from the system and all access logs will be archived.
              </p>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors"
              >
                Delete File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// eslint-disable-next-line no-unused-vars
const StatCard = ({ label, value, icon: Icon, color }) => {
  const colorClasses = {
    slate: 'bg-slate-100 text-slate-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    red: 'bg-red-100 text-red-600',
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

export default FileDatabase;
