import React from 'react';
import TranslatableText from './TranslatableText';
import { 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';

const QUADRANT_THEMES = {
  strengths: {
    letter: 'S',
    borderColor: 'border-emerald-200/90 hover:border-emerald-400',
    headerBg: 'bg-emerald-500 text-white shadow-emerald-500/20',
    cardBg: 'bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/30',
    accentBadge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    impactBadge: 'bg-emerald-100/80 text-emerald-800 border-emerald-200',
    iconColor: 'text-emerald-600',
    bulletColor: 'bg-emerald-500',
    titleColor: 'text-emerald-900',
    defaultIcon: CheckCircle2
  },
  weaknesses: {
    letter: 'W',
    borderColor: 'border-amber-200/90 hover:border-amber-400',
    headerBg: 'bg-amber-500 text-white shadow-amber-500/20',
    cardBg: 'bg-gradient-to-br from-amber-50/70 via-white to-orange-50/30',
    accentBadge: 'bg-amber-100 text-amber-900 border-amber-200',
    impactBadge: 'bg-amber-100/80 text-amber-900 border-amber-200',
    iconColor: 'text-amber-600',
    bulletColor: 'bg-amber-500',
    titleColor: 'text-amber-900',
    defaultIcon: AlertTriangle
  },
  opportunities: {
    letter: 'O',
    borderColor: 'border-sky-200/90 hover:border-sky-400',
    headerBg: 'bg-sky-500 text-white shadow-sky-500/20',
    cardBg: 'bg-gradient-to-br from-sky-50/70 via-white to-blue-50/30',
    accentBadge: 'bg-sky-100 text-sky-800 border-sky-200',
    impactBadge: 'bg-sky-100/80 text-sky-800 border-sky-200',
    iconColor: 'text-sky-600',
    bulletColor: 'bg-sky-500',
    titleColor: 'text-sky-900',
    defaultIcon: TrendingUp
  },
  threats: {
    letter: 'T',
    borderColor: 'border-rose-200/90 hover:border-rose-400',
    headerBg: 'bg-rose-500 text-white shadow-rose-500/20',
    cardBg: 'bg-gradient-to-br from-rose-50/70 via-white to-red-50/30',
    accentBadge: 'bg-rose-100 text-rose-800 border-rose-200',
    impactBadge: 'bg-rose-100/80 text-rose-800 border-rose-200',
    iconColor: 'text-rose-600',
    bulletColor: 'bg-rose-500',
    titleColor: 'text-rose-900',
    defaultIcon: ShieldAlert
  }
};

export default function SWOTQuadrant({
  type = 'strengths',
  title = 'Strengths',
  tamilTitlePlaceholder = 'பலங்கள் (Strengths)',
  subtitle = 'Internal operational & local advantages',
  tamilSubtitlePlaceholder = 'உள்நாட்டு நன்மைகள் மற்றும் செயல்பாட்டு சாதகங்கள்',
  items = [],
  lang = 'en',
  showDual = false,
  className = ''
}) {
  const theme = QUADRANT_THEMES[type] || QUADRANT_THEMES.strengths;
  const IconComponent = theme.defaultIcon;

  return (
    <div 
      className={`rounded-2xl p-5 sm:p-6 border shadow-xs transition-all duration-200 flex flex-col justify-between relative overflow-hidden card-hover-effect
        ${theme.borderColor} ${theme.cardBg} ${className}
      `}
      data-swot-type={type}
    >
      {/* Decorative Watermark Quadrant Letter */}
      <span className="absolute -top-3 -right-2 text-7xl font-black text-slate-900/5 select-none pointer-events-none font-mono">
        {theme.letter}
      </span>

      <div>
        {/* Quadrant Header */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200/70">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm ${theme.headerBg}`}>
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <TranslatableText
                  text={title}
                  tamilPlaceholder={tamilTitlePlaceholder}
                  lang={lang}
                  showDual={false}
                  className={`font-extrabold text-base sm:text-lg tracking-tight ${theme.titleColor}`}
                  as="h3"
                />
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${theme.accentBadge}`}>
                  {theme.letter}
                </span>
              </div>
              <TranslatableText
                text={subtitle}
                tamilPlaceholder={tamilSubtitlePlaceholder}
                lang={lang}
                showDual={showDual}
                className="text-xs text-slate-500 font-medium block"
                as="p"
              />
            </div>
          </div>

          <span className="text-xs font-bold text-slate-400 bg-white/80 px-2 py-1 rounded-lg border border-slate-200/60 shadow-2xs">
            {items.length} {lang === 'ta' ? 'அம்சங்கள்' : 'Factors'}
          </span>
        </div>

        {/* Quadrant Bullet List */}
        <ul className="mt-4 space-y-3">
          {items.map((item, idx) => (
            <li 
              key={idx}
              className="p-3 rounded-xl bg-white/85 border border-slate-100 hover:border-slate-300 shadow-2xs transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-2"
            >
              <div className="flex items-start gap-2.5 flex-1 min-w-0">
                <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${theme.bulletColor}`} />
                <div className="flex-1">
                  <TranslatableText
                    text={item.text}
                    tamilPlaceholder={item.tamilPlaceholder}
                    lang={lang}
                    showDual={showDual}
                    className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed block"
                    as="span"
                  />
                </div>
              </div>

              {/* Tag/Impact Badge */}
              {item.impact && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border shrink-0 self-start sm:self-auto ${theme.impactBadge}`}>
                  {lang === 'ta' ? (item.impactTa || item.impact) : item.impact}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Insight Tag */}
      <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500 font-medium">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{lang === 'ta' ? 'AI சரிபார்க்கப்பட்ட மூலோபாயம்' : 'AI-Calibrated Strategic Signal'}</span>
        </span>
        <span className="text-[10px] uppercase font-bold text-slate-400">
          Quadrant {theme.letter}
        </span>
      </div>
    </div>
  );
}
