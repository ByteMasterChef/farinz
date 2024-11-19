import React from 'react';

interface RecommendationCardProps {
  title: string;
  details: string;
  category?: string;
  type: 'nutrition' | 'exercise';
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  title,
  details,
  category,
  type,
}) => {
  const getImageUrl = () => {
    if (type === 'nutrition') {
      const foodImages: { [key: string]: string } = {
        high_protein: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500&q=80',
        complex_carbs: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80',
        dairy: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&q=80',
        healthy_fats: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&q=80',
        legumes: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e3?w=500&q=80',
        protein_shake: 'https://images.unsplash.com/photo-1622819584099-e04ccb14e8d5?w=500&q=80',
        balanced: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80',
        fruits: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=500&q=80',
        grains: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80',
      };
      return category ? foodImages[category] : foodImages.balanced;
    } else {
      const exerciseImages: { [key: string]: string } = {
        'High-Intensity Interval Training': 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=500&q=80',
        'Weight Training': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80',
        'Running': 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500&q=80',
        'Boxing': 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=500&q=80',
        'Swimming': 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=500&q=80',
        'Cycling': 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=500&q=80',
        'Yoga': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80',
        'Strength Training': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80',
        'Walking': 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=500&q=80',
        'Water Aerobics': 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=500&q=80',
        'Tai Chi': 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=500&q=80',
        'Light Resistance Training': 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=500&q=80',
      };
      return exerciseImages[title] || exerciseImages['Strength Training'];
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-102">
      <div className="relative h-48 overflow-hidden">
        <img
          src={getImageUrl()}
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-110 duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <h3 className="absolute bottom-4 left-4 text-white font-semibold text-lg">{title}</h3>
      </div>
      <div className="p-4">
        <p className="text-gray-600 text-sm">{details}</p>
      </div>
    </div>
  );
};