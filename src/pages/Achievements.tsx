
import React, { useEffect, useState } from 'react';
import { Award } from 'lucide-react';
import { ChecklistProvider } from '@/context/ChecklistContext';
import { initialChecklistData } from '@/data/initialChecklistData';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AchievementCard, { Achievement } from '@/components/achievements/AchievementCard';
import IdentificationAchievementIcon from '@/components/checklists/IdentificationAchievementIcon';

const Achievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  
  useEffect(() => {
    // Define all possible achievements
    const allAchievements: Achievement[] = [
      {
        id: 'identificationComplete',
        title: 'Identification Complete',
        description: 'Completed all identification requirements',
        earnedAt: null,
        icon: <IdentificationAchievementIcon />
      },
      // Add more achievements here in the future
    ];
    
    // Load earned achievements from localStorage
    const storedAchievements = JSON.parse(localStorage.getItem('achievements') || '{}');
    
    // Update achievements with earned status
    const updatedAchievements = allAchievements.map(achievement => {
      const storedAchievement = storedAchievements[achievement.id];
      if (storedAchievement) {
        return {
          ...achievement,
          earnedAt: storedAchievement.earnedAt
        };
      }
      return achievement;
    });
    
    setAchievements(updatedAchievements);
  }, []);
  
  return (
    <ChecklistProvider initialData={initialChecklistData}>
      <div className="min-h-screen flex flex-col pb-16 bg-gradient-to-b from-background to-muted">
        <Header />
        
        <main className="flex-1 px-4 pt-4 pb-20 max-w-lg mx-auto w-full">
          <div className="flex items-center gap-2 mb-6">
            <Award className="h-6 w-6 text-amber-500" />
            <h1 className="text-2xl font-bold">Achievements</h1>
          </div>
          
          {achievements.length > 0 ? (
            <div className="space-y-4">
              {achievements.map(achievement => (
                <AchievementCard 
                  key={achievement.id} 
                  achievement={achievement} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Award className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-1">No achievements yet</h3>
              <p className="text-muted-foreground">Complete tasks to earn achievements</p>
            </div>
          )}
        </main>
        
        <Footer activeTab="achievements" />
      </div>
    </ChecklistProvider>
  );
};

export default Achievements;
