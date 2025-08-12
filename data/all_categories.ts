// Core Content Categories
const coreCategories = [
  {
    name: "Image Generation",
    icon: "🖼️",
    toolCount: 100,
    subcategories: [
      { name: "AI Art", favicon: "/favicons/ai-art.png", website: "https://www.midjourney.com" },
      { name: "Photo Editing", favicon: "/favicons/photo-editing.png", website: "https://www.adobe.com/photoshop" },
      { name: "Avatar Creation", favicon: "/favicons/avatar-creation.png", website: "https://www.artbreeder.com" },
      { name: "Design Tools", favicon: "/favicons/design-tools.png", website: "https://www.figma.com" },
      { name: "3D Rendering", favicon: "/favicons/3d-rendering.png", website: "https://www.blender.org" }
    ]
  },
  // ... (other core categories)
];

// Business & Productivity Categories
const businessCategories = [
  {
    name: "SEO & Website Tools",
    icon: "🔍",
    toolCount: 100,
    subcategories: [
      { name: "Keyword Research", favicon: "/favicons/keyword-research.png", website: "https://ahrefs.com" },
      { name: "Content Optimization", favicon: "/favicons/seo-optimization.png", website: "https://www.semrush.com" },
      { name: "Technical SEO", favicon: "/favicons/technical-seo.png", website: "https://www.screamingfrog.com" },
      { name: "Local SEO", favicon: "/favicons/local-seo.png", website: "https://moz.com/local" },
      { name: "Backlink Analysis", favicon: "/favicons/backlinks.png", website: "https://ahrefs.com/backlink-checker" }
    ]
  },
  // ... (other business categories)
];

// Specialized AI Categories
const specializedAICategories = [
  {
    name: "AI Code Assistants",
    icon: "👨‍💻",
    toolCount: 60,
    subcategories: [
      { name: "Code Generation", favicon: "/favicons/code-generation.png", website: "https://github.com/features/copilot" },
      { name: "Code Review", favicon: "/favicons/code-review.png", website: "https://www.sonarsource.com" },
      { name: "Debugging", favicon: "/favicons/debugging.png", website: "https://www.tabnine.com" },
      { name: "Documentation", favicon: "/favicons/documentation.png", website: "https://www.sourcery.ai" },
      { name: "Pair Programming", favicon: "/favicons/pair-programming.png", website: "https://replit.com/site/ai" }
    ]
  },
  // ... (other specialized AI categories)
];

// Export all categories
// Note: This is a simplified structure. The actual file would contain all categories.
// For now, we're just showing the structure to avoid timeouts.

export const categories = [
  ...coreCategories,
  ...businessCategories,
  ...specializedAICategories
  // Other category groups would be added here
];
