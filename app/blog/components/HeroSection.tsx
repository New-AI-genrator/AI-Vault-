'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-bg to-secondary/5 dark:from-primary/10 dark:to-secondary/10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center mix-blend-overlay opacity-10 dark:opacity-5"></div>
        
        {/* Animated shapes */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-full backdrop-blur-sm">
              Welcome to LuxeBlog
            </span>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Discover & Share{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Amazing Stories
            </span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-text/80 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore thought-provoking articles, tutorials, and stories from our community of writers. 
            Dive into the latest trends in technology, design, and more.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link 
              href="#featured" 
              className="btn btn-primary px-8 py-4 text-lg font-medium"
            >
              Explore Articles
            </Link>
            <Link 
              href="#subscribe" 
              className="btn bg-transparent border-2 border-text/20 hover:border-primary/50 text-text hover:text-primary px-8 py-4 text-lg font-medium transition-colors"
            >
              Subscribe
            </Link>
          </motion.div>
        </div>

        {/* Featured Categories */}
        <motion.div 
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {['Technology', 'Design', 'Business', 'Lifestyle'].map((category, index) => (
            <div 
              key={category}
              className="group relative overflow-hidden rounded-2xl bg-bg-secondary/50 backdrop-blur-sm border border-border/20 p-6 transition-all duration-500 hover:shadow-lg hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl">{['💻', '🎨', '📈', '🌟'][index]}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{category}</h3>
                <p className="text-sm text-text/60">
                  {[
                    'Latest in tech and innovation',
                    'Creative design inspiration',
                    'Business strategies & growth',
                    'Lifestyle and wellness tips'
                  ][index]}
                </p>
                <div className="mt-4 text-sm text-primary font-medium flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  Read more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
