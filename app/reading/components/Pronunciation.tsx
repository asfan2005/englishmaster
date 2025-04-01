import React, { useState, useRef } from "react";
import { Headphones, Mic, StopCircle, Play, Volume2, Bot, RefreshCw } from "lucide-react";
import { ReadingExercise, PronunciationItem } from "../data/types";

interface PronunciationProps {
  exercise: ReadingExercise;
  onRecordingComplete: (recordingUrl: string) => void;
}

export default function Pronunciation({ exercise, onRecordingComplete }: PronunciationProps) {
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Get pronunciation items or use a default one
  const pronunciationItems = exercise.pronunciation || [
    {
      title: "Practice Reading",
      text: exercise.text.split('\n\n')[0], // Just use the first paragraph
      focusPoints: ["Practice clear articulation", "Pay attention to sentence stress"]
    }
  ];
  
  const currentItem = pronunciationItems[selectedItem];

  // Start audio recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: BlobPart[] = [];
      
      mediaRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
      });
      
      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        onRecordingComplete(url);
      });
      
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      
      // Start recording timer
      let seconds = 0;
      timerRef.current = setInterval(() => {
        seconds += 1;
        setRecordingTime(seconds);
      }, 1000);
      
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Unable to access your microphone. Please check your browser permissions.");
    }
  };
  
  // Stop audio recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop recording timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };
  
  // Play recorded audio
  const playRecording = () => {
    if (audioRef.current && audioUrl) {
      audioRef.current.play();
    }
  };
  
  // Format time for display (MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <Headphones size={20} className="mr-2 text-blue-600 dark:text-blue-400" />
          Pronunciation Practice
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Read the following passage aloud and get AI feedback on your pronunciation.
          Focus on clear articulation and natural rhythm.
        </p>
      </div>
      
      {/* Select pronunciation item if multiple are available */}
      {pronunciationItems.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {pronunciationItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedItem(index);
                setAudioUrl(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                selectedItem === index
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {index + 1}. {item.title}
            </button>
          ))}
        </div>
      )}
      
      {/* Pronunciation passage */}
      <div className="p-5 bg-white dark:bg-gray-750 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h4 className="font-medium mb-3">{currentItem.title}</h4>
        <div className="text-lg leading-relaxed bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
          {currentItem.text}
        </div>
        
        {currentItem.focusPoints && (
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <h5 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">Focus on:</h5>
            <ul className="list-disc list-inside text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              {currentItem.focusPoints.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Recording controls */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {!isRecording && !audioUrl && (
          <button
            onClick={startRecording}
            className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-lg flex items-center justify-center hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
          >
            <Mic size={18} className="mr-2" />
            Start Recording
          </button>
        )}
        
        {isRecording && (
          <button
            onClick={stopRecording}
            className="w-full sm:w-auto px-4 py-2 bg-gray-600 text-white rounded-lg flex items-center justify-center hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            <StopCircle size={18} className="mr-2" />
            Stop Recording ({formatTime(recordingTime)})
          </button>
        )}
        
        {audioUrl && (
          <>
            <button
              onClick={playRecording}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
            >
              <Play size={18} className="mr-2" />
              Play Recording
            </button>
            
            <button
              onClick={() => {
                setAudioUrl(null);
                setRecordingTime(0);
              }}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              <RefreshCw size={18} className="mr-2" />
              Record Again
            </button>
            
            <audio ref={audioRef} src={audioUrl} className="hidden" />
          </>
        )}
      </div>
      
      {/* Listen to native speaker */}
      <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-750">
        <h4 className="font-medium mb-3 flex items-center">
          <Volume2 size={18} className="mr-2 text-blue-600 dark:text-blue-400" />
          Listen to Native Speaker
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          Listen to a native speaker to compare your pronunciation.
        </p>
        <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600">
            <Play size={18} className="mr-2" />
            Play Audio Sample
          </button>
        </div>
      </div>
      
      {/* AI feedback preview */}
      <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-750">
        <h4 className="font-medium mb-3 flex items-center">
          <Bot size={18} className="mr-2 text-blue-600 dark:text-blue-400" />
          Get AI Feedback
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          Record yourself reading the passage above and get personalized feedback from our AI coach.
        </p>
        <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
          {audioUrl ? (
            <p className="text-center text-green-600 dark:text-green-400">
              Your recording is ready for AI analysis! Go to the AI Feedback tab to see your results.
            </p>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Record your voice first to get personalized AI feedback.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}