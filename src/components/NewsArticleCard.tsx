'use client';

import React, { useState } from 'react';
import { Sparkles, ExternalLink, Clock, Check, Layers } from 'lucide-react';
import { NewsArticle } from '@/types';

interface NewsArticleCardProps {
  article: NewsArticle;
  selectedTopics: string[];
  onTopicClick?: (topic: string) => void;
  onLearnThis?: (article: NewsArticle) => void;
}

export const NewsArticleCard: React.FC<NewsArticleCardProps> = ({
  article,
  selectedTopics,
  onTopicClick,
  onLearnThis,
}) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleLearnClick = () => {
    setIsSaved(true);
    if (onLearnThis) {
      onLearnThis(article);
    }
  };

  return (
    <div className="glass-card p-6 rounded-2xl flex flex-col justify-between space-y-5 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 group">
      <div className="space-y-3.5">
        {/* Card Header: Source & Date */}
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
          <span className="font-semibold text-cyan-400/90 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
            {article.source}
          </span>
          <div className="flex items-center space-x-2">
            <span>{article.publishedAt}</span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{article.readTime}</span>
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white leading-snug group-hover:text-cyan-300 transition-colors">
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-start gap-1.5 hover:underline decoration-cyan-400/50 underline-offset-4"
          >
            <span>{article.title}</span>
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
          </a>
        </h3>

        {/* Summary */}
        <p className="text-slate-300 text-xs sm:text-sm line-clamp-3 leading-relaxed">
          {article.summary}
        </p>

        {/* Topic Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {article.topics.map((topic) => {
            const isSelected = selectedTopics.includes(topic);
            return (
              <button
                key={topic}
                onClick={() => onTopicClick && onTopicClick(topic)}
                className={`text-[11px] font-medium px-2.5 py-0.5 rounded-md transition-all duration-200 ${
                  isSelected
                    ? 'bg-cyan-500 text-black font-bold shadow-sm shadow-cyan-500/40'
                    : 'bg-slate-800/80 text-slate-300 border border-slate-700/60 hover:border-slate-500 hover:text-white'
                }`}
              >
                {topic}
              </button>
            );
          })}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-slate-400 hover:text-slate-200 flex items-center space-x-1 font-medium transition-colors"
        >
          <span>Read Full Story</span>
          <ExternalLink className="w-3 h-3" />
        </a>

        <button
          onClick={handleLearnClick}
          className={`flex items-center space-x-1.5 text-xs font-bold px-3.5 py-1.5 rounded-lg transition-all shadow-sm ${
            isSaved
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black hover:opacity-90 shadow-cyan-500/20'
          }`}
        >
          {isSaved ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Learning Added</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Learn This</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
