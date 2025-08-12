import { NextResponse } from 'next/server';
import { getTools } from '@/lib/tools';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get query parameters
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    // Get all tools
    let tools = await getTools();
    
    // Apply filters
    if (category) {
      tools = tools.filter(tool => 
        tool.category?.toLowerCase() === category.toLowerCase() ||
        tool.subcategory?.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      tools = tools.filter(tool => 
        tool.name.toLowerCase().includes(searchLower) ||
        tool.description.toLowerCase().includes(searchLower) ||
        tool.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply pagination
    const total = tools.length;
    const paginatedTools = tools.slice(offset, offset + limit);
    
    return NextResponse.json({
      data: paginatedTools,
      meta: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    });
    
  } catch (error) {
    console.error('Error fetching tools:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tools' },
      { status: 500 }
    );
  }
}
