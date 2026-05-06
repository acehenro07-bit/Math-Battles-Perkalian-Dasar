import React from 'react';
import { RotateCcw, Trophy, Medal } from 'lucide-react';
import { getTier } from '../utils/tiers';

interface ResultScreenProps {
  mode: 'single' | 'pvp';
  scores: { p1: number; p2?: number };
  playerNames: { p1: string; p2: string };
  onPlayAgain: () => void;
  onHome: () => void;
}

export function ResultScreen({ mode, scores, playerNames, onPlayAgain, onHome }: ResultScreenProps) {
  
  if (mode === 'single') {
    const tier = getTier(scores.p1);
    
    return (
      <div className="flex flex-col justify-center items-center h-full w-full bg-slate-50 p-6 text-slate-900 border-x border-slate-200 max-w-[1024px] shadow-sm">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-10 max-w-md w-full text-center flex flex-col items-center">
          
          <h2 className="text-sm font-black tracking-widest text-slate-400 uppercase mb-8">Permainan Selesai</h2>
          
          <div className="mb-10 w-full">
            <p className="text-gray-500 font-medium mb-1">Skor Akhir</p>
            <p className="text-7xl font-mono font-black text-indigo-600 mb-8">{scores.p1}</p>
            
            <div className="p-4 border-2 border-slate-100 rounded-2xl bg-slate-50 flex flex-col items-center gap-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pangkat Diraih</p>
              <div className={`text-2xl font-black uppercase ${tier.color}`}>
                {tier.title}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full">
             <button
              onClick={onPlayAgain}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl active:scale-95 transition-all text-sm uppercase tracking-widest"
            >
              <RotateCcw size={18} /> Main Lagi
            </button>
            <button
              onClick={onHome}
              className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl active:scale-95 transition-all text-sm uppercase tracking-widest"
            >
              Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  // PVP Mode Result
  const isDraw = scores.p1 === scores.p2;
  const p1Wins = scores.p1 > (scores.p2 || 0);

  return (
    <div className="flex flex-col items-center h-full w-full bg-slate-50 p-6 text-slate-900 border-x border-slate-200 max-w-[1440px] shadow-sm overflow-y-auto">
      <div className="text-center mb-10 mt-10 w-full px-4">
        {isDraw ? (
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-400 drop-shadow-sm">
            SERI!
          </h1>
        ) : (
          <h1 className="text-5xl md:text-7xl font-black tracking-tight drop-shadow-sm flex flex-col items-center gap-4">
            <span className="text-lg tracking-widest text-slate-400 uppercase">Pemenang</span>
            <span className={p1Wins ? 'text-indigo-600' : 'text-rose-600'}>{p1Wins ? playerNames.p1 : playerNames.p2}</span>
          </h1>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-3xl justify-center items-stretch flex-1">
        {/* Player 1 Card */}
        <ResultCard playerName={playerNames.p1} score={scores.p1} isWinner={p1Wins && !isDraw} isDraw={isDraw} theme="indigo" />
        {/* Player 2 Card */}
        <ResultCard playerName={playerNames.p2} score={scores.p2 || 0} isWinner={!p1Wins && !isDraw} isDraw={isDraw} theme="rose" />
      </div>

      <div className="flex gap-4 mt-12 mb-10 w-full max-w-sm">
        <button
          onClick={onPlayAgain}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl active:scale-95 transition-all text-sm uppercase tracking-widest"
        >
          <RotateCcw size={18} /> Rematch
        </button>
        <button
          onClick={onHome}
          className="flex-1 px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl active:scale-95 transition-all text-sm uppercase tracking-widest"
        >
          Menu Utama
        </button>
      </div>
    </div>
  );
}

function ResultCard({ playerName, score, isWinner, isDraw, theme }: { playerName: string; score: number; isWinner: boolean; isDraw: boolean; theme: 'indigo' | 'rose' }) {
  const tier = getTier(score);
  const isP1 = theme === 'indigo';
  const borderColor = isWinner ? (isP1 ? 'border-indigo-400' : 'border-rose-400') : 'border-slate-200';
  const textColor = isP1 ? 'text-indigo-600' : 'text-rose-600';
  const labelColor = isP1 ? 'text-indigo-500' : 'text-rose-500';
  const bgColor = isWinner ? 'bg-white' : 'bg-slate-50';
  
  return (
    <div className={`rounded-3xl border-2 ${borderColor} ${bgColor} shadow-xl p-8 md:p-12 text-center w-full flex-1 relative flex flex-col justify-center items-center transition-all ${isWinner ? 'scale-105 z-10' : 'opacity-90'}`}>
      {isWinner && (
        <div className={`absolute -top-5 bg-white border-2 ${borderColor} ${textColor} px-6 py-2 rounded-full font-black tracking-widest text-[10px] flex items-center gap-2 uppercase shadow-sm`}>
          <Medal size={16} /> PEMENANG
        </div>
      )}
      <h3 className={`text-xs font-black uppercase tracking-widest ${labelColor} mb-2`}>{playerName}</h3>
      <p className={`text-7xl md:text-8xl font-mono font-black ${textColor} tracking-tighter mb-8`}>{score}</p>
      
      <div className="flex flex-col items-center gap-2 pt-6 w-full border-t border-slate-200">
        <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">Tier Diraih</p>
        <div className={`px-6 py-2 rounded-xl text-lg md:text-xl font-black ${tier.color}`}>
          {tier.title}
        </div>
      </div>
    </div>
  );
}
