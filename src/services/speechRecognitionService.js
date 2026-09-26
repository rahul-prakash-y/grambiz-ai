/**
 * Speech Recognition Service for GramBiz AI
 * Utilizes the native Web Speech API (SpeechRecognition / webkitSpeechRecognition)
 * to capture audio, convert it to text, and populate the active input field on screen.
 */

// Check if native Web Speech API is supported
export function isSpeechRecognitionSupported() {
  if (typeof window === 'undefined') return false;
  return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
}

// Get the SpeechRecognition constructor
export function getSpeechRecognitionConstructor() {
  if (typeof window === 'undefined') return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

/**
 * Normalizes voice recognition language code
 * English: 'en-IN' (or 'en-US')
 * Tamil: 'ta-IN' (Tamil - India)
 */
export function getSpeechLangCode(lang) {
  if (lang === 'ta' || lang === 'ta-IN') return 'ta-IN';
  return 'en-IN';
}

/**
 * Creates and initializes a native SpeechRecognition instance
 */
export function createSpeechRecognition({
  lang = 'en',
  continuous = true,
  interimResults = true,
  onStart,
  onResult,
  onError,
  onEnd
}) {
  const SpeechRecognitionConstructor = getSpeechRecognitionConstructor();
  if (!SpeechRecognitionConstructor) {
    console.warn('[GramBiz Voice] Web Speech API is not supported in this browser.');
    return null;
  }

  try {
    const recognition = new SpeechRecognitionConstructor();
    recognition.continuous = continuous;
    recognition.interimResults = interimResults;
    recognition.maxAlternatives = 1;
    recognition.lang = getSpeechLangCode(lang);

    if (onStart) recognition.onstart = onStart;

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcriptSegment = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptSegment;
        } else {
          interimTranscript += transcriptSegment;
        }
      }

      if (onResult) {
        onResult({
          finalTranscript: finalTranscript.trim(),
          interimTranscript: interimTranscript.trim(),
          rawEvent: event
        });
      }
    };

    if (onError) {
      recognition.onerror = (event) => {
        console.warn('[GramBiz Voice] Recognition error:', event.error, event);
        onError(event);
      };
    }

    if (onEnd) recognition.onend = onEnd;

    return recognition;
  } catch (err) {
    console.error('[GramBiz Voice] Failed to create SpeechRecognition:', err);
    return null;
  }
}

/**
 * Extracts or cleans numbers from speech if the target is a numeric field
 * e.g., "500000", "2.5 lakh", "50 ஆயிரம்"
 */
export function parseSpokenNumber(text) {
  if (!text) return '';
  const clean = text.toLowerCase().trim();

  // Handle common Indian terminology
  let multiplier = 1;
  if (clean.includes('crore') || clean.includes('கோடி')) {
    multiplier = 10000000;
  } else if (clean.includes('lakh') || clean.includes('லட்சம்')) {
    multiplier = 100000;
  } else if (clean.includes('thousand') || clean.includes('ஆயிரம்')) {
    multiplier = 1000;
  }

  // Extract digits or float
  const numericMatch = clean.match(/[\d,.]+/);
  if (numericMatch) {
    const num = parseFloat(numericMatch[0].replace(/,/g, ''));
    if (!isNaN(num)) {
      return String(Math.round(num * multiplier));
    }
  }

  // Fallback: extract any digits
  const digitsOnly = clean.replace(/[^\d]/g, '');
  return digitsOnly;
}

/**
 * Finds the currently active or most relevant input field on the screen
 */
export function getActiveInputField(preferredElement = null) {
  if (preferredElement && document.contains(preferredElement)) {
    return preferredElement;
  }

  const active = document.activeElement;
  if (
    active &&
    (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA') &&
    !active.closest('#voice-assistant-modal') &&
    !active.disabled &&
    !active.readOnly
  ) {
    return active;
  }

  // Search for any visible primary input field in the main view or header
  const visibleInputs = Array.from(
    document.querySelectorAll(
      'main input:not([type="hidden"]):not([disabled]):not([readonly]), header input:not([type="hidden"]):not([disabled])'
    )
  );

  return visibleInputs[0] || null;
}

/**
 * Native placeholder function using the native Web Speech API to capture audio,
 * convert it to text, and populate the active input field on the screen.
 * 
 * Works seamlessly with React's controlled inputs by using native property descriptor setters
 * and dispatching bubbling 'input' and 'change' events.
 *
 * @param {string} text Transcribed text to populate
 * @param {HTMLElement|null} targetElement Specific element or null for active element
 * @param {'replace'|'append'} mode Whether to overwrite or append
 * @returns {HTMLElement|null} The element populated, or null if none found
 */
export function populateActiveInputField(text, targetElement = null, mode = 'replace') {
  if (!text) return null;

  const target = getActiveInputField(targetElement);
  if (!target) {
    console.warn('[GramBiz Voice] No active or visible input field found on screen to populate.');
    return null;
  }

  try {
    // If target is a number input, convert to numeric representation
    let valueToInsert = text;
    if (target.type === 'number') {
      const parsedNum = parseSpokenNumber(text);
      if (parsedNum) {
        valueToInsert = parsedNum;
      }
    }

    const finalValue =
      mode === 'append' && target.value
        ? `${target.value} ${valueToInsert}`.trim()
        : valueToInsert;

    // React overrides the value setter on HTMLInputElement/HTMLTextAreaElement.
    // To trigger React's synthetic onChange event handler, we must call the native setter.
    const prototype = Object.getPrototypeOf(target);
    const nativeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set;

    if (nativeValueSetter) {
      nativeValueSetter.call(target, finalValue);
    } else {
      target.value = finalValue;
    }

    // Dispatch events to notify React state handlers
    target.dispatchEvent(new Event('input', { bubbles: true }));
    target.dispatchEvent(new Event('change', { bubbles: true }));

    // Focus target element
    try {
      target.focus();
    } catch {
      // Ignore if focus is not permitted
    }

    // Add brief visual feedback ring on the target element
    target.classList.add(
      'ring-4',
      'ring-emerald-500/70',
      'border-emerald-600',
      'transition-all',
      'duration-300'
    );
    setTimeout(() => {
      target.classList.remove(
        'ring-4',
        'ring-emerald-500/70',
        'border-emerald-600'
      );
    }, 1200);

    return target;
  } catch (err) {
    console.error('[GramBiz Voice] Error populating active input field:', err);
    return null;
  }
}

/**
 * Simulates speech recognition for environments without active microphones
 * or for interactive demo prompts. Streams words with realistic pacing.
 */
export function simulateSpeechRecognition(
  phrase,
  { onInterim, onFinal, onStart, onEnd, delayMs = 120 }
) {
  if (onStart) onStart();

  const words = phrase.split(' ');
  let current = '';
  let index = 0;

  const interval = setInterval(() => {
    if (index < words.length) {
      current += (index === 0 ? '' : ' ') + words[index];
      if (onInterim) onInterim(current);
      index++;
    } else {
      clearInterval(interval);
      if (onFinal) onFinal(phrase);
      if (onEnd) onEnd();
    }
  }, delayMs);

  return () => clearInterval(interval);
}
