'use client';

import { FiExternalLink, FiCopy, FiCheck, FiLink } from 'react-icons/fi';
import { useState } from 'react';
import Head from 'next/head';

const CodeBlock = ({ code, language = 'bash' }: { code: string; language?: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4">
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="flex justify-between items-center bg-gray-700 px-4 py-2 text-sm text-gray-300">
          <span>{language}</span>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1 text-xs hover:text-white transition-colors"
            title="Copy to clipboard"
          >
            {copied ? (
              <>
                <FiCheck className="w-4 h-4" /> Copied!
              </>
            ) : (
              <>
                <FiCopy className="w-4 h-4" /> Copy
              </>
            )}
          </button>
        </div>
        <pre className="p-4 overflow-x-auto text-sm">
          <code className="font-mono">{code}</code>
        </pre>
      </div>
    </div>
  );
};

const Heading = ({ id, children, level = 2 }: { id: string; children: React.ReactNode; level?: number }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <div className="group relative">
      <a
        href={`#${id}`}
        id={id}
        className="flex items-center gap-2 no-underline hover:underline"
      >
        <div className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-white" style={{ scrollMarginTop: '100px' }}>
          {children}
        </div>
        <FiLink className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </a>
    </div>
  );
};

export default function APIDocs() {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Head>
        <title>API Documentation | AI Tools Directory</title>
        <meta name="description" content="API documentation for the AI Tools Directory" />
      </Head>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI Tools Directory API
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Programmatic access to our curated collection of AI tools. Build amazing applications with our comprehensive API.
        </p>
      </div>

      <section className="mb-12">
        <Heading id="getting-started">Getting Started</Heading>
        <p className="mb-4">
          The AI Tools Directory API provides programmatic access to our database of AI tools. 
          All API endpoints return JSON-encoded responses and use standard HTTP response codes.
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Base URL</h3>
          <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded">
            <code className="text-blue-600 dark:text-blue-300">{baseUrl}/api</code>
            <button
              onClick={() => navigator.clipboard.writeText(`${baseUrl}/api`)}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <FiCopy className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <Heading id="authentication">Authentication</Heading>
        <p className="mb-4">
          Currently, the API is open and doesn't require authentication. However, we recommend including 
          a <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">User-Agent</code> header with your 
          application name and contact information for tracking purposes.
        </p>
      </section>

      <section className="mb-12">
        <Heading id="endpoints">Endpoints</Heading>
        
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 text-xs font-semibold rounded-full">GET</span>
            <h3 className="text-xl font-semibold">/api/tools</h3>
          </div>
          <p className="mb-4">Returns a paginated list of AI tools. Supports filtering, searching, and sorting.</p>
          
          <h4 className="font-semibold mt-6 mb-2">Query Parameters:</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Parameter</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-mono">category</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">string</td>
                  <td className="px-4 py-2 text-sm">Filter by category name</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-mono">search</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">string</td>
                  <td className="px-4 py-2 text-sm">Search in name, description, and tags</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-mono">limit</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">number</td>
                  <td className="px-4 py-2 text-sm">Number of results per page (default: 100, max: 100)</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-mono">offset</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">number</td>
                  <td className="px-4 py-2 text-sm">Pagination offset (default: 0)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className="font-semibold mt-6 mb-2">Example Request:</h4>
          <CodeBlock 
            code={`curl "${baseUrl}/api/tools?category=Writing&limit=5"`}
          />

          <h4 className="font-semibold mt-6 mb-2">Example Response:</h4>
          <CodeBlock 
            language="json"
            code={`{
  "data": [
    {
      "id": "example-tool",
      "name": "Example AI Tool",
      "description": "An amazing AI tool that does incredible things",
      "url": "https://example.com",
      "category": "Writing",
      "subcategory": "Content Generation",
      "pricing": "Freemium",
      "tags": ["AI", "Writing", "Productivity"],
      "rating": 4.5
    }
  ],
  "meta": {
    "total": 1,
    "limit": 5,
    "offset": 0,
    "hasMore": false
  }
}`}
          />
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 text-xs font-semibold rounded-full">GET</span>
            <h3 className="text-xl font-semibold">/api/tools/:id</h3>
          </div>
          <p className="mb-4">Returns detailed information about a specific AI tool.</p>
          
          <h4 className="font-semibold mt-6 mb-2">Path Parameters:</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Parameter</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-mono">id</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">string</td>
                  <td className="px-4 py-2 text-sm">The ID of the tool to retrieve</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className="font-semibold mt-6 mb-2">Example Request:</h4>
          <CodeBlock 
            code={`curl "${baseUrl}/api/tools/example-tool"`}
          />

          <h4 className="font-semibold mt-6 mb-2">Example Response:</h4>
          <CodeBlock 
            language="json"
            code={`{
  "data": {
    "id": "example-tool",
    "name": "Example AI Tool",
    "description": "An amazing AI tool that does incredible things",
    "url": "https://example.com",
    "category": "Writing",
    "subcategory": "Content Generation",
    "pricing": "Freemium",
    "tags": ["AI", "Writing", "Productivity"],
    "rating": 4.5,
    "features": ["Feature 1", "Feature 2", "Feature 3"],
    "pricingTiers": [
      {
        "name": "Free",
        "price": 0,
        "features": ["Basic features", "Limited usage"]
      },
      {
        "name": "Pro",
        "price": 19.99,
        "features": ["All features", "Higher limits", "Priority support"]
      }
    ]
  }
}`}
          />
        </div>
      </section>

      <section className="mb-12">
        <Heading id="rate-limiting">Rate Limiting</Heading>
        <p className="mb-4">
          The API is rate limited to 100 requests per minute per IP address. If you need higher limits, 
          please contact us at <a href="mailto:huzaifakarim612@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">huzaifakarim612@gmail.com</a>.
        </p>
      </section>

      <section className="mb-12">
        <Heading id="error-handling">Error Handling</Heading>
        <p className="mb-4">
          The API uses standard HTTP status codes to indicate success or failure of an API request.
        </p>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status Code</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-mono">200</td>
                <td className="px-4 py-2 text-sm">Success</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <td className="px-4 py-2 whitespace-nowrap text-sm font-mono">400</td>
                <td className="px-4 py-2 text-sm">Bad Request - Invalid parameters</td>
              </tr>
              <tr>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-mono">404</td>
                <td className="px-4 py-2 text-sm">Not Found - Resource doesn't exist</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <td className="px-4 py-2 whitespace-nowrap text-sm font-mono">429</td>
                <td className="px-4 py-2 text-sm">Too Many Requests - Rate limit exceeded</td>
              </tr>
              <tr>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-mono">500</td>
                <td className="px-4 py-2 text-sm">Internal Server Error - Something went wrong</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 text-center">
        <h2 className="text-2xl font-bold mb-3 text-blue-800 dark:text-blue-200">Need Help?</h2>
        <p className="mb-4 text-blue-700 dark:text-blue-300">
          If you have any questions or need assistance with the API, please contact us at
        </p>
        <a 
          href="mailto:huzaifakarim612@gmail.com" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          <FiExternalLink className="w-5 h-5" />
          huzaifakarim612@gmail.com
        </a>
        <p className="mt-4 text-sm text-blue-600 dark:text-blue-400">
          We're here to help you build amazing applications with our API!
        </p>
      </section>
    </div>
  );
}
