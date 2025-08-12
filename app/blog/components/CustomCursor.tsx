'use client';

import { useEffect, useState } from 'react';
import '../styles/custom.css';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    // Add event listeners
    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseenter', () => setIsHidden(false));
    document.addEventListener('mouseleave', () => setIsHidden(true));
    
    // Add hover/click effects for interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, .cursor-pointer'
    );

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
      el.addEventListener('mousedown', handleMouseDown);
      el.addEventListener('mouseup', handleMouseUp);
    });

    return () => {
      // Cleanup
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', () => setIsHidden(false));
      document.removeEventListener('mouseleave', () => setIsHidden(true));
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.removeEventListener('mousedown', handleMouseDown);
        el.removeEventListener('mouseup', handleMouseUp);
      });
    };
  }, []);

  if (isHidden) return null;

  const cursorSize = isHovered ? 32 : 24;
  const followerSize = isHovered ? 48 : 64;
  const scale = isClicked ? 0.9 : 1;

  return (
    <>
      <div 
        className="custom-cursor"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1.5 : 1})`,
          opacity: isHidden ? 0 : 1,
          backgroundColor: isClicked ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.1)',
          width: `${cursorSize}px`,
          height: `${cursorSize}px`,
        }}
      />
      <div 
        className="cursor-follower"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${followerSize}px`,
          height: `${followerSize}px`,
          transform: `translate(-50%, -50%) scale(${isHovered ? 0.8 : 1})`,
          borderWidth: isHovered ? '1px' : '2px',
        }}
      />
    </>
  );
}
