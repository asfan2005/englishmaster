"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

interface AudioPlayerProps {
  audioUrl: string;
  onPlay?: () => void;
  onPause?: () => void;
}

export default function AudioPlayer({ audioUrl, onPlay, onPause }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isReady, setIsReady] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  
  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Handle audio metadata loading
  useEffect(() => {
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsReady(true);
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (onPause) onPause();
    };
    
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, [audioUrl, onPause]);
  
  // Toggle play/pause
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      if (onPause) onPause();
    } else {
      audioRef.current.play();
      if (onPlay) onPlay();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  // Skip back 5 seconds
  const skipBack = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5);
  };
  
  // Skip forward 5 seconds
  const skipForward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 5);
  };
  
  // Update audio progress bar
  const updateProgress = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !audioRef.current) return;
    
    const progressRect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - progressRect.left) / progressRect.width;
    audioRef.current.currentTime = percent * duration;
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {formatTime(currentTime)}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {formatTime(duration)}
        </div>
      </div>
      
      {/* Progress bar */}
      <div 
        ref={progressRef}
        className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full mb-3 cursor-pointer"
        onClick={updateProgress}
      >
        <div 
          className="h-full bg-blue-500 rounded-full"
          style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
        ></div>
      </div>
      
      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button 
          onClick={skipBack}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          disabled={!isReady}
        >
          <SkipBack size={20} />
        </button>
        
        <button 
          onClick={togglePlayPause}
          className={`p-3 rounded-full text-white ${
            isPlaying 
              ? "bg-gray-600 hover:bg-gray-700" 
              : "bg-blue-500 hover:bg-blue-600"
          } transition-colors`}
          disabled={!isReady}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        
        <button 
          onClick={skipForward}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          disabled={!isReady}
        >
          <SkipForward size={20} />
        </button>
      </div>
    </div>
  );
}