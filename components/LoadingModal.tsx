import React from 'react';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface LoadingModalProps {
  message: string;
}

export const LoadingModal: React.FC<LoadingModalProps> = ({ message }) => {
  return (
    <div
      className="fixed inset-0 bg-white bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      aria-modal="true"
      role="status"
    >
      <div className="flex flex-col items-center gap-4">
        <SpinnerIcon className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-slate-700 font-semibold text-lg">{message}</p>
      </div>
    </div>
  );
};