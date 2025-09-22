
import React from 'react';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface URLShortenerFormProps {
  url: string;
  setUrl: (url: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  error: string | null;
}

export const URLShortenerForm: React.FC<URLShortenerFormProps> = ({ url, setUrl, onSubmit, isLoading, error }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://your-long-url.com/goes/here"
          className={`flex-grow w-full px-4 py-3 rounded-md bg-slate-100 border-2 transition-colors
            ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'border-transparent focus:border-blue-500 focus:ring-blue-500'}
            focus:outline-none focus:ring-2`}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold px-6 py-3 rounded-md hover:bg-blue-700 transition-all duration-200
            flex items-center justify-center disabled:bg-blue-400 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <SpinnerIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
              Shortening...
            </>
          ) : (
            'Shorten Link'
          )}
        </button>
      </div>
      {error && <p className="text-red-600 mt-3 text-sm">{error}</p>}
    </form>
  );
};
