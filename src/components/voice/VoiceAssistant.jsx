import React, { useState, useEffect, useRef, useCallback } from 'react';
import VoiceAssistantFAB from './VoiceAssistantFAB';
import VoiceAssistantModal from './VoiceAssistantModal';
import { 
  isSpeechRecognitionSupported, 
  createSpeechRecognition, 
  populateActiveInputField,
  simulateSpeechRecognition 
} from '../../services/speechRecognitionService';

export default function VoiceAssistant({ lang = 'en', t }) {
  const [isOpen, setIsOpen] = useState(false);
  const [voiceLang, setVoiceLang] = useState(lang === 'ta' ? 'ta' : 'en');
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [autoInsert, setAutoInsert] = useState(true);
  const [activeTargetInfo, setActiveTargetInfo] = useState(null);
  const [isSupported, setIsSupported] = useState(true);

  // References
  const recognitionRef = useRef(null);
  const lastFocusedInputRef = useRef(null);
  const cancelSimulationRef = useRef(null);
  const autoInsertRef = useRef(autoInsert);
  autoInsertRef.current = autoInsert;

  // Sync default voiceLang when top navbar language changes, if modal is closed
  useEffect(() => {
    if (!isOpen) {
      setVoiceLang(lang === 'ta' ? 'ta' : 'en');
    }
  }, [lang, isOpen]);

  // Check browser speech recognition support
  useEffect(() => {
    const supported = isSpeechRecognitionSupported();
    setIsSupported(supported);
  }, []);

  // Track focused/clicked input elements across the entire application
  useEffect(() => {
    const handleFocusIn = (e) => {
      const target = e.target;
      if (
        target &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') &&
        !target.closest('#voice-assistant-modal') &&
        !target.disabled &&
        !target.readOnly
      ) {
        lastFocusedInputRef.current = target;
        
        // Find best human-readable label
        let label = target.placeholder || target.name || target.id;
        const associatedLabel = target.id ? document.querySelector(`label[for="${target.id}"]`) : null;
        if (associatedLabel && associatedLabel.textContent) {
          label = associatedLabel.textContent.trim();
        } else {
          // Check closest parent label
          const parentLabel = target.closest('label');
          if (parentLabel && parentLabel.textContent) {
            label = parentLabel.textContent.trim();
          }
        }

        setActiveTargetInfo({
          element: target,
          label: label || 'Text Input Field',
          placeholder: target.placeholder || '',
          type: target.type || 'text',
          currentValue: target.value || ''
        });
      }
    };

    document.addEventListener('focusin', handleFocusIn, true);

    // Initial check for any visible text input if none focused
    if (!lastFocusedInputRef.current) {
      const initialInput = document.querySelector('main input:not([type="hidden"]), header input:not([type="hidden"])');
      if (initialInput) {
        lastFocusedInputRef.current = initialInput;
        setActiveTargetInfo({
          element: initialInput,
          label: initialInput.placeholder || 'Page Input',
          placeholder: initialInput.placeholder || '',
          type: initialInput.type || 'text',
          currentValue: initialInput.value || ''
        });
      }
    }

    return () => {
      document.removeEventListener('focusin', handleFocusIn, true);
    };
  }, []);

  /**
   * Placeholder JavaScript function using the native Web Speech API (SpeechRecognition)
   * to capture audio, convert it to text, and populate the active input field on the screen.
   */
  const handlePopulateActiveInput = useCallback((textToInsert) => {
    if (!textToInsert) return false;
    const populatedElement = populateActiveInputField(textToInsert, lastFocusedInputRef.current, 'replace');
    if (populatedElement) {
      lastFocusedInputRef.current = populatedElement;
      setActiveTargetInfo(prev => ({
        ...prev,
        currentValue: populatedElement.value
      }));
      return true;
    }
    return false;
  }, []);

  // Stop active speech recognition
  const stopListening = useCallback(() => {
    if (cancelSimulationRef.current) {
      cancelSimulationRef.current();
      cancelSimulationRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // Ignore abort error
      }
      recognitionRef.current = null;
    }
    setIsListening(false);
    setInterimTranscript('');
  }, []);

  // Start speech recognition
  const startListening = useCallback((selectedLang = voiceLang) => {
    stopListening();

    if (!isSpeechRecognitionSupported()) {
      // Fallback to simulation if speech recognition is not supported in environment
      setIsListening(true);
      const fallbackPhrase = selectedLang === 'ta' 
        ? 'கல்லுப்பட்டி கிராமம், மதுரை' 
        : 'Kallupatti Village, Madurai';
      
      cancelSimulationRef.current = simulateSpeechRecognition(fallbackPhrase, {
        onStart: () => setIsListening(true),
        onInterim: (text) => setInterimTranscript(text),
        onFinal: (finalText) => {
          setTranscript(prev => (prev ? `${prev} ${finalText}` : finalText).trim());
          setInterimTranscript('');
          if (autoInsertRef.current) {
            handlePopulateActiveInput(finalText);
          }
        },
        onEnd: () => {
          setIsListening(false);
          cancelSimulationRef.current = null;
        }
      });
      return;
    }

    try {
      const recognition = createSpeechRecognition({
        lang: selectedLang,
        continuous: true,
        interimResults: true,
        onStart: () => {
          setIsListening(true);
        },
        onResult: ({ finalTranscript: finalWord, interimTranscript: interimWord }) => {
          if (interimWord) {
            setInterimTranscript(interimWord);
          }

          if (finalWord) {
            setTranscript(prev => {
              const updated = prev ? `${prev} ${finalWord}` : finalWord;
              return updated;
            });
            setInterimTranscript('');

            // Automatically populate active input field on screen
            if (autoInsertRef.current) {
              handlePopulateActiveInput(finalWord);
            }
          }
        },
        onError: (err) => {
          console.warn('[GramBiz Voice] Recognition error event:', err);
          if (err.error === 'not-allowed' || err.error === 'service-not-allowed') {
            setIsListening(false);
          }
        },
        onEnd: () => {
          setIsListening(false);
        }
      });

      if (recognition) {
        recognitionRef.current = recognition;
        recognition.start();
      }
    } catch (err) {
      console.error('[GramBiz Voice] Failed to start native SpeechRecognition:', err);
      setIsListening(false);
    }
  }, [voiceLang, stopListening, handlePopulateActiveInput]);

  // Toggle listening state
  const handleToggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening(voiceLang);
    }
  }, [isListening, stopListening, startListening, voiceLang]);

  // Toggle Voice Recognition Language (English vs Tamil)
  const handleToggleVoiceLang = useCallback((newLang) => {
    setVoiceLang(newLang);
    if (isListening) {
      // Restart recognition with newly selected language
      stopListening();
      setTimeout(() => {
        startListening(newLang);
      }, 150);
    }
  }, [isListening, stopListening, startListening]);

  // Handle FAB click
  const handleToggleOpen = useCallback(() => {
    setIsOpen(prev => {
      const nextState = !prev;
      if (nextState && !isListening) {
        // Automatically start listening when opened for frictionless experience
        setTimeout(() => {
          startListening(voiceLang);
        }, 200);
      } else if (!nextState && isListening) {
        stopListening();
      }
      return nextState;
    });
  }, [isListening, startListening, stopListening, voiceLang]);

  // Simulate a specific phrase (used by demo chips)
  const handleSimulatePhrase = useCallback((phrase) => {
    stopListening();
    setIsListening(true);
    setInterimTranscript('');

    cancelSimulationRef.current = simulateSpeechRecognition(phrase, {
      delayMs: 140,
      onStart: () => setIsListening(true),
      onInterim: (text) => setInterimTranscript(text),
      onFinal: (finalText) => {
        setTranscript(prev => (prev ? `${prev} ${finalText}` : finalText).trim());
        setInterimTranscript('');
        handlePopulateActiveInput(finalText);
      },
      onEnd: () => {
        setIsListening(false);
        cancelSimulationRef.current = null;
      }
    });
  }, [stopListening, handlePopulateActiveInput]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [stopListening]);

  return (
    <>
      {/* Floating Action Button (FAB) persistent in bottom-right */}
      <VoiceAssistantFAB
        isOpen={isOpen}
        isListening={isListening}
        onToggleOpen={handleToggleOpen}
        voiceLang={voiceLang}
        t={t}
      />

      {/* Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          stopListening();
        }}
        isListening={isListening}
        onToggleListening={handleToggleListening}
        voiceLang={voiceLang}
        onToggleVoiceLang={handleToggleVoiceLang}
        transcript={transcript}
        interimTranscript={interimTranscript}
        onClearTranscript={() => {
          setTranscript('');
          setInterimTranscript('');
        }}
        onInsertToInput={handlePopulateActiveInput}
        activeTargetInfo={activeTargetInfo}
        autoInsert={autoInsert}
        onToggleAutoInsert={setAutoInsert}
        onSimulatePhrase={handleSimulatePhrase}
        t={t}
        isSupported={isSupported}
      />
    </>
  );
}
