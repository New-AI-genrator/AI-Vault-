export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
  tags?: string[];
  featured?: boolean;
  author: {
    name: string;
    avatar: string;
    role: string;
    bio?: string;
  };
};
