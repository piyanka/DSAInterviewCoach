import { useState, useMemo, useEffect } from "react";
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

// optional: import languages you need
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-python";

type CodeBlockProps = {
  code: string;
  language?: string;
  fileName?: string;
};

export function CodeBlock({
  code,
  language = "javascript",
  fileName,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const MAX_LINES = 20;

  // Split lines (memoized)
  const lines = useMemo(() => code.split("\n"), [code]);

  const isLong = lines.length > MAX_LINES;
  const visibleLines = expanded ? lines : lines.slice(0, MAX_LINES);

  // Syntax highlight
  const highlighted = useMemo(() => {
    try {
      const lang = Prism.languages[language] || Prism.languages.javascript;
      return Prism.highlight(code, lang, language);
    } catch {
      return code;
    }
  }, [code, language]);

  useEffect(() => {
    Prism.highlightAll();
  }, [highlighted]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-700 bg-[#0f172a] shadow-lg">

      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-[#0f172a]/95 px-4 py-2 text-xs border-b border-slate-700 backdrop-blur">

        <div className="flex items-center gap-3">
          {/* Language Badge */}
          <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-300">
            {language}
          </span>

          {/* File Name */}
          {fileName && (
            <span className="text-slate-400 text-[11px] truncate max-w-[150px]">
              {fileName}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-slate-300 hover:bg-white/10 transition"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span className="hidden sm:inline">
              {copied ? "Copied" : "Copy"}
            </span>
          </button>
        </div>
      </div>

      {/* Code */}
      <div className="relative">
        <pre className="overflow-x-auto p-4 text-sm leading-6 text-slate-200">
          <code className={`language-${language} font-mono`}>
            {visibleLines.map((line, i) => (
              <div
                key={i}
                className="group/line flex gap-4 px-2 rounded-md hover:bg-white/5"
              >
                {/* Line Number */}
                <span className="select-none text-slate-500 w-10 text-right">
                  {i + 1}
                </span>

                {/* Code Line */}
                <span
                  className="flex-1 whitespace-pre"
                  dangerouslySetInnerHTML={{
                    __html:
                      Prism.highlight(
                        line || " ",
                        Prism.languages[language] ||
                          Prism.languages.javascript,
                        language
                      ) || line,
                  }}
                />
              </div>
            ))}
          </code>
        </pre>

        {/* Fade effect when collapsed */}
        {isLong && !expanded && (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0f172a] to-transparent" />
        )}
      </div>

      {/* Expand / Collapse */}
      {isLong && (
        <div className="flex justify-center border-t border-slate-700 bg-[#0f172a]">
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="flex items-center gap-1 px-4 py-2 text-xs text-slate-400 hover:text-white transition"
          >
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {expanded ? "Show Less" : `Show All (${lines.length} lines)`}
          </button>
        </div>
      )}
    </div>
  );
}