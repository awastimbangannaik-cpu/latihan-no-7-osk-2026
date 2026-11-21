import React, { useMemo } from 'react';
import katex from 'katex';

interface MathProps {
  latex: string;
  displayMode?: boolean;
  className?: string;
}

export const MathRender: React.FC<MathProps> = ({
  latex,
  displayMode = false,
  className = '',
}) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(latex, {
        displayMode,
        throwOnError: false,
        strict: false,
      });
    } catch {
      return latex;
    }
  }, [latex, displayMode]);

  if (displayMode) {
    return (
      <div
        className={`overflow-x-auto text-[#3B261E] ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={`inline-block align-baseline text-[#3B261E] ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

interface HighlightFormulaBoxProps {
  label?: string;
  latex: string;
  caption?: string;
  variant?: 'beige' | 'gold' | 'milk';
}

export const HighlightFormulaBox: React.FC<HighlightFormulaBoxProps> = ({
  label,
  latex,
  caption,
  variant = 'beige',
}) => {
  const palette =
    variant === 'gold'
      ? 'bg-[#FFFDF9] border-[#C49A62]'
      : variant === 'milk'
      ? 'bg-[#F4EEE7] border-[#E9DDD1]'
      : 'bg-[#E9DDD1]/65 border-[#C49A62]/45';

  return (
    <div className={`rounded-xl border px-5 py-4 ${palette}`}>
      {label && (
        <div className="mb-1.5 text-xs font-semibold tracking-wide text-[#5B3828]">
          {label}
        </div>
      )}
      <MathRender latex={latex} displayMode className="py-1 text-base sm:text-lg" />
      {caption && (
        <p className="mt-2 text-xs leading-relaxed text-[#5B3828]/85">{caption}</p>
      )}
    </div>
  );
};
