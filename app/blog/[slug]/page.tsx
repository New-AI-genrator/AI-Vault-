import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  FiArrowLeft, 
  FiCalendar, 
  FiClock, 
  FiTag, 
  FiTwitter,
  FiLinkedin,
  FiArrowRight
} from 'react-icons/fi';

// Import types and data from a shared location
import type { BlogPost } from '../types';
import { allPosts } from '../data';

// Format date for display
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Get post by slug
const getPostBySlug = (slug: string): BlogPost | undefined => {
  return allPosts.find((post: BlogPost) => post.slug === slug);
};

// Helper component for rendering post tags
const PostTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-wrap gap-2 mt-4">
    {tags.map((tag) => (
      <span 
        key={tag}
        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200"
      >
        {tag}
      </span>
    ))}
  </div>
);

export default function BlogPostPage({ params }: { params: { slug: string } }): JSX.Element {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Get related posts (excluding current post)
  const relatedPosts = allPosts
    .filter((p: BlogPost) => p.slug !== post.slug)
    .slice(0, 3);
    
  // Parse the content HTML safely
  const postContent = post.content || '';

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors group"
        >
          <FiArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Blog
        </Link>
      </div>

      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8">
          <span className="inline-block bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 dark:from-indigo-900/30 dark:to-purple-900/30 dark:text-indigo-200 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            {post.title}
          </h1>
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-8">
            <span className="flex items-center">
              <FiCalendar className="mr-1.5" />
              {formatDate(post.date)}
            </span>
            <span className="mx-2">•</span>
            <span className="flex items-center">
              <FiClock className="mr-1.5" />
              {post.readTime}
            </span>
          </div>
        </div>

        <div className="relative w-full h-96 mb-12 rounded-2xl overflow-hidden shadow-xl">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmNWY1ZjUiLz48L3N2Zz4="
          />
        </div>

          
        {/* Post content */}
        <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: postContent }} />
        
        {/* Post tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Author bio */}
        <div className="mt-16 bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {post.author.name}
              </h3>
              <p className="text-indigo-600 dark:text-indigo-400 text-sm mb-3">
                {post.author.role}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {post.author.bio || 'Technology enthusiast and content creator passionate about AI and web development.'}
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <FiTwitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <FiLinkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Social sharing */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Share this article</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Found this article helpful? Share it with others.</p>
            </div>
            <div className="flex space-x-4">
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors">
                <FiTwitter className="w-5 h-5" />
              </button>
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors">
                <FiLinkedin className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">You might also like</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <article key={relatedPost.slug} className="group">
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="mt-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>{formatDate(relatedPost.date)}</span>
                      <span className="mx-2">•</span>
                      <span>{relatedPost.readTime}</span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        )}
        
        {/* Newsletter signup */}
        <div className="mt-16 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 p-8 rounded-2xl">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Stay updated with the latest AI trends</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Subscribe to our newsletter and never miss an update on the latest AI tools and technologies.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </article>
      
      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">You might also like</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <article key={relatedPost.slug} className="group">
                <Link href={`/blog/${relatedPost.slug}`}>
                  <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                  <div className="mt-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>{formatDate(relatedPost.date)}</span>
                    <span className="mx-2">•</span>
                    <span>{relatedPost.readTime}</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      )}
      
      {/* Newsletter signup */}
      <div className="mt-16 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 p-8 rounded-2xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Stay updated with the latest AI trends</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Subscribe to our newsletter and never miss an update on the latest AI tools and technologies.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
