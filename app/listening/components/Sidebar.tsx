import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { ListeningLevel, ExerciseType, ListeningExercise } from "../data/types";

interface SidebarProps {
  mobile: boolean;
  listeningLevels: ListeningLevel[];
  exerciseTypes: (ExerciseType & { icon: React.ReactNode })[];
  filteredExercises: ListeningExercise[];
  selectedLevel: string;
  selectedType: string;
  currentExercise: number;
  onLevelChange: (level: string) => void;
  onTypeChange: (type: string) => void;
  onExerciseChange: (index: number) => void;
  onClose?: () => void;
}

export default function Sidebar({
  mobile,
  listeningLevels,
  exerciseTypes,
  filteredExercises,
  selectedLevel,
  selectedType,
  currentExercise,
  onLevelChange,
  onTypeChange,
  onExerciseChange,
  onClose
}: SidebarProps) {
  const content = (
    <div className={mobile ? "" : "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4"}>
      {mobile && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Listening Practice</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      )}
      
      <div className={mobile ? "p-4" : ""}>
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Level</h3>
          <div className="space-y-1">
            {listeningLevels.map(level => {
              // Count exercises for this level
              const exercisesCount = filteredExercises.filter(ex => ex.level === level.id).length;
              
              return (
                <button
                  key={level.id}
                  onClick={() => onLevelChange(level.id)}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-left ${
                    selectedLevel === level.id
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <span>{level.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    {exercisesCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Type</h3>
          <div className="space-y-1">
            {exerciseTypes.map(type => {
              // Count exercises for this type at the selected level
              const exercisesCount = filteredExercises.filter(
                ex => ex.type === type.id && ex.level === selectedLevel
              ).length;
              
              return (
                <button
                  key={type.id}
                  onClick={() => onTypeChange(type.id)}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-left ${
                    selectedType === type.id
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-2">{type.icon}</span>
                    <span>{type.name}</span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    {exercisesCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Exercises</h3>
          <div className="space-y-1">
            {filteredExercises.map((exercise, index) => (
              <button
                key={exercise.id}
                onClick={() => onExerciseChange(index)}
                className={`flex items-center w-full px-3 py-2 rounded-lg text-left ${
                  currentExercise === index
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {exercise.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  
  if (mobile) {
    return (
      <motion.div 
        className="fixed inset-0 z-30 md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div 
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
        />
        
        {/* Sidebar */}
        <motion.div 
          className="absolute top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
        >
          {content}
        </motion.div>
      </motion.div>
    );
  }
  
  return content;
}