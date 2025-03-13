
import React from 'react';

interface CategoryLabelProps {
  category?: string;
}

const CategoryLabel: React.FC<CategoryLabelProps> = ({ category }) => {
  if (!category) return null;
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'work':
        return 'bg-blue-100 text-blue-800';
      case 'personal':
        return 'bg-purple-100 text-purple-800';
      case 'health':
        return 'bg-green-100 text-green-800';
      case 'learning':
        return 'bg-amber-100 text-amber-800';
      case 'identification':
        return 'bg-teal-100 text-teal-800';
      case 'medical':
        return 'bg-rose-100 text-rose-800';
      case 'proficiency':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full inline-block mt-1 ${getCategoryColor(category)}`}>
      {category}
    </span>
  );
};

export default CategoryLabel;
