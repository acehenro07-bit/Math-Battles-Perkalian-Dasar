import React, { useEffect } from 'react';
import { useGameEngine } from '../hooks/useGameEngine';
import { Keypad } from './Keypad';

interface GameAreaProps {
  title?: string;
  themeColor?: 'indigo' | 'rose' | 'blue' | 'red';
  onGameOver?: (score: number) => void;
  autoStart?: boolean;
}

export function GameArea({ title, themeColor = 'indigo', onGameOver, autoStart = true }: GameAreaProps) {
  const engine = useGameEngine();
  const {
    startGame,
    score,
    timeLeft,
    timeAllowed,
    question,
    input,
    appendInput,
    deleteInput,
    isOver,
    isActive,
  } = engine;

  useEffect(() => {
    if (autoStart) {
      startGame();
    }
  }, [autoStart, startGame]);

  const hasReportedGameOver = React.useRef(false);

  // Report game over to parent exactly once when it happens
  useEffect(() => {
    if (isOver && onGameOver && !hasReportedGameOver.current) {
      hasReportedGameOver.current = true;
      onGameOver(score);
    }
  }, [isOver, score, onGameOver]);

  const colorVariants = {
    indigo: {
      bg: 'bg-white/50',
      textColor: 'text-indigo-600',
      labelColor: 'text-indigo-600',
      borderColor: 'border-indigo-100',
      operatorColor: 'text-indigo-400',
      inputColor: 'text-indigo-600',
      barColor: 'bg-indigo-500',
      labelClass: 'Siswa 1',
    },
    rose: {
      bg: 'bg-slate-50',
      textColor: 'text-rose-600',
      labelColor: 'text-rose-600',
      borderColor: 'border-rose-100',
      operatorColor: 'text-rose-400',
      inputColor: 'text-rose-600',
      barColor: 'bg-rose-500',
      labelClass: 'Siswa 2',
    }
  };

  const themeConfig = colorVariants[themeColor as keyof typeof colorVariants] || 
                      (themeColor === 'red' ? colorVariants.rose : colorVariants.indigo);

  // Hitung persentase waktu
  const timerPercentage = Math.max(0, (timeLeft / timeAllowed) * 100);

  return (
    <section className={`flex-1 flex flex-col p-2 sm:p-4 md:p-6 w-full h-full min-h-0 ${themeConfig.bg}`}>
      {/* Header Info */}
      <div className="flex justify-between items-start mb-1 sm:mb-4 md:mb-6">
        <div>
          <h2 className={`font-black text-[10px] sm:text-xs uppercase tracking-widest ${themeConfig.labelColor}`}>{themeConfig.labelClass}</h2>
          <p className="text-base sm:text-xl md:text-3xl font-bold leading-tight">{title}</p>
        </div>
        <div className="text-right">
          <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Waktu: <span className={themeConfig.textColor}>{(timeLeft).toFixed(1)}s</span></p>
          <p className={`text-lg sm:text-2xl md:text-4xl font-black ${themeConfig.textColor} leading-tight`}>Skor: {score}</p>
        </div>
      </div>

      {/* Timer Bar */}
      <div className="w-full bg-slate-200 h-1 sm:h-2 rounded-full overflow-hidden mb-2 sm:mb-4 md:mb-6 opacity-70 shrink-0">
        <div 
          className={`h-full ${themeConfig.barColor} transition-all duration-100 ease-linear`}
          style={{ width: `${timerPercentage}%` }}
        />
      </div>

      {/* Play Area */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-0">
        {isOver ? (
          <div className="text-center">
            <h3 className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-800 mb-2 sm:mb-4 tracking-tight">Terakhir!</h3>
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-slate-500">Skor Akhirmu: {score}</p>
          </div>
        ) : (
          <>
            {/* Question Card */}
            <div className={`bg-white rounded-2xl md:rounded-3xl shadow-sm md:shadow-md border-2 ${themeConfig.borderColor} w-full max-w-[260px] md:max-w-[280px] p-4 flex flex-col items-center mb-4 md:mb-6 flex-shrink-0 min-h-0`}>
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-800 mb-2 sm:mb-3">
                {question.a} <span className={themeConfig.operatorColor}>×</span> {question.b}
              </div>
              <div className="w-full bg-slate-50 rounded-xl h-10 sm:h-12 md:h-16 flex items-center justify-center border-2 border-slate-100 flex-shrink-0">
                {input ? (
                    <span className={`text-xl sm:text-2xl md:text-3xl font-mono font-bold tracking-widest ${themeConfig.inputColor}`}>
                      {input}_
                    </span>
                  ) : (
                    <span className="text-xl sm:text-2xl md:text-3xl font-mono font-bold tracking-widest text-slate-300">
                      ??
                    </span>
                  )}
              </div>
            </div>

            {/* Keypad */}
            <Keypad 
              disabled={!isActive}
              onPress={appendInput}
              onDelete={deleteInput}
            />
          </>
        )}
      </div>
    </section>
  );
}
