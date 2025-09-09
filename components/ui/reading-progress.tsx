import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import cn from '@/lib/utils/cn';

interface ReadingProgressProps {
  className?: string;
}

export function ReadingProgress({ className }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className={cn('fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b', className)}>
      <Progress value={progress} className="h-1 rounded-none" />
      <div className="px-4 py-2 text-sm text-muted-foreground">
        Reading Progress: {Math.round(progress)}%
      </div>
    </div>
  );
}