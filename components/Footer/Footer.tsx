import Link from 'next/link';
import { FaGithub, FaTwitter, FaEnvelope, FaRocket, FaTools, FaBookOpen } from 'react-icons/fa';
import dynamic from 'next/dynamic';

// Dynamically import the Newsletter component with no SSR
const Newsletter = dynamic(
  () => import('@/components/Newsletter/Newsletter'),
  { ssr: false }
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Newsletter 
              title="Stay Ahead in AI"
              description="Get the latest AI tools and updates delivered to your inbox every week."
            />
          </div>
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
              <FaRocket className="mr-2 text-blue-500" />
              AI Tools Directory
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Discover and compare the best AI tools to boost your productivity and creativity.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/yourusername/ai-tools-directory" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 text-sm transition-colors">Home</Link></li>
              <li><Link href="/tools" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 text-sm transition-colors">All Tools</Link></li>
              <li><Link href="/categories" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 text-sm transition-colors">Categories</Link></li>
              <li><Link href="/favorites" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 text-sm transition-colors">My Favorites</Link></li>
              <li><Link href="/api-docs" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 text-sm transition-colors">API</Link></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 text-sm transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 text-sm transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 text-sm transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 text-sm transition-colors">Guides</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                <FaEnvelope className="mr-2 text-blue-500" />
                <a href="mailto:huzaifakarim612@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  huzaifakarim612@gmail.com
                </a>
              </li>
              <li className="text-gray-600 dark:text-gray-300 text-sm">
                <button className="flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                  <FaTools className="mr-2" />
                  Submit a Tool
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {currentYear} AI Tools Directory. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
          
          <div className="mt-4 text-center md:text-left">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Made with ❤️ for the AI community | Version 1.0.0
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
