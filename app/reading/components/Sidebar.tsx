import { useState } from "react";
import { 
  BookOpen, 
  GraduationCap, 
  Search, 
  ChevronRight 
} from "lucide-react";
import { ReadingExercise, ReadingLevel, ReadingType } from "../data/types";

interface SidebarProps {
  levels: ReadingLevel[];
  types: ReadingType[];
  exercises: ReadingExercise[];
  selectedLevel: string;
  selectedType: string;
  onLevelChange: (level: string) => void;
  onTypeChange: (type: string) => void;
}

export default function Sidebar({
  levels,
  types,
  exercises,
  selectedLevel,
  selectedType,
  onLevelChange,
  onTypeChange
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter exercises based on search query
  const filteredExercises = exercises.filter(
    (exercise) => 
      exercise.level === selectedLevel && 
      exercise.type === selectedType &&
      (searchQuery === "" || 
        exercise.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="mb-6">
        <div className="flex items-center">
          <BookOpen className="mr-2 text-blue-600 dark:text-blue-400" size={24} />
          <h2 className="text-xl font-bold">Reading Practice</h2>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Improve your reading skills
        </p>
      </div>
      
      {/* Search box */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={16} className="text-gray-400" />
        </div>
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          placeholder="Search exercises..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Level selection */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Level</h3>
        <div className="space-y-1">
          {levels.map((level) => {
            const exercisesCount = exercises.filter(
              (ex) => ex.level === level.id
            ).length;
            
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
                <div className="flex items-center">
                  <GraduationCap className="mr-2" size={16} />
                  <span>{level.name}</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  {exercisesCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Type selection */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Type</h3>
        <div className="space-y-1">
          {types.map((type) => {
            const exercisesCount = exercises.filter(
              (ex) => ex.type === type.id && ex.level === selectedLevel
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
                  {type.icon}
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
      
      {/* Exercise list */}
      <div className="flex-1 overflow-y-auto">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          Available Exercises
        </h3>
        
        {filteredExercises.length > 0 ? (
          <div className="space-y-2">
            {filteredExercises.map((exercise) => (
              <button
                key={exercise.id}
                className="w-full px-3 py-2 rounded-lg text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 group flex items-center justify-between"
              >
                <div>
                  <div className="font-medium">{exercise.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {exercise.estimatedTime} min • {exercise.difficulty}
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        ) : (
          <div className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
            {searchQuery ? "No exercises match your search criteria" : "No exercises available for this selection"}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <div className="mb-1">Reading practice version 1.0</div>
          <div>© 2025 English Learning Platform</div>
        </div>
      </div>
    </div>
  );
}