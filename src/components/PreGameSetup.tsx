import React, { useState } from 'react';
import { Play, ArrowLeft } from 'lucide-react';

interface PreGameSetupProps {
  mode: 'setup_single' | 'setup_pvp';
  onStart: (names: { p1: string; p2: string }) => void;
  onBack: () => void;
}

export function PreGameSetup({ mode, onStart, onBack }: PreGameSetupProps) {
  const isPvP = mode === 'setup_pvp';
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');

  const handleStart = () => {
    onStart({
      p1: p1.trim() || 'Siswa 1',
      p2: p2.trim() || 'Siswa 2'
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-full w-full max-w-[1024px] mx-auto p-6 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border-2 border-slate-200">
        <h2 className="text-2xl font-black text-slate-800 mb-6 text-center">
          {isPvP ? 'Masukkan Nama Pemain' : 'Masukkan Nama'}
        </h2>
        
        <div className="flex flex-col gap-4 mb-8">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              {isPvP ? 'Player 1' : 'Nama Kamu'}
            </label>
            <input
              type="text"
              value={p1}
              onChange={(e) => setP1(e.target.value)}
              placeholder="Contoh: Budi"
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none text-slate-800 font-bold"
              autoFocus
            />
          </div>

          {isPvP && (
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                Player 2
              </label>
              <input
                type="text"
                value={p2}
                onChange={(e) => setP2(e.target.value)}
                placeholder="Contoh: Ani"
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-rose-500 focus:outline-none text-slate-800 font-bold"
              />
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl active:scale-95 transition-all text-sm uppercase tracking-widest"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={handleStart}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl active:scale-95 transition-all text-sm uppercase tracking-widest"
          >
            <Play size={18} /> Mulai {isPvP ? 'Tanding' : 'Main'}
          </button>
        </div>
      </div>
    </div>
  );
}
