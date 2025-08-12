'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, 
  FiBookOpen, 
  FiTag, 
  FiClock, 
  FiCalendar, 
  FiArrowRight, 
  FiX, 
  FiChevronRight 
} from 'react-icons/fi';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1]
    } 
  }
};

// Types
type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
  tags?: string[];
  featured?: boolean;
};

// Mock data with premium, high-quality images from Unsplash
const allPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of AI in Business: 2024 Predictions',
    excerpt: 'Explore how AI is set to transform business operations, customer experiences, and decision-making processes in the coming year with our comprehensive analysis.',
    category: 'AI Trends',
    date: '2024-08-15',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1677442135136-760c813d9d5a?q=80&w=2070&auto=format&fit=crop',
    slug: 'future-of-ai-in-business-2024',
    tags: ['AI', 'Business', 'Trends', '2024'],
    featured: true
  },
  {
    id: 2,
    title: 'Top 15 AI Tools for Developers in 2024',
    excerpt: 'A comprehensive guide to the most powerful and innovative AI tools that are transforming the development landscape this year.',
    category: 'Tools',
    date: '2024-08-10',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2012&auto=format&fit=crop',
    slug: 'top-ai-tools-2024',
    tags: ['Development', 'AI Tools', 'Productivity']
  },
  {
    id: 3,
    title: 'How to Implement Machine Learning in Your Web App',
    excerpt: 'A step-by-step guide to integrating machine learning models into your web applications with practical examples and best practices.',
    category: 'Tutorial',
    date: '2024-08-05',
    readTime: '15 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    slug: 'ml-web-app',
    tags: ['Machine Learning', 'Web Development', 'Tutorial']
  },
  {
    id: 4,
    title: 'The Ethics of AI: Balancing Innovation and Responsibility',
    excerpt: 'Exploring the ethical considerations and responsibilities that come with developing and deploying AI technologies.',
    category: 'AI Ethics',
    date: '2024-07-28',
    readTime: '14 min read',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop',
    slug: 'ai-ethics',
    tags: ['AI', 'Ethics', 'Responsibility']
  },
  {
    id: 5,
    title: 'Getting Started with Natural Language Processing',
    excerpt: 'A beginner-friendly introduction to Natural Language Processing and how to get started with your first NLP project.',
    category: 'Tutorial',
    date: '2024-07-20',
    readTime: '12 min read',
    image: '/images/blog/nlp.jpg',
    slug: 'nlp-beginners',
    tags: ['NLP', 'Tutorial', 'Beginners']
  },
  {
    id: 6,
    title: 'The Future of Work in the Age of AI',
    excerpt: 'How artificial intelligence is reshaping the workplace and what it means for the future of jobs and skills.',
    category: 'AI Trends',
    date: '2024-07-15',
    readTime: '11 min read',
    image: '/images/blog/future-work.jpg',
    slug: 'future-work-ai',
    tags: ['AI', 'Future of Work', 'Trends']
  }
];

// Helper component for category badge
interface CategoryBadgeProps {
  category: string;
}

function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <motion.span 
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {category}
    </motion.span>
  );
}

// Helper component for post date
interface PostDateProps {
  date: string;
}

function PostDate({ date }: PostDateProps) {
  return (
    <motion.div 
      className="flex items-center text-sm text-gray-500 dark:text-gray-400"
      whileHover={{ x: 2 }}
    >
      <FiCalendar className="mr-1.5 h-4 w-4 flex-shrink-0" />
      <time dateTime={date}>
        {new Date(date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </time>
    </motion.div>
  );
}

// Helper component for reading time
interface ReadingTimeProps {
  minutes: string;
}

function ReadingTime({ minutes }: ReadingTimeProps) {
  return (
    <motion.div 
      className="flex items-center text-sm text-gray-500 dark:text-gray-400"
      whileHover={{ x: 2 }}
    >
      <FiClock className="mr-1.5 h-4 w-4 flex-shrink-0" />
      {minutes}
    </motion.div>
  );
}

// Helper component for post tags
interface PostTagsProps {
  tags?: string[];
  className?: string;
}

function PostTags({ tags, className = '' }: PostTagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 mt-4 ${className}`}>
      {tags.map((tag) => (
        <motion.span
          key={tag}
          whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)' }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200 border border-indigo-100 dark:border-indigo-800/50 cursor-pointer hover:shadow-md transition-all duration-200"
        >
          <FiTag className="mr-1.5 h-3 w-3 text-indigo-500" />
          {tag}
        </motion.span>
      ))}
    </div>
  );
};

interface BlogPageProps {}

function BlogPage({}: BlogPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get all unique categories and tags for filters
  const categories = useMemo(() => {
    const cats = new Set(allPosts.map(post => post.category));
    return Array.from(cats);
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    allPosts.forEach(post => {
      post.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  // Filter posts based on search query, category, and tag
  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      const matchesTag = !selectedTag || post.tags?.includes(selectedTag);
      
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchQuery, selectedCategory, selectedTag]);

  const featuredPost = filteredPosts.find(post => post.featured) || allPosts[0];
  const recentPosts = filteredPosts.filter(post => !post.featured);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Skeleton loader */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-xl w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-6"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <motion.div 
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 text-white py-20 md:py-28"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-100">
              AI Tools Blog
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-2xl leading-relaxed">
              Discover the latest trends, tutorials, and insights in AI and machine learning. 
              <span className="block mt-2 text-indigo-200">Stay ahead of the curve with expert analysis.</span>
            </p>
            <motion.div 
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <Link 
                href="#featured" 
                className="px-6 py-3 bg-white text-indigo-700 font-medium rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center group"
              >
                Read Featured
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link 
                href="#all-posts" 
                className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                Browse All Articles
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="lg:flex lg:space-x-8">
          {/* Sidebar with search and filters */}
          <div className="lg:w-1/4 mb-12 lg:mb-0">
            <motion.div 
              className="sticky top-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <FiSearch className="mr-2 text-indigo-500" />
                    Search Articles
                  </h3>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-white/50 dark:bg-gray-700/50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm dark:text-white transition-all duration-200"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        <FiX className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <FiBookOpen className="mr-2 text-indigo-500" />
                    Categories
                  </h3>
                  <div className="space-y-2">
                    <motion.button
                      whileHover={{ x: 5 }}
                      onClick={() => setSelectedCategory('')}
                      className={`flex items-center w-full text-left px-4 py-3 text-sm rounded-xl transition-all duration-200 ${
                        !selectedCategory 
                          ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 dark:from-indigo-900/30 dark:to-purple-900/30 dark:text-indigo-200 shadow-md' 
                          : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      <span className="flex-1">All Categories</span>
                      <span className="bg-white dark:bg-gray-800 text-xs px-2 py-1 rounded-full">
                        {allPosts.length}
                      </span>
                    </motion.button>
                    
                    {categories.map((category) => {
                      const count = allPosts.filter(post => post.category === category).length;
                      return (
                        <motion.button
                          key={category}
                          whileHover={{ x: 5 }}
                          onClick={() => setSelectedCategory(category)}
                          className={`flex items-center w-full text-left px-4 py-3 text-sm rounded-xl transition-all duration-200 ${
                            selectedCategory === category 
                              ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 dark:from-indigo-900/30 dark:to-purple-900/30 dark:text-indigo-200 shadow-md' 
                              : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50'
                          }`}
                        >
                          <span className="flex-1">{category}</span>
                          <span className="bg-white dark:bg-gray-800 text-xs px-2 py-1 rounded-full">
                            {count}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <FiTag className="mr-2 text-indigo-500" />
                    Popular Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedTag('')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                        !selectedTag 
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      All
                    </motion.button>
                    {allTags.map((tag) => (
                      <motion.button
                        key={tag}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                          selectedTag === tag 
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                        }`}
                      >
                        {tag}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Blog Posts Grid */}
          <motion.div 
            className="lg:w-3/4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {featuredPost ? 'Latest Articles' : 'All Articles'}
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {`${filteredPosts.length} ${filteredPosts.length === 1 ? 'post' : 'posts'} found`}
                <span className="mx-2">•</span>
                Showing {Math.min(1, filteredPosts.length)}-{filteredPosts.length} of {filteredPosts.length}
              </div>
            </div>

            {/* Featured Post */}
            {featuredPost && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Featured Post</h2>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0 md:w-1/3 relative h-64 md:h-auto">
                      <Image
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                        priority
                        quality={85}
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmNWY1ZjUiLz48L3N2Zz4="
                      />
                    </div>
                    <div className="p-8 md:w-2/3">
                      <div className="flex items-center mb-4">
                        <CategoryBadge category={featuredPost.category} />
                        <span className="mx-2 text-gray-400">•</span>
                        <PostDate date={featuredPost.date} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        {featuredPost.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <ReadingTime minutes={featuredPost.readTime} />
                        <Link 
                          href={`/blog/${featuredPost.slug}`}
                          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
                        >
                          Read more <FiArrowRight className="ml-1" />
                        </Link>
                      </div>
                      {featuredPost.tags && <PostTags tags={featuredPost.tags} className="mt-4" />}
                    </div>
                  </div>
                </div>
              </div>
            )}          

            {/* Recent Posts */}
            {recentPosts.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                  {featuredPost ? 'Latest Articles' : 'All Articles'}
                </h2>
                <motion.div 
                  className="grid gap-8 md:grid-cols-2 lg:grid-cols-2"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {recentPosts.map((post, index) => (
                    <motion.div 
                      key={post.id} 
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl flex flex-col h-full"
                      variants={itemVariants}
                      initial="hidden"
                      animate="show"
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="relative h-48">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                          quality={80}
                          placeholder="blur"
                          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmNWY1ZjUiLz48L3N2Zz4="
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center mb-3">
                          <CategoryBadge category={post.category} />
                          <span className="mx-2 text-gray-400">•</span>
                          <PostDate date={post.date} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="mt-auto">
                          <div className="flex items-center justify-between">
                            <ReadingTime minutes={post.readTime} />
                            <Link 
                              href={`/blog/${post.slug}`}
                              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
                            >
                              Read more <FiArrowRight className="ml-1" />
                            </Link>
                          </div>
                          {post.tags && <PostTags tags={post.tags} className="mt-4" />}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Newsletter CTA */}
      <motion.section 
        className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 py-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Stay Updated with AI Trends
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
            Subscribe to our newsletter and never miss an update on the latest AI tools and technologies.
          </p>
          <form className="mt-8 sm:flex max-w-xl mx-auto">
            <label htmlFor="email-address" className="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-5 py-3 border border-gray-300 shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter your email"
            />
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
              <button
                type="submit"
                className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </form>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            We care about your data. Read our{' '}
            <Link href="/privacy" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">
              Privacy Policy
            </Link>.
          </p>
        </div>
      </motion.section>
    </motion.div>
  );
}

export default BlogPage;
