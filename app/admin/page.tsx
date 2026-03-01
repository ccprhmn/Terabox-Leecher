'use client';
import { Activity, Key, Database, ArrowUpRight } from 'lucide-react';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

// PERBAIKAN: Menambahkan data grafiknya
const dummyData =;

export default function AdminDashboard() {
  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold text-white mb-2">Ikhtisar Jaringan</h1>
      <p className="text-slate-400 mb-8">Pantau lalu lintas dan status lisensi API Xapiverse Anda.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium text-sm">Total Ekstraksi</h3>
            <Activity className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-3xl font-bold text-white">18,592</p>
          <p className="text-emerald-400 text-xs mt-2 flex items-center gap-1"><ArrowUpRight className="w-3 h-3"/> +12.5% minggu ini</p>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium text-sm">Status Kuota API</h3>
            <Key className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-white">Aman</p>
          <p className="text-slate-500 text-xs mt-2">Dibatasi 5 req/mnt (Redis)</p>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium text-sm">Bandwidth Dihemat</h3>
            <Database className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-3xl font-bold text-white">8.4 TB</p>
          <p className="text-slate-500 text-xs mt-2">Dialihkan via HTTP Redirect</p>
        </div>
      </div>

      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 h-96 flex flex-col">
        <h3 className="text-white font-semibold mb-6">Grafik Lalu Lintas Harian</h3>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dummyData}>
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '8px', color: '#fff' }} itemStyle={{ color: '#38bdf8' }} />
              <Line type="monotone" dataKey="traffic" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
