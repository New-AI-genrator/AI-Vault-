import React from "react";

type CategoryCardProps = {
  icon: string;
  name: string;
  toolCount: number;
};

export default function CategoryCard({ icon, name, toolCount }: CategoryCardProps) {
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  return (
    <a
      href={`/ai-tools/${slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
      <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-500 transform hover:scale-110 hover:-rotate-2">
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-lg font-bold mb-2 text-white">{name}</h3>
        <p className="text-sm text-gray-300">{toolCount}+ tools</p>
      </div>
    </a>
  );
} 