"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, Globe, ChevronLeft, ChevronRight, CalendarDays, DollarSign, CheckCircle } from "lucide-react";

// Mock data - in a real app, you would fetch this from an API
const teachersData = [
  {
    id: "t1",
    name: "Sarah Johnson",
    specialization: ["Conversation", "Business English", "IELTS"],
    rating: 4.9,
    hourlyRate: 25,
    timeZone: "GMT",
    verified: true,
  },
  {
    id: "t2",
    name: "Michael Chen",
    specialization: ["Grammar", "Pronunciation", "TOEFL"],
    rating: 4.8,
    hourlyRate: 22,
    timeZone: "EST",
    verified: true,
  },
  {
    id: "t3",
    name: "Emma Rodriguez",
    specialization: ["Conversation", "Writing", "Literature"],
    rating: 4.7,
    hourlyRate: 30,
    timeZone: "CET",
    verified: true,
  },
  {
    id: "t4",
    name: "David Kim",
    specialization: ["Business English", "Technical English", "Interview Prep"],
    rating: 4.9,
    hourlyRate: 35,
    timeZone: "KST",
    verified: true,
  }
];

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", 
  "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
];

// Type definitions
type LessonType = "general" | "conversation" | "exam" | "business" | "grammar";
type LessonDuration = 30 | 45 | 60 | 90;

interface LessonDetails {
  type: LessonType;
  duration: LessonDuration;
  focus: string;
  notes: string;
}

export default function BookLessonPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const teacherId = searchParams.get("teacher");
  
  // States
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [lessonDetails, setLessonDetails] = useState<LessonDetails>({
    type: "general",
    duration: 60,
    focus: "",
    notes: ""
  });
  const [calendarDates, setCalendarDates] = useState<Date[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Load teacher data
  useEffect(() => {
    if (teacherId) {
      const teacher = teachersData.find(t => t.id === teacherId);
      if (teacher) {
        setSelectedTeacher(teacher);
      }
    }
  }, [teacherId]);
  
  // Generate calendar dates for current month view
  useEffect(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get first day of month and last day of month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Get day of week for first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDay.getDay();
    
    // Generate array of dates to display
    const dates: Date[] = [];
    
    // Add dates from previous month to fill first week
    const daysFromPrevMonth = firstDayOfWeek;
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      dates.push(date);
    }
    
    // Add all days of current month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      dates.push(date);
    }
    
    // Add dates from next month to fill last week
    const remainingDays = 42 - dates.length; // 6 rows of 7 days
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      dates.push(date);
    }
    
    setCalendarDates(dates);
  }, [currentMonth]);
  
  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };
  
  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };
  
  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric"
    }).format(date);
  };
  
  // Check if date is in current month
  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };
  
  // Check if date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };
  
  // Check if date is in the past
  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };
  
  // Handle lesson type change
  const handleLessonTypeChange = (type: LessonType) => {
    setLessonDetails(prev => ({ ...prev, type }));
  };
  
  // Handle lesson duration change
  const handleLessonDurationChange = (duration: LessonDuration) => {
    setLessonDetails(prev => ({ ...prev, duration }));
  };
  
  // Go to next step
  const goToNextStep = () => {
    setCurrentStep(prev => prev + 1);
  };
  
  // Go to previous step
  const goToPreviousStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  // Check if current step is complete
  const isStepComplete = () => {
    switch (currentStep) {
      case 1: // Select date and time
        return selectedDate !== null && selectedTime !== null;
      case 2: // Lesson details
        return lessonDetails.type !== null && lessonDetails.duration !== null;
      case 3: // Review and confirm
        return true;
      default:
        return false;
    }
  };
  
  // Submit booking
  const submitBooking = () => {
    // In a real app, you would send the booking data to an API
    alert("Booking submitted successfully!");
    router.push("/dashboard");
  };
  
  // Calculate lesson end time
  const calculateEndTime = (startTime: string, durationMinutes: number) => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes, 0, 0);
    
    const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
    
    return `${endDate.getHours().toString().padStart(2, "0")}:${endDate.getMinutes().toString().padStart(2, "0")}`;
  };
  
  // Calculate booking cost
  const calculateBookingCost = () => {
    if (!selectedTeacher) return 0;
    return (selectedTeacher.hourlyRate / 60) * lessonDetails.duration;
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">Book a Lesson</h1>
            <Link 
              href="/teachers"
              className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Teachers
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            {[1, 2, 3].map(step => (
              <div key={step} className="flex items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= step 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div 
                    className={`w-20 h-1 ${
                      currentStep > step ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between px-4">
            <div className="text-center w-32">
              <p className={`text-sm font-medium ${currentStep >= 1 ? "text-blue-600" : "text-gray-500"}`}>
                Schedule
              </p>
            </div>
            <div className="text-center w-32">
              <p className={`text-sm font-medium ${currentStep >= 2 ? "text-blue-600" : "text-gray-500"}`}>
                Lesson Details
              </p>
            </div>
            <div className="text-center w-32">
              <p className={`text-sm font-medium ${currentStep >= 3 ? "text-blue-600" : "text-gray-500"}`}>
                Confirm
              </p>
            </div>
          </div>
        </div>
        
        {/* Selected teacher summary */}
        {selectedTeacher && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex items-center">
            <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 flex items-center justify-center text-gray-500">
              {selectedTeacher.name.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">
                {selectedTeacher.name}
                {selectedTeacher.verified && (
                  <span className="inline-flex items-center ml-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                  </span>
                )}
              </h3>
              <div className="flex items-center text-gray-500 text-sm">
                <Globe className="h-3 w-3 mr-1" />
                <span>Timezone: {selectedTeacher.timeZone}</span>
              </div>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xl font-bold text-blue-600">${selectedTeacher.hourlyRate}</p>
              <p className="text-gray-500 text-sm">per hour</p>
            </div>
          </div>
        )}
        
        {/* Step content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Step 1: Schedule */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Select Date & Time</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Calendar */}
                <div>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-gray-900">
                        {new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentMonth)}
                      </h3>
                      <div className="flex gap-2">
                        <button 
                          onClick={goToPreviousMonth}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <ChevronLeft className="h-5 w-5 text-gray-500" />
                        </button>
                        <button 
                          onClick={goToNextMonth}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <ChevronRight className="h-5 w-5 text-gray-500" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1">
                      {/* Day labels */}
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center text-xs text-gray-500 py-1">
                          {day}
                        </div>
                      ))}
                      
                      {/* Calendar dates */}
                      {calendarDates.map((date, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedDate(date)}
                          disabled={isPastDate(date)}
                          className={`
                            py-2 rounded-full text-sm
                            ${!isCurrentMonth(date) ? 'text-gray-300' : 'text-gray-700'}
                            ${isPastDate(date) ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100'}
                            ${isToday(date) ? 'font-bold' : ''}
                            ${selectedDate && 
                              date.getDate() === selectedDate.getDate() && 
                              date.getMonth() === selectedDate.getMonth() && 
                              date.getFullYear() === selectedDate.getFullYear() 
                                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                                : ''}
                          `}
                        >
                          {date.getDate()}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {selectedDate && (
                    <div className="bg-blue-50 p-3 rounded-md flex items-center">
                      <CalendarDays className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="text-blue-800">
                        Selected: {formatDate(selectedDate)}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Time slots */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Select Time</h3>
                  
                  {selectedDate ? (
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`
                            py-2 border rounded-md text-center text-sm
                            ${selectedTime === time 
                              ? 'bg-blue-600 text-white border-blue-600' 
                              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}
                          `}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-6 rounded-md text-center text-gray-500">
                      Please select a date first
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Step 2: Lesson Details */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Lesson Details</h2>
              
              <div className="space-y-6">
                {/* Lesson type */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Lesson Type</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {[
                      { value: "general", label: "General English" },
                      { value: "conversation", label: "Conversation" },
                      { value: "exam", label: "Exam Preparation" },
                      { value: "business", label: "Business English" },
                      { value: "grammar", label: "Grammar Focus" }
                    ].map(type => (
                      <button
                        key={type.value}
                        onClick={() => handleLessonTypeChange(type.value as LessonType)}
                        className={`
                          py-2 px-3 border rounded-md text-center text-sm
                          ${lessonDetails.type === type.value
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}
                        `}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Lesson duration */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Lesson Duration</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { value: 30, label: "30 minutes" },
                      { value: 45, label: "45 minutes" },
                      { value: 60, label: "60 minutes" },
                      { value: 90, label: "90 minutes" }
                    ].map(duration => (
                      <button
                        key={duration.value}
                        onClick={() => handleLessonDurationChange(duration.value as LessonDuration)}
                        className={`
                          py-2 px-3 border rounded-md text-center text-sm
                          ${lessonDetails.duration === duration.value
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}
                        `}
                      >
                        {duration.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Lesson focus */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">What would you like to focus on?</h3>
                  <textarea
                    value={lessonDetails.focus}
                    onChange={(e) => setLessonDetails(prev => ({ ...prev, focus: e.target.value }))}
                    placeholder="Describe what you want to learn or practice in this lesson..."
                    className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                {/* Additional notes */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Additional Notes for Teacher (Optional)</h3>
                  <textarea
                    value={lessonDetails.notes}
                    onChange={(e) => setLessonDetails(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Any other information you'd like your teacher to know..."
                    className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Step 3: Review & Confirm */}
          {currentStep === 3 && selectedDate && selectedTime && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Review & Confirm</h2>
              
              <div className="space-y-6">
                {/* Booking summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Booking Summary</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Date & Time</p>
                        <p className="text-gray-600">
                          {formatDate(selectedDate)}, {selectedTime} - {calculateEndTime(selectedTime, lessonDetails.duration)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Lesson Details</p>
                        <p className="text-gray-600">
                          {lessonDetails.type.charAt(0).toUpperCase() + lessonDetails.type.slice(1)} English, {lessonDetails.duration} minutes
                        </p>
                        {lessonDetails.focus && (
                          <div className="mt-2">
                            <p className="font-medium text-gray-700">Focus Areas:</p>
                            <p className="text-gray-600">{lessonDetails.focus}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <DollarSign className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Payment</p>
                        <p className="text-gray-600">
                          ${calculateBookingCost().toFixed(2)} ({lessonDetails.duration} minutes at ${selectedTeacher.hourlyRate}/hour)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Payment method - simplified for this example */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Payment Method</h3>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="w-10 h-6 bg-blue-600 rounded mr-3"></div>
                      <div>
                        <p className="font-medium text-gray-900">Credit Card ending in 4242</p>
                        <p className="text-gray-500 text-sm">Expires 12/25</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Terms and conditions */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 mr-2"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the <Link href="/terms" className="text-blue-600 hover:text-blue-800">Terms and Conditions</Link> and understand the <Link href="/cancellation-policy" className="text-blue-600 hover:text-blue-800">Cancellation Policy</Link>
                  </label>
                </div>
              </div>
            </div>
          )}
          
          {/* Navigation buttons */}
          <div className="mt-8 flex justify-between">
            {currentStep > 1 ? (
              <button
                onClick={goToPreviousStep}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}
            
            {currentStep < 3 ? (
              <button
                onClick={goToNextStep}
                disabled={!isStepComplete()}
                className={`
                  px-6 py-2 rounded-md text-white font-medium
                  ${isStepComplete()
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-300 cursor-not-allowed'}
                `}
              >
                Continue
              </button>
            ) : (
              <button
                onClick={submitBooking}
                className="px-6 py-2 bg-blue-600 rounded-md text-white font-medium hover:bg-blue-700"
              >
                Confirm Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 