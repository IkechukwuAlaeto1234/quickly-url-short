import React from 'react';
import { View } from '../App';
import { BlogPost } from '../types';

interface BreadcrumbsProps {
  view: View;
  setView: (view: View) => void;
  post: BlogPost | null;
}

const ChevronRight: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
);

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ view, setView, post }) => {
    if (view === 'landing' || view === 'dashboard') {
        return null;
    }

    const homeView: View = 'landing';

    const segments = [];

    segments.push(
        <button key="home" onClick={() => setView(homeView)} className="font-semibold text-slate-600 hover:text-blue-600">
            Home
        </button>
    );

    if (view === 'about' || view === 'contact' || view === 'blog' || view === 'blogPost') {
        segments.push(<ChevronRight key="chevron-1" />);
    }

    if (view === 'blog' || view === 'blogPost') {
         segments.push(
            <button key="blog" onClick={() => setView('blog')} className={`font-semibold ${view === 'blog' ? 'text-slate-800' : 'text-slate-600 hover:text-blue-600'}`}>
                Blog
            </button>
        );
    }
    
    if (view === 'blogPost' && post) {
        segments.push(<ChevronRight key="chevron-2" />);
        segments.push(<span key="post" className="font-semibold text-slate-800 truncate max-w-xs">{post.title}</span>);
    }
    
    if (view === 'about') {
        segments.push(<span key="about" className="font-semibold text-slate-800">About Us</span>);
    }

    if (view === 'contact') {
        segments.push(<span key="contact" className="font-semibold text-slate-800">Contact</span>);
    }

    return (
        <nav aria-label="Breadcrumb" className="bg-slate-100 rounded-lg px-4 py-2">
            <div className="flex items-center gap-2 text-sm">
                {segments}
            </div>
        </nav>
    );
};
