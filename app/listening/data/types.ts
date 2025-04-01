export interface ListeningLevel {
    id: string;
    name: string;
  }
  
  export interface ExerciseType {
    id: string;
    name: string;
    icon: React.ReactNode; // Sahifada import qilinadi
  }
  
  export interface Question {
    id: string;
    type: "mcq"; // Kelajakda boshqa tiplar qo'shilishi mumkin
    text: string;
    options: string[];
    correctAnswer: string;
  }
  
  export interface ListeningExercise {
    id: string;
    title: string;
    level: string;
    type: string;
    audioSrc: string;
    description: string;
    duration: number; // in seconds
    transcript: string;
    questions: Question[];
  }