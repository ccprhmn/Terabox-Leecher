import { LayoutDashboard, Users, Activity } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex">
      <aside className="w-64 border-r border-slate-800 bg-[#0f172a] p-6 hidden md:flex flex-col">
        <div className="text-2xl font-bold text-white mb-12 flex items-center gap-2">
          <Activity className="text-blue-500" /> Control<span className="text-blue-500">Panel</span>
        </div>
        <nav className="space-y-3 flex-1 text-sm font-medium">
          <a href="/admin" className="flex items-center gap-3 px-4 py-3 bg-blue-600/10 text-blue-400 rounded-xl">
            <LayoutDashboard className="w-5 h-5" /> Metrik Operasional
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 text-slate-400 rounded-xl transition-all">
            <Users className="w-5 h-5" /> Kelola Pengguna
          </a>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto bg-[#020617]">
        {children}
      </main>
    </div>
  );
}
