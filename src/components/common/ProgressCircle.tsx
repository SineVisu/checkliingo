
import React, { useEffect, useState } from 'react';

interface ProgressCircleProps {
  progress: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  children?: React.ReactNode;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  progress,
  size = 64,
  strokeWidth = 4,
  color = 'hsl(var(--primary))',
  backgroundColor = 'hsl(var(--muted))',
  children,
}) => {
  const [displayedProgress, setDisplayedProgress] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const dashoffset = circumference - (displayedProgress / 100) * circumference;

  useEffect(() => {
    // Animate progress
    const timeout = setTimeout(() => {
      setDisplayedProgress(progress);
    }, 100);

    return () => clearTimeout(timeout);
  }, [progress]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="progress-circle">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          className="progress-indicator"
          style={{ "--progress-value": `${dashoffset}` } as React.CSSProperties}
        />
      </svg>
      {children && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ fontSize: size * 0.3 }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default ProgressCircle;
