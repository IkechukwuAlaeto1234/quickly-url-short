import React from 'react';
import { URLShortenerForm } from '../URLShortenerForm';
import { PricingSection } from '../PricingSection';
import { BlogPost } from '../../types';
import { View } from '../../App';

interface LandingPageProps {
  url: string;
  setUrl: (url: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  error: string | null;
  onLogin: () => void;
  posts: BlogPost[];
  handleSetView: (view: View, post?: BlogPost) => void;
}

const features = [
    {
        icon: '🧠',
        title: 'Intelligent Slugs',
        description: 'Our smart generator creates short, memorable slugs that are easy to read and share, based on your link\'s content.'
    },
    {
        icon: '📚',
        title: 'Link History',
        description: 'Sign up to save, manage, and track the performance of all your shortened links in one place.'
    },
    {
        icon: '🚀',
        title: 'Easy Sharing',
        description: 'Quickly copy or share your links to social media with smart post suggestions to boost engagement.'
    }
]

export const LandingPage: React.FC<LandingPageProps> = ({ url, setUrl, onSubmit, isLoading, error, onLogin, posts, handleSetView }) => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="text-center my-16 sm:my-24">
        <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 leading-tight">
          Create Short, <br/> Memorable Links
        </h1>
        <p className="text-slate-500 mt-4 max-w-xl mx-auto text-lg">
          Quickly uses a smart generator to create human-readable short links. Stop sharing ugly URLs and start creating links people remember.
        </p>
      </section>

      {/* Shortener Form */}
      <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-2xl mx-auto">
        <URLShortenerForm
          url={url}
          setUrl={setUrl}
          onSubmit={onSubmit}
          isLoading={isLoading}
          error={error}
        />
        <p className="text-center text-sm text-slate-500 mt-4">
            <button onClick={onLogin} className="text-blue-600 font-semibold hover:underline">Sign up</button> to save your link history.
        </p>
      </section>
      
      {/* Features Section */}
      <section className="my-24 sm:my-32">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">More Than Just a Link Shortener</h2>
            <p className="text-slate-500 mt-4 text-lg">
                Quickly is designed to be your intelligent partner in sharing content across the web.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
              {features.map(feature => (
                  <div key={feature.title} className="bg-white p-8 rounded-xl shadow-sm text-center">
                      <div className="text-4xl">{feature.icon}</div>
                      <h3 className="text-xl font-bold text-slate-900 mt-4">{feature.title}</h3>
                      <p className="text-slate-500 mt-2">{feature.description}</p>
                  </div>
              ))}
          </div>
      </section>

      {/* Pricing Section */}
      <PricingSection handleSetView={handleSetView}/>

      {/* Blog Section */}
      <section className="my-24 sm:my-32">
        <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">From the Blog</h2>
            <p className="text-slate-500 mt-4 text-lg">
                Get the latest insights on link management, technology, and marketing.
            </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
            {posts.map((post) => (
                <div key={post.id} onClick={() => handleSetView('blogPost', post)} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 cursor-pointer group">
                    <div className="overflow-hidden">
                        <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-6">
                        <span className="text-xs font-bold uppercase text-blue-600">{post.category}</span>
                        <h2 className="text-lg font-bold text-slate-900 mt-1 mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">{post.title}</h2>
                        <p className="text-slate-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className="text-center mt-12">
            <button onClick={() => handleSetView('blog')} className="bg-blue-600 text-white font-bold px-6 py-3 rounded-md hover:bg-blue-700 transition-all duration-200">
                Visit The Blog
            </button>
        </div>
      </section>
    </div>
  );
};