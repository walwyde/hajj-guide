'use client';
import { useState, useRef, useEffect } from "react";
import { Clock, Star, Grip } from "lucide-react";

export default function FloatingPrayerButton() {
  const [position, setPosition] = useState({ x: 20, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const buttonRef = useRef(null);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseDown = (e) => {
    if (e.target.closest('.no-drag')) return;
    
    setIsDragging(true);
    const rect = buttonRef.current.getBoundingClientRect();
    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    // Constrain to viewport bounds
    const maxX = window.innerWidth - (isExpanded ? 250 : 60);
    const maxY = window.innerHeight - (isExpanded ? 150 : 60);

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add global mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'grabbing';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isDragging, dragStart]);

  // Touch events for mobile
  const handleTouchStart = (e) => {
    if (e.target.closest('.no-drag')) return;
    
    const touch = e.touches[0];
    setIsDragging(true);
    const rect = buttonRef.current.getBoundingClientRect();
    setDragStart({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    });
    e.preventDefault();
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    const newX = touch.clientX - dragStart.x;
    const newY = touch.clientY - dragStart.y;

    const maxX = window.innerWidth - (isExpanded ? 250 : 60);
    const maxY = window.innerHeight - (isExpanded ? 150 : 60);

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getNextPrayer = () => {
    const hour = currentTime.getHours();
    if (hour < 5) return 'Fajr';
    if (hour < 13) return 'Dhuhr';
    if (hour < 16) return 'Asr';
    if (hour < 19) return 'Maghrib';
    if (hour < 21) return 'Isha';
    return 'Fajr (Tomorrow)';
  };

  const handleNavigate = () => {
      // Fallback navigation
      window.location.href = '/prayer-time';
  };

  return (
    <div
      ref={buttonRef}
      className={`fixed z-50 transition-all duration-300 ${isDragging ? 'z-[100]' : 'z-50'}`}
      style={{
        left: position.x,
        top: position.y,
        transform: isDragging ? 'scale(1.05)' : 'scale(1)',
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => !isDragging && setIsExpanded(false)}
    >
      {/* Main Button */}
      <div
        className={`bg-gradient-primary shadow-glow rounded-full transition-all duration-300 ${
          isExpanded ? 'rounded-2xl px-4 py-3' : 'w-14 h-14 p-0'
        } ${isDragging ? 'shadow-2xl' : 'shadow-lg'} hover:shadow-2xl backdrop-blur-sm border border-white/20`}
      >
        {isExpanded ? (
          // Expanded view
          <div className="flex items-center gap-3 text-white min-w-[200px]">
            <div className="flex-shrink-0 p-2 bg-white/20 rounded-full">
              <Star className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate">Prayer Times</div>
              <div className="text-xs text-white/80 truncate">
                {formatTime()} • Next: {getNextPrayer()}
              </div>
            </div>
            <button
              onClick={handleNavigate}
              className="no-drag flex-shrink-0 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-medium transition-colors"
            >
              View
            </button>
          </div>
        ) : (
          // Collapsed view
          <div 
            className="w-full h-full flex items-center justify-center text-white cursor-pointer"
            onClick={handleNavigate}
          >
            <div className="relative">
              <Star className="w-6 h-6" />
              {/* Pulse animation */}
              <div className="absolute inset-0 animate-ping">
                <Star className="w-6 h-6 opacity-30" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Drag Handle (visible when expanded) */}
      {isExpanded && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing transition-colors">
          <Grip className="w-3 h-3 text-white" />
        </div>
      )}

      {/* Current time indicator */}
      {!isExpanded && (
        <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full font-mono font-bold shadow-lg">
          {currentTime.getHours().toString().padStart(2, '0')}:{currentTime.getMinutes().toString().padStart(2, '0')}
        </div>
      )}

      {/* Floating tooltip */}
      <div
        className={`absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-all duration-200 ${
          !isExpanded && !isDragging ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'
        }`}
        style={{ 
          transitionDelay: isExpanded ? '500ms' : '0ms',
          zIndex: -1
        }}
      >
        Prayer Times • Drag to move
        <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-2 border-b-2 border-r-4 border-transparent border-r-black/80"></div>
      </div>
    </div>
  );
}

// Usage component to demonstrate integration
export function FloatingPrayerButtonDemo() {
  const [currentPage, setCurrentPage] = useState('/dashboard');

  const handleNavigate = (path) => {
    setCurrentPage(path);
    console.log('Navigating to:', path);
    // In a real app, you'd use your router here
    // navigate(path) or window.location.href = path
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-foreground">
          App with Floating Prayer Button
        </h1>
        
        <div className="bg-card border border-card-border rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Demo Content</h2>
          <p className="text-muted-foreground mb-4">
            This is a demonstration of the floating prayer times button. The button:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Is fully draggable around the screen</li>
            <li>Shows current time and next prayer</li>
            <li>Expands on hover to show more details</li>
            <li>Can be clicked to navigate to prayer times</li>
            <li>Works on both desktop and mobile</li>
            <li>Stays within viewport boundaries</li>
          </ul>
          
          <div className="mt-6 p-4 bg-primary/10 rounded-lg">
            <p className="text-sm text-primary">
              <strong>Try it:</strong> Hover over the floating button in the corner, then drag it to a new position!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border border-card-border rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Features</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Real-time clock display</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Next prayer indicator</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">Smooth animations</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm">Mobile-friendly</span>
              </div>
            </div>
          </div>

          <div className="bg-card border border-card-border rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Usage Instructions</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>1. The button appears in the bottom-left corner by default</p>
              <p>2. Hover to see expanded information</p>
              <p>3. Drag from anywhere on the button to reposition</p>
              <p>4. Click "View" or the star icon to open Prayer Times</p>
              <p>5. The position persists during your session</p>
            </div>
          </div>
        </div>
      </div>

      {/* The actual floating button */}
      <FloatingPrayerButton onNavigate={handleNavigate} />
    </div>
  );
}