import Link from 'next/link';
import { Metadata } from 'next';
import { FiArrowRight, FiCalendar, FiClock, FiTag, FiSearch, FiHome, FiMail } from 'react-icons/fi';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import '@/app/blog/styles/globals.css';
import './styles/blog-post.css';

export const metadata: Metadata = {
  title: 'AI Tools Blog - Latest News & Insights on AI & Machine Learning',
  description: 'Stay updated with the latest news, tutorials, and insights about AI tools, machine learning, and emerging technologies. Expert analysis and practical guides.',
  keywords: ['AI', 'Machine Learning', 'Artificial Intelligence', 'Tech Blog', 'AI Tools', 'ML', 'Data Science', 'Technology Trends'],
  authors: [{ name: 'AI Research Team' }],
  openGraph: {
    title: 'AI Tools Blog - Latest News & Insights',
    description: 'Expert analysis and practical guides on AI and Machine Learning technologies.',
    type: 'website',
    locale: 'en_US',
    url: 'https://yourdomain.com/blog',
    siteName: 'AI Tools Blog',
    images: [
      {
        url: '/images/blog/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Tools Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tools Blog - Latest News & Insights',
    description: 'Expert analysis and practical guides on AI and Machine Learning technologies.',
    images: ['/images/blog/og-image.jpg'],
  },
};

const categories = [
  { name: 'Tutorials', slug: 'tutorials', count: 12 },
  { name: 'News', slug: 'news', count: 8 },
  { name: 'Tool Reviews', slug: 'reviews', count: 15 },
  { name: 'AI Trends', slug: 'trends', count: 7 },
  { name: 'Guides', slug: 'guides', count: 10 },
];

const popularPosts = [
  {
    title: 'Top 10 AI Tools for Content Creation',
    slug: 'top-10-ai-tools-content-creation',
    date: '2024-08-05',
  },
  {
    title: 'How to Integrate AI into Your Workflow',
    slug: 'how-to-integrate-ai-workflow',
    date: '2024-07-28',
  },
  {
    title: 'The Future of AI in Business',
    slug: 'future-ai-business',
    date: '2024-07-15',
  },
];

type BlogLayoutProps = {
  children: React.ReactNode;
  showSearch?: boolean;
};

export default function BlogLayout({ children, showSearch = true }: BlogLayoutProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10 border-b border-amber-100 dark:border-amber-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <FiHome className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">Home</span>
              </Link>
              <div className="hidden md:ml-10 md:flex md:space-x-8">
                <Link href="/blog" className="border-b-2 border-amber-500 text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Blog
                </Link>
                <Link href="/blog/category/tutorials" className="text-gray-500 hover:border-amber-300 hover:text-amber-700 dark:text-gray-300 dark:hover:text-amber-400 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium transition-colors duration-200">
                  Tutorials
                </Link>
                <Link href="/blog/category/guides" className="text-gray-500 hover:border-amber-300 hover:text-amber-700 dark:text-gray-300 dark:hover:text-amber-400 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium transition-colors duration-200">
                  Guides
                </Link>
                <Link href="/about" className="text-gray-500 hover:border-amber-300 hover:text-amber-700 dark:text-gray-300 dark:hover:text-amber-400 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium transition-colors duration-200">
                  About
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 p-2 transition-colors duration-200">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/company/yourcompany" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 p-2 transition-colors duration-200">
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 p-2 transition-colors duration-200">
                <FaGithub className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AI & Machine Learning Blog</h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            Expert insights, tutorials, and the latest developments in Artificial Intelligence and Machine Learning
          </p>
          
          {showSearch && (
            <div className="mt-8 max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="block w-full pl-10 pr-3 py-3 border border-transparent rounded-md leading-5 bg-indigo-500 bg-opacity-25 text-white placeholder-indigo-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 focus:text-gray-900"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-400 transition-colors duration-200">
                  <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L4 11.414V18a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414Z" className="fill-current"/>
                  </svg>
                  Home
                </Link>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Blog</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <main className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 md:p-8 border border-amber-50 dark:border-amber-900/30">
            {children}
          </main>
          
          {/* Sidebar */}
          <aside className="md:w-80 space-y-8 sticky top-6 h-fit">
            {/* Categories */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-amber-50 dark:border-amber-900/30">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FiTag className="mr-2" />
                  Categories
                </h2>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.slug}>
                      <Link 
                        href={`/blog/category/${category.slug}`}
                        className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors duration-200 group"
                      >
                        <span>{category.name}</span>
                        <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 text-xs font-medium px-2 py-1 rounded-full group-hover:bg-amber-200 dark:group-hover:bg-amber-800/50 transition-colors duration-200">
                          {category.count}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Popular Posts */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-amber-50 dark:border-amber-900/30">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Popular Posts</h2>
                <div className="space-y-4">
                  {popularPosts.map((post) => (
                    <Link 
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="block group"
                    >
                      <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {post.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <FiCalendar className="mr-1.5 h-4 w-4" />
                        {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/10 rounded-xl p-6 border border-amber-100 dark:border-amber-900/30">
              <div className="flex items-center mb-3">
                <FiMail className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2" />
                <h2 className="text-xl font-semibold text-amber-800 dark:text-amber-200">Stay Updated</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Get the latest AI & ML insights, tutorials, and resources delivered to your inbox.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 text-sm border border-amber-200 dark:border-amber-700 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-amber-900/20 dark:text-amber-100 placeholder-amber-400/70"
                  required
                  aria-label="Email address for newsletter subscription"
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-amber-900 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-200 transform hover:-translate-y-0.5 shadow-sm"
                >
                  Subscribe Now
                  <FiArrowRight className="ml-2 h-4 w-4" />
                </button>
              </form>
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                We respect your privacy. Unsubscribe at any time. No spam, ever.
              </p>
            </div>

            {/* Tags */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-amber-50 dark:border-amber-900/30">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Popular Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {['AI', 'Machine Learning', 'Productivity', 'ChatGPT', 'Automation', 'NLP', 'Computer Vision', 'Startups', 'Data Science', 'Neural Networks'].map((tag) => (
                    <Link 
                      key={tag} 
                      href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">AI Tools Blog</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Your trusted source for AI and Machine Learning insights, tutorials, and the latest developments in the field.
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                  <FaTwitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                  <FaLinkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                  <FaGithub className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Categories</h4>
              <ul className="space-y-2">
                {categories.slice(0, 5).map((category) => (
                  <li key={category.slug}>
                    <Link href={`/blog/category/${category.slug}`} className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 text-sm">
                      {category.name} ({category.count})
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 text-sm">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 text-sm">Contact</Link></li>
                <li><Link href="/privacy" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 text-sm">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 text-sm">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Newsletter</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">Subscribe to get the latest posts to your inbox.</p>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} AI Tools Blog. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// This function generates static params for better performance
export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}
