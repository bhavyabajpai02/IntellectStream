import { NewsArticle } from '@/types';
import { FEATURED_ARTICLES_PREVIEW, ALL_AVAILABLE_TOPICS } from './constants';

/**
 * Deterministic Topic Classifier
 * Maps article text (title, description, content, tags) against standard IntellectStream topics.
 */
export function classifyTopics(title: string, description: string = '', content: string = '', rawTags: string[] = []): string[] {
  const combinedText = `${title} ${description} ${content} ${rawTags.join(' ')}`.toLowerCase();
  const matchedTopics: string[] = [];

  const topicKeywords: Record<string, RegExp[]> = {
    'AI': [
      /\b(ai|artificial intelligence|llm|llms|gpt|gpt-4|claude|gemini|openai|neural|machine learning|deep learning|transformer|transformers|agent|agents|generative|algorithm|prompt|mcp|rag)\b/i
    ],
    'Web Development': [
      /\b(web|webdev|react|next\.js|frontend|backend|javascript|typescript|css|html|framework|api|node|browser|dom|ui|ux|fullstack|rest|graphql|tailwind|webassembly)\b/i
    ],
    'Computer Vision': [
      /\b(computer vision|vision|image|images|video|spatial|object detection|ocr|segmentation|imaging|visual|opencv|camera)\b/i
    ],
    'Healthcare': [
      /\b(health|healthcare|medical|clinical|patient|patients|diagnostics|pharma|medicine|hospital|telehealth|biotech|disease)\b/i
    ],
    'Cloud': [
      /\b(cloud|aws|azure|gcp|serverless|multi-cloud|kubernetes|docker|infrastructure|microservices|v8 isolates|database|s3|devops)\b/i
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

  // Default fallbacks if no specific keywords matched
  if (matchedTopics.length === 0) {
    if (combinedText.includes('code') || combinedText.includes('dev') || combinedText.includes('web')) {
      matchedTopics.push('Web Development');
    } else {
      matchedTopics.push('AI');
    }
  }

  return matchedTopics;
}

/**
 * Normalizes Dev.to public API response to NewsArticle format
 */
function normalizeDevToArticle(art: any, index: number): NewsArticle {
  const title = art.title || 'Untitled Tech Article';
  const description = art.description || 'No detailed description available.';
  const source = art.user?.name ? `${art.user.name} (Dev.to)` : 'Dev.to Tech Stream';
  const url = art.url || '#';

  const publishedAtRaw = art.published_at ? new Date(art.published_at) : new Date();
  const hoursAgo = Math.max(1, Math.floor((Date.now() - publishedAtRaw.getTime()) / (1000 * 60 * 60)));
  const timeFormatted = hoursAgo < 24 ? `${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago` : publishedAtRaw.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const readingTime = art.reading_time_minutes ? `${art.reading_time_minutes} min read` : '4 min read';
  const rawTags = Array.isArray(art.tag_list) ? art.tag_list : [];
  const topics = classifyTopics(title, description, '', rawTags);

  return {
    id: `devto-${art.id || index}-${Date.now()}`,
    title,
    summary: description,
    source,
    url,
    publishedAt: timeFormatted,
    topics,
    readTime: readingTime
  };
}

/**
 * Normalizes raw NewsAPI article objects to IntellectStream NewsArticle type
 */
function normalizeNewsApiArticle(rawArticle: any, index: number): NewsArticle {
  const title = rawArticle.title || 'Untitled Technology Update';
  const description = rawArticle.description || rawArticle.content || 'No detailed summary available.';
  const source = rawArticle.source?.name || 'Tech News Stream';
  const url = rawArticle.url || '#';
  const publishedAtRaw = rawArticle.publishedAt ? new Date(rawArticle.publishedAt) : new Date();

  const wordCount = `${title} ${description}`.split(/\s+/).length;
  const readTimeMinutes = Math.max(3, Math.ceil(wordCount / 30));
  const readTime = `${readTimeMinutes} min read`;

  const hoursAgo = Math.max(1, Math.floor((Date.now() - publishedAtRaw.getTime()) / (1000 * 60 * 60)));
  const timeFormatted = hoursAgo < 24 ? `${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago` : publishedAtRaw.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const topics = classifyTopics(title, description, rawArticle.content || []);

  return {
    id: `newsapi-${index}-${Date.now()}`,
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
 * Fetches live tech articles from public Dev.to API
 */
async function fetchPublicLiveNews(): Promise<NewsServiceResponse | null> {
  try {
    const res = await fetch('https://dev.to/api/articles?tag=ai&per_page=12', {
      next: { revalidate: 300 }
    });
    if (!res.ok) return null;

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;

    const normalized = data
      .filter((art: any) => art.title && art.url)
      .map((art: any, idx: number) => normalizeDevToArticle(art, idx));

    if (normalized.length === 0) return null;

    return {
      articles: normalized,
      isLiveApi: true,
      source: 'Dev.to Live Technology Feed'
    };
  } catch (err) {
    console.error('[IntellectStream NewsService] Public Dev.to API fetch failed:', err);
    return null;
  }
}

/**
 * Main server-side news fetching service
 */
export async function getNewsStream(): Promise<NewsServiceResponse> {
  const apiKey = process.env.NEWS_API_KEY;

  // Try NewsAPI if a key is provided
  if (apiKey && apiKey !== 'your_news_api_key_here') {
    try {
      const query = encodeURIComponent('technology OR "artificial intelligence" OR "web development" OR robotics OR cybersecurity');
      const apiUrl = `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&pageSize=18&apiKey=${apiKey}`;

      const res = await fetch(apiUrl, {
        next: { revalidate: 900 }
      });

      if (res.ok) {
        const data = await res.json();
        if (data.status === 'ok' && Array.isArray(data.articles) && data.articles.length > 0) {
          const normalizedArticles: NewsArticle[] = data.articles
            .filter((art: any) => art.title && art.title !== '[Removed]')
            .map((art: any, idx: number) => normalizeNewsApiArticle(art, idx));

          if (normalizedArticles.length > 0) {
            return {
              articles: normalizedArticles,
              isLiveApi: true,
              source: 'Live NewsAPI Feed'
            };
          }
        }
      } else {
        console.warn(`[IntellectStream NewsService] NewsAPI key returned HTTP ${res.status}. Trying public tech API fallback.`);
      }
    } catch (err: any) {
      console.warn('[IntellectStream NewsService] NewsAPI error, falling back to public live API:', err.message || err);
    }
  }

  // Fallback to Public Live Dev.to API
  const publicFeed = await fetchPublicLiveNews();
  if (publicFeed) {
    return publicFeed;
  }

  // Fallback to Local Mock Dataset
  return {
    articles: FEATURED_ARTICLES_PREVIEW,
    isLiveApi: false,
    source: 'Local Mock Dataset (Offline Fallback)'
  };
}
