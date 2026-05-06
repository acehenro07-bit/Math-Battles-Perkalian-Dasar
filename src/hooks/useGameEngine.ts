import { useState, useEffect, useCallback, useRef } from 'react';

const INITIAL_TIME = 10;
const MIN_TIME = 2; // Waktu minimal yang diberikan
const TIME_DECREMENT = 0.5; // Pengurangan waktu setiap kali benar

function generateQuestion() {
  return {
    a: Math.floor(Math.random() * 10) + 1,
    b: Math.floor(Math.random() * 10) + 1,
  };
}

export function useGameEngine() {
  const [score, setScore] = useState(0);
  const [timeAllowed, setTimeAllowed] = useState(INITIAL_TIME);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [question, setQuestion] = useState(generateQuestion());
  const [input, setInput] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isOver, setIsOver] = useState(false);

  const lastTimeRef = useRef<number>(Date.now());
  const animationFrameRef = useRef<number | null>(null);

  const endGame = useCallback(() => {
    setIsActive(false);
    setIsOver(true);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    setTimeAllowed(INITIAL_TIME);
    setTimeLeft(INITIAL_TIME);
    setQuestion(generateQuestion());
    setInput('');
    setIsActive(true);
    setIsOver(false);
    lastTimeRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const tick = () => {
      const now = Date.now();
      const dt = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      setTimeLeft((prev) => {
        const next = prev - dt;
        if (next <= 0) {
          endGame();
          return 0;
        }
        return next;
      });

      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive, endGame]);

  const appendInput = (val: string) => {
    if (!isActive || isOver) return;
    
    // Batasi input agar tidak kepanjangan
    if (input.length >= 3) return;
    
    const nextInput = input + val;
    setInput(nextInput);

    // Auto-check jawaban
    if (parseInt(nextInput) === question.a * question.b) {
      // Jawaban benar
      const newScore = score + 1;
      let nextTimeAllowed = timeAllowed;
      
      // Kurangi waktu setiap kelipatan 5 soal (soal ke-6, ke-11, ke-16, dst)
      if (newScore % 5 === 0) {
        nextTimeAllowed = Math.max(MIN_TIME, timeAllowed * 0.9);
      }
      
      setTimeAllowed(nextTimeAllowed);
      setScore(newScore);
      
      // Isi penuh kembali timer dengan waktu yang baru
      setTimeLeft(nextTimeAllowed);
      setQuestion(generateQuestion());
      setInput('');
      lastTimeRef.current = Date.now();
    }
  };

  const deleteInput = () => {
    if (!isActive || isOver) return;
    setInput((prev) => prev.slice(0, -1));
  };

  return {
    startGame,
    score,
    timeAllowed,
    timeLeft,
    question,
    input,
    appendInput,
    deleteInput,
    isActive,
    isOver,
  };
}
