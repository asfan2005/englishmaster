"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Play, Pause, VolumeX, Volume2, SkipBack, 
  SkipForward, Repeat, ChevronDown, Volume1
} from "lucide-react";

interface AudioPlayerProps {
  duration: number;
  audioSrc: string;
}

export default function AudioPlayer({ duration, audioSrc }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedControls, setShowSpeedControls] = useState(false);
  const [isRepeatActive, setIsRepeatActive] = useState(false);
  const [showTips, setShowTips] = useState(true);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const volumeBarRef = useRef<HTMLDivElement | null>(null);
  
  // Initialize audio
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    
    // In a real app, you would use the actual audio file
    // audio.src = audioSrc;
    
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleAudioEnded);
    
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleAudioEnded);
      audio.pause();
    };
  }, [audioSrc]);
  
  // Update progress bar when audio is playing
  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  // Handle audio end
  const handleAudioEnded = () => {
    setIsPlaying(false);
    if (isRepeatActive && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(error => console.error("Error playing audio:", error));
    }
  };
  
  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
  
  // Play/pause audio
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // audioRef.current.src = audioSrc;
      audioRef.current.play()
        .then(() => {})
        .catch(error => console.error("Error playing audio:", error));
    }
    
    setIsPlaying(!isPlaying);
  };
  
  // Seek to position in audio
  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !audioRef.current) return;
    
    const progressRect = progressBarRef.current.getBoundingClientRect();
    const seekPosition = (e.clientX - progressRect.left) / progressRect.width;
    const seekTime = seekPosition * duration;
    
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };
  
  // Adjust volume
  const adjustVolume = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!volumeBarRef.current || !audioRef.current) return;
    
    const volumeRect = volumeBarRef.current.getBoundingClientRect();
    const volumeLevel = (e.clientX - volumeRect.left) / volumeRect.width;
    
    setVolume(Math.max(0, Math.min(1, volumeLevel)));
    audioRef.current.volume = Math.max(0, Math.min(1, volumeLevel));
    
    if (volumeLevel === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };
  
  // Toggle mute
  const toggleMute = () => {
    if (!audioRef.current) return;
    
    setIsMuted(!isMuted);
    audioRef.current.muted = !isMuted;
  };
  
  // Set playback speed
  const changePlaybackSpeed = (speed: number) => {
    if (!audioRef.current) return;
    
    setPlaybackSpeed(speed);
    audioRef.current.playbackRate = speed;
    setShowSpeedControls(false);
  };
  
  // Skip backward 10 seconds
  const skipBackward = () => {
    if (!audioRef.current) return;
    
    const newTime = Math.max(0, currentTime - 10);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  // Skip forward 10 seconds
  const skipForward = () => {
    if (!audioRef.current) return;
    
    const newTime = Math.min(duration, currentTime + 10);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="relative h-12 w-12 sm:h-20 sm:w-20 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <button
              onClick={togglePlayPause}
              className="h-10 w-10 sm:h-16 sm:w-16 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              {isPlaying ? (
                <Pause size={24} className="ml-0" />
              ) : (
                <Play size={24} className="ml-1" />
              )}
            </button>
          </div>
          {isPlaying && (
            <div className="absolute inset-0 rounded-full border-2 border-blue-500 animate-ping"></div>
          )}
        </div>
        
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={skipBackward}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <SkipBack size={18} />
          </button>
          
          <div className="text-lg font-mono text-gray-800 dark:text-gray-200">
            {formatTime(currentTime)} <span className="text-gray-400 dark:text-gray-500">/</span> {formatTime(duration)}
          </div>
          
          <button
            onClick={skipForward}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <SkipForward size={18} />
          </button>
        </div>
        
        <div className="flex items-center mb-6">
          <div 
            ref={progressBarRef} 
            className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer relative overflow-hidden"
            onClick={seek}
          >
            <div 
              className="h-full bg-blue-500 absolute top-0 left-0 transition-all"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {isMuted || volume === 0 ? (
                <VolumeX size={18} />
              ) : (
                <Volume2 size={18} />
              )}
            </button>
            
            <div 
              ref={volumeBarRef}
              className="h-1.5 w-20 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer relative overflow-hidden"
              onClick={adjustVolume}
            >
              <div 
                className="h-full bg-blue-500 absolute top-0 left-0 transition-all"
                style={{ width: `${volume * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRepeatActive(!isRepeatActive)}
              className={`p-2 rounded-full transition-colors ${
                isRepeatActive
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              <Repeat size={18} />
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowSpeedControls(!showSpeedControls)}
                className="flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
              >
                <span>{playbackSpeed}x</span>
                <ChevronDown size={14} />
              </button>
              
              {showSpeedControls && (
                <div className="absolute right-0 mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map(speed => (
                    <button
                      key={speed}
                      onClick={() => changePlaybackSpeed(speed)}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        playbackSpeed === speed
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 flex items-center gap-2">
            <Volume1 size={18} />
            <span>Listening Tips</span>
          </h3>
          <button 
            onClick={() => setShowTips(!showTips)}
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
          >
            {showTips ? "Hide" : "Show"}
          </button>
        </div>
        
        {showTips && (
          <ul className="text-blue-700 dark:text-blue-200 text-sm space-y-2">
            <li className="flex items-start gap-2">
              <div className="mt-0.5 flex-shrink-0">✓</div>
              <span>Listen to the audio multiple times to catch details you missed the first time.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-0.5 flex-shrink-0">✓</div>
              <span>Use the 10-second skip buttons to review specific parts of the conversation.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-0.5 flex-shrink-0">✓</div>
              <span>Try slowing down the audio (0.75x) if you're having trouble understanding.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-0.5 flex-shrink-0">✓</div>
              <span>Read the questions before listening to know what information to listen for.</span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}