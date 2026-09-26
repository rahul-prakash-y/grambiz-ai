import React, { useState } from 'react';
import { 
  Menu, 
  Globe, 
  Bell, 
  Search, 
  MapPin, 
  User, 
  Check, 
  ChevronDown,
  Building2,
  FileBadge,
  LogOut,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { mockData } from '../data/mockData';
import { useBusinessIdea } from '../context/BusinessIdeaContext';

export default function TopNavbar({ 
  lang, 
  setLang, 
  t, 
  collapsed, 
  setCollapsed, 
  setMobileOpen,
  activeTabTitle 
}) {
  const { ideaData } = useBusinessIdea();
  const [searchQuery, setSearchQuery] = useState('');
  const [unreadCount, setUnreadCount] = useState(2);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between shadow-xs">
      {/* Left: Mobile Hamburger + Desktop Quick Toggle + Location / View Title */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-slate-100 transition-colors"
          aria-label="Open Mobile Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Location Indicator & Active Screen title */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span className="truncate">{ideaData?.location || t.topbar.activeVillage}</span>
          </div>

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          <h1 className="text-base sm:text-lg font-bold text-slate-800 truncate">
            {activeTabTitle}
          </h1>
        </div>
      </div>

      {/* Center: Search Bar (Desktop / Tablet) */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.topbar.searchPlaceholder}
            className="w-full pl-9 pr-12 py-1.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
          />
          <kbd className="absolute inset-y-1.5 right-2 hidden xl:inline-flex items-center px-1.5 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 rounded">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Controls: Language Toggle Dropdown + Notifications + User Profile Placeholder */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Language Toggle Dropdown */}
        <div className="dropdown dropdown-end">
          <div 
            tabIndex={0} 
            role="button" 
            className="btn btn-sm btn-ghost gap-1.5 font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 rounded-lg px-2.5 sm:px-3"
            aria-label="Select Language"
          >
            <Globe className="w-4 h-4 text-emerald-600" />
            <span className="text-xs sm:text-sm uppercase tracking-wide">
              {lang === 'en' ? 'English' : 'தமிழ்'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <ul 
            tabIndex={0} 
            className="dropdown-content z-50 menu p-1.5 shadow-lg bg-white rounded-xl w-44 border border-slate-100 mt-2"
          >
            <li className="menu-title px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {t.topbar.language} / Language
            </li>
            <li>
              <button 
                onClick={() => setLang('en')}
                className={`flex items-center justify-between text-xs py-2 rounded-lg ${lang === 'en' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                <span>English (EN)</span>
                {lang === 'en' && <Check className="w-4 h-4 text-emerald-600" />}
              </button>
            </li>
            <li>
              <button 
                onClick={() => setLang('ta')}
                className={`flex items-center justify-between text-xs py-2 rounded-lg ${lang === 'ta' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                <span>தமிழ் (Tamil)</span>
                {lang === 'ta' && <Check className="w-4 h-4 text-emerald-600" />}
              </button>
            </li>
          </ul>
        </div>

        {/* Notifications Dropdown */}
        <div className="dropdown dropdown-end">
          <div 
            tabIndex={0} 
            role="button" 
            className="btn btn-sm btn-ghost btn-circle text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200"
            aria-label="Notifications"
          >
            <div className="indicator">
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="badge badge-xs badge-accent indicator-item animate-pulse">
                  {unreadCount}
                </span>
              )}
            </div>
          </div>
          <div 
            tabIndex={0} 
            className="dropdown-content z-50 card card-compact w-72 sm:w-80 p-0 shadow-xl bg-white rounded-xl border border-slate-100 mt-2"
          >
            <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 rounded-t-xl">
              <span className="font-bold text-xs text-slate-800">
                {t.topbar.notifications} ({unreadCount})
              </span>
              {unreadCount > 0 && (
                <button 
                  onClick={() => setUnreadCount(0)}
                  className="text-[11px] text-emerald-700 hover:underline font-semibold"
                >
                  {t.topbar.markAllRead}
                </button>
              )}
            </div>
            <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
              {mockData.notifications.map((n) => (
                <div key={n.id} className={`p-3 text-xs hover:bg-slate-50 transition-colors ${n.unread ? 'bg-emerald-50/40' : ''}`}>
                  <p className="font-semibold text-slate-800">
                    {lang === 'ta' ? n.titleTa : n.titleEn}
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {lang === 'ta' ? n.timeTa : n.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Profile Placeholder Dropdown */}
        <div className="dropdown dropdown-end">
          <div 
            tabIndex={0} 
            role="button" 
            className="flex items-center gap-2 p-1 pl-1.5 sm:pr-2.5 rounded-full hover:bg-slate-100 border border-slate-200/80 cursor-pointer transition-colors"
            aria-label="User Profile Menu"
          >
            {/* Avatar Placeholder with Status Dot */}
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-sky-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                SK
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>

            {/* User Name & Role (hidden on small mobile) */}
            <div className="hidden xl:flex flex-col text-left pr-1">
              <span className="text-xs font-bold text-slate-800 leading-tight">
                {t.topbar.profileName}
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold leading-none">
                {t.topbar.profileRole}
              </span>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </div>

          {/* Profile Menu Dropdown Card */}
          <ul 
            tabIndex={0} 
            className="dropdown-content z-50 menu p-2 shadow-xl bg-white rounded-2xl w-64 border border-slate-100 mt-2 text-xs"
          >
            {/* User Summary Header */}
            <li className="border-b border-slate-100 pb-2 mb-1">
              <div className="flex flex-col items-start hover:bg-transparent cursor-default px-2 py-1">
                <span className="font-bold text-slate-900 text-sm">{t.topbar.profileName}</span>
                <span className="text-[11px] text-slate-500">{t.topbar.profileRole}</span>
                <span className="mt-1 text-[10px] inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                  <MapPin className="w-3 h-3" /> Madurai, Tamil Nadu
                </span>
              </div>
            </li>

            <li>
              <a className="flex items-center gap-2 py-2 text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg">
                <User className="w-4 h-4 text-emerald-600" />
                <span>{t.topbar.viewProfile}</span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2 py-2 text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg">
                <FileBadge className="w-4 h-4 text-sky-600" />
                <span>{t.topbar.governmentSchemes}</span>
                <span className="badge badge-xs badge-success text-white ml-auto">3 Active</span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2 py-2 text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg">
                <Building2 className="w-4 h-4 text-amber-600" />
                <span>DIC Madurai / MSME Center</span>
              </a>
            </li>
            <li className="border-t border-slate-100 pt-1 mt-1">
              <a className="flex items-center gap-2 py-2 text-red-600 hover:bg-red-50 rounded-lg font-semibold">
                <LogOut className="w-4 h-4 text-red-500" />
                <span>{t.topbar.logout}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
