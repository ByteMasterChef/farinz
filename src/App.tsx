import React, { useState, useEffect } from 'react';
import { UserForm } from './components/UserForm';
import { ChatMessage } from './components/ChatMessage';
import { RecommendationCard } from './components/RecommendationCard';
import { Dumbbell, Utensils, RotateCcw } from 'lucide-react';

interface UserProfile {
  age: string;
  weight: string;
  height: string;
  goal: string;
}

interface Message {
  id: number;
  text: string | React.ReactNode;
  isBot: boolean;
}

function App() {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    age: '',
    weight: '',
    height: '',
    goal: '',
  });
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your fitness and nutrition assistant. Please fill out your profile to get started!",
      isBot: true,
    },
  ]);
  const [nutritionData, setNutritionData] = useState<any>(null);
  const [exerciseData, setExerciseData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [nutritionRes, exerciseRes] = await Promise.all([
          fetch('/nutrition.json'),
          fetch('/exercise.json'),
        ]);
        const nutrition = await nutritionRes.json();
        const exercise = await exerciseRes.json();
        setNutritionData(nutrition);
        setExerciseData(exercise);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUserProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bmi = calculateBMI(
      parseFloat(userProfile.weight),
      parseFloat(userProfile.height)
    );
    const newMessage = {
      id: Date.now(),
      text: (
        <div>
          <p className="font-semibold mb-2">Profile saved! Here's your summary:</p>
          <ul className="list-disc list-inside">
            <li>Age: {userProfile.age} years</li>
            <li>Weight: {userProfile.weight} kg</li>
            <li>Height: {userProfile.height} cm</li>
            <li>Goal: {userProfile.goal.replace('_', ' ')}</li>
            <li>BMI: {bmi.toFixed(1)}</li>
          </ul>
          <p className="mt-2">What would you like to know about? Click the buttons below!</p>
        </div>
      ),
      isBot: true,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const calculateBMI = (weight: number, height: number): number => {
    return weight / Math.pow(height / 100, 2);
  };

  const getAgeGroup = (age: number): string => {
    if (age <= 30) return '18-30';
    if (age <= 50) return '31-50';
    return '51-plus';
  };

  const handleNutrition = () => {
    if (!nutritionData || !userProfile.goal) return;
    
    const recommendations = nutritionData[userProfile.goal];
    const newMessage = {
      id: Date.now(),
      text: (
        <div>
          <p className="font-semibold mb-4">Here are your personalized nutrition recommendations:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recommendations.map((food: any, index: number) => (
              <RecommendationCard
                key={index}
                title={food.food}
                details={`${food.calories} calories | ${food.protein}g protein`}
                category={food.category}
                type="nutrition"
              />
            ))}
          </div>
        </div>
      ),
      isBot: true,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleExercise = () => {
    if (!exerciseData || !userProfile.age) return;
    
    const ageGroup = getAgeGroup(parseInt(userProfile.age));
    const exercises = exerciseData[ageGroup];
    const newMessage = {
      id: Date.now(),
      text: (
        <div>
          <p className="font-semibold mb-4">Here are your recommended exercises:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {exercises.map((exercise: any, index: number) => (
              <RecommendationCard
                key={index}
                title={exercise.exercise}
                details={`Duration: ${exercise.duration} min | Intensity: ${exercise.intensity}`}
                type="exercise"
              />
            ))}
          </div>
        </div>
      ),
      isBot: true,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleReset = () => {
    setUserProfile({
      age: '',
      weight: '',
      height: '',
      goal: '',
    });
    setMessages([
      {
        id: Date.now(),
        text: "Let's start fresh! Please fill out your profile again.",
        isBot: true,
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="header-text"> 
        <header> 
          <p> ERA DOC</p>
          </header>
          </div>
      <div className="max-w-4xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left sidebar with form */}
          <div className="md:col-span-1">
            <UserForm
              userProfile={userProfile}
              onChange={handleInputChange}
              onSubmit={handleProfileSubmit}
            />
            
            {userProfile.age && userProfile.weight && userProfile.height && userProfile.goal && (
              <div className="mt-4 space-y-2">
                <button
                  onClick={handleNutrition}
                  className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
                >
                  <Utensils className="w-5 h-5" />
                  Suggest Nutrition
                </button>
                <button
                  onClick={handleExercise}
                  className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                  <Dumbbell className="w-5 h-5" />
                  Suggest Exercise
                </button>
                <button
                  onClick={handleReset}
                  className="w-full flex items-center justify-center gap-2 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                  Reset
                </button>
              </div>
            )}
          </div>

          {/* Right side chat area */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  isBot={message.isBot}
                  message={message.text}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;