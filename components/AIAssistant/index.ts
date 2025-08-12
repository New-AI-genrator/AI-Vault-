import dynamic from 'next/dynamic';

// Import the AI Assistant component with SSR disabled since it uses browser APIs
const AIAssistantButton = dynamic(
  () => import('./AIAssistantButton'),
  { ssr: false }
);

export default AIAssistantButton;
