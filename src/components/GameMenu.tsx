import React, { useEffect, useState } from 'react';
import { User, Users, Trophy } from 'lucide-react';
import { getHighScores, HighScore } from '../utils/highScores';

interface GameMenuProps {
  onSelectMode: (mode: 'single' | 'pvp') => void;
}

export function GameMenu({ onSelectMode }: GameMenuProps) {
  const [highScores, setHighScores] = useState<HighScore[]>([]);

  useEffect(() => {
    setHighScores(getHighScores());
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:items-start h-full w-full max-w-[1440px] border-x border-slate-200 mx-auto p-6 md:p-12 bg-slate-50 gap-8 lg:gap-16 overflow-y-auto">
      {/* Left side: Main Menu */}
      <div className="flex-1 w-full max-w-md flex flex-col justify-center translate-y-0 md:translate-y-8">
        <div className="text-center md:text-left mb-12 space-y-4">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-4xl mb-6 shadow-xl shadow-indigo-600/20 mx-auto md:mx-0">×</div>
          <h1 className="text-4xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">PERKALIAN DASAR</h1>
          <p className="text-lg lg:text-xl text-slate-400 font-bold tracking-widest uppercase">Latih Kecepatanmu</p>
        </div>

        <div className="flex flex-col gap-6 w-full">
          <button
            onClick={() => onSelectMode('single')}
            className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-white rounded-3xl border-2 border-slate-200 hover:border-indigo-300 hover:shadow-xl active:scale-95 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-slate-50 text-indigo-600 rounded-2xl border-2 border-slate-100 group-hover:bg-indigo-50 transition-colors">
                <User size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-800">Single Player</h2>
                <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Bermain Sendiri</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onSelectMode('pvp')}
            className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-white rounded-3xl border-2 border-slate-200 hover:border-rose-300 hover:shadow-xl active:scale-95 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-slate-50 text-rose-600 rounded-2xl border-2 border-slate-100 group-hover:bg-rose-50 transition-colors">
                <Users size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-800">P vs P Mode</h2>
                <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Lawan Temanmu</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Right side: High Scores */}
      <div className="flex-1 w-full max-w-md bg-white rounded-3xl shadow-xl border-2 border-slate-200 p-6 flex flex-col h-[500px] md:h-auto md:max-h-[80vh]">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <Trophy className="text-amber-500" size={24} />
          <h2 className="text-lg font-black text-slate-800 uppercase tracking-widest">Top 10 Score</h2>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-3">
          {highScores.length === 0 ? (
            <div className="text-center text-slate-400 text-sm font-medium py-10">
              Belum ada skor yang tersimpan. Mainkan sekarang!
            </div>
          ) : (
            highScores.map((hs, i) => (
              <div key={`${hs.name}-${hs.date}-${i}`} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100/50 hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${i === 0 ? 'bg-amber-100 text-amber-600' : i === 1 ? 'bg-slate-200 text-slate-600' : i === 2 ? 'bg-amber-900/10 text-amber-900' : 'bg-white text-slate-400 border-2 border-slate-100'}`}>
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{hs.name}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{hs.tier}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-indigo-600">{hs.score}</p>
                  <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Benar</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
