import React, { useState, useEffect, useCallback } from 'react';
import { URLShortenerForm } from './components/URLShortenerForm';
import { LinkHistoryList } from './components/LinkHistoryList';
import { generateShortLinkSlug } from './services/geminiService';
import { ShortenedLink, User, BlogPost } from './types';
import { login, register, logout, getCurrentUser } from './services/authService';
import { AuthModal } from './components/auth/AuthModal';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { BlogPage } from './components/BlogPage';
import { LoadingModal } from './components/LoadingModal';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { BlogPostPage } from './components/BlogPostPage';
import { Breadcrumbs } from './components/Breadcrumbs';
import { FeaturesPage } from './components/FeaturesPage';
import { PricingPage } from './components/PricingPage';
import { mockPosts } from './components/BlogPage';

export type View = 'landing' | 'dashboard' | 'blog' | 'blogPost' | 'about' | 'contact' | 'features' | 'pricing';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [links, setLinks] = useState<ShortenedLink[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [urlToShorten, setUrlToShorten] = useState<string>('');
  const [view, setView] = useState<View>('landing');
  const [apiLoadingMessage, setApiLoadingMessage] = useState<string | null>(null);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setView('dashboard');
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      try {
        const storedLinks = localStorage.getItem(`shortenedLinks_${currentUser.id}`);
        if (storedLinks) {
          setLinks(JSON.parse(storedLinks));
        } else {
          setLinks([]);
        }
      } catch (error) {
        console.error("Failed to load links from localStorage", error);
        setLinks([]);
      }
    } else {
      setLinks([]);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      try {
        localStorage.setItem(`shortenedLinks_${currentUser.id}`, JSON.stringify(links));
      } catch (error) {
        console.error("Failed to save links to localStorage", error);
      }
    }
  }, [links, currentUser]);
  
  const handleShortenUrl = useCallback(async () => {
    setError(null);
    if (!url) {
      setError("Please enter a URL to shorten.");
      return;
    }
    try {
      new URL(url);
    } catch (_) {
      setError("Please enter a valid URL.");
      return;
    }

    if (!currentUser) {
      setUrlToShorten(url);
      setAuthModalOpen(true);
      return;
    }

    setApiLoadingMessage("Generating your short link...");
    try {
      const slug = await generateShortLinkSlug(url);
      const newLink: ShortenedLink = {
        id: Date.now().toString(),
        originalUrl: url,
        shortSlug: slug,
        createdAt: new Date().toISOString(),
        userId: currentUser.id,
      };
      setLinks(prevLinks => [newLink, ...prevLinks]);
      setUrl('');
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setApiLoadingMessage(null);
    }
  }, [url, currentUser]);
  
  useEffect(() => {
    if (currentUser && urlToShorten) {
      setUrl(urlToShorten);
      setUrlToShorten('');
    }
  }, [currentUser, urlToShorten]);

  const handleLogin = async (email: string, password: string): Promise<User> => {
    setApiLoadingMessage("Logging you in...");
    try {
      const user = await login(email, password);
      setCurrentUser(user);
      setAuthModalOpen(false);
      handleSetView('dashboard');
      return user;
    } catch (err) {
      throw err;
    } finally {
      setApiLoadingMessage(null);
    }
  };
  
  const handleRegister = async (email: string, password: string): Promise<User> => {
    setApiLoadingMessage("Creating your account...");
    try {
      const user = await register(email, password);
      setCurrentUser(user);
      setAuthModalOpen(false);
      handleSetView('dashboard');
      return user;
    } catch (err) {
      throw err;
    } finally {
      setApiLoadingMessage(null);
    }
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    handleSetView('landing');
  };
  
  const handleSetView = (newView: View, post: BlogPost | null = null) => {
    if (newView === 'blogPost' && post) {
      setSelectedPost(post);
    }
    
    // Don't show page loader for the initial load
    if (view !== newView) {
      setIsPageLoading(true);
      window.scrollTo(0, 0);
      setTimeout(() => {
        setView(newView);
        setIsPageLoading(false);
      }, 300); // Simulate network latency for a better UX
    }
  };

  const renderView = () => {
    switch (view) {
      case 'blog':
        return <BlogPage onSelectPost={(post) => handleSetView('blogPost', post)} />;
      case 'blogPost':
        return selectedPost ? <BlogPostPage post={selectedPost} /> : <BlogPage onSelectPost={(post) => handleSetView('blogPost', post)} />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'features':
        return <FeaturesPage />;
      case 'pricing':
        return <PricingPage />;
      case 'dashboard':
        return (
          <>
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Shorten a new link</h2>
              <URLShortenerForm
                url={url}
                setUrl={setUrl}
                onSubmit={handleShortenUrl}
                isLoading={!!apiLoadingMessage}
                error={error}
              />
            </div>
            <div className="mt-10">
                <LinkHistoryList links={links} />
            </div>
          </>
        );
      case 'landing':
      default:
        return <LandingPage 
          url={url} 
          setUrl={setUrl} 
          onSubmit={handleShortenUrl} 
          isLoading={!!apiLoadingMessage} 
          error={error}
          onLogin={() => setAuthModalOpen(true)}
          handleSetView={handleSetView}
          posts={mockPosts.slice(0, 3)}
        />;
    }
  };
  
  return (
    <div className="min-h-screen font-sans text-slate-800 flex flex-col items-center">
      <Header 
        user={currentUser} 
        onLogout={handleLogout} 
        onLogin={() => setAuthModalOpen(true)} 
        view={view}
        handleSetView={handleSetView}
      />

      <main className="w-full max-w-5xl mx-auto flex-grow px-4 sm:px-6 py-8">
         <Breadcrumbs view={view} setView={handleSetView} post={selectedPost} />
         <div className={view !== 'landing' ? 'mt-6' : ''}>
          {renderView()}
         </div>
      </main>

      <Footer handleSetView={handleSetView} />
      
      {isAuthModalOpen && (
        <AuthModal 
          onClose={() => setAuthModalOpen(false)}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
      )}
      {apiLoadingMessage && <LoadingModal message={apiLoadingMessage} />}
      {isPageLoading && <LoadingModal message="Loading page..." />}
    </div>
  );
};

export default App;