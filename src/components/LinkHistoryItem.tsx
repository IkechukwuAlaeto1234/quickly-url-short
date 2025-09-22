import React, { useState } from 'react';
import { ShortenedLink } from '../types';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { CheckIcon } from './icons/CheckIcon';
import { ShareIcon } from './icons/ShareIcon';
import { ShareModal } from './ShareModal';


interface LinkHistoryItemProps {
  link: ShortenedLink;
}

const FAKE_DOMAIN = 'qck.ly/';

export const LinkHistoryItem: React.FC<LinkHistoryItemProps> = ({ link }) => {
  const [copied, setCopied] = useState(false);
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const shortUrl = `${FAKE_DOMAIN}${link.shortSlug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
      });
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-4 transition-shadow hover:shadow-md animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-slate-500 text-sm truncate" title={link.originalUrl}>
              {link.originalUrl}
            </p>
            <a href="#" onClick={(e) => e.preventDefault()} className="text-blue-600 font-bold text-lg hover:underline">
              {shortUrl}
            </a>
            <p className="text-xs text-slate-400 mt-1">{formatDate(link.createdAt)}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
                onClick={() => setShareModalOpen(true)}
                className="px-4 py-2 text-sm font-semibold rounded-md flex items-center justify-center gap-2 transition-all duration-200 bg-slate-200 text-slate-700 hover:bg-slate-300"
            >
                <ShareIcon className="w-4 h-4" />
                Share
            </button>
            <button
              onClick={handleCopy}
              className={`w-28 px-4 py-2 text-sm font-semibold rounded-md flex items-center justify-center gap-2 transition-all duration-200
                ${copied ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              {copied ? <CheckIcon className="w-4 h-4" /> : <ClipboardIcon className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
      {isShareModalOpen && (
        <ShareModal 
            link={link}
            shortUrl={shortUrl}
            onClose={() => setShareModalOpen(false)}
        />
      )}
    </>
  );
};