import React, { useEffect } from 'react';
import { BlogPost } from '../../types';
import { TwitterIcon } from '../icons/TwitterIcon';
import { LinkedInIcon } from '../icons/LinkedInIcon';
import { FacebookIcon } from '../icons/FacebookIcon';
import { CommentsSection } from '../CommentsSection';

interface BlogPostPageProps {
  post: BlogPost;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ post }) => {

  useEffect(() => {
    // Update meta tags for SEO
    document.title = `${post.title} | Quickly Blog`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', post.excerpt);
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = post.excerpt;
      document.head.appendChild(newMeta);
    }

    // Cleanup function to reset title
    return () => {
      document.title = 'Quickly - Smart Link Shortener';
    };
  }, [post]);

  const shareUrl = window.location.href;

  return (
    <article className="animate-fade-in max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <p className="text-sm font-bold uppercase text-blue-600 tracking-wider">{post.category}</p>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 mt-2">{post.title}</h1>
        <div className="text-sm text-slate-500 mt-4">
          <span>By {post.author}</span> &middot; <span>{post.date}</span>
        </div>
      </header>

      <img 
        src={post.imageUrl} 
        alt={post.title} 
        className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg" 
      />

      <div 
        className="prose prose-slate max-w-none mt-12 text-slate-700 text-lg leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      
      <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-slate-800">Share this post</h3>
        <div className="flex gap-3">
            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-800 text-white hover:bg-slate-900 transition-colors" title="Share on X">
                <TwitterIcon className="w-6 h-6" />
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-800 text-white hover:bg-blue-900 transition-colors" title="Share on Facebook">
                <FacebookIcon className="w-6 h-6" />
            </a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors" title="Share on LinkedIn">
                <LinkedInIcon className="w-6 h-6" />
            </a>
        </div>
      </div>
      
      <CommentsSection />
    </article>
  );
};