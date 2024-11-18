import React from 'react';
import { UserCircle2, Weight, Ruler, Target } from 'lucide-react';

interface UserFormProps {
  userProfile: {
    age: string;
    weight: string;
    height: string;
    goal: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const UserForm: React.FC<UserFormProps> = ({ userProfile, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <UserCircle2 className="w-5 h-5 text-blue-500" />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={userProfile.age}
          onChange={onChange}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          min="1"
          max="120"
        />
      </div>

      <div className="flex items-center space-x-4">
        <Weight className="w-5 h-5 text-blue-500" />
        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          value={userProfile.weight}
          onChange={onChange}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          min="1"
          max="300"
        />
      </div>

      <div className="flex items-center space-x-4">
        <Ruler className="w-5 h-5 text-blue-500" />
        <input
          type="number"
          name="height"
          placeholder="Height (cm)"
          value={userProfile.height}
          onChange={onChange}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          min="1"
          max="300"
        />
      </div>

      <div className="flex items-center space-x-4">
        <Target className="w-5 h-5 text-blue-500" />
        <select
          name="goal"
          value={userProfile.goal}
          onChange={onChange}
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          <option value="">Select Goal</option>
          <option value="weight_loss">Weight Loss</option>
          <option value="muscle_gain">Muscle Gain</option>
          <option value="maintain">Maintain</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        Save Profile
      </button>
    </form>
  );
};