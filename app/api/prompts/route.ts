import { NextResponse } from 'next/server';
import { getPromptsFromXlsx } from '@/lib/server/prompt-repo';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const prompts = await getPromptsFromXlsx();
    return NextResponse.json({ prompts });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to load prompts', message }, { status: 500 });
  }
}

