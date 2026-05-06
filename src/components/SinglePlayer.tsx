import React from 'react';
import { GameArea } from './GameArea';

interface SinglePlayerProps {
  playerName: string;
  onFinish: (score: number) => void;
  onExit?: () => void;
}

export function SinglePlayer({ playerName, onFinish, onExit }: SinglePlayerProps) {
  return (
    <div className="flex flex-col h-full w-full bg-slate-50 font-sans overflow-y-auto text-slate-900 border-x border-slate-200 max-w-[1024px] shadow-sm">
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
      <main className="flex-1 flex flex-col relative items-center justify-center p-2 md:p-4 min-h-0">
        <div className="w-full max-w-lg border border-slate-200 rounded-3xl overflow-hidden shadow-xl bg-white/50 flex flex-col flex-1 max-h-[800px]">
          <GameArea 
            title={playerName} 
            themeColor="indigo" 
            onGameOver={onFinish} 
          />
        </div>
      </main>
    </div>
  );
}
