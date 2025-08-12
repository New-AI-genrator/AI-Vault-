// Type definitions for Web Speech API
declare namespace WebSpeech {
  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
    resultIndex: number;
    interpretation: any;
    emma: Document | null;
  }

  interface SpeechRecognitionResultList {
    length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
  }

  interface SpeechRecognitionResult {
    length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
    isFinal: boolean;
  }

  interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
  }

  interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: Event) => void;
    onend: () => void;
    start: () => void;
    stop: () => void;
    abort: () => void;
  }

  interface SpeechSynthesis extends EventTarget {
    speak(utterance: SpeechSynthesisUtterance): void;
    cancel(): void;
    getVoices(): SpeechSynthesisVoice[];
  }

  interface SpeechSynthesisUtterance extends EventTarget {
    new (text?: string): SpeechSynthesisUtterance;
    text: string;
    lang: string;
    voice: SpeechSynthesisVoice | null;
    volume: number;
    rate: number;
    pitch: number;
  }

  interface SpeechSynthesisVoice {
    voiceURI: string;
    name: string;
    lang: string;
    localService: boolean;
    default: boolean;
  }
}

declare global {
  interface Window {
    SpeechRecognition: {
      prototype: WebSpeech.SpeechRecognition;
      new(): WebSpeech.SpeechRecognition;
    };
    webkitSpeechRecognition: {
      prototype: WebSpeech.SpeechRecognition;
      new(): WebSpeech.SpeechRecognition;
    };
    speechSynthesis: WebSpeech.SpeechSynthesis;
  }

  var SpeechRecognition: {
    prototype: WebSpeech.SpeechRecognition;
    new(): WebSpeech.SpeechRecognition;
  };

  var webkitSpeechRecognition: {
    prototype: WebSpeech.SpeechRecognition;
    new(): WebSpeech.SpeechRecognition;
  };

  var speechSynthesis: WebSpeech.SpeechSynthesis;
}
