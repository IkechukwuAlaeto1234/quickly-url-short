
import React from 'react';
import { ShortenedLink } from '../types';
import { LinkHistoryItem } from './LinkHistoryItem';

interface LinkHistoryListProps {
  links: ShortenedLink[];
}

export const LinkHistoryList: React.FC<LinkHistoryListProps> = ({ links }) => {
  if (links.length === 0) {
    return (
      <div className="text-center py-10 px-6 bg-yellow-50 border-2 border-dashed border-yellow-200 rounded-lg">
        <h3 className="text-lg font-medium text-yellow-800">No links yet!</h3>
        <p className="text-yellow-700 mt-1">Shorten a link above to see your history here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-800 mb-4">Your Recent Links</h2>
      {links.map((link) => (
        <LinkHistoryItem key={link.id} link={link} />
      ))}
    </div>
  );
};
