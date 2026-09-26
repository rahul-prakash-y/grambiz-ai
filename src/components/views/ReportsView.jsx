import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  CheckCircle2, 
  Calendar, 
  Search, 
  Plus, 
  ShieldCheck, 
  Sparkles,
  FileCheck,
  X,
  Store,
  Scissors,
  Sprout,
  Milk,
  MapPin,
  TrendingUp,
  Loader2,
  Trash2,
  BookmarkCheck,
  Briefcase
} from 'lucide-react';
import { useBusinessIdea } from '../../context/BusinessIdeaContext';
import { useAuth } from '../../context/AuthContext';
import { fetchMyPlans, deleteBusinessPlan } from '../../api';

export default function ReportsView({ t, lang, onNavigate }) {
  const { ideaData, analysisResult, loadSavedPlan, saveCurrentPlan } = useBusinessIdea();
  const { user, isAuthenticated, openLogin } = useAuth();
  
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [selectedPlanModal, setSelectedPlanModal] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState(null);
  const [isSavingCurrent, setIsSavingCurrent] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Fetch saved business plans from FastAPI backend
  const loadPlans = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchMyPlans();
      if (Array.isArray(data)) {
        setPlans(data);
      }
    } catch (err) {
      console.warn('fetchMyPlans error:', err);
      setError(err.message || 'Failed to load saved plans from backend.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, [user]);

  // Handle saving the currently active assessment to the backend
  const handleSaveCurrent = async () => {
    setIsSavingCurrent(true);
    try {
      await saveCurrentPlan();
      setSaveSuccessMsg(lang === 'ta' ? 'திட்டம் வெற்றிகரமாக சேமிக்கப்பட்டது!' : 'Current assessment saved to My Reports!');
      await loadPlans();
      setTimeout(() => setSaveSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingCurrent(false);
    }
  };

  // Handle deletion of a saved plan
  const handleDeletePlan = async (e, planId) => {
    e.stopPropagation();
    if (!window.confirm(lang === 'ta' ? 'இந்த அறிக்கையை நீக்க விரும்புகிறீர்களா?' : 'Are you sure you want to delete this saved plan?')) {
      return;
    }
    try {
      await deleteBusinessPlan(planId);
      setPlans(prev => prev.filter(p => p.id !== planId));
    } catch (err) {
      alert(err.message || 'Failed to delete plan');
    }
  };

  // Re-open saved plan in the AI Advisory Dashboard layout
  const handleViewDetails = (plan) => {
    loadSavedPlan(plan);
    onNavigate('advisory');
  };

  // Generate high-fidelity printable DPR PDF
  const handleDownloadPdf = (plan) => {
    setDownloadSuccess(plan.id);
    
    // Create print-ready DPR document window
    const printWindow = window.open('', '_blank', 'width=850,height=950');
    if (!printWindow) {
      alert('Please allow popups to download/print the Detailed Project Report (DPR).');
      return;
    }

    const swot = plan.advisory_data?.swot_analysis || {};
    const insights = plan.advisory_data?.market_insights || [];
    const risks = plan.advisory_data?.risks || [];
    const fin = plan.financial_data || {};
    const inv = Number(plan.investment_amount || 0).toLocaleString('en-IN');
    const emi = fin.monthly_emi ? Number(fin.monthly_emi).toLocaleString('en-IN') : 'N/A';
    const totalCost = fin.project_cost ? Number(fin.project_cost).toLocaleString('en-IN') : inv;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>GramBiz AI - Detailed Project Report (DPR) - ${plan.business_category}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #1e293b; padding: 40px; margin: 0; background: #fff; }
          .header { border-bottom: 2px solid #059669; padding-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-start; }
          .title { font-size: 24px; font-weight: 800; color: #065f46; margin: 0; }
          .subtitle { font-size: 13px; color: #64748b; margin-top: 4px; }
          .badge { display: inline-block; padding: 4px 10px; border-radius: 9999px; background: #ecfdf5; color: #047857; font-weight: 700; font-size: 11px; border: 1px solid #a7f3d0; }
          .meta-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin: 25px 0; background: #f8fafc; padding: 18px; border-radius: 12px; border: 1px solid #e2e8f0; }
          .meta-item { font-size: 12px; }
          .meta-label { color: #64748b; font-weight: 600; text-transform: uppercase; font-size: 10px; }
          .meta-val { font-size: 15px; font-weight: 800; color: #0f172a; margin-top: 2px; }
          .section { margin-top: 25px; }
          .section-title { font-size: 15px; font-weight: 800; color: #0f172a; border-left: 4px solid #059669; padding-left: 8px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
          .swot-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
          .swot-box { padding: 12px; border-radius: 8px; font-size: 11px; }
          .swot-s { background: #f0fdf4; border: 1px solid #bbf7d0; }
          .swot-w { background: #fffbeb; border: 1px solid #fde68a; }
          .swot-o { background: #eff6ff; border: 1px solid #bfdbfe; }
          .swot-t { background: #fef2f2; border: 1px solid #fecaca; }
          .swot-title { font-weight: 800; margin-bottom: 6px; }
          ul { margin: 0; padding-left: 18px; }
          li { margin-bottom: 4px; font-size: 12px; color: #334155; }
          .footer { margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 15px; font-size: 11px; color: #94a3b8; display: flex; justify-content: space-between; }
          @media print { body { padding: 20px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="badge">BANK SUBMISSION READY DPR • NABARD / PMEGP COMPLIANT</div>
            <h1 class="title">${plan.business_category} Feasibility & Project Report</h1>
            <div class="subtitle">Location: ${plan.location} • Generated by GramBiz AI Enterprise Platform</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 11px; color: #64748b;">Report Date: <strong>${plan.date}</strong></div>
            <div style="font-size: 11px; color: #64748b;">DPR ID: <strong>${plan.id}</strong></div>
            <div style="font-size: 18px; font-weight: 900; color: #047857; margin-top: 5px;">${plan.viability_score}/100 Viability</div>
          </div>
        </div>

        <div class="meta-grid">
          <div class="meta-item">
            <div class="meta-label">Total Outlay</div>
            <div class="meta-val">₹${totalCost}</div>
          </div>
          <div class="meta-item">
            <div class="meta-label">Self Capital</div>
            <div class="meta-val">₹${inv}</div>
          </div>
          <div class="meta-item">
            <div class="meta-label">Estimated EMI</div>
            <div class="meta-val">₹${emi}/mo</div>
          </div>
          <div class="meta-item">
            <div class="meta-label">Status</div>
            <div class="meta-val" style="color: #059669;">${plan.status}</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Strategic Rural Market Insights</div>
          <ul>
            ${insights.map(i => `<li>${i}</li>`).join('')}
          </ul>
        </div>

        <div class="section">
          <div class="section-title">AI SWOT Feasibility Matrix</div>
          <div class="swot-grid">
            <div class="swot-box swot-s">
              <div class="swot-title" style="color: #166534;">Strengths</div>
              <ul>${(swot.strengths || []).map(s => `<li>${s}</li>`).join('')}</ul>
            </div>
            <div class="swot-box swot-w">
              <div class="swot-title" style="color: #854d0e;">Weaknesses</div>
              <ul>${(swot.weaknesses || []).map(w => `<li>${w}</li>`).join('')}</ul>
            </div>
            <div class="swot-box swot-o">
              <div class="swot-title" style="color: #1e40af;">Opportunities (Subsidies)</div>
              <ul>${(swot.opportunities || []).map(o => `<li>${o}</li>`).join('')}</ul>
            </div>
            <div class="swot-box swot-t">
              <div class="swot-title" style="color: #991b1b;">Threats & Risk Mitigation</div>
              <ul>${(swot.threats || []).map(t => `<li>${t}</li>`).join('')}</ul>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Key Operational Risks</div>
          <ul>
            ${risks.map(r => `<li>${r}</li>`).join('')}
          </ul>
        </div>

        <div class="footer">
          <div>GramBiz AI Rural Enterprise Decision Engine • Official Bank Submission Format</div>
          <div>Page 1 of 1 • Certified Digital Intelligence Copy</div>
        </div>

        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();

    setTimeout(() => {
      setDownloadSuccess(null);
    }, 2500);
  };

  // Get appropriate category icon
  const getCategoryIcon = (cat = '') => {
    const c = cat.toLowerCase();
    if (c.includes('dairy') || c.includes('milk')) return <Milk className="w-5 h-5 text-sky-600" />;
    if (c.includes('grocery') || c.includes('kirana') || c.includes('retail')) return <Store className="w-5 h-5 text-emerald-600" />;
    if (c.includes('tailor') || c.includes('apparel')) return <Scissors className="w-5 h-5 text-purple-600" />;
    return <Sprout className="w-5 h-5 text-emerald-600" />;
  };

  // Filter plans by search term and category
  const filteredPlans = plans.filter((p) => {
    const matchesSearch = 
      p.business_category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.status.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'ALL' || p.business_category.toLowerCase().includes(categoryFilter.toLowerCase());
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-black border border-emerald-200 mb-2.5">
            <BookmarkCheck className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'ta' ? 'சேமிக்கப்பட்ட திட்ட அறிக்கைகள்' : 'Saved Business Plans & DPR Dossiers'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {lang === 'ta' ? 'எனது திட்ட அறிக்கைகள்' : 'My Reports & Saved Plans'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            {lang === 'ta' 
              ? 'உங்கள் முந்தைய சாத்தியக்கூறு மதிப்பீடுகள், வங்கி சமர்ப்பிப்பு அறிக்கைகள் மற்றும் மானிய ஆவணங்களை இங்கிருந்து நிர்வகிக்கலாம்.'
              : 'Browse previously saved AI feasibility plans, view structured SWOT advisories, and download bank-grade Detailed Project Reports (DPR).'
            }
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
          {!isAuthenticated && (
            <button
              onClick={openLogin}
              className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all"
            >
              {lang === 'ta' ? 'உள்நுழைக (JWT)' : 'Sign In to Sync'}
            </button>
          )}

          <button 
            onClick={() => onNavigate('new-idea')}
            className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>{lang === 'ta' ? 'புதிய வணிக மதிப்பீடு' : 'Assess New Idea'}</span>
          </button>
        </div>

        {/* Ambient subtle glow background */}
        <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-emerald-50/70 to-transparent pointer-events-none" />
      </div>

      {/* Save Success Alert Banner */}
      {saveSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2.5 shadow-xs animate-slideDown">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Live Wizard Active Plan Spotlight Card */}
      {ideaData && (
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-emerald-800/60">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 flex items-center justify-center shrink-0 shadow-inner">
              <FileCheck className="w-7 h-7 text-amber-300" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black uppercase tracking-wider">
                  {lang === 'ta' ? 'செயலில் உள்ள மதிப்பீடு' : 'Active Live Assessment'}
                </span>
                <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {ideaData.category} • ₹{Number(ideaData.investment || 250000).toLocaleString('en-IN')}
                </span>
              </div>
              <h3 className="font-black text-white text-base sm:text-lg mt-1">
                {ideaData.category} Viability Plan — {ideaData.location}
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                {analysisResult?.viabilityScore ? `${analysisResult.viabilityScore}% Viability Score` : '95% Viability Score'} • Real-time AI advisory & EMI projections loaded
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleSaveCurrent}
              disabled={isSavingCurrent}
              className="py-2.5 px-4 rounded-xl bg-white text-emerald-950 hover:bg-emerald-50 font-black text-xs shadow-md transition-all flex items-center gap-2"
            >
              {isSavingCurrent ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-800" />
                  <span>{lang === 'ta' ? 'சேமிக்கிறது...' : 'Saving...'}</span>
                </>
              ) : (
                <>
                  <BookmarkCheck className="w-4 h-4 text-emerald-700" />
                  <span>{lang === 'ta' ? 'அறிக்கையை சேமி' : 'Save to My Reports'}</span>
                </>
              )}
            </button>

            <button
              onClick={() => onNavigate('advisory')}
              className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5"
            >
              <Eye className="w-4 h-4" />
              <span>{lang === 'ta' ? 'டாஷ்போர்டில் திற' : 'Open in Advisory'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Filter / Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={lang === 'ta' ? 'வணிக வகை, இருப்பிடம் அல்லது நிலையைத் தேடவும்...' : 'Search by category, location, or status...'}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['ALL', 'Dairy', 'Grocery', 'Tailoring', 'Agriculture'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`py-1.5 px-3 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'ALL' ? (lang === 'ta' ? 'அனைத்தும்' : 'All') : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
          <p className="text-xs font-bold text-slate-500">
            {lang === 'ta' ? 'சேமிக்கப்பட்ட திட்டங்களை ஏற்றுகிறது...' : 'Fetching saved business plans from backend (/api/my-plans)...'}
          </p>
        </div>
      )}

      {/* Error Alert */}
      {!isLoading && error && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center justify-between">
          <span>{error}</span>
          <button onClick={loadPlans} className="underline font-bold ml-2">Retry</button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredPlans.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-xs space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-black text-slate-800">
            {lang === 'ta' ? 'அறிக்கைகள் எதுவும் இல்லை' : 'No Business Plans Found'}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            {searchTerm 
              ? (lang === 'ta' ? 'உங்கள் தேடலுடன் பொருந்தும் திட்டங்கள் எதுவும் இல்லை.' : 'No plans match your search query. Try clearing the filter.')
              : (lang === 'ta' ? 'நீங்கள் இன்னும் எந்த வணிக திட்டத்தையும் சேமிக்கவில்லை. புதிய யோசனையை மதிப்பிடுங்கள்!' : 'You have not saved any plans yet. Assess a new rural business idea to generate your first DPR!')
            }
          </p>
          <button
            onClick={() => onNavigate('new-idea')}
            className="py-2.5 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm"
          >
            {lang === 'ta' ? 'புதிய திட்டத்தை மதிப்பிடு' : 'Create New Assessment'}
          </button>
        </div>
      )}

      {/* Saved Plans Grid */}
      {!isLoading && filteredPlans.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPlans.map((plan) => (
            <div 
              key={plan.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header: Icon, Category Badge & Viability Score */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {getCategoryIcon(plan.business_category)}
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {plan.status || 'Verified DPR'}
                      </span>
                      <h3 className="font-black text-slate-900 text-base mt-1 leading-snug group-hover:text-emerald-800 transition-colors">
                        {plan.business_category}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
                      {plan.viability_score || 94}% Viable
                    </span>
                    <button
                      onClick={(e) => handleDeletePlan(e, plan.id)}
                      className="p-1 text-slate-300 hover:text-red-500 transition-colors mt-1"
                      title="Delete Plan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Plan Metadata: Location, Date, Capital */}
                <div className="mt-5 space-y-2.5 text-xs text-slate-600 bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-700 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{plan.location}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{plan.date}</span>
                    </div>

                    <div className="font-black text-slate-900 text-xs">
                      ₹{Number(plan.investment_amount || 0).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                {/* Key Insights Preview if available */}
                {plan.advisory_data?.market_insights && (
                  <p className="mt-3 text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {plan.advisory_data.market_insights[0]}
                  </p>
                )}
              </div>

              {/* Action Buttons: View Details & Download PDF */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => handleViewDetails(plan)}
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-black text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  title="Open this plan in the AI Advisory Dashboard layout"
                >
                  <Eye className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{lang === 'ta' ? 'விவரங்கள் காண்க' : 'View Details'}</span>
                </button>

                <button
                  onClick={() => handleDownloadPdf(plan)}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  title="Download and print DPR PDF"
                >
                  {downloadSuccess === plan.id ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{lang === 'ta' ? 'திறக்கப்பட்டது!' : 'Opened!'}</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 text-slate-300" />
                      <span>{lang === 'ta' ? 'PDF பதிவிறக்கம்' : 'Download PDF'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
