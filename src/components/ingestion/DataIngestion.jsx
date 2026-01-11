import { useState } from 'react';
import {
  Upload,
  FileSpreadsheet,
  Shield,
  Eye,
  EyeOff,
  CheckCircle,
  Loader2,
  Bot,
  FileSearch,
  Lock,
  Trash2,
  Download,
  Heart
} from 'lucide-react';

const DataIngestion = () => {
  const [files, setFiles] = useState([]);
  const [pseudonymisationEnabled, setPseudonymisationEnabled] = useState(true);
  const [processingFile, setProcessingFile] = useState(null);
  const [processedData, setProcessedData] = useState(null);

  const simulateProcessing = (file) => {
    setProcessingFile(file.name);
    setProcessedData(null);

    setTimeout(() => {
      setProcessingFile(null);
      setProcessedData({
        fileName: file.name,
        totalRecords: 312,
        casesFound: 89,
        piiDetected: 156,
        piiMasked: pseudonymisationEnabled ? 156 : 0,
        categories: {
          domesticAbuse: 34,
          harassment: 28,
          sexualAssault: 15,
          childAbuse: 12
        },
        sampleData: [
          {
            id: 'REC-001',
            original: 'Jane Smith reported domestic abuse by partner at home address in Manchester',
            masked: '[SURVIVOR_1] reported domestic abuse by [PERSON_1] at [LOCATION_1] in [CITY_1]',
            type: 'Domestic Abuse',
            date: '2024-01-15'
          },
          {
            id: 'REC-002',
            original: 'Child protection referral for Emma Williams, age 8, from Greenwood Primary School',
            masked: 'Child protection referral for [CHILD_1], age [AGE], from [SCHOOL_1]',
            type: 'Child Abuse',
            date: '2024-01-14'
          },
          {
            id: 'REC-003',
            original: 'Workplace harassment complaint from Sarah Johnson against manager David Brown',
            masked: 'Workplace harassment complaint from [SURVIVOR_2] against [PERSON_2]',
            type: 'Harassment',
            date: '2024-01-13'
          }
        ]
      });
    }, 3000);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer?.files || e.target.files || []);
    const excelFiles = droppedFiles.filter(f =>
      f.name.endsWith('.xlsx') || f.name.endsWith('.xls') || f.name.endsWith('.csv')
    );
    setFiles(prev => [...prev, ...excelFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    if (processedData) setProcessedData(null);
  };

  return (
    <div className="space-y-6">
      {/* Pseudonymisation Toggle */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Privacy by Design</h2>
              <p className="text-indigo-100">Protecting survivor identities with UK GDPR compliance</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">Automatic Pseudonymisation</p>
              <p className="text-xs text-indigo-200">AI masks all personal identifiers</p>
            </div>
            <button
              onClick={() => setPseudonymisationEnabled(!pseudonymisationEnabled)}
              className={`relative w-16 h-8 rounded-full transition-colors ${
                pseudonymisationEnabled ? 'bg-emerald-400' : 'bg-slate-400'
              }`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform flex items-center justify-center ${
                pseudonymisationEnabled ? 'translate-x-9' : 'translate-x-1'
              }`}>
                {pseudonymisationEnabled ? (
                  <EyeOff className="w-3 h-3 text-emerald-600" />
                ) : (
                  <Eye className="w-3 h-3 text-slate-600" />
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Zone */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Secure Case Data Upload</h3>

          <div
            onDrop={handleFileDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors cursor-pointer"
          >
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              multiple
              onChange={handleFileDrop}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-indigo-600" />
              </div>
              <p className="text-slate-800 font-medium mb-1">Drop case files here</p>
              <p className="text-sm text-slate-500">or click to browse</p>
              <p className="text-xs text-slate-400 mt-2">Supports .xlsx, .xls, .csv</p>
            </label>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">{file.name}</p>
                      <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => simulateProcessing(file)}
                      disabled={processingFile}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Process
                    </button>
                    <button
                      onClick={() => removeFile(index)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AI Agent Visual */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">AI Case Processing Agent</h3>

          {processingFile ? (
            <div className="text-center py-8">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 border-4 border-indigo-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <Bot className="w-8 h-8 text-white" />
                </div>
              </div>
              <p className="text-lg font-semibold text-slate-800 mb-2">Processing {processingFile}</p>
              <div className="space-y-3 max-w-xs mx-auto">
                <ProcessingStep icon={FileSearch} label="Scanning case records" active />
                <ProcessingStep icon={Eye} label="Detecting personal identifiers" />
                <ProcessingStep icon={Lock} label="Applying pseudonymisation" />
                <ProcessingStep icon={Heart} label="Categorizing case types" />
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="w-10 h-10 text-slate-400" />
              </div>
              <p className="text-slate-600 mb-2">AI Agent Ready</p>
              <p className="text-sm text-slate-400">Upload case files to begin secure processing</p>
            </div>
          )}
        </div>
      </div>

      {/* Processed Data Results */}
      {processedData && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Processing Complete</h3>
                  <p className="text-sm text-slate-500">{processedData.fileName}</p>
                </div>
              </div>
              <button className="group inline-flex items-center gap-2.5 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5">
                <Download className="w-4 h-4" />
                Export Anonymised Report
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b border-slate-200">
            <StatCard label="Total Records" value={processedData.totalRecords} />
            <StatCard label="Cases Identified" value={processedData.casesFound} color="purple" />
            <StatCard label="PII Detected" value={processedData.piiDetected} color="amber" />
            <StatCard label="PII Protected" value={processedData.piiMasked} color="emerald" />
          </div>

          {/* Categories */}
          <div className="p-6 border-b border-slate-200">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Case Categories Detected</h4>
            <div className="flex flex-wrap gap-3">
              {Object.entries(processedData.categories).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-lg">
                  <span className={`w-2 h-2 rounded-full ${
                    key === 'domesticAbuse' ? 'bg-purple-500' :
                    key === 'harassment' ? 'bg-amber-500' :
                    key === 'sexualAssault' ? 'bg-red-500' :
                    'bg-blue-500'
                  }`}></span>
                  <span className="text-sm text-slate-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="text-sm font-semibold text-slate-800">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Data Preview */}
          <div className="p-6">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Data Preview (Pseudonymised)</h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600">ID</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600">Original Text</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600">Protected Text</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {processedData.sampleData.map((row) => (
                    <tr key={row.id}>
                      <td className="px-4 py-3 text-sm font-mono text-slate-600">{row.id}</td>
                      <td className="px-4 py-3 text-sm text-slate-500">
                        {pseudonymisationEnabled ? (
                          <span className="blur-sm select-none">{row.original}</span>
                        ) : (
                          row.original
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-800">
                        {row.masked.split(/(\[.*?\])/).map((part, i) =>
                          part.startsWith('[') ? (
                            <span key={i} className="px-1 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs font-medium">{part}</span>
                          ) : part
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                          {row.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// eslint-disable-next-line no-unused-vars
const ProcessingStep = ({ icon: Icon, label, active }) => (
  <div className={`flex items-center gap-3 p-2 rounded-lg ${active ? 'bg-indigo-50' : ''}`}>
    {active ? (
      <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
    ) : (
      <Icon className="w-4 h-4 text-slate-400" />
    )}
    <span className={`text-sm ${active ? 'text-indigo-700 font-medium' : 'text-slate-500'}`}>{label}</span>
  </div>
);

const StatCard = ({ label, value, color = 'slate' }) => {
  const colors = {
    slate: 'text-slate-800',
    purple: 'text-purple-600',
    amber: 'text-amber-600',
    emerald: 'text-emerald-600'
  };
  return (
    <div className="text-center p-4 bg-slate-50 rounded-lg">
      <p className={`text-2xl font-bold ${colors[color]}`}>{value}</p>
      <p className="text-xs text-slate-500 mt-1">{label}</p>
    </div>
  );
};

export default DataIngestion;
