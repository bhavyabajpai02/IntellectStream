export type SkillLevel = 'Beginner' | 'Medium' | 'Expert';

export interface Topic {
  id: string;
  name: string;
  category: 'AI Core' | 'Domain' | 'Infrastructure' | 'Application';
  iconName?: string;
}

export interface TopicCombination {
  primaryTopic: string;
  secondaryTopic: string;
  label: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: string;
  topics: string[];
  readTime: string;
  relevanceScore?: number;
}

export interface LearningTask {
  id: string;
  dayNumber: number;
  title: string;
  description: string;
  estimatedMinutes: number;
  isCompleted?: boolean;
}

export interface LearningPath {
  id: string;
  articleId: string;
  topicTitle: string;
  skillLevel: SkillLevel;
  totalDays: number;
  overview: string;
  tasks: LearningTask[];
}
