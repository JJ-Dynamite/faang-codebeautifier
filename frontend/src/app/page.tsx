'use client';

import { useState } from 'react';

export default function Home() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [indentSize, setIndentSize] = useState(2);

  const languages = ['javascript', 'typescript', 'python', 'rust', 'go', 'java', 'cpp', 'csharp'];

  const sampleCode = `function hello(){console.log("Hello World");if(true){return 1;}else{return 0;}}`;

  const handleFormat = async () => {
    if (!code) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/format', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language, indent_size: indentSize }),
      });
      const data = await res.json();
      if (data.success) setResult(data.data);
    } catch (error) {
      console.error('Format failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="text-5xl">✨</span>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Code Beautifier
            </h1>
          </div>
          <p className="text-gray-300 text-lg">Cleanly format any code instantly</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-2xl mb-8">
          <div className="flex gap-4 mb-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-purple-500"
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
            <select
              value={indentSize}
              onChange={(e) => setIndentSize(Number(e.target.value))}
              className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-purple-500"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={8}>8 spaces</option>
            </select>
            <button
              onClick={() => setCode(sampleCode)}
              className="px-4 py-3 bg-slate-600 hover:bg-slate-500 rounded-xl transition-colors"
            >
              Load Sample
            </button>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your messy code here..."
            className="w-full h-48 px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 font-mono text-sm resize-none"
          />

          <button
            onClick={handleFormat}
            disabled={!code || loading}
            className="mt-4 w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl font-semibold transition-all disabled:opacity-50"
          >
            {loading ? 'Formatting...' : '✨ Beautify Code'}
          </button>
        </div>

        {result && (
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-purple-400">Original</h3>
                <span className="text-sm text-gray-400">{result.line_count} lines</span>
              </div>
              <pre className="bg-slate-900 rounded-xl p-4 text-sm text-gray-300 overflow-x-auto h-64">
                <code>{result.original}</code>
              </pre>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-green-400">Formatted</h3>
                <button
                  onClick={() => navigator.clipboard.writeText(result.formatted)}
                  className="text-xs text-purple-400 hover:text-purple-300"
                >
                  📋 Copy
                </button>
              </div>
              <pre className="bg-slate-900 rounded-xl p-4 text-sm text-gray-300 overflow-x-auto h-64">
                <code>{result.formatted}</code>
              </pre>
            </div>
          </div>
        )}

        <div className="mt-8 grid grid-cols-4 gap-4">
          <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700 text-center">
            <div className="text-2xl mb-2">⚡</div>
            <h4 className="font-semibold text-sm">Instant</h4>
            <p className="text-gray-400 text-xs">Real-time formatting</p>
          </div>
          <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700 text-center">
            <div className="text-2xl mb-2">🎯</div>
            <h4 className="font-semibold text-sm">Accurate</h4>
            <p className="text-gray-400 text-xs">AST-based parsing</p>
          </div>
          <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700 text-center">
            <div className="text-2xl mb-2">🌍</div>
            <h4 className="font-semibold text-sm">50+ Languages</h4>
            <p className="text-gray-400 text-xs">Universal support</p>
          </div>
          <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700 text-center">
            <div className="text-2xl mb-2">🔧</div>
            <h4 className="font-semibold text-sm">Configurable</h4>
            <p className="text-gray-400 text-xs">Custom rules</p>
          </div>
        </div>
      </div>
    </main>
  );
}
