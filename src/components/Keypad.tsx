import React from 'react';
import { Delete } from 'lucide-react';

interface KeypadProps {
  onPress: (val: string) => void;
  onDelete: () => void;
  disabled?: boolean;
}

export function Keypad({ onPress, onDelete, disabled }: KeypadProps) {
  const btnClass = "h-full min-h-[4rem] w-full bg-white border-b-4 border-slate-200 hover:border-slate-300 rounded-xl text-2xl sm:text-3xl font-black active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center";

  return (
    <div className="grid grid-cols-3 grid-rows-4 gap-3 sm:gap-4 md:gap-5 w-full max-w-sm mx-auto flex-1 min-h-0 max-h-[500px]">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <button
          key={num}
          onClick={() => onPress(num.toString())}
          disabled={disabled}
          className={btnClass}
        >
          {num}
        </button>
      ))}
      <button
        disabled={disabled}
        className="h-full min-h-[4rem] bg-red-50 border-b-4 border-red-200 text-red-500 rounded-xl text-base sm:text-xl font-black flex items-center justify-center active:translate-y-1 transition-all col-start-1 disabled:opacity-50 disabled:cursor-not-allowed uppercase"
        onClick={onDelete}
      >
        Hapus
      </button>
      <button
        disabled={disabled}
        className={`${btnClass} col-start-2`}
        onClick={() => onPress('0')}
      >
        0
      </button>
    </div>
  );
}
