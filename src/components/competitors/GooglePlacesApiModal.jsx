import React, { useState } from 'react';
import { 
  Code, 
  Key, 
  CheckCircle2, 
  RefreshCw, 
  ExternalLink, 
  ShieldAlert, 
  Sparkles, 
  Play, 
  Terminal, 
  FileText,
  Copy,
  Info
} from 'lucide-react';
import { fetchNearbyPlaces, fetchPlaceDetails, searchPlacesByQuery } from '../../services/googlePlacesService';

export default function GooglePlacesApiModal({
  isOpen,
  onClose,
  apiKey,
  setApiKey,
  currentRadiusKm,
  lang = 'en'
}) {
  const [activeTab, setActiveTab] = useState('functions'); // 'functions' | 'simulator' | 'key'
  const [customKey, setCustomKey] = useState(apiKey || '');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [testQuery, setTestQuery] = useState('groceries');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSaveKey = () => {
    setApiKey(customKey);
    try {
      localStorage.setItem('grambiz_google_maps_api_key', customKey);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRunTest = async (testType) => {
    setIsTesting(true);
    setTestResult(null);
    try {
      if (testType === 'nearby') {
        const res = await fetchNearbyPlaces({
          radiusMeters: currentRadiusKm * 1000,
          placeType: 'store',
          apiKey: customKey
        });
        setTestResult(res);
      } else if (testType === 'details') {
        const res = await fetchPlaceDetails('ChIJ_sri_murugan_kallupatti_01', customKey);
        setTestResult(res);
      } else if (testType === 'query') {
        const res = await searchPlacesByQuery(testQuery, undefined, currentRadiusKm * 1000, customKey);
        setTestResult({ query: testQuery, matchesFound: res.length, results: res });
      }
    } catch (err) {
      setTestResult({ error: err.message });
    } finally {
      setIsTesting(false);
    }
  };

  const codeSnippet = `// -------------------------------------------------------------
// Google Places API (New) Integration Placeholder
// Target: https://places.googleapis.com/v1/places:searchNearby
// -------------------------------------------------------------
import { fetchNearbyPlaces } from './services/googlePlacesService';

// 1. Fetch competitors within 1km, 5km, or 10km
const response = await fetchNearbyPlaces({
  latitude: 9.7346,   // Rural Tamil Nadu (Kallupatti, Madurai)
  longitude: 77.7984,
  radiusMeters: ${currentRadiusKm * 1000}, // ${currentRadiusKm} km
  placeType: 'grocery_or_supermarket',
  apiKey: process.env.VITE_GOOGLE_MAPS_API_KEY
});

console.log('Discovered Competitors:', response.places);
`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold flex items-center gap-2">
                <span>Google Places API Integration Suite</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30">
                  Ready & Scalable
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                Google Places API (New) & Maps JavaScript SDK integration hub
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('functions')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'functions'
                ? 'border-emerald-600 text-emerald-800 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Placeholder Functions</span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'simulator'
                ? 'border-emerald-600 text-emerald-800 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Play className="w-3.5 h-3.5 text-sky-600" />
            <span>Interactive Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('key')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'key'
                ? 'border-emerald-600 text-emerald-800 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Key className="w-3.5 h-3.5 text-amber-500" />
            <span>Google Maps API Key</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          {activeTab === 'functions' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200/80 text-sky-950 flex items-start gap-3">
                <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-xs mb-0.5">Architecture & Endpoints Overview</h4>
                  <p className="text-[11px] leading-relaxed text-sky-900">
                    All Google Places API functions are cleanly modularized in <code className="bg-sky-100 px-1 py-0.5 rounded font-mono font-bold text-sky-950">src/services/googlePlacesService.js</code>. 
                    They support both the modern Google Places REST API (New) with FieldMask optimization and the client-side Google Maps JavaScript SDK <code className="bg-sky-100 px-1 py-0.5 rounded font-mono">google.maps.places.PlacesService</code>.
                  </p>
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="rounded-xl border border-slate-800 bg-slate-900 text-slate-100 overflow-hidden font-mono">
                <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-700">
                  <span>src/services/googlePlacesService.js</span>
                  <button
                    onClick={copyCode}
                    className="btn btn-ghost btn-xs text-slate-300 hover:text-white gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-4 text-[11px] leading-relaxed overflow-x-auto text-emerald-300">
                  {codeSnippet}
                </pre>
              </div>

              {/* Functions Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="table table-xs w-full">
                  <thead className="bg-slate-100 text-slate-600 uppercase font-bold">
                    <tr>
                      <th className="py-2.5 px-3">Function</th>
                      <th className="py-2.5 px-3">Target Endpoint</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-2.5 px-3 font-mono font-bold text-emerald-800">fetchNearbyPlaces(...)</td>
                      <td className="py-2.5 px-3 text-slate-600 font-mono text-[10px]">POST /v1/places:searchNearby</td>
                      <td className="py-2.5 px-3"><span className="badge badge-success badge-xs font-bold text-white">Implemented & Ready</span></td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-mono font-bold text-emerald-800">fetchPlaceDetails(...)</td>
                      <td className="py-2.5 px-3 text-slate-600 font-mono text-[10px]">GET /v1/places/{`{placeId}`}</td>
                      <td className="py-2.5 px-3"><span className="badge badge-success badge-xs font-bold text-white">Implemented & Ready</span></td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-mono font-bold text-emerald-800">searchPlacesByQuery(...)</td>
                      <td className="py-2.5 px-3 text-slate-600 font-mono text-[10px]">POST /v1/places:searchText</td>
                      <td className="py-2.5 px-3"><span className="badge badge-success badge-xs font-bold text-white">Implemented & Ready</span></td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-mono font-bold text-emerald-800">calculateDistanceMatrix(...)</td>
                      <td className="py-2.5 px-3 text-slate-600 font-mono text-[10px]">DistanceMatrixService</td>
                      <td className="py-2.5 px-3"><span className="badge badge-success badge-xs font-bold text-white">Implemented & Ready</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'simulator' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleRunTest('nearby')}
                  disabled={isTesting}
                  className="btn btn-sm btn-primary text-white font-bold rounded-xl gap-1.5"
                >
                  {isTesting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                  <span>Test fetchNearbyPlaces ({currentRadiusKm}km)</span>
                </button>

                <button
                  onClick={() => handleRunTest('details')}
                  disabled={isTesting}
                  className="btn btn-sm btn-outline border-slate-300 text-slate-700 font-bold rounded-xl gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Test fetchPlaceDetails ('Sri Murugan')</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={testQuery}
                    onChange={(e) => setTestQuery(e.target.value)}
                    placeholder="Search term..."
                    className="input input-xs input-bordered rounded-lg text-xs w-28"
                  />
                  <button
                    onClick={() => handleRunTest('query')}
                    disabled={isTesting}
                    className="btn btn-xs bg-slate-800 text-white font-bold rounded-lg"
                  >
                    Query
                  </button>
                </div>
              </div>

              {testResult && (
                <div className="rounded-xl border border-slate-800 bg-slate-900 text-slate-100 overflow-hidden font-mono">
                  <div className="bg-slate-800 px-4 py-2 text-[11px] text-emerald-400 flex items-center justify-between">
                    <span>Simulated Response Output (Latency: {testResult.latencyMs || 250}ms)</span>
                    <span className="text-slate-400 text-[10px]">{testResult.source || 'Simulated Places API'}</span>
                  </div>
                  <pre className="p-4 text-[11px] max-h-72 overflow-y-auto leading-relaxed text-sky-200">
                    {JSON.stringify(testResult, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}

          {activeTab === 'key' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <Key className="w-4 h-4 text-amber-600" />
                  <span>Configuring Google Maps & Places API Key</span>
                </div>
                <p className="text-[11px] leading-relaxed text-amber-900/90">
                  By default, GramBiz AI runs in offline / simulation mode with high-fidelity GPS coordinates for rural Tamil Nadu (Kallupatti / Usilampatti).
                  To connect live Google Maps satellite tiles and live Places API queries, enter your Google Maps API key below or set <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">VITE_GOOGLE_MAPS_API_KEY</code> in your <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">.env</code> file.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  Google Maps API Key (Client-side)
                </label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={customKey}
                    onChange={(e) => setCustomKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="input input-sm input-bordered flex-1 rounded-xl font-mono text-xs"
                  />
                  <button
                    onClick={handleSaveKey}
                    className="btn btn-sm btn-primary text-white font-bold rounded-xl"
                  >
                    Save Key
                  </button>
                </div>
                <p className="text-[10px] text-slate-400">
                  Required Google Cloud APIs enabled: Maps JavaScript API, Places API (New), Geocoding API.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Center: <strong className="text-slate-800">Kallupatti Village (9.7346°N, 77.7984°E)</strong>
          </span>
          <button
            onClick={onClose}
            className="btn btn-sm bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
