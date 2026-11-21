import React, { useCallback, useEffect, useState } from 'react';
import { Pause, Play, Square, Volume2 } from 'lucide-react';
import {
  NarratorStatus,
  pickIndonesianVoice,
  sanitizeForIndonesianSpeech,
} from '../utils/narratorText';

export function useNarrator() {
  const [status, setStatus] = useState<NarratorStatus>('idle');
  const [activeLabel, setActiveLabel] = useState<string>('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const isSupported =
    typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    if (!isSupported) return;
    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      window.speechSynthesis.cancel();
    };
  }, [isSupported]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setStatus('idle');
    setActiveLabel('');
  }, [isSupported]);

  const speak = useCallback(
    (rawText: string, label = 'Narator') => {
      if (!isSupported) return;
      window.speechSynthesis.cancel();
      const spoken = sanitizeForIndonesianSpeech(rawText);
      const utterance = new SpeechSynthesisUtterance(spoken);
      const chosen = pickIndonesianVoice(voices);
      if (chosen) {
        utterance.voice = chosen;
        utterance.lang = chosen.lang || 'id-ID';
      } else {
        utterance.lang = 'id-ID';
      }
      utterance.rate = 0.98;
      utterance.pitch = 1.02;

      utterance.onstart = () => {
        setStatus('speaking');
        setActiveLabel(label);
      };
      utterance.onend = () => {
        setStatus('idle');
        setActiveLabel('');
      };
      utterance.onerror = () => {
        setStatus('idle');
        setActiveLabel('');
      };

      setStatus('speaking');
      setActiveLabel(label);
      window.speechSynthesis.speak(utterance);
    },
    [isSupported, voices]
  );

  const pause = useCallback(() => {
    if (!isSupported || status !== 'speaking') return;
    window.speechSynthesis.pause();
    setStatus('paused');
  }, [isSupported, status]);

  const resume = useCallback(() => {
    if (!isSupported || status !== 'paused') return;
    window.speechSynthesis.resume();
    setStatus('speaking');
  }, [isSupported, status]);

  return {
    isSupported,
    status,
    activeLabel,
    speak,
    pause,
    resume,
    stop,
  };
}

export interface NarratorAction {
  id: string;
  buttonLabel: string;
  text: string;
}

interface NarratorBarProps {
  title?: string;
  actions: NarratorAction[];
  narrator: ReturnType<typeof useNarrator>;
}

export const NarratorBar: React.FC<NarratorBarProps> = ({
  title = 'Narator Suara Mister Jo',
  actions,
  narrator,
}) => {
  const { isSupported, status, activeLabel, speak, pause, resume, stop } = narrator;

  return (
    <div className="rounded-xl border border-[#E9DDD1] bg-[#F4EEE7]/85 p-3.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-[#5B3828]" aria-hidden="true" />
          <span className="text-xs font-semibold text-[#3B261E]">{title}</span>
          {status !== 'idle' && (
            <span className="text-xs text-[#80563F]">
              · {status === 'speaking' ? `Membacakan: ${activeLabel}` : `Dijeda: ${activeLabel}`}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {status === 'speaking' && (
            <button
              type="button"
              onClick={pause}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#C49A62] bg-[#FFFDF9] px-3 py-1.5 text-xs font-semibold text-[#5B3828] transition-colors hover:bg-[#E9DDD1] whitespace-nowrap shrink-0"
            >
              <Pause className="h-3.5 w-3.5" aria-hidden="true" />
              PAUSE
            </button>
          )}
          {status === 'paused' && (
            <button
              type="button"
              onClick={resume}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#5B3828] px-3 py-1.5 text-xs font-semibold text-[#FFFDF9] transition-colors hover:bg-[#3B261E] whitespace-nowrap shrink-0"
            >
              <Play className="h-3.5 w-3.5" aria-hidden="true" />
              RESUME
            </button>
          )}
          {status !== 'idle' && (
            <button
              type="button"
              onClick={stop}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#E9DDD1] bg-[#FFFDF9] px-3 py-1.5 text-xs font-semibold text-[#3B261E] transition-colors hover:bg-[#E9DDD1] whitespace-nowrap shrink-0"
            >
              <Square className="h-3 w-3" aria-hidden="true" />
              STOP
            </button>
          )}
        </div>
      </div>

      <div className="mt-2.5 flex flex-wrap gap-2">
        {actions.map((act) => {
          const isActive = status !== 'idle' && activeLabel === act.buttonLabel;
          return (
            <button
              key={act.id}
              type="button"
              disabled={!isSupported}
              onClick={() => speak(act.text, act.buttonLabel)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B3828] ${
                isActive
                  ? 'bg-[#5B3828] text-[#FFFDF9]'
                  : 'border border-[#E9DDD1] bg-[#FFFDF9] text-[#5B3828] hover:border-[#C49A62] hover:bg-[#E9DDD1]/55'
              } disabled:cursor-not-allowed disabled:opacity-50`}
            >
              <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
              {act.buttonLabel}
            </button>
          );
        })}
      </div>

      {!isSupported && (
        <p className="mt-2 text-xs text-[#80563F]">
          Browser ini tidak mendukung Web Speech API SpeechSynthesis untuk narasi suara.
        </p>
      )}
    </div>
  );
};
