"use client";

import React, { useState, useRef, useEffect } from "react";
import { Mic, Square, Loader2 } from "lucide-react";

interface AudioRecorderProps {
  isRecording: boolean;
  onRecordingStart: () => void;
  onRecordingStop: () => void;
  onAudioRecorded: (audioUrl: string, blob: Blob) => void;
}

export default function AudioRecorder({
  isRecording,
  onRecordingStart,
  onRecordingStop,
  onAudioRecorded
}: AudioRecorderProps) {
  const [recordingTime, setRecordingTime] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [visualizerValues, setVisualizerValues] = useState<number[]>(Array(20).fill(2));
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  
  // Recording timer
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording]);
  
  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Start recording
  const startRecording = async () => {
    try {
      setIsProcessing(true);
      
      // Reset audio chunks
      audioChunksRef.current = [];
      setRecordingTime(0);
      
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      // Set up audio analyzer for visualizer
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const audioContext = audioContextRef.current;
      const analyser = audioContext.createAnalyser();
      analyserRef.current = analyser;
      
      const microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(analyser);
      
      analyser.fftSize = 64;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      // Create and start media recorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        // Create audio blob and URL
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Clean up
        stopVisualizer();
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
        
        onAudioRecorded(audioUrl, audioBlob);
        setIsProcessing(false);
      };
      
      // Start recording and visualizer
      mediaRecorder.start();
      startVisualizer(analyser, dataArray);
      setIsProcessing(false);
      onRecordingStart();
      
    } catch (error) {
      console.error("Error starting recording:", error);
      setPermissionDenied(true);
      setIsProcessing(false);
    }
  };
  
  // Audio visualizer
  const startVisualizer = (analyser: AnalyserNode, dataArray: Uint8Array) => {
    const updateVisualizer = () => {
      analyser.getByteFrequencyData(dataArray);
      
      // Calculate visualizer values
      const values = Array(20).fill(0).map((_, i) => {
        const index = Math.floor(i * dataArray.length / 20);
        // Normalize and add minimum height
        return 2 + (dataArray[index] / 255) * 30;
      });
      
      setVisualizerValues(values);
      animationFrameRef.current = requestAnimationFrame(updateVisualizer);
    };
    
    animationFrameRef.current = requestAnimationFrame(updateVisualizer);
  };
  
  // Stop visualizer
  const stopVisualizer = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setVisualizerValues(Array(20).fill(2));
  };
  
  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      onRecordingStop();
    }
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      {permissionDenied ? (
        <div className="text-center text-red-500 mb-4">
          <p>Microphone access denied.</p>
          <p className="text-sm mt-1">Please enable microphone access in your browser settings.</p>
        </div>
      ) : (
        <>
          {/* Audio visualizer */}
          <div className="h-20 w-60 flex items-center justify-center gap-1 mb-4">
            {isProcessing ? (
              <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
            ) : (
              <>
                {isRecording ? (
                  <div className="flex items-end h-full gap-[2px]">
                    {visualizerValues.map((value, index) => (
                      <div
                        key={index}
                        className="w-1.5 bg-blue-500 rounded-full transform transition-all duration-75"
                        style={{ height: `${value}px` }}
                      ></div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-400 text-sm">
                    {recordingTime > 0 ? "Recording finished" : "Click to start recording"}
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* Recording timer */}
          {(isRecording || recordingTime > 0) && (
            <div className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full mb-4">
              {formatTime(recordingTime)}
            </div>
          )}
          
          {/* Recording button */}
          <div className="flex justify-center">
            {isRecording ? (
              <button
                onClick={stopRecording}
                className="h-14 w-14 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                disabled={isProcessing}
              >
                <Square className="h-6 w-6" />
              </button>
            ) : (
              <button
                onClick={startRecording}
                className="h-14 w-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors"
                disabled={isProcessing}
              >
                <Mic className="h-6 w-6" />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}