'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Filter, 
  Search, 
  X, 
  RotateCcw, 
  Layers, 
  Sparkles, 
  Check, 
  Plus,
  Radio,
  AlertCircle,
  RefreshCw,
  Info
} from 'lucide-react';
import { NewsArticle } from '@/types';
import { ALL_AVAILABLE_TOPICS, PRESET_COMBINATIONS, FEATURED_ARTICLES_PREVIEW } from '@/lib/constants';
import { NewsArticleCard } from './NewsArticleCard';

export const NewsFeed: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>(FEATURED_ARTICLES_PREVIEW);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiveApi, setIsLiveApi] = useState<boolean>(false);
  const [feedSource, setFeedSource] = useState<string>('Initializing stream...');

  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalArticle, setActiveModalArticle] = useState<NewsArticle | null>(null);

  // Fetch news articles from server-side API route
  const fetchNews = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/news');
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: Failed to load live news feed`);
      }
      const data = await res.json();

      if (data.articles && Array.isArray(data.articles) && data.articles.length > 0) {
        setArticles(data.articles);
        setIsLiveApi(data.isLiveApi ?? false);
        setFeedSource(data.source ?? (data.isLiveApi ? 'Live GNews Feed' : 'Mock Fallback Dataset'));
        if (data.error) {
          setError(data.error);
        }
      } else {
        // Fallback to mock data if empty
        setArticles(FEATURED_ARTICLES_PREVIEW);
        setIsLiveApi(false);
        setFeedSource('Mock Fallback Dataset');
      }
    } catch (err: any) {
      console.error('[NewsFeed Component] Error fetching news:', err);
      setError(err.message || 'Unable to connect to live news stream. Displaying fallback dataset.');
      setArticles(FEATURED_ARTICLES_PREVIEW);
      setIsLiveApi(false);
      setFeedSource('Mock Fallback Dataset');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // Toggle topic selection in array
  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  // Set preset combination (e.g., ['AI', 'Web Development'])
  const applyPreset = (topics: string[]) => {
    setSelectedTopics(topics);
  };

  // Clear all active filters
  const clearFilters = () => {
    setSelectedTopics([]);
    setSearchQuery('');
  };

  // Strict AND-logic filtering
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // Search matching
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === '' ||
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.topics.some((t) => t.toLowerCase().includes(query));

      // Strict AND topic matching: Article must contain ALL selected topics
      const matchesTopics =
        selectedTopics.length === 0 ||
        selectedTopics.every((selectedTopic) => article.topics.includes(selectedTopic));

      return matchesSearch && matchesTopics;
    });
  }, [articles, selectedTopics, searchQuery]);

  return (
    <div id="feed" className="space-y-8 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-3">
            <div className="inline-flex items-center space-x-2 text-cyan-400 text-xs font-mono uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Milestone 3 — Real News Stream</span>
            </div>

            {/* Live vs Fallback Mode Badge */}
            <div className={`inline-flex items-center space-x-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
              isLiveApi 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            }`}>
              <Radio className={`w-3 h-3 ${isLiveApi ? 'animate-pulse text-emerald-400' : 'text-amber-400'}`} />
              <span>{isLiveApi ? 'Live API Connected' : 'Mock Fallback Mode'}</span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Personalized Technology Stream
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Source: <span className="text-slate-300">{feedSource}</span>
          </p>
        </div>

        {/* Controls: Search Bar & Refresh */}
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search titles or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/80 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={fetchNews}
            disabled={isLoading}
            title="Refresh stream"
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 disabled:opacity-50 transition-colors flex-shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-cyan-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Error Alert State Banner */}
      {error && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start space-x-3 text-xs text-amber-200">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1 space-y-1">
            <p className="font-bold text-amber-300">Notice: {error}</p>
            <p className="text-amber-400/80">
              The application automatically fell back to the local tech dataset so you can continue using all stream features seamlessly.
            </p>
          </div>
          <button
            onClick={fetchNews}
            className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 font-semibold text-[11px] transition-colors"
          >
            Retry API
          </button>
        </div>
      )}

      {/* FILTERING CONTROLS */}
      <div className="glass-panel p-6 rounded-2xl space-y-5">
        {/* Header & Reset Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-bold text-white">Filter by Topics</span>
            <span className="text-xs text-slate-400 font-mono">
              (Select multiple to combine with AND logic)
            </span>
          </div>

          {(selectedTopics.length > 0 || searchQuery !== '') && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center space-x-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear All Filters</span>
            </button>
          )}
        </div>

        {/* Quick Topic Combination Presets */}
        <div className="space-y-2">
          <span className="text-xs text-slate-400 font-medium">Quick Combinations:</span>
          <div className="flex flex-wrap gap-2">
            {PRESET_COMBINATIONS.map((preset) => {
              const isCurrentPreset =
                selectedTopics.length === preset.topics.length &&
                preset.topics.every((t) => selectedTopics.includes(t));
              return (
                <button
                  key={preset.label}
                  onClick={() => applyPreset(preset.topics)}
                  className={`text-xs px-3 py-1 rounded-lg border transition-all ${
                    isCurrentPreset
                      ? 'bg-cyan-500 text-black font-bold border-cyan-400 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900/80 text-slate-300 border-slate-700/60 hover:border-cyan-500/50 hover:text-cyan-300'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Individual Topic Select Pills */}
        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          <span className="text-xs text-slate-400 font-medium">Available Topic Pills:</span>
          <div className="flex flex-wrap gap-2">
            {ALL_AVAILABLE_TOPICS.map((topic) => {
              const isSelected = selectedTopics.includes(topic);
              return (
                <button
                  key={topic}
                  onClick={() => toggleTopic(topic)}
                  className={`text-xs font-medium px-3.5 py-1.5 rounded-xl transition-all duration-200 flex items-center space-x-1.5 ${
                    isSelected
                      ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/30'
                      : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-slate-600 hover:text-white'
                  }`}
                >
                  {isSelected ? (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 opacity-60" />
                  )}
                  <span>{topic}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Combination Indicator */}
        {selectedTopics.length > 0 && (
          <div className="p-3 rounded-xl bg-slate-900/90 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-slate-400">Active Topic Combination:</span>
              <span className="font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                {selectedTopics.join(' + ')}
              </span>
            </div>
            <span className="text-slate-400 font-mono">
              Showing {filteredArticles.length} article{filteredArticles.length === 1 ? '' : 's'} matching ALL topics
            </span>
          </div>
        )}
      </div>

      {/* SKELETON LOADING STATE */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl space-y-4 animate-pulse border border-slate-800">
              <div className="flex justify-between items-center">
                <div className="h-4 w-24 bg-slate-800 rounded" />
                <div className="h-4 w-16 bg-slate-800 rounded" />
              </div>
              <div className="h-6 w-3/4 bg-slate-800 rounded" />
              <div className="space-y-2">
                <div className="h-3 w-full bg-slate-800 rounded" />
                <div className="h-3 w-5/6 bg-slate-800 rounded" />
              </div>
              <div className="flex gap-2 pt-2">
                <div className="h-5 w-12 bg-slate-800 rounded" />
                <div className="h-5 w-16 bg-slate-800 rounded" />
              </div>
              <div className="pt-4 border-t border-slate-800 flex justify-between">
                <div className="h-6 w-20 bg-slate-800 rounded" />
                <div className="h-6 w-24 bg-slate-800 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredArticles.length > 0 ? (
        /* ARTICLES GRID */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <NewsArticleCard
              key={article.id}
              article={article}
              selectedTopics={selectedTopics}
              onTopicClick={toggleTopic}
              onLearnThis={(art) => setActiveModalArticle(art)}
            />
          ))}
        </div>
      ) : (
        /* CLEAN EMPTY STATE */
        <div className="glass-panel p-12 rounded-3xl text-center space-y-6 max-w-xl mx-auto my-8 border border-slate-800">
          <div className="h-16 w-16 mx-auto rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400">
            <Filter className="w-8 h-8 stroke-[1.5]" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">No Articles Match Your Filter</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              No articles in the current stream contain <span className="text-cyan-400 font-mono font-semibold">ALL</span> selected topics:{' '}
              <span className="text-white font-semibold">{selectedTopics.join(' + ')}</span>.
            </p>
          </div>

          <button
            onClick={clearFilters}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-xs hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/20"
          >
            <RotateCcw className="w-4 h-4 stroke-[2.5]" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

      {/* LEARN THIS SIMULATION MODAL */}
      {activeModalArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl max-w-lg w-full space-y-6 border border-cyan-500/40 relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setActiveModalArticle(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">Feature 3 — One-Click Learning Path</span>
                <h3 className="text-lg font-bold text-white leading-tight">Personalized Curriculum Preview</h3>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400">Selected Article:</span>
              <p className="text-sm font-semibold text-white">{activeModalArticle.title}</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {activeModalArticle.topics.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-300">Target Skill Level:</span>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
                  Beginner
                </div>
                <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold">
                  Medium
                </div>
                <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold">
                  Expert
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 italic">
              In upcoming milestones, clicking &quot;Learn This&quot; will generate an AI-powered multi-day daily schedule adapted to your available learning hours.
            </p>

            <button
              onClick={() => setActiveModalArticle(null)}
              className="w-full py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 transition-colors"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
