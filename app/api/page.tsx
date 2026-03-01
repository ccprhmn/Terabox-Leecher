'use client';
import { useState } from 'react';
import { DownloadCloud, Zap, FileBox, AlertCircle, ShieldCheck, Lock } from 'lucide-react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const = useState<any>(null);
  const [error, setError] = useState('');

  const handleExtract = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(''); setResult(null);

    try {
      const res = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error |

| 'Terjadi kesalahan sistem');
      setResult(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 font-sans">
      <div className="max-w-3xl mx-auto px-6 py-24 flex flex-col items-center">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex p-4 bg-blue-500/10 rounded-3xl mb-4 border border-blue-500/20">
            <DownloadCloud className="w-12 h-12 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            Tera<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Leecher</span>
          </h1>
          <p className="text-lg text-slate-400">Ekstrak tautan unduhan langsung tanpa batas.</p>
        </div>

        <form onSubmit={handleExtract} className="w-full space-y-4">
          <div className="relative group">
            <FileBox className="absolute left-5 top-5 h-6 w-6 text-slate-500" />
            <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Tautan TeraBox (https://terabox.com/s/...)" className="w-full bg-[#0f172a] border border-slate-800 text-white rounded-2xl pl-14 pr-6 py-5 focus:outline-none focus:border-blue-500 focus:ring-1 transition-all shadow-xl" required />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
             <div className="relative flex-1 group">
              <Lock className="absolute left-5 top-4 h-5 w-5 text-slate-500" />
              <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Extract Code (Bila ada)" className="w-full bg-[#0f172a] border border-slate-800 text-white rounded-2xl pl-14 pr-6 py-4 focus:outline-none focus:border-blue-500 focus:ring-1 transition-all shadow-xl" />
            </div>
            <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-semibold rounded-2xl px-10 py-4 transition-all flex items-center justify-center gap-2 shadow-xl">
              {loading? <span className="animate-pulse">Mengekstrak...</span> : <><Zap className="w-5 h-5" /> Ekstrak</>}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-8 w-full p-5 bg-red-950/50 border border-red-900/50 rounded-2xl flex items-center gap-3 text-red-400">
            <AlertCircle className="w-6 h-6 shrink-0" /> <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-10 w-full bg-[#0f172a] border border-slate-800 rounded-3xl p-8 shadow-2xl animate-in fade-in">
            <h3 className="text-xl font-bold text-white mb-2 truncate">{result.name}</h3>
            <p className="text-slate-400 mb-8">Ukuran: <span className="font-semibold text-slate-200">{result.size}</span></p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.fast_download && (
                <a href={`/api/download?url=${encodeURIComponent(result.fast_download)}`} className="flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold hover:opacity-90">
                  <Zap className="w-5 h-5" /> Unduh Cepat
                </a>
              )}
              {result.slow_download && (
                <a href={`/api/download?url=${encodeURIComponent(result.slow_download)}`} className="flex justify-center items-center gap-2 bg-slate-800 text-slate-300 hover:bg-slate-700 py-4 rounded-xl font-semibold">
                  <DownloadCloud className="w-5 h-5" /> Unduh Reguler
                </a>
              )}
            </div>
            <div className="mt-8 flex justify-between items-center text-xs text-slate-500 pt-6 border-t border-slate-800/50">
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Dialihkan Aman</span>
              <span>Sisa Kuota API: {result.credits_remaining}</span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
