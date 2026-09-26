import React from 'react';
import { 
  LayoutDashboard, 
  Lightbulb, 
  Store, 
  Calculator, 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  Sprout, 
  PhoneCall,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  collapsed, 
  setCollapsed, 
  mobileOpen, 
  setMobileOpen,
  t,
  lang 
}) {
  const navItems = [
    {
      id: 'dashboard',
      label: t.nav.dashboard,
      icon: LayoutDashboard,
      badge: 'Live',
      badgeColor: 'badge-accent'
    },
    {
      id: 'new-idea',
      label: t.nav.newIdea,
      icon: Lightbulb,
      badge: 'AI',
      badgeColor: 'badge-primary'
    },
    {
      id: 'competitors',
      label: t.nav.localCompetitors,
      icon: Store,
      badge: 'Radar',
      badgeColor: 'badge-secondary'
    },
    {
      id: 'calculator',
      label: t.nav.financialCalculator,
      icon: Calculator,
      badge: '35% Grant',
      badgeColor: 'badge-success'
    },
    {
      id: 'reports',
      label: t.nav.myReports,
      icon: FileText,
      badge: '3 DPR',
      badgeColor: 'badge-neutral'
    }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-neutral/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Element */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-white border-r border-slate-200/90 shadow-xl transition-all duration-300 ease-in-out
          ${collapsed ? 'w-20' : 'w-72'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 bg-gradient-to-r from-emerald-50 via-teal-50/50 to-sky-50">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 via-teal-600 to-sky-600 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 shrink-0">
              <Sprout className="w-6 h-6 animate-pulse-subtle" />
            </div>
            {!collapsed && (
              <div className="flex flex-col truncate">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-slate-800 text-lg tracking-tight">GramBiz</span>
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-emerald-600 text-white uppercase tracking-wider">AI</span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium truncate">
                  {lang === 'ta' ? 'கிராமப்புற வணிக தளம்' : 'Rural Enterprise Intel'}
                </span>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle Button inside header */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-7 h-7 rounded-lg items-center justify-center text-slate-400 hover:text-emerald-700 hover:bg-white border border-slate-200 shadow-sm transition-all"
            title={collapsed ? t.common.expandSidebar : t.common.collapseSidebar}
            aria-label="Toggle Sidebar"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Region & Scheme Trust Banner (only when expanded) */}
        {!collapsed && (
          <div className="px-4 py-2.5 mx-3 mt-3 rounded-lg bg-emerald-50/70 border border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-semibold text-emerald-800">
                {t.brand.district}
              </span>
            </div>
            <span className="text-[10px] font-bold bg-white text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
              NABARD / PMEGP
            </span>
          </div>
        )}

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center rounded-xl transition-all duration-200 group text-left relative
                  ${collapsed ? 'justify-center p-3' : 'justify-between px-3.5 py-3'}
                  ${isActive 
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-semibold shadow-md shadow-emerald-700/25' 
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-emerald-800 font-medium'
                  }
                `}
                title={collapsed ? item.label : undefined}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-emerald-700'}`} />
                  {!collapsed && (
                    <span className="truncate text-sm tracking-normal">
                      {item.label}
                    </span>
                  )}
                </div>

                {!collapsed && item.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0
                    ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}
                  `}>
                    {item.badge}
                  </span>
                )}

                {/* Collapsed active dot indicator */}
                {collapsed && isActive && (
                  <span className="absolute right-1 w-1.5 h-6 bg-emerald-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Area: Rural Helpdesk & Status */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50">
          {!collapsed ? (
            <div className="p-3 rounded-xl bg-gradient-to-br from-sky-50 to-emerald-50 border border-sky-100 space-y-2">
              <div className="flex items-center gap-2 text-sky-800">
                <PhoneCall className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="text-xs font-bold truncate">
                  {lang === 'ta' ? 'உதவி எண் (இலவசம்)' : 'Kisan & MSME Helpline'}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 font-semibold">
                1800-180-1551
              </p>
              <div className="flex items-center gap-1.5 pt-1 border-t border-sky-100/80 text-[10px] text-emerald-700 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{lang === 'ta' ? 'அரசு மானிய உதவி' : 'Govt Subsidy Assistance'}</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-center py-2" title="Toll Free: 1800-180-1551">
              <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
                <PhoneCall className="w-4 h-4" />
              </div>
            </div>
          )}

          {/* Bottom quick expand button for mobile or compact view */}
          <div className="mt-2 text-center text-[10px] text-slate-400">
            {!collapsed && <span>GramBiz AI v2.4 • Rural TN</span>}
          </div>
        </div>
      </aside>
    </>
  );
}
