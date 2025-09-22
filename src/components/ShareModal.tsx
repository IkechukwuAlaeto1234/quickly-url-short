import React, { useState } from 'react';
import { ShortenedLink } from '../types';
import { generateSocialPostSuggestion } from '../services/geminiService';
import { CloseIcon } from './icons/CloseIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { CheckIcon } from './icons/CheckIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { EmailIcon } from './icons/EmailIcon';

interface ShareModalProps {
  link: ShortenedLink;
  shortUrl: string;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ link, shortUrl, onClose }) => {
  const [suggestion, setSuggestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerateSuggestion = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateSocialPostSuggestion(link.originalUrl);
      setSuggestion(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    });
  };

  const finalSuggestion = suggestion.replace('{link}', shortUrl);

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in"
        aria-modal="true"
        role="dialog"
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
            <CloseIcon className="w-6 h-6" />
            <span className="sr-only">Close modal</span>
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-slate-900">Share Your Link</h2>
          <p className="text-slate-500 mt-1">Share your new short link with the world.</p>
          
          <div className="mt-6">
            <label className="block text-sm font-bold text-slate-700 mb-1">Your Short Link</label>
            <div className="flex gap-2">
                <input type="text" readOnly value={shortUrl} className="w-full px-4 py-2 rounded-md bg-slate-100 border-2 border-slate-200" />
                <button onClick={() => handleCopy(shortUrl)} className={`w-28 px-4 py-2 text-sm font-semibold rounded-md flex items-center justify-center gap-2 transition-all duration-200 ${copied ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                    {copied ? <CheckIcon className="w-4 h-4"/> : <ClipboardIcon className="w-4 h-4"/>}
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h3 className="text-lg font-bold text-slate-800">Post Suggestion</h3>
            <p className="text-sm text-slate-500">Let our smart generator create a catchy social media post for you.</p>
            
            {!suggestion && (
                <button onClick={handleGenerateSuggestion} disabled={isLoading} className="mt-4 w-full bg-slate-800 text-white font-bold px-6 py-3 rounded-md hover:bg-slate-900 transition-all duration-200 flex items-center justify-center disabled:bg-slate-600">
                    {isLoading ? <><SpinnerIcon className="animate-spin -ml-1 mr-3 h-5 w-5" /> Generating...</> : 'Generate Post Idea'}
                </button>
            )}

            {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
            
            {suggestion && (
                <div className="mt-4">
                    <textarea value={finalSuggestion} readOnly rows={4} className="w-full p-3 rounded-md bg-slate-100 border border-slate-200 text-sm"></textarea>
                    <button onClick={() => handleCopy(finalSuggestion)} className="mt-2 text-sm font-semibold text-blue-600 hover:underline">Copy suggestion</button>
                </div>
            )}
          </div>
          
          {suggestion && (
            <div className="mt-6">
                <h3 className="text-md font-bold text-slate-800">Quick Share</h3>
                <div className="flex gap-3 mt-3">
                    <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(finalSuggestion)}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md bg-black text-white hover:bg-gray-800 transition-colors">
                        <TwitterIcon className="w-5 h-5" /> <span className="text-sm font-bold">Share on X</span>
                    </a>
                    <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shortUrl)}&title=Check%20this%20out&summary=${encodeURIComponent(finalSuggestion)}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md bg-[#0077B5] text-white hover:bg-[#005E90] transition-colors">
                        <LinkedInIcon className="w-5 h-5" /> <span className="text-sm font-bold">Share on LinkedIn</span>
                    </a>
                     <a href={`mailto:?subject=Check out this link&body=${encodeURIComponent(finalSuggestion)}`} className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors">
                        <EmailIcon className="w-5 h-5" /> <span className="text-sm font-bold">Email</span>
                    </a>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};