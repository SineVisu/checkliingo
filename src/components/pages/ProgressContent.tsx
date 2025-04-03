
import React, { useContext } from 'react';
import { ChecklistContext } from '@/context/ChecklistContext';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProgressCircle from '@/components/common/ProgressCircle';

interface CategoryProgress {
  id: string;
  name: string;
  progress: number;
  count: number;
  total: number;
}

const ProgressContent: React.FC = () => {
  const { checklists } = useContext(ChecklistContext);
  
  const calculateCategoryProgress = (category: string): CategoryProgress => {
    let total = 0;
    let completed = 0;
    
    checklists.forEach(group => {
      group.items.forEach(item => {
        if (item.category === category) {
          total++;
          if (item.isCompleted) {
            completed++;
          }
        }
      });
    });
    
    return {
      id: category,
      name: getCategoryName(category),
      progress: total > 0 ? Math.round((completed / total) * 100) : 0,
      count: completed,
      total
    };
  };
  
  const getCategoryName = (category: string): string => {
    switch (category) {
      case 'identification':
        return 'Identification & Medical';
      case 'proficiency':
        return 'Flight Proficiency';
      case 'knowledge':
        return 'Aeronautical Knowledge';
      case 'experience':
        return 'Aeronautical Experience';
      case 'medical':
        return 'Medical Certification';
      default:
        return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };
  
  // Calculate progress for each category
  const categories = ['identification', 'medical', 'proficiency', 'knowledge', 'experience'];
  const categoryProgress = categories.map(category => calculateCategoryProgress(category));
  
  // Calculate overall progress
  const totalTasks = checklists.reduce((acc, group) => acc + group.items.length, 0);
  const completedTasks = checklists.reduce(
    (acc, group) => acc + group.items.filter(item => item.isCompleted).length, 
    0
  );
  
  const overallProgress = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;
  
  return (
    <main className="flex-1 p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Progress Summary</h1>
      
      <div className="mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <ProgressCircle progress={overallProgress} size={80}>
                <span className="text-lg font-bold">{overallProgress}%</span>
              </ProgressCircle>
              <div className="flex-1">
                <Progress value={overallProgress} className="h-4 mb-2" />
                <p className="text-sm text-muted-foreground">
                  {completedTasks} of {totalTasks} tasks completed
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-xl font-medium mb-4">Categories</h2>
      <div className="grid gap-4">
        {categoryProgress.map(category => (
          <Card key={category.id}>
            <CardHeader className="py-3">
              <CardTitle className="text-base">{category.name}</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  {category.count} of {category.total} completed
                </span>
                <span className="font-medium">{category.progress}%</span>
              </div>
              <Progress value={category.progress} className="h-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default ProgressContent;
