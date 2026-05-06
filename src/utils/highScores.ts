import { getTier } from './tiers';

export interface HighScore {
  name: string;
  score: number;
  tier: string;
  date: number;
}

const STORAGE_KEY = 'math_battles_high_scores';

export function getHighScores(): HighScore[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to load high scores', e);
  }
  return [];
}

export function saveHighScore(name: string, score: number) {
  if (!name.trim()) return;
  const tier = getTier(score).title;
  const newScore: HighScore = {
    name: name.trim(),
    score,
    tier,
    date: Date.now(),
  };

  const scores = getHighScores();
  scores.push(newScore);
  
  // Sort descending by score
  scores.sort((a, b) => b.score - a.score);
  
  // Keep only top 10
  const top10 = scores.slice(0, 10);
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(top10));
  } catch (e) {
    console.error('Failed to save high scores', e);
  }
}
