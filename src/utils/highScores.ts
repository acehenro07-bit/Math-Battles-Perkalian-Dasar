import { getTier } from './tiers';
import { supabase } from '../lib/supabase';

export interface HighScore {
  name: string;
  score: number;
  tier: string;
  date: string; // Changed from number to string for Supabase compatibility (ISO date)
}

export async function getHighScores(): Promise<HighScore[]> {
  try {
    const { data, error } = await supabase
      .from('high_scores')
      .select('*')
      .order('score', { ascending: false })
      .limit(10);

    if (error) {
      console.error('SUPABASE_FETCH_ERROR:', error.message, error.details, error.hint);
      return [];
    }
    
    return data || [];
  } catch (e) {
    console.error('Sudah Cek Secrets?:', e);
    return [];
  }
}

export async function saveHighScore(name: string, score: number) {
  if (!name.trim()) return;
  const tier = getTier(score).title;
  
  const newScore = {
    name: name.trim(),
    score,
    tier,
    date: new Date().toISOString(),
  };

  try {
    const { error, data } = await supabase
      .from('high_scores')
      .insert([newScore])
      .select();
    
    if (error) {
      console.error('Supabase INSERT Error Detail:', error);
      throw error;
    }
    console.log('Score saved successfully to Supabase:', data);
  } catch (e) {
    console.error('Failed to save high score to Supabase:', e);
    
    // Fallback tetap ke local storage jika database gagal
    try {
      const localKey = 'math_battles_pending_scores';
      const pending = JSON.parse(localStorage.getItem(localKey) || '[]');
      pending.push(newScore);
      localStorage.setItem(localKey, JSON.stringify(pending.slice(-10)));
    } catch (err) {
      console.error('Failed to save fallback score', err);
    }
  }
}
