import { notFound } from 'next/navigation';
import { getToolById, getRecommendedTools } from '@/lib/tools';
import ToolRecommendations from '@/components/ToolRecommendations/ToolRecommendations';
import Image from 'next/image';
import Link from 'next/link';
import { FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';

export default async function ToolPage({ params }: { params: { id: string } }) {
  const tool = await getToolById(params.id);
  
  if (!tool) {
    notFound();
  }

  // Get recommended tools from the same category
  const recommendedTools = await getRecommendedTools(
    tool.id, 
    tool.category,
    tool.tags,
    3
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors mb-6"
        >
          <FaArrowLeft className="mr-2" /> Back to all tools
        </Link>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="p-8 md:w-2/3">
              <div className="flex items-center mb-6">
                {tool.logo ? (
                  <div className="w-16 h-16 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center mr-4 overflow-hidden border border-gray-200 dark:border-gray-600">
                    <Image 
                      src={tool.logo} 
                      alt={`${tool.name} logo`} 
                      width={48} 
                      height={48}
                      className="object-contain p-1"
                      onError={(e) => {
                        // Fallback to a placeholder if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = '/placeholder-logo.svg';
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-4">
                    <Image 
                      src="/placeholder-logo.svg" 
                      alt="" 
                      width={32} 
                      height={32} 
                      className="opacity-50"
                    />
                  </div>
                )}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {tool.name}
                  </h1>
                  <div className="flex items-center mt-1">
                    <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {tool.pricing}
                    </span>
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                      {tool.category} • {tool.subcategory}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
                {tool.description}
              </p>
              
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-8">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Visit Website
                  <FaExternalLinkAlt className="ml-2" size={12} />
                </a>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-8 md:w-1/3 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Tool Details
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Category</h4>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white capitalize">
                    {tool.category}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Subcategory</h4>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white capitalize">
                    {tool.subcategory}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Pricing</h4>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {tool.pricing}
                  </p>
                </div>
                
                {tool.launchDate && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Launch Date</h4>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {new Date(tool.launchDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recommended Tools */}
      {recommendedTools.length > 0 && (
        <div className="mt-16">
          <ToolRecommendations 
            currentToolId={tool.id}
            category={tool.category}
            tags={tool.tags}
            allTools={recommendedTools}
            maxTools={3}
          />
        </div>
      )}
    </div>
  );
}

// Generate static paths for all tools
export async function generateStaticParams() {
  const tools = await getTools();
  return tools.map((tool) => ({
    id: tool.id,
  }));
}
