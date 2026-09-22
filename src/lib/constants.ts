import { NewsArticle } from '@/types';

export const ALL_AVAILABLE_TOPICS = [
  'AI',
  'Web Development',
  'Computer Vision',
  'Healthcare',
  'Cloud',
  'Robotics',
  'Security',
  'Edge Computing',
  'DevOps',
  'Mobile'
];

export const PRESET_COMBINATIONS = [
  { label: 'AI + Web Development', topics: ['AI', 'Web Development'] },
  { label: 'Computer Vision + Healthcare', topics: ['Computer Vision', 'Healthcare'] },
  { label: 'AI + Cloud', topics: ['AI', 'Cloud'] },
  { label: 'Robotics + Edge Computing', topics: ['Robotics', 'Edge Computing'] },
  { label: 'AI + Security', topics: ['AI', 'Security'] }
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
    url: 'https://news.ycombinator.com',
    publishedAt: '2 hours ago',
    topics: ['AI', 'Web Development'],
    readTime: '4 min read'
  },
  {
    id: '2',
    title: 'Computer Vision in Clinical Diagnostics: Real-Time Edge Processing on Embedded Hardware',
    summary: 'How lightweight visual transformers enable zero-latency surgical assistance and automated anomaly detection in medical imaging.',
    source: 'Medical AI Quarterly',
    url: 'https://news.ycombinator.com',
    publishedAt: '5 hours ago',
    topics: ['Computer Vision', 'Healthcare', 'Edge Computing'],
    readTime: '6 min read'
  },
  {
    id: '3',
    title: 'Autonomous Cloud Architecture: Self-Healing Multi-Cloud Infrastructure with AI Models',
    summary: 'Automating multi-cloud autoscaling, latency balancing, and security policy enforcement using continuous reinforcement learning.',
    source: 'Cloud Native Insider',
    url: 'https://news.ycombinator.com',
    publishedAt: '1 day ago',
    topics: ['AI', 'Cloud', 'DevOps'],
    readTime: '5 min read'
  },
  {
    id: '4',
    title: 'AI-Powered Static Code Analysis for Modern Web Frontend Applications',
    summary: 'Leveraging domain-specific transformer models to detect performance bottlenecks, accessibility flaws, and memory leaks before deployment.',
    source: 'Frontend Weekly',
    url: 'https://news.ycombinator.com',
    publishedAt: '1 day ago',
    topics: ['AI', 'Web Development', 'DevOps'],
    readTime: '5 min read'
  },
  {
    id: '5',
    title: 'Zero-Trust AI Security Enclaves for Enterprise Cloud Platforms',
    summary: 'Implementing confidential computing primitives and encrypted model weights to prevent data exfiltration in public cloud deployments.',
    source: 'CyberSec Digest',
    url: 'https://news.ycombinator.com',
    publishedAt: '2 days ago',
    topics: ['AI', 'Security', 'Cloud'],
    readTime: '7 min read'
  },
  {
    id: '6',
    title: 'Edge AI in Industrial Robotics: High-Frequency Control Loops with Neural Motion Planners',
    summary: 'Combining micro-second neural execution on embedded microcontrollers to enable dynamic obstacle avoidance in automated factories.',
    source: 'Robotics Engineering Today',
    url: 'https://news.ycombinator.com',
    publishedAt: '2 days ago',
    topics: ['Robotics', 'Edge Computing', 'AI'],
    readTime: '8 min read'
  },
  {
    id: '7',
    title: 'Real-Time Telehealth Video Analytics via On-Device Computer Vision Models',
    summary: 'How localized spatial vision models assess patient vital indicators and facial distress signals securely during virtual consultations.',
    source: 'Digital Health Review',
    url: 'https://news.ycombinator.com',
    publishedAt: '3 days ago',
    topics: ['Computer Vision', 'Healthcare', 'Mobile'],
    readTime: '4 min read'
  },
  {
    id: '8',
    title: 'On-Device LLM Inference in React Native Mobile Applications',
    summary: 'A deep dive into WebAssembly and NAPI bindings for executing quantized 3B parameter models offline on iOS and Android devices.',
    source: 'Mobile Dev Hub',
    url: 'https://news.ycombinator.com',
    publishedAt: '3 days ago',
    topics: ['AI', 'Mobile', 'Web Development'],
    readTime: '6 min read'
  },
  {
    id: '9',
    title: 'Serverless Edge Microservices for Low-Latency Cloud AI APIs',
    summary: 'Structuring ultra-responsive API gateways using v8 isolates, streaming response headers, and global edge cache invalidation.',
    source: 'Cloud Architecture Monthly',
    url: 'https://news.ycombinator.com',
    publishedAt: '4 days ago',
    topics: ['Cloud', 'DevOps', 'Web Development'],
    readTime: '5 min read'
  },
  {
    id: '10',
    title: 'Automated Vulnerability Remediation in Cloud Workloads via Generative AI',
    summary: 'Using automated patch generation pipelines to audit container registries and deploy verified hotfixes in CI/CD environments.',
    source: 'DevSecOps Insights',
    url: 'https://news.ycombinator.com',
    publishedAt: '5 days ago',
    topics: ['AI', 'Security', 'DevOps'],
    readTime: '6 min read'
  }
];
