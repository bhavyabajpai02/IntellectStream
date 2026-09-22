import { NextResponse } from 'next/server';
import { getNewsStream } from '@/lib/newsService';

export async function GET() {
  try {
    const data = await getNewsStream();
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    console.error('[IntellectStream API Route /api/news] Unexpected error:', error);
    return NextResponse.json(
      {
        articles: [],
        isLiveApi: false,
        source: 'Error Fallback',
        error: 'An error occurred while retrieving news articles.',
      },
      { status: 500 }
    );
  }
}
