"use client";

import React, { useState } from 'react';
import { PlayCircle } from 'lucide-react';

interface YoutubePlayerProps {
  videoId: string;
  title?: string;
  description?: string;
  autoplay?: boolean;
  className?: string;
}

const YoutubePlayer: React.FC<YoutubePlayerProps> = ({
  videoId,
  title,
  description,
  autoplay = false,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  
  // YouTube thumbnail quality options: default, hqdefault, mqdefault, sddefault, maxresdefault
  const thumbnailQuality = 'hqdefault';
  
  const handlePlay = () => {
    setIsPlaying(true);
  };
  
  return (
    <div className={`relative rounded-xl overflow-hidden shadow-lg ${className}`}>
      <div className="aspect-video bg-gray-800 relative">
        {isPlaying ? (
          <iframe 
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
            title={title || "YouTube video player"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(https://img.youtube.com/vi/${videoId}/${thumbnailQuality}.jpg)`,
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={handlePlay}
                className="group transform transition-transform duration-300 hover:scale-110 focus:outline-none"
                aria-label="Play video"
              >
                <div className="w-20 h-20 rounded-full bg-blue-600/90 flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                  <PlayCircle className="h-12 w-12 text-white" />
                </div>
              </button>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
            
            {(title || description) && (
              <div className="absolute bottom-4 left-4 text-white max-w-[80%]">
                {title && <h3 className="font-bold text-lg">{title}</h3>}
                {description && <p className="text-sm text-gray-300 line-clamp-2">{description}</p>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default YoutubePlayer; 