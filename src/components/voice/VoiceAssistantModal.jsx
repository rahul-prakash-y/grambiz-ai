import React, { useState } from 'react';
import { 
  X, 
  Mic, 
  MicOff, 
  Volume2, 
  CornerDownLeft, 
  Trash2, 
  Copy, 
  Check, 
  Target, 
  Sparkles, 
  Languages, 
  Radio, 
  Info,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import VoiceVisualizer from './VoiceVisualizer';

export default function VoiceAssistantModal({
  isOpen,
  onClose,
  isListening,
  onToggleListening,
  voiceLang,
  onToggleVoiceLang,
  transcript,
  interimTranscript,
  onClearTranscript,
  onInsertToInput,
  activeTargetInfo,
  autoInsert,
  onToggleAutoInsert,
  onSimulatePhrase,
  t,
  isSupported
}) {
  const [copied, setCopied] = useState(false);
  const [lastInserted, setLastInserted] = useState(false);

  if (!isOpen) return null;

  // Language-specific demo test phrases
  const demoPrompts = voiceLang === 'ta'
    ? [
        { label: 'கிராம இருப்பிடம்', phrase: 'கல்லுப்பட்டி கிராமம், மதுரை' },
        { label: 'தொழில் வகை', phrase: 'பாரம்பரிய மரச்செக்கு எண்ணெய் ஆலை' },
        { label: 'முதலீட்டு தொகை', phrase: '500000' },
        { label: 'அரசு மானியம்', phrase: 'PMEGP 35% கிராமப்புற மானியம்' }
      ]
    : [
        { label: 'Village Location', phrase: 'Kallupatti Village, Madurai' },
        { label: 'Business Idea', phrase: 'Organic Cold Pressed Groundnut Oil Unit' },
        { label: 'Investment Amount', phrase: '500000' },
        { label: 'Govt Scheme', phrase: 'PMEGP Subsidy Eligibility' }
      ];

  const handleCopy = () => {
    const fullText = (transcript + ' ' + interimTranscript).trim();
    if (fullText) {
      navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleInsert = () => {
    const fullText = (transcript + ' ' + interimTranscript).trim();
    if (fullText) {
      const success = onInsertToInput(fullText);
      if (success) {
        setLastInserted(true);
        setTimeout(() => setLastInserted(false), 1500);
      }
    }
  };

  const isTamil = voiceLang === 'ta';

  return (
    <div
      id="voice-assistant-modal"
      className="fixed bottom-24 right-4 sm:right-6 w-96 max-w-[calc(100vw-2rem)] z-50 bg-white rounded-3xl border border-slate-200/90 shadow-2xl shadow-emerald-950/20 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="voice-assistant-title"
    >
      {/* Modal Header */}
      <div className="rural-gradient-header px-5 py-4 text-white flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-inner">
            <Radio className="w-4 h-4 text-emerald-200 animate-pulse" />
          </div>
          <div>
            <h3 id="voice-assistant-title" className="font-extrabold text-sm sm:text-base leading-tight flex items-center gap-1.5">
              <span>{t?.voice?.modalTitle || 'Rural Voice Assistant'}</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white/20 text-emerald-100 border border-white/10">
                AI Beta
              </span>
            </h3>
            <p className="text-[11px] text-emerald-100/80 line-clamp-1">
              {t?.voice?.modalSubtitle || 'Speak to populate active inputs across GramBiz'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-7 h-7 rounded-lg bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors"
          aria-label="Close Voice Assistant"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 sm:p-5 space-y-4 max-h-[75vh] overflow-y-auto">
        {/* Toggle Switch: English vs Tamil Voice Recognition */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <Languages className="w-4 h-4 text-emerald-600" />
              <span>{t?.voice?.toggleLangLabel || 'Voice Language Recognition:'}</span>
            </div>
            
            <span className="text-[11px] font-bold text-emerald-700 font-mono px-2 py-0.5 rounded-full bg-emerald-100/70">
              {isTamil ? 'தமிழ் (ta-IN)' : 'English (en-IN)'}
            </span>
          </div>

          {/* Segmented Switch Slider */}
          <div className="relative grid grid-cols-2 bg-slate-200/80 p-1 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => voiceLang !== 'en' && onToggleVoiceLang('en')}
              className={`py-1.5 px-3 rounded-lg text-center transition-all duration-200 flex items-center justify-center gap-1.5 ${
                !isTamil
                  ? 'bg-white text-emerald-800 shadow-sm font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🇬🇧</span>
              <span>English</span>
            </button>

            <button
              type="button"
              onClick={() => voiceLang !== 'ta' && onToggleVoiceLang('ta')}
              className={`py-1.5 px-3 rounded-lg text-center transition-all duration-200 flex items-center justify-center gap-1.5 ${
                isTamil
                  ? 'bg-emerald-700 text-white shadow-sm font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🇮🇳</span>
              <span>தமிழ் (Tamil)</span>
            </button>
          </div>
        </div>

        {/* Animated Listening Visualizer */}
        <VoiceVisualizer
          isListening={isListening}
          onToggleListening={onToggleListening}
          voiceLang={voiceLang}
          t={t}
        />

        {/* Target Active Input Field Indicator */}
        <div className="rounded-xl border border-slate-200/90 bg-slate-50/70 p-2.5 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 font-semibold mb-1">
            <Target className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500">
              {t?.voice?.targetField || 'Target Input Field'}:
            </span>
          </div>

          {activeTargetInfo ? (
            <div className="flex items-center justify-between gap-2 bg-white border border-emerald-300 rounded-lg px-2.5 py-1.5 text-slate-800">
              <span className="font-bold text-xs truncate max-w-[210px] text-emerald-900">
                🎯 {activeTargetInfo.label || activeTargetInfo.placeholder || 'Active Input'}
              </span>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 shrink-0">
                {activeTargetInfo.type || 'text'}
              </span>
            </div>
          ) : (
            <p className="text-[11px] text-slate-500 italic bg-white/60 p-1.5 rounded-lg border border-dashed border-slate-300">
              {t?.voice?.noTargetField || 'Click any input box on screen to direct your voice into it.'}
            </p>
          )}
        </div>

        {/* Real-time Transcribed Speech Box */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Transcribed Speech</span>
            </span>

            <div className="flex items-center gap-1.5">
              {(transcript || interimTranscript) && (
                <>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    title="Copy transcript"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={onClearTranscript}
                    className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Clear transcript"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="min-h-20 max-h-28 overflow-y-auto p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
            {transcript || interimTranscript ? (
              <>
                <span>{transcript}</span>
                {interimTranscript && (
                  <span className="text-emerald-700 italic ml-1 underline decoration-dotted">
                    {interimTranscript}
                  </span>
                )}
              </>
            ) : (
              <span className="text-slate-400 italic text-xs">
                {t?.voice?.transcriptPlaceholder || 'Your transcribed words will appear here in real time as you speak...'}
              </span>
            )}
          </div>
        </div>

        {/* Action Controls: Auto-Insert Switch & Manual Insert Button */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={autoInsert}
              onChange={(e) => onToggleAutoInsert(e.target.checked)}
              className="checkbox checkbox-sm checkbox-primary rounded-md"
            />
            <span className="text-xs font-semibold text-slate-600">
              {t?.voice?.autoInsertToggle || 'Auto-fill active field'}
            </span>
          </label>

          <button
            type="button"
            onClick={handleInsert}
            disabled={!transcript && !interimTranscript}
            className={`btn btn-sm text-xs font-bold gap-1.5 rounded-xl transition-all ${
              lastInserted
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'btn-primary text-white'
            }`}
          >
            {lastInserted ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{isTamil ? 'நிரப்பப்பட்டது!' : 'Inserted!'}</span>
              </>
            ) : (
              <>
                <CornerDownLeft className="w-3.5 h-3.5" />
                <span>{t?.voice?.insertButton || 'Insert to Input'}</span>
              </>
            )}
          </button>
        </div>

        {/* Interactive Voice Demo Phrases (Click to simulate/populate) */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold">
            <span>{t?.voice?.demoSuggestionsTitle || 'Quick Voice Prompts (Click to test):'}</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {demoPrompts.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSimulatePhrase(item.phrase)}
                className="p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-200/80 hover:border-emerald-300 text-left transition-all text-xs group"
              >
                <div className="text-[10px] font-bold text-slate-400 group-hover:text-emerald-700 uppercase tracking-tight">
                  {item.label}
                </div>
                <div className="font-bold text-[11px] truncate text-slate-800 group-hover:text-emerald-950">
                  "{item.phrase}"
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Help / Browser Status Pill */}
        <div className="rounded-xl bg-emerald-50/60 border border-emerald-200/70 p-2.5 flex items-start gap-2 text-[11px] text-emerald-900">
          <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <p className="leading-tight">
            {isSupported
              ? (t?.voice?.helpText || 'Voice recognition works in real-time with your microphone. Transcribed words automatically stream into the currently active input field.')
              : (t?.voice?.statusUnsupported || 'Native speech recognition not supported in this browser. Quick demo simulation enabled.')}
          </p>
        </div>
      </div>
    </div>
  );
}
