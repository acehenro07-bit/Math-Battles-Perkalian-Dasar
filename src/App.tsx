import { useState } from 'react';
import { GameMenu } from './components/GameMenu';
import { PreGameSetup } from './components/PreGameSetup';
import { SinglePlayer } from './components/SinglePlayer';
import { PvP } from './components/PvP';
import { ResultScreen } from './components/ResultScreen';
import { saveHighScore } from './utils/highScores';

export type GameMode = 'menu' | 'setup_single' | 'setup_pvp' | 'single' | 'pvp' | 'result_single' | 'result_pvp';

export default function App() {
  const [mode, setMode] = useState<GameMode>('menu');
  const [scores, setScores] = useState<{ p1: number; p2?: number }>({ p1: 0 });
  const [playerNames, setPlayerNames] = useState<{ p1: string; p2: string }>({ p1: 'Siswa 1', p2: 'Siswa 2' });

  const handleFinishSingle = (score: number) => {
    setScores({ p1: score });
    saveHighScore(playerNames.p1, score);
    setMode('result_single');
  };

  const handleFinishPvP = (p1: number, p2: number) => {
    setScores({ p1, p2 });
    saveHighScore(playerNames.p1, p1);
    saveHighScore(playerNames.p2, p2);
    setMode('result_pvp');
  };

  const handleStartGame = (names: { p1: string; p2: string }) => {
    setPlayerNames(names);
    if (mode === 'setup_single') setMode('single');
    else if (mode === 'setup_pvp') setMode('pvp');
  };

  return (
    <main className="h-[100dvh] w-full font-sans bg-slate-50 flex items-center justify-center text-slate-900 border border-slate-200">
      {mode === 'menu' && (
        <GameMenu onSelectMode={(m) => setMode(m === 'single' ? 'setup_single' : 'setup_pvp')} />
      )}
      {(mode === 'setup_single' || mode === 'setup_pvp') && (
        <PreGameSetup mode={mode} onStart={handleStartGame} onBack={() => setMode('menu')} />
      )}
      {mode === 'single' && (
        <SinglePlayer playerName={playerNames.p1} onFinish={handleFinishSingle} onExit={() => setMode('menu')} />
      )}
      {mode === 'pvp' && (
        <PvP playerNames={playerNames} onFinish={handleFinishPvP} onExit={() => setMode('menu')} />
      )}
      {(mode === 'result_single' || mode === 'result_pvp') && (
        <ResultScreen
          mode={mode === 'result_single' ? 'single' : 'pvp'}
          scores={scores}
          playerNames={playerNames}
          onPlayAgain={() => setMode(mode === 'result_single' ? 'single' : 'pvp')}
          onHome={() => setMode('menu')}
        />
      )}
    </main>
  );
}
