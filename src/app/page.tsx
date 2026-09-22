import React from 'react';
import { 
  Sparkles, 
  Flame, 
  ArrowRight, 
  Zap, 
  Filter, 
  Brain, 
  CheckCircle2
} from 'lucide-react';
import { WORKFLOW_STAGES } from '@/lib/constants';
import { NewsFeed } from '@/components/NewsFeed';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-cyan-600/15 to-purple-600/15 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] pointer-events-none -z-10" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10" />

      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Zap className="w-5 h-5 text-black stroke-[2.5]" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white">Intellect<span className="text-cyan-400">Stream</span></span>
              <span className="hidden sm:inline-block ml-2 text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">Milestone 2</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#feed" className="hover:text-cyan-400 transition-colors">News Feed</a>
            <a href="#workflow" className="hover:text-cyan-400 transition-colors">Workflow</a>
            <a href="#learning-path" className="hover:text-cyan-400 transition-colors">Adaptive Learning</a>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="hidden sm:flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/60 text-slate-300 hover:border-cyan-500/50 transition-colors">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>0 Day Streak</span>
            </button>
            <a 
              href="#feed"
              className="flex items-center space-x-2 text-xs font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-black hover:opacity-90 transition-opacity shadow-md shadow-cyan-500/20"
            >
              <span>Explore Stream</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        
        {/* HERO SECTION */}
        <section className="text-center space-y-8 pt-8 md:pt-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-medium shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI-Powered News + Adaptive Learning Platform</span>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-none text-white">
              Stay current with AI. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Learn it. Build it.
              </span>
            </h1>
            <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto font-normal leading-relaxed">
              Don&apos;t just read technology news. IntellectStream transforms emerging AI developments into personalized, skill-adapted daily learning paths tailored to your available time.
            </p>
          </div>

          {/* Core Journey Flow Bar */}
          <div className="pt-4 max-w-3xl mx-auto">
            <div className="glass-panel p-3 sm:p-4 rounded-2xl flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-slate-300">
              <span className="text-cyan-400">DISCOVER</span>
              <span className="text-slate-600">→</span>
              <span className="text-blue-400">UNDERSTAND</span>
              <span className="text-slate-600">→</span>
              <span className="text-indigo-400">LEARN</span>
              <span className="text-slate-600">→</span>
              <span className="text-purple-400">SCHEDULE</span>
              <span className="text-slate-600">→</span>
              <span className="text-pink-400">PRACTICE</span>
              <span className="text-slate-600">→</span>
              <span className="text-amber-400">TRACK</span>
            </div>
          </div>
        </section>

        {/* FUNCTIONAL NEWS FEED COMPONENT */}
        <NewsFeed />

        {/* WORKFLOW STAGES */}
        <section id="workflow" className="space-y-8 pt-8 border-t border-slate-800/80">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              The Product Philosophy
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
              Bridging the disconnect between discovering live technology news and mastering actionable tech skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WORKFLOW_STAGES.map((stage) => (
              <div key={stage.step} className="glass-card p-6 rounded-2xl space-y-4 relative group">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-gradient-to-r ${stage.color} text-black`}>
                    STAGE {stage.step}
                  </span>
                  <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">{stage.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{stage.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SKILL LEVEL ADAPTATION PREVIEW SECTION */}
        <section id="learning-path" className="glass-panel p-8 sm:p-10 rounded-3xl space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 text-purple-400 text-xs font-mono uppercase tracking-wider">
              <Brain className="w-3.5 h-3.5" />
              <span>Feature 4 — Skill-Level Adaptation Preview</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Tailored Curriculum Generation
            </h2>
            <p className="text-slate-400 text-sm max-w-xl">
              The exact same technology produces fundamentally different learning paths based on your current expertise level.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-5 rounded-xl space-y-4 border-l-4 border-l-emerald-500">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-emerald-400 uppercase">Beginner Level</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">Concepts → Basics</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Day 1: Core concepts & terminology</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Day 2: Environment setup & Hello World</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Day 3: Guided mini tutorial</span>
                </li>
              </ul>
            </div>

            <div className="glass-card p-5 rounded-xl space-y-4 border-l-4 border-l-cyan-500">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-cyan-400 uppercase">Medium Level</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">APIs → Integration</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span>Day 1: System architecture & API models</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span>Day 2: Integration with existing apps</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span>Day 3: Practical mini-project execution</span>
                </li>
              </ul>
            </div>

            <div className="glass-card p-5 rounded-xl space-y-4 border-l-4 border-l-purple-500">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-purple-400 uppercase">Expert Level</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">Internals → Production</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                  <span>Day 1: Low-level architecture & internals</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                  <span>Day 2: Performance optimization & trade-offs</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                  <span>Day 3: Production scale implementation</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-slate-300">IntellectStream</span>
            <span>— Stay current with AI. Learn it. Build it.</span>
          </div>
          <p>© 2026 IntellectStream. Milestone 2 Functional News Feed.</p>
        </div>
      </footer>
    </div>
  );
}
