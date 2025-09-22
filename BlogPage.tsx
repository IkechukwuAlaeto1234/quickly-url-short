import React, { useState } from 'react';
import { BlogPost, BlogCategory } from '../types';

export const mockPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Art of the Short Link: Why Memorable URLs Matter',
    excerpt: 'In a world of information overload, a clean, memorable link can make all the difference. Discover the psychology behind effective URLs and how they can boost your click-through rates.',
    author: 'Jane Doe',
    date: 'October 26, 2023',
    imageUrl: 'https://picsum.photos/seed/blog1/800/400',
    category: 'Marketing',
    content: `
      <p>In the vast, ever-expanding universe of the internet, attention is the most valuable currency. Every tweet, post, and article is vying for a sliver of your audience's time. This is where the humble URL, often overlooked, plays a critical role. A long, clunky, parameter-filled URL is not just ugly; it's untrustworthy. It looks spammy and can deter users from clicking. In contrast, a short, branded, and descriptive link is clean, easy to remember, and inspires confidence.</p>
      <p class="mt-4">Think of your URL as the digital equivalent of a firm handshake. It’s the first impression. A link like <strong>qck.ly/brand-strategy</strong> is infinitely more appealing and informative than <strong>example.com/products/item.aspx?id=123&cat=45&ref=newsletter</strong>. The former tells a story and sets an expectation, which increases the likelihood of a click. This is crucial for social media campaigns, email marketing, and even in print, where users might have to type the URL manually.</p>
      <p class="mt-4">Ultimately, investing in memorable URLs is investing in your brand's usability and trustworthiness. It shows a level of polish and attention to detail that savvy consumers appreciate, leading to higher engagement and better campaign performance.</p>
    `
  },
  {
    id: 2,
    title: 'How Smart Algorithms are Revolutionizing Content Sharing',
    excerpt: 'From generating summaries to creating engaging social media posts, smart tech is changing the game for content creators. We explore the latest trends and what they mean for you.',
    author: 'John Smith',
    date: 'October 22, 2023',
    imageUrl: 'https://picsum.photos/seed/blog2/800/400',
    category: 'Technology',
    content: `
      <p>The term 'AI' is everywhere, but what does it practically mean for content creators? At its core, it's about using smart algorithms to automate and enhance tasks that were once manual and time-consuming. One of the most exciting frontiers is in content summarization and adaptation. Our smart generator, for example, doesn't just pick random words for a short link; it analyzes the source content to understand its core topic and then crafts a relevant, human-readable slug.</p>
      <p class="mt-4">This same technology can be applied to generate social media posts. Instead of staring at a blank screen trying to come up with a catchy tweet, these tools can provide a compelling suggestion in seconds, complete with relevant hashtags. This frees up creators to focus on what they do best: creating high-quality content.</p>
      <p class="mt-4">The future isn't about machines replacing creators, but augmenting them. By handling the repetitive, analytical tasks, smart technology acts as a powerful assistant, enabling creators to be more efficient, creative, and impactful in their work.</p>
    `
  },
  {
    id: 3,
    title: '5 Tips for Creating Shareable Content',
    excerpt: 'Creating great content is only half the battle. Learn five practical tips to make your articles, videos, and posts irresistible to share, maximizing their reach and impact.',
    author: 'Emily White',
    date: 'October 18, 2023',
    imageUrl: 'https://picsum.photos/seed/blog3/800/400',
    category: 'Tips',
    content: `
      <p>Getting your content shared is the key to organic growth. But what makes a piece of content truly shareable? It's a mix of art and science. Here are five tips to increase your content's viral potential:</p>
      <ol class="list-decimal list-inside mt-4 space-y-2">
        <li><strong>Evoke Emotion:</strong> Content that makes people feel something—whether it's awe, laughter, or surprise—is far more likely to be shared. People share things that resonate with them on an emotional level.</li>
        <li><strong>Provide Practical Value:</strong> Is your content useful? Does it solve a problem, teach a skill, or offer a new perspective? Actionable advice and how-to guides are perennial favorites for sharing.</li>
        <li><strong>Tell a Compelling Story:</strong> Humans are wired for stories. Frame your content within a narrative structure with a clear beginning, middle, and end. A good story is memorable and highly shareable.</li>
        <li><strong>Use Stunning Visuals:</strong> High-quality images, infographics, and videos can dramatically increase shareability. Visual content is easier to process and more eye-catching in a crowded social media feed.</li>
        <li><strong>Make it Easy to Share:</strong> This seems obvious, but it's often overlooked. Use clear calls-to-action, prominent share buttons, and, of course, clean, short URLs that are easy to copy and paste.</li>
      </ol>
    `
  },
];

const categories: BlogCategory[] = ['Marketing', 'Technology', 'Tips'];

interface BlogPageProps {
  onSelectPost: (post: BlogPost) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onSelectPost }) => {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | null>(null);

  const filteredPosts = activeCategory 
    ? mockPosts.filter(post => post.category === activeCategory)
    : mockPosts;

  return (
    <div className="animate-fade-in">
      <div className="text-center py-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">The Quickly Blog</h1>
        <p className="text-slate-500 mt-4 max-w-xl mx-auto text-lg">
          Insights on link management, technology, and digital marketing.
        </p>
      </div>

      <div className="flex justify-center gap-2 mb-12 flex-wrap">
        <button 
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 text-sm font-bold rounded-full transition-colors ${!activeCategory ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-100'}`}
        >
          All Posts
        </button>
        {categories.map(category => (
          <button 
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 text-sm font-bold rounded-full transition-colors ${activeCategory === category ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-100'}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <div key={post.id} onClick={() => onSelectPost(post)} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 cursor-pointer group">
            <div className="overflow-hidden">
                <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-6">
              <span className="text-xs font-bold uppercase text-blue-600">{post.category}</span>
              <h2 className="text-xl font-bold text-slate-900 mt-1 mb-2 group-hover:text-blue-700 transition-colors">{post.title}</h2>
              <p className="text-slate-600 text-sm mb-4">{post.excerpt}</p>
              <div className="text-xs text-slate-400">
                <span>By {post.author}</span> &middot; <span>{post.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};