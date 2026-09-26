import React, { useMemo } from 'react';
import { Mic, MicOff, Volume2, Sparkles } from 'lucide-react';

export default function VoiceVisualizer({
  isListening,
  onToggleListening,
  voiceLang,
  status = 'ready',
  t
}) {
  // Generate 14 animated audio visualizer bars with pseudo-random staggered delays and heights
  const bars = useMemo(() => {
    return [
      { delay: '0.1s', baseHeight: 28, maxScale: 0.9 },
      { delay: '0.35s', baseHeight: 45, maxScale: 1.3 },
      { delay: '0.18s', baseHeight: 65, maxScale: 1.6 },
      { delay: '0.42s', baseHeight: 85, maxScale: 1.8 },
      { delay: '0.2s', baseHeight: 52, maxScale: 1.4 },
      { delay: '0.5s', baseHeight: 78, maxScale: 1.7 },
      { delay: '0.15s', baseHeight: 96, maxScale: 2.0 },
      { delay: '0.3s', baseHeight: 88, maxScale: 1.9 },
      { delay: '0.45s', baseHeight: 60, maxScale: 1.5 },
      { delay: '0.25s', baseHeight: 74, maxScale: 1.65 },
      { delay: '0.12s', baseHeight: 48, maxScale: 1.35 },
      { delay: '0.38s', baseHeight: 68, maxScale: 1.55 },
      { delay: '0.22s', baseHeight: 40, maxScale: 1.2 },
      { delay: '0.48s', baseHeight: 24, maxScale: 0.85 }
    ];
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-5 text-white border border-slate-800 shadow-inner">
      {/* Background ambient gradient glow */}
      <div 
        className={`absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
          isListening 
            ? 'bg-emerald-500/25 scale-125' 
            : 'bg-emerald-700/10 scale-90'
        }`} 
      />

      {/* Center Mic Avatar with Dynamic Radar Waves */}
      <div className="relative flex flex-col items-center justify-center my-3">
        {/* Pulsing radar waves when listening */}
        {isListening && (
          <>
            <div className="absolute w-20 h-20 rounded-full border border-emerald-400/50 mic-radar-wave-1 pointer-events-none" />
            <div className="absolute w-20 h-20 rounded-full border border-teal-400/40 mic-radar-wave-2 pointer-events-none" />
          </>
        )}

        {/* Central interactive mic button */}
        <button
          type="button"
          onClick={onToggleListening}
          className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform active:scale-95 ${
            isListening
              ? 'bg-gradient-to-tr from-emerald-600 to-teal-400 text-white voice-glow-active ring-4 ring-emerald-400/40 scale-105'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700'
          }`}
          title={isListening ? 'Click to stop listening' : 'Click to start speaking'}
          aria-label={isListening ? 'Stop listening' : 'Start speaking'}
        >
          {isListening ? (
            <Mic className="w-7 h-7 animate-pulse text-white drop-shadow" />
          ) : (
            <MicOff className="w-6 h-6 text-slate-400" />
          )}
        </button>

        {/* Live Audio Frequency Sound Bars Visualizer */}
        <div className="flex items-end justify-center gap-1.5 h-14 mt-4 w-full px-2">
          {bars.map((bar, idx) => (
            <div
              key={idx}
              className={`w-1.5 rounded-full transition-all duration-200 ${
                isListening
                  ? 'bg-gradient-to-t from-emerald-500 via-teal-400 to-amber-300 visualizer-bar-animated'
                  : 'bg-slate-700 h-2 opacity-50'
              }`}
              style={{
                height: isListening ? `${bar.baseHeight}%` : '8px',
                animationDelay: bar.delay,
                animationDuration: `${0.7 + (idx % 4) * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Visualizer Status Bar */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isListening ? 'bg-emerald-400' : 'bg-slate-500'
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isListening ? 'bg-emerald-500' : 'bg-slate-500'
              }`}
            />
          </span>
          <span className={`font-semibold ${isListening ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>
            {isListening
              ? (t?.voice?.statusListening || 'Listening to your voice...')
              : (t?.voice?.statusReady || 'Click microphone to speak')}
          </span>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
          <Volume2 className="w-3 h-3 text-emerald-400" />
          <span>{voiceLang === 'ta' ? 'ta-IN (தமிழ்)' : 'en-IN (English)'}</span>
        </div>
      </div>
    </div>
  );
}
