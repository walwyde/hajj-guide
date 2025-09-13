'use client';
import { useState, useEffect, useRef } from "react";
import { RotateCcw, Play, Pause, Volume2, VolumeX, ArrowLeft, Star, Circle, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function TawafCounter() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [currentDua, setCurrentDua] = useState(0);
  
  // Animation states
  const [pilgrims, setPilgrims] = useState([]);
  const animationRef = useRef(null);
  const audioRef = useRef(null);

  const duas = [
    {
      arabic: "بِسْمِ اللهِ وَاللهُ أَكْبَرُ",
      transliteration: "Bismillahi wallahu akbar",
      english: "In the name of Allah, and Allah is the Greatest",
      audio: "bismillah-allahu-akbar"
    },
    {
      arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
      transliteration: "Rabbana atina fi'd-dunya hasanatan wa fi'l-akhirati hasanatan wa qina 'adhab an-nar",
      english: "Our Lord, give us good in this world and good in the hereafter, and save us from the punishment of the Fire",
      audio: "rabbana-atina"
    },
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ وَرَحْمَتِكَ",
      transliteration: "Allahumma inni as'aluka min fadlika wa rahmatik",
      english: "O Allah, I ask You for Your bounty and mercy",
      audio: "allahumma-inni"
    }
  ];

  // Initialize pilgrims for animation
  useEffect(() => {
    const newPilgrims = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      angle: (i * 30) * (Math.PI / 180),
      radius: 120 + Math.random() * 20,
      speed: 0.5 + Math.random() * 0.3,
      color: `hsl(${Math.random() * 60 + 200}, 70%, ${60 + Math.random() * 20}%)`
    }));
    setPilgrims(newPilgrims);
  }, []);

  // Animation loop
  useEffect(() => {
    if (isRunning) {
      const animate = () => {
        setPilgrims(prev => prev.map(pilgrim => ({
          ...pilgrim,
          angle: pilgrim.angle + pilgrim.speed * 0.01
        })));
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning]);

  const handleIncrement = () => {
    if (count < 7) {
      const newCount = count + 1;
      setCount(newCount);
      
      // Change dua every 2-3 rounds
      if (newCount % 2 === 0) {
        setCurrentDua((prev) => (prev + 1) % duas.length);
      }

      if (newCount === 7) {
        setIsCompleted(true);
        setIsRunning(false);
        if (audioEnabled && audioRef.current) {
          audioRef.current.play().catch(e => console.log('Audio play failed:', e));
        }
      }
    }
  };

  const handleReset = () => {
    setCount(0);
    setCurrentRound(1);
    setIsCompleted(false);
    setIsRunning(false);
    setCurrentDua(0);
  };

  const toggleAnimation = () => {
    setIsRunning(!isRunning);
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 text-white">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <Star className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold">Tawaf Counter</h1>
          </div>
          <p className="text-white/80 text-lg">Circumambulation around the Sacred Kaaba</p>
          {isCompleted && <Link className="border border-forground rounded p-2 mt-4" href={"/dashboard"}>Go Back to Dashboard</Link>}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Tawaf Simulation */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Sacred Tawaf Simulation</h2>
              <p className="text-white/80">Visual representation of the holy ritual</p>
            </div>

            {/* Kaaba and Pilgrims Animation */}
            <div className="relative w-full aspect-square max-w-sm mx-auto mb-6">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                {/* Outer circle (Mataf area) */}
                <circle
                  cx="200"
                  cy="200"
                  r="180"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
                
                {/* Inner guidance circle */}
                <circle
                  cx="200"
                  cy="200"
                  r="140"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                />

                {/* Kaaba (Sacred Cube) */}
                <rect
                  x="175"
                  y="175"
                  width="50"
                  height="50"
                  fill="url(#kaabaGradient)"
                  stroke="rgba(255,215,0,0.8)"
                  strokeWidth="2"
                  rx="4"
                />

                {/* Hajar al-Aswad (Black Stone) indicator */}
                <circle
                  cx="225"
                  cy="190"
                  r="4"
                  fill="#2a2a2a"
                  stroke="rgba(255,215,0,1)"
                  strokeWidth="1"
                />

                {/* Pilgrims */}
                {pilgrims.map((pilgrim) => {
                  const x = 200 + Math.cos(pilgrim.angle) * pilgrim.radius;
                  const y = 200 + Math.sin(pilgrim.angle) * pilgrim.radius;
                  
                  return (
                    <g key={pilgrim.id}>
                      <circle
                        cx={x}
                        cy={y}
                        r="4"
                        fill={pilgrim.color}
                        stroke="rgba(255,255,255,0.8)"
                        strokeWidth="1"
                      >
                        {isRunning && (
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            dur="20s"
                            repeatCount="indefinite"
                            values={`0 200 200; 360 200 200`}
                          />
                        )}
                      </circle>
                      {/* Trail effect */}
                      <circle
                        cx={x - Math.cos(pilgrim.angle) * 8}
                        cy={y - Math.sin(pilgrim.angle) * 8}
                        r="2"
                        fill={pilgrim.color}
                        opacity="0.5"
                      />
                    </g>
                  );
                })}

                {/* Direction arrow */}
                <defs>
                  <linearGradient id="kaabaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#1a1a1a', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#4a4a4a', stopOpacity: 1 }} />
                  </linearGradient>
                  
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                          refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="rgba(255,215,0,0.8)" />
                  </marker>
                </defs>

                {/* Counter-clockwise direction indicator */}
                <path
                  d="M 320 200 A 120 120 0 0 0 280 280"
                  fill="none"
                  stroke="rgba(255,215,0,0.6)"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
              </svg>

              {/* Start position indicator */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-green-500/80 text-white text-xs px-2 py-1 rounded-full">
                Start (Hajar al-Aswad)
              </div>
            </div>

            {/* Animation Controls */}
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={toggleAnimation}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
              >
                {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {isRunning ? 'Pause' : 'Start'} Simulation
              </button>
              
              <button
                onClick={toggleAudio}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
              >
                {audioEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                Audio
              </button>
            </div>
          </div>

          {/* Counter and Controls */}
          <div className="space-y-6">
            {/* Main Counter */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
              <div className="mb-6">
                <div className="text-6xl font-bold text-white mb-2">
                  {count}/7
                </div>
                <div className="text-white/80 text-lg">Completed Circuits</div>
                
                {/* Progress Circles */}
                <div className="flex justify-center gap-2 mt-4">
                  {Array.from({ length: 7 }, (_, i) => (
                    <div key={i} className="relative">
                      {i < count ? (
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      ) : (
                        <Circle className="w-6 h-6 text-white/30" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {isCompleted ? (
                <div className="mb-6 p-4 bg-green-500/20 rounded-lg border border-green-500/30">
                  <h3 className="text-xl font-bold text-green-400 mb-2">Tawaf Complete!</h3>
                  <p className="text-green-300 text-sm">May Allah accept your worship</p>
                </div>
              ) : (
                <div className="mb-6">
                  <button
                    onClick={handleIncrement}
                    className="bg-gradient-primary text-white px-8 py-4 rounded-xl text-xl font-semibold shadow-glow hover:scale-105 transition-transform"
                  >
                    Complete Circuit {count + 1}
                  </button>
                </div>
              )}

              <button
                onClick={handleReset}
                className="flex items-center gap-2 mx-auto px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Counter
              </button>
            </div>

            {/* Current Dua */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 text-center">Recite During Tawaf</h3>
              
              <div className="space-y-4">
                {/* Arabic */}
                <div className="text-center">
                  <div className="text-2xl text-white font-arabic leading-relaxed mb-2 p-4 bg-white/10 rounded-lg">
                    {duas[currentDua].arabic}
                  </div>
                </div>

                {/* Transliteration */}
                <div className="text-center">
                  <div className="text-lg text-yellow-300 font-medium mb-2">
                    {duas[currentDua].transliteration}
                  </div>
                </div>

                {/* English Translation */}
                <div className="text-center">
                  <div className="text-white/80 italic">
                    "{duas[currentDua].english}"
                  </div>
                </div>

                {/* Dua Navigation */}
                <div className="flex justify-center gap-2 mt-4">
                  {duas.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentDua(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentDua 
                          ? 'bg-yellow-400' 
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">How to Perform Tawaf</h3>
              
              <ol className="space-y-2 text-white/80 text-sm">
                <li className="flex gap-2">
                  <span className="text-yellow-400 font-bold">1.</span>
                  Begin at the Hajar al-Aswad (Black Stone)
                </li>
                <li className="flex gap-2">
                  <span className="text-yellow-400 font-bold">2.</span>
                  Face the Kaaba and make intention (Niyyah)
                </li>
                <li className="flex gap-2">
                  <span className="text-yellow-400 font-bold">3.</span>
                  Keep the Kaaba on your left side
                </li>
                <li className="flex gap-2">
                  <span className="text-yellow-400 font-bold">4.</span>
                  Walk counter-clockwise for 7 complete circuits
                </li>
                <li className="flex gap-2">
                  <span className="text-yellow-400 font-bold">5.</span>
                  Recite prayers and supplications
                </li>
                <li className="flex gap-2">
                  <span className="text-yellow-400 font-bold">6.</span>
                  After completion, pray 2 Rak'ah at Maqam Ibrahim
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Hidden audio element */}
        <audio ref={audioRef} preload="auto">
          <source src="/audio/tawaf-complete.mp3" type="audio/mpeg" />
        </audio>
      </div>
    </div>
  );
}