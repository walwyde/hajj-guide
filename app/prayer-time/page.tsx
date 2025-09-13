'use client';
import { useEffect, useState } from "react";
import { Clock, MapPin, Calendar, Sunrise, Sun, Sunset, Moon, Star, RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";


type PrayerData = {
data : {timings: { Fajr: string; Dhuhr: string; Asr: string; Maghrib: string; Isha: string}}
}
export default function PrayerTimes() {
  const [prayerData, setPrayerData] = useState<PrayerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('NG');
  const [selectedCity, setSelectedCity] = useState('Abuja');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Popular cities and countries
  const locations = [
    { country: 'GB', city: 'London', label: '🇬🇧 London, UK' },
    { country: 'US', city: 'New York', label: '🇺🇸 New York, USA' },
    { country: 'SA', city: 'Mecca', label: '🇸🇦 Mecca, Saudi Arabia' },
    { country: 'SA', city: 'Medina', label: '🇸🇦 Medina, Saudi Arabia' },
    { country: 'EG', city: 'Cairo', label: '🇪🇬 Cairo, Egypt' },
    { country: 'TR', city: 'Istanbul', label: '🇹🇷 Istanbul, Turkey' },
    { country: 'AE', city: 'Dubai', label: '🇦🇪 Dubai, UAE' },
    { country: 'MY', city: 'Kuala Lumpur', label: '🇲🇾 Kuala Lumpur, Malaysia' },
    { country: 'ID', city: 'Jakarta', label: '🇮🇩 Jakarta, Indonesia' },
    { country: 'PK', city: 'Karachi', label: '🇵🇰 Karachi, Pakistan' },
    { country: 'BD', city: 'Dhaka', label: '🇧🇩 Dhaka, Bangladesh' },
    { country: 'IN', city: 'Mumbai', label: '🇮🇳 Mumbai, India' },
    { country: 'NG', city: 'Nigeria', label: 'NG Abuja, Nigeria' }
  ];

  const prayerNames = {
    Fajr: { icon: Sunrise, color: 'text-blue-500', bg: 'bg-blue-500/10', name: 'Fajr' },
    Dhuhr: { icon: Sun, color: 'text-yellow-500', bg: 'bg-yellow-500/10', name: 'Dhuhr' },
    Asr: { icon: Sun, color: 'text-orange-500', bg: 'bg-orange-500/10', name: 'Asr' },
    Maghrib: { icon: Sunset, color: 'text-red-500', bg: 'bg-red-500/10', name: 'Maghrib' },
    Isha: { icon: Moon, color: 'text-purple-500', bg: 'bg-purple-500/10', name: 'Isha' }
  };

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchPrayerTimes = async () => {
    setLoading(true);
    setError('');
    
    try {
      const today = new Date();
      const dateStr = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;
      
      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity/${dateStr}?country=${selectedCountry}&city=${selectedCity}`
      );
      
      if (!response.ok) {
        return setPrayerData(null);
      }
      
      const data = await response.json();
      setPrayerData(data);
    } catch (err) {
      setError('Failed to load prayer times. Please try again.');
      console.error('Error fetching prayer times:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrayerTimes();
  }, [selectedCity, selectedCountry]);

  const getCurrentPrayer = () => {
    if (!prayerData?.data?.timings) return null;
    
    const now = new Date();
    const currentTimeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const timings = prayerData.data.timings;
    const prayerTimes = [
      { name: 'Fajr', time: timings.Fajr },
      { name: 'Dhuhr', time: timings.Dhuhr },
      { name: 'Asr', time: timings.Asr },
      { name: 'Maghrib', time: timings.Maghrib },
      { name: 'Isha', time: timings.Isha }
    ];

    // Find current prayer
    for (let i = 0; i < prayerTimes.length; i++) {
      const current = prayerTimes[i];
      const next = prayerTimes[i + 1];
      
      if (currentTimeStr >= current.time && (!next || currentTimeStr < next.time)) {
        return { current: current.name, next: next?.name || prayerTimes[0].name };
      }
    }
    
    // If before Fajr, next prayer is Fajr
    if (currentTimeStr < prayerTimes[0].time) {
      return { current: null, next: 'Fajr' };
    }
    
    // If after Isha, next prayer is Fajr (tomorrow)
    return { current: 'Isha', next: 'Fajr' };
  };

  const timeUntilNext = () => {
    if (!prayerData?.data?.timings) return '';
    
    const current = getCurrentPrayer();
    if (!current?.next) return '';
    
    const now = new Date();
    const timings = prayerData.data.timings;
    const nextPrayerTime = timings[current.next];
    
    if (!nextPrayerTime) return '';
    
    const [hours, minutes] = nextPrayerTime.split(':').map(Number);
    const nextPrayer = new Date();
    nextPrayer.setHours(hours, minutes, 0, 0);
    
    // If next prayer is tomorrow (Fajr after Isha)
    if (current.current === 'Isha' && current.next === 'Fajr') {
      nextPrayer.setDate(nextPrayer.getDate() + 1);
    }
    
    const diff = nextPrayer.getTime() - now.getTime();
    if (diff < 0) return '';
    
    const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
    const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hoursLeft > 0) {
      return `${hoursLeft}h ${minutesLeft}m`;
    }
    return `${minutesLeft}m`;
  };

  const formatTime = (time24) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const currentPrayerInfo = getCurrentPrayer();

  return (
    <div className="min-h-screen bg-gradient-hero p-4 md:p-8">
        <div className="grid justify-start">

         <Link  href="/" className="inline-flex items-center text-secondary hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-6 text-white">
          <div className="flex items-center justify-center gap-4">
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
              <Star className="w-12 h-12" />
            </div>
            <div>
              <h1 className="text-5xl font-bold mb-2">Prayer Times</h1>
              <p className="text-white/80 text-xl">Stay connected with your daily prayers</p>
            </div>
          </div>

          {/* Current Time Display */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl">
            <Clock className="w-6 h-6" />
            <span className="text-2xl font-mono font-bold">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
            <span className="text-white/80">
              {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Location Selector */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-center gap-3 mb-4 text-white">
            <MapPin className="w-6 h-6" />
            <h3 className="text-xl font-semibold">Select Location</h3>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <select
              value={`${selectedCountry}-${selectedCity}`}
              onChange={(e) => {
                const [country, city] = e.target.value.split('-');
                setSelectedCountry(country);
                setSelectedCity(city);
              }}
              className="flex-1 px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
            >
              {locations.map(loc => (
                <option key={`${loc.country}-${loc.city}`} value={`${loc.country}-${loc.city}`} className="bg-gray-800 text-white">
                  {loc.label}
                </option>
              ))}
            </select>
            
            <button
              onClick={fetchPrayerTimes}
              disabled={loading}
              className="px-6 py-3 bg-white/20 hover:bg-white/30 disabled:bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white transition-all duration-300 flex items-center gap-2"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Current Prayer Status */}
        {prayerData && !loading && currentPrayerInfo && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-white">
            <div className="text-center space-y-4">
              <div className="text-lg text-white/80">
                {currentPrayerInfo.current ? `Current Prayer: ${currentPrayerInfo.current}` : 'Next Prayer'}
              </div>
              <div className="text-3xl font-bold">
                {currentPrayerInfo.next} {timeUntilNext() && `in ${timeUntilNext()}`}
              </div>
            </div>
          </div>
        )}

        {/* Prayer Times Grid */}
        {loading ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20 text-center">
            <div className="inline-flex items-center gap-3 text-white">
              <div className="w-8 h-8 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span className="text-xl">Loading prayer times...</span>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-500/20 backdrop-blur-sm rounded-2xl p-8 border border-red-500/30 text-center">
            <div className="text-red-100 mb-4 text-xl">{error}</div>
            <button
              onClick={fetchPrayerTimes}
              className="px-6 py-3 bg-red-500/30 hover:bg-red-500/40 rounded-xl text-white transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : prayerData?.data?.timings ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {Object.entries(prayerNames).map(([prayer, config]) => {
              const Icon = config.icon;
              const time = prayerData.data.timings[prayer];
              const isCurrent = currentPrayerInfo?.current === prayer;
              const isNext = currentPrayerInfo?.next === prayer;
              
              return (
                <div
                  key={prayer}
                  className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-300 border-2 ${
                    isCurrent 
                      ? 'bg-white/20 border-white/50 shadow-2xl scale-105' 
                      : isNext 
                        ? 'bg-white/15 border-white/40 shadow-lg' 
                        : 'bg-white/10 border-white/20 hover:bg-white/15'
                  }`}
                >
                  <div className="relative z-10 text-center space-y-4">
                    <div className={`inline-flex p-3 rounded-xl ${config.bg} backdrop-blur-sm`}>
                      <Icon className={`w-8 h-8 ${config.color}`} />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{config.name}</h3>
                      <div className="text-2xl font-mono font-bold text-white/90">
                        {formatTime(time)}
                      </div>
                      <div className="text-sm text-white/70 mt-2">
                        {time}
                      </div>
                    </div>
                    
                    {isCurrent && (
                      <div className="absolute -top-2 -right-2 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                        NOW
                      </div>
                    )}
                    
                    {isNext && !isCurrent && (
                      <div className="absolute -top-2 -right-2 px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                        NEXT
                      </div>
                    )}
                  </div>
                  
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-10 translate-x-10"></div>
                </div>
              );
            })}
          </div>
        ) : null}

        {/* Additional Information */}
        {prayerData?.data && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
              <div className="text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-white/80" />
                <div className="text-sm text-white/80">Hijri Date</div>
                <div className="text-lg font-semibold">
                  {prayerData.data.date.hijri.day} {prayerData.data.date.hijri.month.en} {prayerData.data.date.hijri.year}
                </div>
              </div>
              
              <div className="text-center">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-white/80" />
                <div className="text-sm text-white/80">Location</div>
                <div className="text-lg font-semibold">
                  {selectedCity}, {selectedCountry}
                </div>
              </div>
              
              <div className="text-center">
                <Sun className="w-8 h-8 mx-auto mb-2 text-white/80" />
                <div className="text-sm text-white/80">Method</div>
                <div className="text-lg font-semibold">
                  {prayerData.data.meta.method.name}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}