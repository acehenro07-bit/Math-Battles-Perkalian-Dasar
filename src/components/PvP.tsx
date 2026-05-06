import React, { useState, useEffect } from 'react';
import { GameArea } from './GameArea';

interface PvPProps {
  playerNames: { p1: string; p2: string };
  onFinish: (score1: number, score2: number) => void;
  onExit?: () => void;
}

export function PvP({ playerNames, onFinish, onExit }: PvPProps) {
  const [p1State, setP1State] = useState<{ isOver: boolean; score: number }>({ isOver: false, score: 0 });
  const [p2State, setP2State] = useState<{ isOver: boolean; score: number }>({ isOver: false, score: 0 });

  useEffect(() => {
    if (p1State.isOver && p2State.isOver) {
      const timeout = setTimeout(() => {
        onFinish(p1State.score, p2State.score);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [p1State, p2State, onFinish]);

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 font-sans overflow-y-auto text-slate-900 border-x border-slate-200 max-w-[1440px] shadow-sm">
      {/* Global Header */}
      <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between shadow-sm shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg md:text-xl">×</div>
          <h1 className="text-lg md:text-xl font-bold tracking-tight hidden sm:block">PERKALIAN DASAR (1-10)</h1>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <button
            onClick={onExit}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-md text-sm font-semibold transition-colors">
            KELUAR
          </button>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 flex flex-col md:flex-row relative min-h-0">
        {/* Player 1 */}
        <div className="flex-1 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col relative bg-white/50">
          <GameArea 
            title={playerNames.p1} 
            themeColor="indigo" 
            onGameOver={(score) => setP1State({ isOver: true, score })} 
          />
          {p1State.isOver && !p2State.isOver && (
            <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center backdrop-blur-sm">
              <span className="text-slate-800 font-black text-xl text-center px-6 py-3 bg-white border-2 border-slate-200 shadow-xl rounded-2xl uppercase tracking-widest">Menunggu {playerNames.p2}...</span>
            </div>
          )}
        </div>

        {/* Player 2 */}
        <div className="flex-1 flex flex-col relative bg-slate-50">
          <GameArea 
            title={playerNames.p2} 
            themeColor="rose" 
            onGameOver={(score) => setP2State({ isOver: true, score })} 
          />
          {p2State.isOver && !p1State.isOver && (
            <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center backdrop-blur-sm">
              <span className="text-slate-800 font-black text-xl text-center px-6 py-3 bg-white border-2 border-slate-200 shadow-xl rounded-2xl uppercase tracking-widest">Menunggu {playerNames.p1}...</span>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Status Bar */}
      <footer className="h-12 bg-slate-900 flex items-center px-6 gap-4 shrink-0 text-slate-400 text-xs font-medium z-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          <span>Mode PvP Aktif</span>
        </div>
        <div className="hidden sm:block h-4 w-px bg-slate-700 mx-2"></div>
        <div className="flex-1 hidden sm:block">
          Berlomba cepat menjawab!
        </div>
      </footer>
    </div>
  );
}
