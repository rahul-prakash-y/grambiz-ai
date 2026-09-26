import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  CheckCircle2, 
  Landmark, 
  Calendar, 
  Search, 
  Plus, 
  ShieldCheck, 
  Sparkles,
  FileCheck,
  X
} from 'lucide-react';
import { mockData } from '../../data/mockData';
import { useBusinessIdea } from '../../context/BusinessIdeaContext';

export default function ReportsView({ t, lang, onNavigate }) {
  const { ideaData, analysisResult } = useBusinessIdea();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState(null);

  const filteredReports = mockData.reportsList.filter((r) => {
    const text = (lang === 'ta' ? r.titleTa : r.titleEn) + ' ' + r.scheme + ' ' + r.bank;
    return text.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleDownload = (id) => {
    setDownloadSuccess(id);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-2">
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.reports.badge}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800">
            {t.reports.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            {t.reports.subtitle}
          </p>
        </div>

        <button 
          onClick={() => onNavigate('calculator')}
          className="btn btn-primary gap-2 font-bold rounded-xl shadow-md text-white shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{t.reports.createNewReport}</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.reports.searchPlaceholder}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
          />
        </div>
      </div>

      {/* Active Idea Live DPR Card */}
      {ideaData && (
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-white rounded-2xl p-5 border border-emerald-300 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-sm">
              <FileCheck className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="badge badge-sm badge-success text-white font-extrabold">
                  {lang === 'ta' ? 'புதிய AI DPR அறிக்கை' : 'Live Wizard DPR Dossier'}
                </span>
                <span className="text-[11px] font-bold text-emerald-800">
                  {lang === 'ta' ? 'வங்கி கடன் தகுதியானது' : 'Mudra & PMEGP Ready'}
                </span>
              </div>
              <h3 className="font-extrabold text-slate-800 text-base mt-1">
                {ideaData.category} Project DPR — {ideaData.location}
              </h3>
              <p className="text-xs text-slate-500">
                Total Outlay: ₹{Number(ideaData.investment).toLocaleString('en-IN')} • Subsidy: ~35% • Target Bank: SBI / Canara / Pandyan Grama Bank
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleDownload('active-wizard-dpr')}
              className="btn btn-sm btn-primary gap-1.5 font-bold rounded-xl shadow-xs text-white"
            >
              {downloadSuccess === 'active-wizard-dpr' ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>{lang === 'ta' ? 'பதிவிறக்கப்பட்டது!' : 'Downloaded!'}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>{lang === 'ta' ? 'DPR பதிவிறக்கம்' : 'Download Live DPR'}</span>
                </>
              )}
            </button>
            <button
              onClick={() => onNavigate('new-idea')}
              className="btn btn-sm btn-outline border-slate-200 text-slate-700 font-bold rounded-xl"
            >
              {lang === 'ta' ? 'அளவுருக்கள் மாற்று' : 'Edit Wizard Inputs'}
            </button>
          </div>
        </div>
      )}

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredReports.map((report) => (
          <div 
            key={report.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:border-emerald-300 transition-all card-hover-effect flex flex-col justify-between"
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2">
                <span className="badge badge-sm badge-success text-white font-bold">
                  {lang === 'ta' ? report.statusTa : report.statusEn}
                </span>
                <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  {report.score} Viability
                </span>
              </div>

              <h3 className="mt-3 font-bold text-slate-900 text-sm sm:text-base leading-snug">
                {lang === 'ta' ? report.titleTa : report.titleEn}
              </h3>

              <div className="mt-4 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Landmark className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{report.bank}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate font-semibold text-emerald-800">{report.scheme}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{report.date} • {lang === 'ta' ? 'திட்ட செலவு:' : 'Project Cost:'} {report.cost}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedReport(report)}
                className="btn btn-xs btn-outline gap-1 text-slate-700 hover:text-emerald-700 hover:border-emerald-500 rounded-lg flex-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{t.reports.viewOnline}</span>
              </button>

              <button
                onClick={() => handleDownload(report.id)}
                className="btn btn-xs btn-primary gap-1 font-semibold rounded-lg flex-1"
              >
                {downloadSuccess === report.id ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    <span>{lang === 'ta' ? 'பதிவிறங்கியது' : 'Saved'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>{t.reports.downloadPdf}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Online Dossier Modal / Drawer */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  {selectedReport.scheme}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                  {lang === 'ta' ? selectedReport.titleTa : selectedReport.titleEn}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedReport(null)}
                className="btn btn-sm btn-ghost btn-circle text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-bold text-slate-800">
                  {lang === 'ta' ? 'வங்கி சமர்ப்பிப்பு சான்றிதழ்' : 'Bank Submission Compliance'}
                </span>
                <p className="text-slate-600">
                  {lang === 'ta' 
                    ? `இந்த விரிவான திட்ட அறிக்கை (DPR), ரிசர்வ் வங்கியின் சிறுதொழில் விதிமுறைகள் மற்றும் நபார்டு வழிகாட்டுதல்களின்படி தயாரிக்கப்பட்டுள்ளது.`
                    : `This Detailed Project Report (DPR) is prepared adhering to RBI guidelines for micro-enterprises and PMEGP/PMFME online portal standards.`
                  }
                </p>
              </div>

              {/* Financial Key Highlights Table in Dossier */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="table table-xs w-full">
                  <thead className="bg-slate-50 font-bold text-slate-600">
                    <tr>
                      <th>{lang === 'ta' ? 'அளவுரு' : 'Parameter'}</th>
                      <th>{lang === 'ta' ? 'மதிப்பு' : 'Value'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-semibold">{lang === 'ta' ? 'மொத்த திட்ட மூலதனம்' : 'Total Capital Outlay'}</td>
                      <td className="font-bold text-slate-900">{selectedReport.cost}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">{lang === 'ta' ? 'அரசு மானிய ஒதுக்கீடு' : 'Subsidy Allocation'}</td>
                      <td className="font-bold text-emerald-700">35% (~₹1,68,000)</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">{lang === 'ta' ? 'கடன் சேவை பாதுகாப்பு விகிதம் (DSCR)' : 'Debt Service Coverage Ratio (DSCR)'}</td>
                      <td className="font-bold text-sky-700">2.14 (Safe Banking Threshold &gt; 1.5)</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">{lang === 'ta' ? 'இலக்கு வங்கி கிளை' : 'Target Lending Branch'}</td>
                      <td className="font-bold text-slate-800">{selectedReport.bank}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex items-center gap-2 pt-2 text-[11px] text-emerald-700 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'ta' ? 'அரசு முத்திரை & AI சரிபார்ப்பு நிறைவுற்றது' : 'Digital Verification Stamp & QR Code Attached'}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button 
                onClick={() => setSelectedReport(null)}
                className="btn btn-sm btn-ghost text-slate-600 rounded-lg"
              >
                {t.common.close}
              </button>
              <button 
                onClick={() => {
                  handleDownload(selectedReport.id);
                  setSelectedReport(null);
                }}
                className="btn btn-sm btn-primary gap-1.5 font-bold rounded-lg"
              >
                <Download className="w-4 h-4" />
                <span>{t.reports.downloadPdf}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
