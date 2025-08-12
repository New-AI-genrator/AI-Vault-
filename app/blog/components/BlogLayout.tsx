'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import LazyImage from './LazyImage';
import LazyLoad from './LazyLoad';
import { FiCalendar, FiClock, FiTag, FiUser, FiShare2, FiBookmark } from 'react-icons/fi';
import ReadingProgress from './ReadingProgress';
import PullQuote from './PullQuote';

interface BlogLayoutProps {
  title: string;
  excerpt: string;
  author: string;
  authorImage: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags?: string[];
  children: ReactNode;
}

export default function BlogLayout({
  title,
  excerpt,
  author,
  authorImage,
  date,
  readTime,
  category,
  image,
  tags = [],
  children,
}: BlogLayoutProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <ReadingProgress />
      
      {/* Article Header */}
      <header className="mb-12">
        <div className="mb-6">
          <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full">
            {category}
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">{title}</h1>
        
        <p className="text-xl text-text/80 mb-8">{excerpt}</p>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <LazyImage
                src={authorImage}
                alt={author}
                className="object-cover"
                placeholderSrc="/images/placeholder-avatar.jpg"
              />
            </div>
            <div>
              <p className="font-medium">{author}</p>
              <div className="flex items-center text-sm text-text/60 space-x-4">
                <span className="flex items-center">
                  <FiCalendar className="mr-1.5" />
                  {formattedDate}
                </span>
                <span className="flex items-center">
                  <FiClock className="mr-1.5" />
                  {readTime}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-text/60 hover:text-primary transition-colors">
              <FiBookmark className="w-5 h-5" />
              <span className="sr-only">Save</span>
            </button>
            <button className="p-2 text-text/60 hover:text-primary transition-colors">
              <FiShare2 className="w-5 h-5" />
              <span className="sr-only">Share</span>
            </button>
          </div>
        </div>
        
        <LazyLoad>
          {image && (
            <div className="relative w-full h-80 md:h-[500px] rounded-2xl overflow-hidden mb-8">
              <LazyImage
                src={image}
                alt={title}
                className="object-cover"
                priority
                placeholderSrc="/images/placeholder-blog.jpg"
              />
            </div>
          )}
        </LazyLoad>
      </header>
      
      {/* Article Content */}
      <LazyLoad>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="prose-headings:font-serif prose-headings:font-bold prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl">
            {children}
          </div>
          
          {tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border/20">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span 
                    key={tag}
                    className="inline-flex items-center px-3 py-1.5 text-sm bg-bg-secondary rounded-full text-text/80 hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <FiTag className="mr-1.5 w-3.5 h-3.5" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Author Bio */}
          <LazyLoad>
            <div className="mt-12 p-6 bg-bg-secondary/50 rounded-2xl flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                <LazyImage
                  src={authorImage}
                  alt={author}
                  className="object-cover"
                  placeholderSrc="/images/placeholder-avatar.jpg"
                />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-lg font-semibold">Written by {author}</h3>
                <p className="text-text/70 mt-1">
                  {author} is a passionate writer and developer with expertise in modern web technologies. 
                  They love sharing knowledge and helping others grow in their coding journey.
                </p>
              </div>
            </div>
          </LazyLoad>
        </div>
      </LazyLoad>
    </article>
  );
}
