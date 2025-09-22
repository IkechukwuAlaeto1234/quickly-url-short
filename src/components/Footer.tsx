import React from 'react';
import { LinkIcon } from './icons/LinkIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { View } from '../App';

interface FooterProps {
  handleSetView: (view: View) => void;
}

export const Footer: React.FC<FooterProps> = ({ handleSetView }) => {
  return (
    <footer className="w-full bg-white mt-16 border-t border-slate-200">
      <div className="w-full max-w-5xl mx-auto py-12 px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <LinkIcon className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">Quickly</h1>
            </div>
            <p className="text-slate-500 mt-4 text-sm">Smart links that are short, memorable, and powerful.</p>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-wider uppercase">Product</h3>
            <ul className="mt-4 space-y-3">
              <li><button onClick={() => handleSetView('features')} className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Features</button></li>
              <li><button onClick={() => handleSetView('pricing')} className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Pricing</button></li>
              <li><button className="text-sm text-slate-600 hover:text-blue-600 transition-colors cursor-not-allowed opacity-50">API</button></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-3">
              <li><button onClick={() => handleSetView('about')} className="text-sm text-slate-600 hover:text-blue-600 transition-colors">About Us</button></li>
              <li><button onClick={() => handleSetView('blog')} className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Blog</button></li>
              <li><button onClick={() => handleSetView('contact')} className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Contact</button></li>
            </ul>
          </div>

          {/* Socials Column */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-wider uppercase">Connect</h3>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-slate-500 hover:text-slate-800 transition-colors"><TwitterIcon className="w-6 h-6" /></a>
              <a href="#" className="text-slate-500 hover:text-slate-800 transition-colors"><LinkedInIcon className="w-6 h-6" /></a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8 text-sm text-slate-500 text-center">
          <p>&copy; {new Date().getFullYear()} Quickly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};