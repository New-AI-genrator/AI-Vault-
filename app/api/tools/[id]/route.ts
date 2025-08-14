import { getToolById } from '@/lib/tools';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const tool = await getToolById(params.id);

  if (!tool) {
    return NextResponse.json(
      { error: 'Tool not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(tool);
}
