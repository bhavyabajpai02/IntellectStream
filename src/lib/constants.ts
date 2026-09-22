import { NewsArticle, SkillLevel, TopicCombination } from '@/types';

export const POPULAR_TOPICS = [
  'AI + Web Development',
  'Computer Vision + Healthcare',
  'AI + Cloud Infrastructure',
  'Robotics + Edge AI',
  'LLMs + Enterprise Security',
  'Generative AI + Mobile'
];

export const WORKFLOW_STAGES = [
  {
    step: '01',
    title: 'DISCOVER',
    description: 'Filter real-time AI & tech news by combining cross-domain topics tailored to your exact tech stack.',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    step: '02',
    title: 'UNDERSTAND',
    description: 'Instant AI breakdown: "Is this technology useful for my career goals?" before spending time on it.',
    color: 'from-blue-500 to-indigo-500'
  },
  {
    step: '03',
    title: 'LEARN',
    description: 'One-click "Learn This" transforms any article into a structured, skill-adapted curriculum.',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    step: '04',
    title: 'SCHEDULE',
    description: 'Automatically maps learning modules to your daily available time slots (e.g., 8 PM - 9 PM).',
    color: 'from-purple-500 to-pink-500'
  },
  {
    step: '05',
    title: 'PRACTICE',
    description: 'Bite-sized daily tasks ranging from core concepts to real-world code implementation.',
    color: 'from-pink-500 to-rose-500'
  },
  {
    step: '06',
    title: 'TRACK',
    description: 'Monitor milestone completion, maintain daily learning streaks, and build actionable expertise.',
    color: 'from-rose-500 to-amber-500'
  }
];

export const FEATURED_ARTICLES_PREVIEW: NewsArticle[] = [
  {
    id: '1',
    title: 'Next-Gen Web Agents: Integrating LLMs Directly into Modern React Frameworks',
    summary: 'Explores real-time streaming state management and client-side agentic execution models for complex web applications.',
    source: 'Tech AI Dispatch',
    url: '#',
    publishedAt: '2 hours ago',
    topics: ['AI', 'Web Development', 'React'],
    readTime: '4 min read'
  },
  {
    id: '2',
    title: 'Computer Vision in Clinical Diagnostics: Real-Time Edge Processing on Embedded Hardware',
    summary: 'How lightweight visual transformers enable zero-latency surgical assistance and automated anomaly detection.',
    source: 'Medical AI Quarterly',
    url: '#',
    publishedAt: '5 hours ago',
    topics: ['Computer Vision', 'Healthcare', 'Edge Computing'],
    readTime: '6 min read'
  },
  {
    id: '3',
    title: 'Autonomous Cloud Architecture: Self-Healing Infrastructure with Predictive AI Models',
    summary: 'Automating multi-cloud autoscaling and security policy enforcement using continuous reinforcement learning.',
    source: 'Cloud Native Insider',
    url: '#',
    publishedAt: '1 day ago',
    topics: ['AI', 'Cloud', 'DevOps'],
    readTime: '5 min read'
  }
];
