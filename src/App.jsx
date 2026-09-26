import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';
import DashboardView from './components/views/DashboardView';
import NewIdeaView from './components/views/NewIdeaView';
import CompetitorsView from './components/views/CompetitorsView';
import CalculatorView from './components/views/CalculatorView';
import ReportsView from './components/views/ReportsView';
import AdvisoryView from './components/views/AdvisoryView';
import VoiceAssistant from './components/voice/VoiceAssistant';
import AuthModal from './components/auth/AuthModal';
import { BusinessIdeaProvider } from './context/BusinessIdeaContext';
import { AuthProvider } from './context/AuthContext';
import { translations } from './data/translations';
import { Sprout, PhoneCall, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const t = translations[lang] || translations.en;

  const getActiveTabTitle = () => {
    switch (activeTab) {
      case 'dashboard': return t.nav.dashboard;
      case 'new-idea': return t.nav.newIdea;
      case 'advisory': return t.nav.advisory;
      case 'competitors': return t.nav.localCompetitors;
      case 'calculator': return t.nav.financialCalculator;
      case 'reports': return t.nav.myReports;
      default: return t.nav.dashboard;
    }
  };

  return (
    <AuthProvider>
      <BusinessIdeaProvider lang={lang}>
        <div className="min-h-screen bg-slate-50/70 text-slate-800 flex flex-col font-sans selection:bg-emerald-600 selection:text-white" data-theme="ruralTrust">
      {/* Responsive Collapsible Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        t={t}
        lang={lang}
      />

      {/* Main Content Area (adjusts left padding based on sidebar collapsed state) */}
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out min-w-0
          ${collapsed ? 'lg:pl-20' : 'lg:pl-72'}
        `}
      >
        {/* Sticky Top Navigation Bar */}
        <TopNavbar
          lang={lang}
          setLang={setLang}
          t={t}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          setMobileOpen={setMobileOpen}
          activeTabTitle={getActiveTabTitle()}
        />

        {/* Dynamic View Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardView t={t} lang={lang} onNavigate={setActiveTab} />
          )}
          {activeTab === 'new-idea' && (
            <NewIdeaView t={t} lang={lang} onNavigate={setActiveTab} />
          )}
          {activeTab === 'advisory' && (
            <AdvisoryView t={t} lang={lang} onNavigate={setActiveTab} />
          )}
          {activeTab === 'competitors' && (
            <CompetitorsView t={t} lang={lang} onNavigate={setActiveTab} />
          )}
          {activeTab === 'calculator' && (
            <CalculatorView t={t} lang={lang} onNavigate={setActiveTab} />
          )}
          {activeTab === 'reports' && (
            <ReportsView t={t} lang={lang} onNavigate={setActiveTab} />
          )}
        </main>

        {/* Trust & Rural Enterprise Footer */}
        <footer className="mt-auto border-t border-slate-200/80 bg-white/70 py-6 px-4 sm:px-8 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
                <Sprout className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-slate-800">GramBiz AI</span>
              <span className="text-slate-300">|</span>
              <span>{t.brand.tagline}</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-slate-600">
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                PMEGP & NABARD Compliant
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 text-sky-600" />
                Helpline: 1800-180-1551
              </span>
            </div>
          </div>
        </footer>
      </div>

      {/* Persistent Global Voice Assistant (FAB + Animated Listening Visualizer Modal) */}
      <VoiceAssistant lang={lang} t={t} />

      {/* Global Authentication Modal (Login / Register) */}
      <AuthModal lang={lang} t={t} />
    </div>
    </BusinessIdeaProvider>
    </AuthProvider>
  );
}
