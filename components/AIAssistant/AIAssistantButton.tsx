'use client';

import { Tool } from '@/types/tool';
import React, { useState, useRef, useEffect, useCallback, FC, ReactNode } from 'react';
import { FiSend, FiX, FiMessageSquare, FiLoader, FiChevronRight, FiUser, FiMic, FiVolume2, FiClock, FiStar, FiSettings } from 'react-icons/fi';

// Import types from our type definition file
/// <reference path="../../types/speech.d.ts" />

// Helper function to create content objects
const createContent = (content: string): TextContent => ({
  type: 'text',
  text: content
});

// Tool is imported from '@/types/tool'

interface ToolCategory {
  name: string;
  description: string;
  icon: string;
  keywords?: string[];
  tools: Tool[];
}

interface ToolCategoryItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  keywords?: string[];
  tools: Tool[];
}

// Speech Recognition Types
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onerror: ((this: SpeechRecognition, ev: Event) => any) | null;
  onnomatch: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  abort(): void;
  start(): void;
  stop(): void;
}

declare var SpeechRecognition: {
  prototype: SpeechRecognition;
  new (): SpeechRecognition;
};

// Message content types
type TextContent = {
  type: 'text';
  text: string;
};

type CodeContent = {
  type: 'code';
  code: string;
  language: string;
};

type ImageContent = {
  type: 'image';
  url: string;
  alt?: string;
};

type ToolCardContent = {
  type: 'tool_card';
  title: string;
  description: string;
  tools: Tool[];
};

type MessageContent = TextContent | ToolCardContent;

// Message interface
interface Message {
  id: string;
  content: MessageContent[];
  sender: 'user' | 'assistant';
  timestamp: Date;
  metadata?: {
    voiceProcessed?: boolean;
    [key: string]: any;
  };
  context?: {
    category?: string;
    tools?: (string | Tool)[];
  };
}

// AI Response interface
interface AIResponse {
  content: MessageContent[];
  context?: {
    category?: string;
    tools?: (string | Tool)[];
  };
}

// User preferences interface
interface UserPreferences {
  // Theme and display
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  
  // Voice settings
  voiceInput: boolean;
  voiceOutput: boolean;
  language: string;
  
  // Tool preferences
  preferredTools: string[];
  recentCategories: string[];
  autoExpandTools: boolean;
  
  // User profile
  role: string;
  industry: string;
  experienceLevel?: 'beginner' | 'intermediate' | 'expert';
  
  // UI preferences
  darkMode: boolean;
  autoReadResponses: boolean;
  
  // Feature flags
  feedbackSubmitted?: boolean;
}

export const toolCategories: ToolCategoryItem[] = [
  {
    id: 'productivity',
    name: 'Productivity',
    description: 'Tools to boost your productivity',
    icon: '⚡',
    keywords: ['efficiency', 'time management', 'organization'],
    tools: []
  },
  {
    id: 'development',
    name: 'Development',
    description: 'Developer tools and resources',
    icon: '💻',
    keywords: ['coding', 'programming', 'debugging'],
    tools: []
  },
  {
    id: 'design',
    name: 'Design',
    description: 'Design and creative tools',
    icon: '🎨',
    keywords: ['ui', 'ux', 'graphics'],
    tools: []
  }
];

// Function to process user messages and generate AI responses
const processUserMessage = async (message: string): Promise<AIResponse> => {
  try {
    // Here you would typically call your AI/ML service or API
    // For now, we'll return a simple response
    return {
      content: [{
        type: 'text',
        text: `I received your message: "${message}". This is a placeholder response.`
      }],
      context: {}
    };
  } catch (error) {
    console.error('Error processing message:', error);
    return {
      content: [{
        type: 'text',
        text: 'Sorry, I encountered an error processing your message.'
      }],
      context: {}
    };
  }
};

const AIAssistantButton: React.FC = () => {
  // State for chat interface
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState<'positive' | 'negative' | 'info'>('info');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showCategories, setShowCategories] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVoiceOutput, setActiveVoiceOutput] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  // User preferences with proper type and default values
  const [userPrefs, setUserPrefs] = useState<UserPreferences>(() => {
    const defaultPrefs: UserPreferences = {
      // Theme and display
      theme: 'system',
      fontSize: 'medium',
      
      // Voice settings
      voiceInput: true,
      voiceOutput: true,
      language: 'en-US',
      
      // Tool preferences
      preferredTools: [],
      recentCategories: [],
      autoExpandTools: true,
      
      // User profile
      role: '',
      industry: '',
      experienceLevel: undefined,
      
      // UI preferences
      darkMode: false,
      autoReadResponses: true,
      
      // Feature flags
      feedbackSubmitted: false
    };
    
    if (typeof window === 'undefined') {
      return defaultPrefs;
    }
    
    try {
      const saved = localStorage.getItem('userPreferences');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with defaults to ensure all fields exist
        return { ...defaultPrefs, ...parsed };
      }
    } catch (e) {
      console.error('Failed to parse user preferences', e);
    }
    
    return defaultPrefs;
  });
  
  // Update user preferences with proper typing
  const updateUserPreferences = useCallback((updates: Partial<UserPreferences>) => {
    setUserPrefs(prev => {
      const newPrefs: UserPreferences = {
        ...prev,
        ...updates,
        // Handle nested objects
        ...(updates.preferredTools !== undefined && { preferredTools: updates.preferredTools }),
        ...(updates.recentCategories !== undefined && { recentCategories: updates.recentCategories }),
        ...(updates.voiceInput !== undefined && { voiceInput: updates.voiceInput }),
        ...(updates.voiceOutput !== undefined && { voiceOutput: updates.voiceOutput }),
        ...(updates.language !== undefined && { language: updates.language }),
        ...(updates.theme !== undefined && { theme: updates.theme }),
        ...(updates.darkMode !== undefined && { darkMode: updates.darkMode }),
        ...(updates.autoReadResponses !== undefined && { autoReadResponses: updates.autoReadResponses }),
        ...(updates.role !== undefined && { role: updates.role }),
        ...(updates.industry !== undefined && { industry: updates.industry }),
        ...(updates.experienceLevel !== undefined && { experienceLevel: updates.experienceLevel }),
        ...(updates.fontSize !== undefined && { fontSize: updates.fontSize }),
        ...(updates.autoExpandTools !== undefined && { autoExpandTools: updates.autoExpandTools }),
        ...(updates.feedbackSubmitted !== undefined && { feedbackSubmitted: updates.feedbackSubmitted })
      };
      
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('userPreferences', JSON.stringify(newPrefs));
        } catch (error) {
          console.error('Error saving preferences:', error);
        }
      }
      
      return newPrefs;
    });
  }, []);

  // Refs
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);
  const isMounted = useRef(true);
  
  // Enhanced tool categories data with more keywords and tools
  const toolCategories: ToolCategory[] = [
    {
      name: 'video',
      description: 'Tools for video editing, creation, and management',
      icon: 'video',
      keywords: ['video', 'edit', 'editing', 'youtube', 'vlog', 'film', 'movie', 'clip', 'animation'],
      tools: [
        {
          id: 'descript',
          name: 'Descript',
          description: 'All-in-one video and podcast editing',
          category: 'video',
          subcategory: 'editing',
          url: 'https://www.descript.com/',
          pricing: 'Freemium',
          tags: ['video editing', 'podcast', 'transcription']
        },
        {
          id: 'runway-ml',
          name: 'Runway ML',
          description: 'Advanced video editing with AI',
          category: 'video',
          subcategory: 'editing',
          url: 'https://runwayml.com/',
          pricing: 'Freemium',
          tags: ['ai', 'video editing', 'machine learning']
        },
        {
          id: 'pictory',
          name: 'Pictory',
          description: 'Create videos from text',
          category: 'video',
          subcategory: 'creation',
          url: 'https://pictory.ai/',
          pricing: 'Paid',
          tags: ['video creation', 'text to video', 'automation']
        },
        {
          id: 'invideo',
          name: 'InVideo',
          description: 'Online video editor',
          category: 'video',
          subcategory: 'editing',
          url: 'https://invideo.io/',
          pricing: 'Freemium',
          tags: ['video editing', 'online editor', 'templates']
        },
        {
          id: 'synthesia',
          name: 'Synthesia',
          description: 'AI video generation',
          category: 'video',
          subcategory: 'generation',
          url: 'https://www.synthesia.io/',
          pricing: 'Paid',
          tags: ['ai video', 'avatar', 'synthetic media']
        },
        {
          id: 'lumen5',
          name: 'Lumen5',
          description: 'Video creation platform',
          category: 'video',
          subcategory: 'creation',
          url: 'https://lumen5.com/',
          pricing: 'Freemium',
          tags: ['video creation', 'social media', 'marketing']
        }
      ]
    },
    {
      name: 'writing',
      description: 'Tools for writing, editing, and content creation',
      icon: 'edit-3',
      keywords: ['write', 'content', 'blog', 'article', 'copy', 'essay', 'story', 'document', 'text'],
      tools: [
        {
          id: 'jasper',
          name: 'Jasper',
          description: 'AI writing assistant',
          category: 'writing',
          subcategory: 'content generation',
          url: 'https://www.jasper.ai',
          pricing: 'Paid',
          tags: ['ai writing', 'content creation', 'copywriting']
        },
        {
          id: 'copy-ai',
          name: 'Copy.ai',
          description: 'AI copywriting tool',
          category: 'writing',
          subcategory: 'copywriting',
          url: 'https://www.copy.ai',
          pricing: 'Freemium',
          tags: ['ai copywriting', 'marketing', 'content generation']
        },
        {
          id: 'writesonic',
          name: 'Writesonic',
          description: 'AI writer for blogs and ads',
          category: 'writing',
          subcategory: 'content generation',
          url: 'https://writesonic.com',
          pricing: 'Freemium',
          tags: ['blog writing', 'ad copy', 'content creation']
        },
        {
          id: 'rytr',
          name: 'Rytr',
          description: 'AI writing assistant',
          category: 'writing',
          subcategory: 'content generation',
          url: 'https://rytr.me',
          pricing: 'Freemium',
          tags: ['ai writing', 'content creation', 'copywriting']
        },
        {
          id: 'grammarly',
          name: 'Grammarly',
          description: 'Writing assistant',
          category: 'writing',
          subcategory: 'editing',
          url: 'https://www.grammarly.com',
          pricing: 'Freemium',
          tags: ['grammar check', 'spell check', 'writing improvement']
        },
        {
          id: 'prowritingaid',
          name: 'ProWritingAid',
          description: 'Grammar checker and writing coach',
          category: 'writing',
          subcategory: 'editing',
          url: 'https://prowritingaid.com',
          pricing: 'Freemium',
          tags: ['grammar check', 'writing improvement', 'editing']
        }
      ]
    },
    {
      name: 'image',
      description: 'Tools for image generation, editing, and manipulation',
      icon: 'image',
      keywords: ['image', 'photo', 'picture', 'art', 'graphic', 'illustration', 'drawing', 'design'],
      tools: [
        {
          id: 'dall-e',
          name: 'DALL-E',
          description: 'AI image generation',
          category: 'image',
          subcategory: 'ai-image-generation',
          pricing: 'Freemium',
          url: 'https://openai.com/dall-e/',
          tags: ['ai', 'image-generation', 'art', 'openai'],
          logo: '/images/tools/dall-e.png'
        },
        {
          id: 'midjourney',
          name: 'Midjourney',
          description: 'AI art generation',
          category: 'image',
          subcategory: 'ai-art',
          pricing: 'Paid',
          url: 'https://www.midjourney.com/',
          tags: ['ai', 'art', 'generation', 'discord'],
          logo: '/images/tools/midjourney.png'
        },
        {
          id: 'stable-diffusion',
          name: 'Stable Diffusion',
          description: 'Text-to-image model',
          category: 'image',
          subcategory: 'ai-image-generation',
          pricing: 'Open Source',
          url: 'https://stability.ai/stable-diffusion',
          tags: ['ai', 'open-source', 'image-generation', 'stability-ai'],
          logo: '/images/tools/stable-diffusion.png'
        },
        {
          id: 'artbreeder',
          name: 'Artbreeder',
          description: 'Collaborative art generation',
          category: 'image',
          subcategory: 'ai-art',
          pricing: 'Freemium',
          url: 'https://www.artbreeder.com/',
          tags: ['ai', 'art', 'collaboration', 'generation'],
          logo: '/images/tools/artbreeder.png'
        },
        {
          id: 'canva',
          name: 'Canva',
          description: 'Graphic design tool',
          category: 'image',
          subcategory: 'graphic-design',
          pricing: 'Freemium',
          url: 'https://www.canva.com/',
          tags: ['design', 'graphics', 'templates', 'freemium'],
          logo: '/images/tools/canva.png'
        },
        {
          id: 'runway-ml',
          name: 'Runway ML',
          description: 'Creative AI tools',
          category: 'image',
          subcategory: 'ai-video',
          pricing: 'Freemium',
          url: 'https://runwayml.com/',
          tags: ['ai', 'video', 'editing', 'generation'],
          logo: '/images/tools/runway-ml.png'
        }
      ]
    },
    {
      name: 'coding',
      description: 'Tools for software development and programming',
      icon: 'code',
      keywords: ['code', 'programming', 'developer', 'dev', 'software', 'script', 'app', 'application', 'website'],
      tools: [
        {
          id: 'github-copilot',
          name: 'GitHub Copilot',
          description: 'AI pair programmer',
          category: 'coding',
          subcategory: 'code-completion',
          pricing: 'Paid',
          url: 'https://github.com/features/copilot',
          tags: ['ai', 'coding', 'github', 'copilot'],
          logo: '/images/tools/github-copilot.png'
        },
        {
          id: 'tabnine',
          name: 'Tabnine',
          description: 'AI code completion',
          category: 'coding',
          subcategory: 'code-completion',
          pricing: 'Freemium',
          url: 'https://www.tabnine.com/',
          tags: ['ai', 'coding', 'autocomplete', 'productivity'],
          logo: '/images/tools/tabnine.png'
        },
        {
          id: 'replit',
          name: 'Replit',
          description: 'Browser-based IDE',
          category: 'coding',
          subcategory: 'online-ide',
          pricing: 'Freemium',
          url: 'https://replit.com/',
          tags: ['ide', 'coding', 'browser-based', 'collaboration'],
          logo: '/images/tools/replit.png'
        },
        {
          id: 'codeium',
          name: 'Codeium',
          description: 'Free AI code completion',
          category: 'coding',
          subcategory: 'code-completion',
          pricing: 'Free',
          url: 'https://codeium.com/',
          tags: ['ai', 'coding', 'autocomplete', 'free'],
          logo: '/images/tools/codeium.png'
        },
        {
          id: 'amazon-codewhisperer',
          name: 'Amazon CodeWhisperer',
          description: 'ML-powered coding companion',
          category: 'coding',
          subcategory: 'code-completion',
          pricing: 'Freemium',
          url: 'https://aws.amazon.com/codewhisperer/',
          tags: ['ai', 'aws', 'coding', 'autocomplete'],
          logo: '/images/tools/amazon-codewhisperer.png'
        }
      ]
    },
    {
      name: 'productivity',
      description: 'Tools for task management and workflow optimization',
      icon: 'check-square',
      keywords: ['productivity', 'efficient', 'time', 'task', 'organize', 'schedule', 'manage', 'work'],
      tools: [
        {
          id: 'notion-ai',
          name: 'Notion AI',
          description: 'All-in-one workspace with AI capabilities',
          category: 'productivity',
          subcategory: 'workspace',
          pricing: 'Freemium',
          url: 'https://www.notion.so/product/ai',
          tags: ['workspace', 'notes', 'docs', 'ai'],
          logo: '/images/tools/notion-ai.png'
        },
        {
          id: 'mem-ai',
          name: 'Mem.ai',
          description: 'Smart workspace with AI organization',
          category: 'productivity',
          subcategory: 'workspace',
          pricing: 'Freemium',
          url: 'https://mem.ai/',
          tags: ['workspace', 'notes', 'organization', 'ai'],
          logo: '/images/tools/mem-ai.png'
        },
        {
          id: 'trello',
          name: 'Trello',
          description: 'Project management tool with boards, lists, and cards',
          category: 'productivity',
          subcategory: 'project-management',
          pricing: 'Freemium',
          url: 'https://trello.com/',
          tags: ['project-management', 'kanban', 'collaboration', 'atlassian'],
          logo: '/images/tools/trello.png'
        },
        {
          id: 'asana',
          name: 'Asana',
          description: 'Work management and team collaboration platform',
          category: 'productivity',
          subcategory: 'project-management',
          pricing: 'Freemium',
          url: 'https://asana.com/',
          tags: ['project-management', 'tasks', 'team-collaboration', 'workflow'],
          logo: '/images/tools/asana.png'
        },
        {
          id: 'motion',
          name: 'Motion',
          description: 'AI-powered calendar and scheduling assistant',
          category: 'productivity',
          subcategory: 'time-management',
          pricing: 'Paid',
          url: 'https://www.usemotion.com/',
          tags: ['calendar', 'scheduling', 'ai', 'time-management'],
          logo: '/images/tools/motion.png'
        },
        {
          id: 'clockwise',
          name: 'Clockwise',
          description: 'Smart calendar assistant that optimizes your schedule',
          category: 'productivity',
          subcategory: 'time-management',
          pricing: 'Freemium',
          url: 'https://www.getclockwise.com/',
          tags: ['calendar', 'scheduling', 'ai', 'time-optimization'],
          logo: '/images/tools/clockwise.png'
        }
      ]
    }
  ];

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('Speech recognition not supported in this browser');
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      setInputValue(transcript);
    };
    
    recognition.onerror = (event: Event) => {
      console.error('Speech recognition error', event);
    };

    recognitionRef.current = recognition;
  }, []);

  const toggleVoiceInput = useCallback(() => {
    if (!recognitionRef.current) {
      setFeedbackMessage('Speech recognition not available in your browser');
      setFeedbackType('negative');
      setShowFeedback(true);
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        setInputValue(''); // Clear input when starting new voice input
        recognitionRef.current.start();
        setIsListening(true);
        
        // Show feedback
        setFeedbackMessage('Listening... Speak now');
        setFeedbackType('info');
        setShowFeedback(true);
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setIsListening(false);
        // Show error feedback to user
        setFeedbackMessage('Failed to start voice input. Please check your microphone permissions.');
        setFeedbackType('negative');
        setShowFeedback(true);
      }
      
      // Hide feedback after 3 seconds
      setTimeout(() => {
        setShowFeedback(false);
      }, 3000);
    }
  }, [isListening, recognitionRef]);

  // Handle sending a message
  const handleSendMessage = async () => {
    const messageText = inputValue.trim();
    if (!messageText || isLoading) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: [{ type: 'text', text: messageText }],
      sender: 'user',
      timestamp: new Date(),
      metadata: {}
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Process the message and get AI response
      const response = await processUserMessage(messageText);
      
      // Add AI response to messages
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: Array.isArray(response.content) 
          ? response.content 
          : [
              typeof response.content === 'string' 
                ? { type: 'text' as const, text: response.content } 
                : response.content
            ],
        sender: 'assistant',
        timestamp: new Date(),
        context: response.context
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: [{
          type: 'text' as const,
          text: 'Sorry, I encountered an error while processing your request. Please try again later.'
        }],
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle clicking on a suggestion
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Toggle chat window
  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      // Focus input when opening chat
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Add initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting: Message = {
        id: 'greeting',
        content: [{
          type: 'text',
          text: "Hello! I'm your AI assistant. I can help you find the best AI tools for your needs. What would you like to do?\n\nYou can ask me things like:\n• 'Find me AI tools for video editing'\n• 'What are good tools for writing?'\n• 'I need help with coding tools'\n• 'Show me AI tools for data analysis'"
        }],
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages([greeting]);
    }
  }, [isOpen]);

  // Sample suggestions
  const suggestions = [
    'Find AI tools for video editing',
    'Best tools for writing',
    'Help me with coding',
    'AI for data analysis'
  ];

  // Profile modal component
  const ProfileModal: React.FC = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Your Profile</h3>
          <button 
            onClick={() => setShowProfile(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={24} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Role</label>
            <input
              type="text"
              value={userPrefs.role || ''}
              onChange={(e) => setUserPrefs(p => ({...p, role: e.target.value}))}
              placeholder="e.g., Developer, Designer, Marketer"
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <input
              type="text"
              value={userPrefs.industry || ''}
              onChange={(e) => setUserPrefs(p => ({...p, industry: e.target.value}))}
              placeholder="e.g., Tech, Education, Healthcare"
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
            <select
              value={userPrefs.experienceLevel || ''}
              onChange={(e) => {
                const value = e.target.value;
                setUserPrefs(p => ({
                  ...p,
                  experienceLevel: value === '' ? undefined : value as 'beginner' | 'intermediate' | 'expert'
                }));
              }}
              className="w-full p-2 border rounded"
            >
              <option value="">Select experience level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>
          
          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Your Activity</h4>
            {userPrefs.recentCategories.length > 0 && (
              <div className="mb-3">
                <div className="text-xs text-gray-500 flex items-center mb-1">
                  <FiClock className="mr-1" /> Recently viewed
                </div>
                <div className="flex flex-wrap gap-2">
                  {userPrefs.recentCategories.map(cat => (
                    <span key={cat} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {userPrefs.preferredTools.length > 0 && (
              <div>
                <div className="text-xs text-gray-500 flex items-center mb-1">
                  <FiStar className="mr-1" /> Your favorite tools
                </div>
                <div className="flex flex-wrap gap-2">
                  {userPrefs.preferredTools.slice(0, 5).map(tool => (
                    <span key={tool} className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t mt-4">
            <button
              onClick={() => setShowProfile(false)}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              onClick={() => updateUserPreferences(userPrefs)}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {showProfile && <ProfileModal />}
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-96 h-[600px] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowProfile(true)}
                className="p-1 rounded-full hover:bg-blue-700"
                title="Profile"
                aria-label="Open profile settings"
              >
                <FiUser size={18} />
              </button>
            </div>
            <h3 className="font-semibold">AI Assistant</h3>
            <button
              onClick={toggleChat}
              className="text-white hover:bg-blue-700 p-1 rounded-full"
              aria-label="Close chat"
              title="Close chat"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-100 text-blue-900 rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <div className="whitespace-pre-wrap">
                    {message.content.map((content, idx) => {
                      if (content.type === 'text') {
                        return content.text.split('\n').map((line, i, lines) => (
                          <React.Fragment key={`${idx}-${i}`}>
                            {line}
                            {i < lines.length - 1 && <br />}
                          </React.Fragment>
                        ));
                      }
                      return null; // Handle other content types as needed
                    })}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-lg p-3 rounded-bl-none">
                  <div className="flex items-center space-x-2">
                    <FiLoader className="animate-spin" />
                    <span>Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full flex items-center"
                  >
                    {suggestion}
                    <FiChevronRight className="ml-1" size={14} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t p-3">
            <div className="flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <FiSend />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Open AI Assistant"
        >
          <FiMessageSquare size={24} />
        </button>
      )}
    </div>
  );
};

export default AIAssistantButton;
