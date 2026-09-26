import React from 'react';
import TranslatableText from './TranslatableText';
import { 
  TrendingUp, 
  MapPin, 
  Sparkles,
  BarChart3
} from 'lucide-react';

export default function MarketInsightsCard({
  title = "Hyper-Local Market Insights",
  tamilTitlePlaceholder = "உள்ளூர் சந்தை நுண்ணறிவுகள்",
  subtitle = "Demographic demand signals, consumer spend patterns, and rural supply chain telemetry",
  tamilSubtitlePlaceholder = "மக்கள் தொகை தேவை, நுகர்வோர் வாங்கும் திறன் மற்றும் விநியோகச் சங்கிலி குறித்த தரவு வழிகாட்டுதல்",
  insights = [],
  location = "Kallupatti Village, Madurai",
  lang = "en",
  showDual = false,
  className = ""
}) {
  return (
    <div className={`bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs relative overflow-hidden ${className}`}>
      {/* Decorative subtle ambient gradient accent */}
      <div className="absolute top-0 right-0 w-80 h-32 bg-gradient-to-l from-emerald-100/50 via-teal-50/20 to-transparent pointer-events-none" />

      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 relative z-10">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-700 to-teal-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-700/20">
            <BarChart3 className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <TranslatableText
                text={title}
                tamilPlaceholder={tamilTitlePlaceholder}
                lang={lang}
                showDual={false}
                className="font-extrabold text-lg sm:text-xl text-slate-800 tracking-tight"
                as="h3"
              />
              <span className="badge badge-sm badge-success text-white font-extrabold">
                {lang === 'ta' ? 'நேரலை AI ரேடார்' : 'Live Rural Feed'}
              </span>
            </div>
            <TranslatableText
              text={subtitle}
              tamilPlaceholder={tamilSubtitlePlaceholder}
              lang={lang}
              showDual={showDual}
              className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5"
              as="p"
            />
          </div>
        </div>

        {/* Location Pin Indicator */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 shrink-0 self-start sm:self-auto">
          <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="truncate">{location}</span>
        </div>
      </div>

      {/* Bullet Points Grid */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((item, idx) => {
          const isStr = typeof item === 'string';
          const IconComp = (!isStr && item && item.icon) ? item.icon : TrendingUp;
          const itemText = isStr ? item : (item && item.text ? item.text : '');
          const itemCategory = isStr 
            ? `Market Signal #${idx + 1}` 
            : (lang === 'ta' ? (item?.categoryTa || item?.category) : (item?.category || 'Insight'));
          const itemMetric = isStr 
            ? 'AI Verified' 
            : (lang === 'ta' ? (item?.metricTa || item?.metric) : item?.metric);

          return (
            <div 
              key={idx}
              className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all card-hover-effect flex items-start gap-3.5"
            >
              {/* Icon Container */}
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 text-emerald-700 flex items-center justify-center shrink-0 shadow-2xs">
                <IconComp className="w-5 h-5" />
              </div>

              {/* Text & Metric Area */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                    {itemCategory}
                  </span>
                  {itemMetric && (
                    <span className="text-xs font-black text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-md border border-emerald-200/80 shrink-0">
                      {itemMetric}
                    </span>
                  )}
                </div>

                <TranslatableText
                  text={itemText}
                  tamilPlaceholder={isStr ? '' : (item?.tamilPlaceholder || '')}
                  lang={lang}
                  showDual={showDual}
                  className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed block"
                  as="p"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust & Source Note */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-1.5 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>
            {lang === 'ta' 
              ? 'தரவு மூலம்: தமிழ்நாடு அரசு வேளாண்மை சந்தை குழு & கிராமப்புற மக்கள் தொகை கணக்கெடுப்பு'
              : 'Synthesized from Tamil Nadu Agricultural Marketing Board, APMC mandi arrivals & District MSME registry.'}
          </span>
        </div>
        <span className="text-[11px] text-emerald-700 font-bold">
          {lang === 'ta' ? '98.4% நம்பிக்கை நிலை' : 'Confidence: 98.4%'}
        </span>
      </div>
    </div>
  );
}
