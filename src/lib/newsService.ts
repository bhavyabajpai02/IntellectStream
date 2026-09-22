import { NewsArticle } from '@/types';
import { FEATURED_ARTICLES_PREVIEW, ALL_AVAILABLE_TOPICS } from './constants';

/**
 * Deterministic Topic Classifier
 * Maps article text (title, description, content) against standard IntellectStream topics.
 */
export function classifyTopics(title: string, description: string = '', content: string = ''): string[] {
  const combinedText = `${title} ${description} ${content}`.toLowerCase();
  const matchedTopics: string[] = [];

  const topicKeywords: Record<string, RegExp[]> = {
    'AI': [
      /\b(ai|artificial intelligence|llm|llms|gpt|gpt-4|claude|gemini|openai|neural|machine learning|deep learning|transformer|transformers|agent|agents|generative|algorithm|prompt)\b/i
    ],
    'Web Development': [
      /\b(web|react|next\.js|frontend|backend|javascript|typescript|css|html|framework|api|node|browser|dom|ui|ux|fullstack|rest|graphql)\b/i
    ],
    'Computer Vision': [
      /\b(computer vision|vision|image|images|video|spatial|object detection|ocr|segmentation|imaging|visual|opencv|camera)\b/i
    ],
    'Healthcare': [
      /\b(health|healthcare|medical|clinical|patient|patients|diagnostics|pharma|medicine|hospital|telehealth|biotech|disease)\b/i
    ],
    'Cloud': [
      /\b(cloud|aws|azure|gcp|serverless|multi-cloud|kubernetes|docker|infrastructure|microservices|v8 isolates|database|s3)\b/i
    ],
    'Edge Computing': [
      /\b(edge|embedded|microcontroller|on-device|iot|hardware|arm|raspberry|micro-second|sensor)\b/i
    ],
    'DevOps': [
      /\b(devops|ci\/cd|deployment|pipeline|pipelines|autoscaling|terraform|monitoring|container|containers|build|release)\b/i
    ],
    'Security': [
      /\b(security|cybersecurity|vulnerability|vulnerabilities|zero-trust|encryption|auth|threat|threats|exploit|patch|firewall|cyber)\b/i
    ],
    'Robotics': [
      /\b(robotics|robot|robots|autonomous|motion planning|drone|drones|automation|factory|actuator)\b/i
    ],
    'Mobile': [
      /\b(mobile|android|ios|react native|flutter|app|apps|smartphone|device|mobile dev)\b/i
    ]
  };

  // Test each topic against text
  for (const topic of ALL_AVAILABLE_TOPICS) {
    const patterns = topicKeywords[topic];
    if (patterns && patterns.some((pattern) => pattern.test(combinedText))) {
      matchedTopics.push(topic);
    }
  }

  // Fallback defaults if no specific keywords matched
  if (matchedTopics.length === 0) {
    if (combinedText.includes('code') || combinedText.includes('developer') || combinedText.includes('software')) {
      matchedTopics.push('Web Development');
    } else {
      matchedTopics.push('AI');
    }
  }

  return matchedTopics;
}

/**
 * Normalizes raw NewsAPI article objects to IntellectStream NewsArticle type
 */
function normalizeNewsApiArticle(rawArticle: any, index: number): NewsArticle {
  const title = rawArticle.title || 'Untitled Technology Update';
  const description = rawArticle.description || rawArticle.content || 'No detailed summary available for this technology news item.';
  const source = rawArticle.source?.name || 'Tech News Stream';
  const url = rawArticle.url || '#';
  const publishedAtRaw = rawArticle.publishedAt ? new Date(rawArticle.publishedAt) : new Date();

  // Estimate read time
  const wordCount = `${title} ${description}`.split(/\s+/).length;
  const readTimeMinutes = Math.max(3, Math.ceil(wordCount / 30));
  const readTime = `${readTimeMinutes} min read`;

  // Format relative time or clean date
  const hoursAgo = Math.max(1, Math.floor((Date.now() - publishedAtRaw.getTime()) / (1000 * 60 * 60)));
  const timeFormatted = hoursAgo < 24 ? `${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago` : publishedAtRaw.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  // Classify topics deterministically
  const topics = classifyTopics(title, description, rawArticle.content || '');

  return {
    id: `live-${index}-${Date.now()}`,
    title,
    summary: description,
    source,
    url,
    publishedAt: timeFormatted,
    topics,
    readTime
  };
}

export interface NewsServiceResponse {
  articles: NewsArticle[];
  isLiveApi: boolean;
  source: string;
  error?: string;
}

/**
 * Server-side news fetching service
 */
export async function getNewsStream(): Promise<NewsServiceResponse> {
  const apiKey = process.env.NEWS_API_KEY;

  // Fallback if API key is not configured
  if (!apiKey || apiKey === 'your_news_api_key_here') {
    console.warn('[IntellectStream NewsService] NEWS_API_KEY is not set. Using local mock dataset.');
    return {
      articles: FEATURED_ARTICLES_PREVIEW,
      isLiveApi: false,
      source: 'Mock Fallback Dataset (Configure NEWS_API_KEY for live feed)'
    };
  }

  try {
    const query = encodeURIComponent('technology OR "artificial intelligence" OR "web development" OR robotics OR cybersecurity');
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&pageSize=18&apiKey=${apiKey}`;

    const res = await fetch(apiUrl, {
      next: { revalidate: 900 } // Cache for 15 minutes in Next.js
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => '');
      console.error(`[IntellectStream NewsService] NewsAPI HTTP error ${res.status}: ${errorText}`);
      
      // Fall back to mock dataset gracefully on API failure
      return {
        articles: FEATURED_ARTICLES_PREVIEW,
        isLiveApi: false,
        source: `Mock Fallback Dataset (NewsAPI error HTTP ${res.status})`,
        error: `External API returned HTTP ${res.status}. Displaying fallback technology stream.`
      };
    }

    const data = await res.json();

    if (!data.articles || !Array.isArray(data.articles) || data.articles.length === 0) {
      return {
        articles: FEATURED_ARTICLES_PREVIEW,
        isLiveApi: false,
        source: 'Mock Fallback Dataset (No live articles returned)'
      };
    }

    // Filter out removed/invalid articles and normalize
    const normalizedArticles: NewsArticle[] = data.articles
      .filter((art: any) => art.title && art.title !== '[Removed]')
      .map((art: any, idx: number) => normalizeNewsApiArticle(art, idx));

    return {
      articles: normalizedArticles.length > 0 ? normalizedArticles : FEATURED_ARTICLES_PREVIEW,
      isLiveApi: true,
      source: 'Live NewsAPI Feed'
    };

  } catch (err: any) {
    console.error('[IntellectStream NewsService] Network or parsing exception:', err.message || err);
    return {
      articles: FEATURED_ARTICLES_PREVIEW,
      isLiveApi: false,
      source: 'Mock Fallback Dataset (Network error)',
      error: 'Unable to connect to external news provider. Displaying fallback stream.'
    };
  }
}
