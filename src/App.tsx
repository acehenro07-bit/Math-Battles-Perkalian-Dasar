import { useEffect, useState, useCallback } from 'react';
import { GameMenu } from './components/GameMenu';
import { PreGameSetup } from './components/PreGameSetup';
import { SinglePlayer } from './components/SinglePlayer';
import { PvP } from './components/PvP';
import { ResultScreen } from './components/ResultScreen';
import { saveHighScore } from './utils/highScores';
import { supabase } from './lib/supabase';

export type GameMode = 'menu' | 'setup_single' | 'setup_pvp' | 'single' | 'pvp' | 'result_single' | 'result_pvp';

export default function App() {
  const [mode, setMode] = useState<GameMode>('menu');
  const [scores, setScores] = useState<{ p1: number; p2?: number }>({ p1: 0 });
  const [playerNames, setPlayerNames] = useState<{ p1: string; p2: string }>({ p1: 'Siswa 1', p2: 'Siswa 2' });
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  // Diagnostik Koneksi
  useEffect(() => {
    const checkConn = async () => {
      try {
        const { error } = await supabase.from('high_scores').select('count', { count: 'exact', head: true });
        if (error) throw error;
        setDbStatus('connected');
        console.log('DIAGNOSTIK SUPABASE BERHASIL: Terhubung ke database.');
      } catch (err) {
        setDbStatus('error');
        console.error('DIAGNOSTIK SUPABASE GAGAL:', err);
      }
    };
    checkConn();
  }, []);

  const handleFinishSingle = useCallback(async (score: number) => {
    setScores({ p1: score });
    setMode('result_single'); // Pindah mode dulu agar komponen SinglePlayer unmount
    await saveHighScore(playerNames.p1, score);
  }, [playerNames.p1]);

  const handleFinishPvP = useCallback(async (p1: number, p2: number) => {
    setScores({ p1, p2 });
    setMode('result_pvp'); // Pindah mode dulu agar komponen PvP unmount
    await Promise.all([
      saveHighScore(playerNames.p1, p1),
      saveHighScore(playerNames.p2, p2)
    ]);
  }, [playerNames.p1, playerNames.p2]);

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
      
      {/* Visual Debugger (Hanya muncul jika ada error) */}
      {dbStatus === 'error' && mode === 'menu' && (
        <div className="fixed bottom-4 left-4 bg-red-100 border border-red-200 text-red-700 px-3 py-2 rounded-md text-xs shadow-lg animate-pulse z-50">
          ⚠️ Database Offline: Cek VITE_SUPABASE_URL di Secrets AI Studio.
        </div>
      )}
      {dbStatus === 'connected' && mode === 'menu' && (
        <div className="fixed bottom-4 left-4 bg-green-100 border border-green-200 text-green-700 px-3 py-1 rounded-full text-[10px] shadow-sm z-50">
          ● Database Online
        </div>
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
