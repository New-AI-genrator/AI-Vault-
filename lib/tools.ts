import { Tool } from '@/types/tool';
import { tools as allTools } from '@/data/tools';

interface ToolWithMatches extends Tool {
  _tagMatches?: number;
}

export async function getTools(): Promise<Tool[]> {
  // Return the tools directly from the data file
  return allTools;
}

export async function getToolById(id: string): Promise<Tool | undefined> {
  const tools = await getTools();
  return tools.find(tool => tool.id === id);
}

export async function getToolsByCategory(category: string): Promise<Tool[]> {
  const tools = await getTools();
  return tools.filter(tool => 
    tool.category.toLowerCase() === category.toLowerCase()
  );
}

export async function getRecommendedTools(
  currentToolId?: string, 
  category?: string, 
  tags: string[] = [], 
  limit: number = 3
): Promise<Tool[]> {
  const tools = await getTools();
  
  // Filter out the current tool if ID is provided
  let recommended = tools.filter(tool => 
    !currentToolId || tool.id !== currentToolId
  );
  
  // Filter by category if provided
  if (category) {
    recommended = recommended.filter(tool => 
      tool.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  // Sort by number of matching tags if tags are provided
  if (tags.length > 0) {
    const toolsWithMatches: ToolWithMatches[] = recommended.map(tool => ({
      ...tool,
      _tagMatches: tool.tags.filter(tag => 
        tags.some(t => t.toLowerCase() === tag.toLowerCase())
      ).length
    }));
    
    recommended = toolsWithMatches
      .sort((a, b) => (b._tagMatches || 0) - (a._tagMatches || 0))
      .map(({ _tagMatches, ...tool }) => tool); // Remove the temporary _tagMatches property
  }
  
  // If we have enough recommendations, return them
  if (recommended.length >= limit) {
    return recommended.slice(0, limit);
  }
  
  // If we don't have enough recommendations, fill with other tools
  const remaining = tools
    .filter(tool => 
      !recommended.some(rec => rec.id === tool.id) && 
      (!currentToolId || tool.id !== currentToolId)
    )
    .slice(0, limit - recommended.length);
  
  return [...recommended, ...remaining];
}
