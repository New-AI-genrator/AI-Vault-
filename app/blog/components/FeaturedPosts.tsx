'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiClock, FiCalendar, FiArrowRight } from 'react-icons/fi';

type Post = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
  tags?: string[];
};

const mockPosts: Post[] = [
  {
    id: '1',
    title: 'The Future of Web Development in 2024',
    excerpt: 'Exploring the latest trends and technologies shaping the future of web development.',
    category: 'Technology',
    date: '2024-03-15',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    slug: 'future-of-web-dev-2024',
    tags: ['Web Development', 'Trends', '2024']
  },
  {
    id: '2',
    title: 'Mastering Modern CSS Grid Layouts',
    excerpt: 'A comprehensive guide to creating responsive layouts with CSS Grid.',
    category: 'Design',
    date: '2024-03-10',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    slug: 'modern-css-grid-layouts',
    tags: ['CSS', 'Design', 'Layouts']
  },
  {
    id: '3',
    title: 'Building Scalable APIs with Next.js 14',
    excerpt: 'Learn how to build high-performance APIs using the latest Next.js features.',
    category: 'Development',
    date: '2024-03-05',
    readTime: '15 min read',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    slug: 'scalable-apis-nextjs-14',
    tags: ['Next.js', 'API', 'Backend']
  },
  {
    id: '4',
    title: 'The Art of Microinteractions',
    excerpt: 'How subtle animations can significantly improve user experience and engagement.',
    category: 'UI/UX',
    date: '2024-02-28',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    slug: 'art-of-microinteractions',
    tags: ['UI/UX', 'Animation', 'Design']
  },
  {
    id: '5',
    title: 'State Management in 2024',
    excerpt: 'Comparing the latest state management solutions for modern web applications.',
    category: 'Development',
    date: '2024-02-20',
    readTime: '14 min read',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    slug: 'state-management-2024',
    tags: ['React', 'State', 'Frontend']
  },
  {
    id: '6',
    title: 'Designing for Accessibility',
    excerpt: 'Best practices and techniques for creating accessible web applications.',
    category: 'Design',
    date: '2024-02-15',
    readTime: '11 min read',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d6e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    slug: 'designing-for-accessibility',
    tags: ['Accessibility', 'Design', 'Inclusive']
  }
];

const FeaturedPosts = () => {
  // Featured post (first in array)
  const featuredPost = mockPosts[0];
  // Recent posts (rest of the array)
  const recentPosts = mockPosts.slice(1);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section id="featured" className="py-20 bg-bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium text-primary bg-primary/10 px-4 py-1.5 rounded-full">
            Latest Articles
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
            Featured <span className="text-primary">Stories</span>
          </h2>
          <p className="text-text/70 max-w-2xl mx-auto">
            Discover the latest insights, tutorials, and stories from our community of experts.
          </p>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.article 
            className="group relative overflow-hidden rounded-2xl mb-20 shadow-xl hover:shadow-2xl transition-shadow duration-500"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
            <div className="relative z-20 p-8 md:p-12 lg:p-16 flex flex-col justify-end min-h-[500px]">
              <div className="max-w-3xl">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full">
                    {featuredPost.category}
                  </span>
                  <div className="flex items-center text-sm text-white/80">
                    <FiCalendar className="mr-1.5" />
                    {formatDate(featuredPost.date)}
                  </div>
                  <div className="flex items-center text-sm text-white/80">
                    <FiClock className="mr-1.5" />
                    {featuredPost.readTime}
                  </div>
                </div>
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h3>
                <p className="text-white/80 mb-6">
                  {featuredPost.excerpt}
                </p>
                <Link 
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center text-white font-medium group-hover:text-primary transition-colors"
                >
                  Read full story
                  <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.article>
        )}

        {/* Recent Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="group bg-bg rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 flex flex-col h-full"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (index % 3) }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center text-xs text-text/60">
                    <FiCalendar className="mr-1" />
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-text/70 text-sm mb-4 flex-grow">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/20">
                  <div className="flex items-center text-sm text-text/60">
                    <FiClock className="mr-1.5" />
                    {post.readTime}
                  </div>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-sm font-medium text-primary flex items-center group-hover:underline"
                  >
                    Read more
                    <FiArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link 
            href="/blog" 
            className="inline-flex items-center px-8 py-3 border-2 border-primary/20 text-primary font-medium rounded-full hover:bg-primary/5 transition-colors"
          >
            View All Articles
            <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
