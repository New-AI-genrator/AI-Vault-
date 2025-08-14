import { getToolById } from '@/lib/tools';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const tool = await getToolById(context.params.id);

    if (!tool) {
      return NextResponse.json(
        { error: 'Tool not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: tool });

  } catch (error) {
    console.error(`Error fetching tool ${context.params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch tool' },
      { status: 500 }
    );
  }
}
