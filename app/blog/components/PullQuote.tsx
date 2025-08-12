import { ReactNode } from 'react';

interface PullQuoteProps {
  children: ReactNode;
  author?: string;
  cite?: string;
  className?: string;
}

export default function PullQuote({ 
  children, 
  author, 
  cite, 
  className = '' 
}: PullQuoteProps) {
  return (
    <figure className={`my-12 ${className}`}>
      <blockquote 
        className="relative p-8 text-2xl md:text-3xl font-serif italic text-text/90 leading-relaxed
                 before:content-['\201C'] before:absolute before:top-0 before:left-0 before:text-7xl 
                 before:opacity-10 before:font-bold before:leading-none before:font-sans
                 after:content-['\201D'] after:absolute after:bottom-0 after:right-0 after:text-7xl
                 after:opacity-10 after:font-bold after:leading-none after:font-sans"
      >
        {children}
      </blockquote>
      {(author || cite) && (
        <figcaption className="mt-4 text-right text-text/60 italic">
          {author && <span className="font-medium">{author}</span>}
          {author && cite && ', '}
          {cite && (
            <cite className="not-italic">
              <a 
                href={cite} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Source
              </a>
            </cite>
          )}
        </figcaption>
      )}
    </figure>
  );
}
