import { getToolById } from '@/lib/tools';
import { NextResponse } from 'next/server';

interface RouteParams {
  params: {
    id: string;
  };
}

type RouteHandler = (
  request: Request,
  context: RouteParams
) => Promise<Response>;

export const GET: RouteHandler = async (request, { params }) => {
  try {
    const tool = await getToolById(params.id);

    if (!tool) {
      return NextResponse.json(
        { error: 'Tool not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(tool);
  } catch (error) {
    console.error('Error fetching tool:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tool' },
      { status: 500 }
    );
  }
};
