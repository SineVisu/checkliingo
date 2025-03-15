
import React from 'react';
import { Award, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  earnedAt: string | null;
  icon?: React.ReactNode;
}

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const isEarned = !!achievement.earnedAt;
  const earnedDate = isEarned 
    ? new Date(achievement.earnedAt) 
    : null;
  
  return (
    <div 
      className={cn(
        "border rounded-lg p-4 flex items-start gap-4",
        isEarned ? "bg-amber-50" : "bg-gray-50 opacity-70"
      )}
    >
      <div className={cn(
        "p-3 rounded-full flex-shrink-0",
        isEarned ? "bg-amber-100" : "bg-gray-100"
      )}>
        {achievement.icon || <Award className={cn(
          "h-8 w-8",
          isEarned ? "text-amber-500" : "text-gray-400"
        )} />}
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-lg">{achievement.title}</h3>
          {isEarned && (
            <div className="bg-green-100 text-green-700 p-1 rounded-full">
              <Check className="h-3 w-3" />
            </div>
          )}
        </div>
        <p className="text-muted-foreground text-sm mt-1">{achievement.description}</p>
        
        {isEarned && earnedDate && (
          <p className="text-xs text-muted-foreground mt-2">
            Earned on {earnedDate.toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default AchievementCard;
