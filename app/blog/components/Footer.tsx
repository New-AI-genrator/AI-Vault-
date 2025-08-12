'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiTwitter, FiGithub, FiLinkedin, FiInstagram, FiRss } from 'react-icons/fi';

type FooterLink = {
  title: string;
  links: {
    name: string;
    href: string;
  }[];
};

const footerLinks: FooterLink[] = [
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Team', href: '/team' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Blog', href: '/blog' },
      { name: 'Tutorials', href: '/tutorials' },
      { name: 'Documentation', href: '/docs' },
      { name: 'Community', href: '/community' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' },
    ],
  },
];

const socialLinks = [
  { icon: <FiTwitter />, href: 'https://twitter.com', label: 'Twitter' },
  { icon: <FiGithub />, href: 'https://github.com', label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: <FiInstagram />, href: 'https://instagram.com', label: 'Instagram' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-secondary/50 border-t border-border/30">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                LuxeBlog
              </span>
            </div>
            <p className="text-text/70 mb-6">
              Delivering high-quality content and insights on technology, design, and development. 
              Join our community of passionate creators and learners.
            </p>
            
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text/60 hover:text-primary transition-colors"
                  whileHover={{ y: -2 }}
                  aria-label={social.label}
                >
                  <span className="sr-only">{social.label}</span>
                  <span className="text-xl">{social.icon}</span>
                </motion.a>
              ))}
              
              <motion.a
                href="/rss"
                className="ml-2 text-text/60 hover:text-orange-500 transition-colors flex items-center"
                whileHover={{ y: -2 }}
                aria-label="RSS Feed"
              >
                <span className="sr-only">RSS Feed</span>
                <FiRss className="text-xl" />
              </motion.a>
            </div>
          </div>
          
          {/* Footer Links */}
          {footerLinks.map((column, index) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-text/60 hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
          
          {/* Newsletter */}
          <motion.div
            className="lg:col-span-2 lg:col-start-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
              Newsletter
            </h3>
            <p className="text-text/70 text-sm mb-4">
              Subscribe to get the latest posts and updates.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-4 py-2 text-sm border border-r-0 border-border/30 rounded-l-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none bg-bg"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 text-sm font-medium rounded-r-lg hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-border/20 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-text/60">
            &copy; {currentYear} LuxeBlog. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm text-text/60 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-text/60 hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-sm text-text/60 hover:text-primary transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
