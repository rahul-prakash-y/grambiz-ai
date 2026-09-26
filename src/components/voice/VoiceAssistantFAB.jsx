import React from 'react';
import { Mic, MicOff, Radio, Sparkles } from 'lucide-react';

export default function VoiceAssistantFAB({
  isOpen,
  isListening,
  onToggleOpen,
  voiceLang,
  t
}) {
  const isTamil = voiceLang === 'ta';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5">
      {/* Interactive Helper Pill / Status Badge */}
      <button
        type="button"
        onClick={onToggleOpen}
        className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border shadow-lg backdrop-blur-md text-xs font-extrabold transition-all duration-300 hover:scale-105 ${
          isListening
            ? 'bg-emerald-900/90 text-emerald-200 border-emerald-500 ring-2 ring-emerald-400/50 animate-pulse'
            : isOpen
            ? 'bg-white/95 text-slate-800 border-emerald-300'
            : 'bg-white/95 text-slate-700 hover:text-emerald-800 border-slate-200'
        }`}
        title={t?.voice?.fabTooltip || 'Click to speak & fill inputs'}
      >
        <span className="relative flex h-2 w-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isListening ? 'bg-red-400' : 'bg-emerald-400'
            }`}
          />
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              isListening ? 'bg-red-500' : 'bg-emerald-500'
            }`}
          />
        </span>
        <span className="truncate max-w-[130px]">
          {isListening
            ? (isTamil ? 'கேட்கிறது...' : 'Listening...')
            : (t?.voice?.fabBadge || 'Voice AI')}
        </span>
        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
          {isTamil ? 'தமிழ்' : 'EN'}
        </span>
      </button>

      {/* Main Microphone Floating Action Button (FAB) */}
      <div className="relative">
        {/* Pulsing ripple wave when listening */}
        {isListening && (
          <div className="absolute inset-0 rounded-full bg-emerald-500/40 animate-ping pointer-events-none" />
        )}

        <button
          id="global-voice-assistant-fab"
          type="button"
          onClick={onToggleOpen}
          aria-label={t?.voice?.fabTitle || 'Global Voice Assistant'}
          title={t?.voice?.fabTooltip || 'Click to speak & fill inputs'}
          className={`relative group w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 transform active:scale-95 focus:outline-none ${
            isListening
              ? 'bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 voice-glow-active ring-4 ring-emerald-300 scale-105'
              : isOpen
              ? 'bg-gradient-to-tr from-emerald-800 to-teal-700 ring-2 ring-emerald-400'
              : 'bg-gradient-to-tr from-emerald-700 via-teal-600 to-emerald-500 hover:from-emerald-600 hover:to-teal-500 hover:scale-110 shadow-emerald-950/30 hover:shadow-2xl hover:shadow-emerald-900/40'
          }`}
        >
          {isListening ? (
            <div className="relative flex items-center justify-center">
              <Mic className="w-7 h-7 text-white animate-bounce drop-shadow-md" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 ring-2 ring-white" />
            </div>
          ) : (
            <div className="relative flex items-center justify-center">
              <Mic className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-sm group-hover:rotate-12 transition-transform" />
              <Sparkles className="w-3 h-3 text-amber-300 absolute -top-1.5 -right-1.5 opacity-90 animate-pulse" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
