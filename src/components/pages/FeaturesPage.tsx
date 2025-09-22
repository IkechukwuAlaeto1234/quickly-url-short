import React from 'react';
import { LinkIcon } from '../icons/LinkIcon';
import { AnalyticsIcon } from '../icons/AnalyticsIcon';
import { ShareIcon } from '../icons/ShareIcon';
import { ShieldIcon } from '../icons/ShieldIcon';

const features = [
  {
    icon: <LinkIcon className="w-8 h-8 text-blue-600" />,
    title: 'Intelligent, Memorable Slugs',
    description: 'Our smart generator analyzes your link\'s content to create short, human-readable slugs that are not only memorable but also descriptive, boosting trust and click-through rates.'
  },
  {
    icon: <AnalyticsIcon className="w-8 h-8 text-blue-600" />,
    title: 'Link Analytics',
    description: 'Track every click and measure your link\'s performance. Understand your audience with data on geographic location, referrers, and click patterns to optimize your campaigns.'
  },
  {
    icon: <ShareIcon className="w-8 h-8 text-blue-600" />,
    title: 'Smart Sharing Suggestions',
    description: 'Never stare at a blank social media post again. Get catchy, context-aware post suggestions for platforms like Twitter/X and LinkedIn, complete with hashtags, to maximize engagement.'
  },
  {
    icon: <ShieldIcon className="w-8 h-8 text-blue-600" />,
    title: 'Secure & Reliable',
    description: 'All links are scanned for malicious content, ensuring your audience is safe. Our platform is built on a robust infrastructure to guarantee high availability and fast redirects.'
  },
];

export const FeaturesPage: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-16">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">Powerful Features, Simple Interface</h1>
        <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-lg">
          Quickly is more than just a link shortener. It's a complete toolkit designed to help you share content effectively and measure its impact.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {features.map((feature) => (
          <div key={feature.title} className="bg-white p-8 rounded-xl shadow-sm flex gap-6">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                {feature.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
              <p className="text-slate-600 mt-2">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};