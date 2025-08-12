import { Tool } from '@/types/tool';
import { toolCategories } from '@/components/AIAssistant/AIAssistantButton';

export async function getTools(): Promise<Tool[]> {
  // In a real app, this would be an API call
  // For now, we'll use the tools from AIAssistantButton
  const allTools: Tool[] = [];
  
  toolCategories.forEach((category) => {
    category.tools.forEach((tool) => {
      allTools.push({
        ...tool,
        // Ensure all required fields are present
        id: tool.id || `${tool.name.toLowerCase().replace(/\s+/g, '-')}`,
        subcategory: tool.subcategory || 'general',
        pricing: tool.pricing || 'Free',
        tags: tool.tags || [],
        category: category.name.toLowerCase()
      });
    });
  });
  
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
  let tools = await getTools();
  
  // Filter out current tool
  if (currentToolId) {
    tools = tools.filter(tool => tool.id !== currentToolId);
  }
  
  // Filter by category if provided
  if (category) {
    tools = tools.filter(tool => 
      tool.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  // Sort by tag matches
  if (tags.length > 0) {
    tools = tools.sort((a, b) => {
      const aMatches = a.tags.filter(tag => tags.includes(tag)).length;
      const bMatches = b.tags.filter(tag => tags.includes(tag)).length;
      return bMatches - aMatches;
    });
  }
  
  // Take top N tools
  let selectedTools = tools.slice(0, limit);
  
  // If we don't have enough tools, fill with random ones
  if (selectedTools.length < limit) {
    const remaining = tools
      .filter(tool => !selectedTools.some(selected => selected.id === tool.id))
      .sort(() => 0.5 - Math.random())
      .slice(0, limit - selectedTools.length);
    
    selectedTools = [...selectedTools, ...remaining];
  }
  
  return selectedTools;
}
