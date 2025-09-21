import React, {useState, useEffect} from 'react';
import { Button } from './ui/button';


interface DuaPlayerProps {
  sourceUrl: string;  // could be a SoundCloud track URL or direct mp3 URL
  title?: string;
  clientId: string;    // your SoundCloud API client_id
}

export default function DuaPlayer({ sourceUrl, title, clientId }: DuaPlayerProps) {
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [iframeSrc, setIframeSrc] = useState<string | null>(null);
  const [audioElem, setAudioElem] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Utility to format time for display
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Try to resolve the sourceUrl if it's a SoundCloud link
  useEffect(() => {
    let isCancelled = false;

    const tryResolveSoundCloud = async () => {
      try {
        // check if sourceUrl is a soundcloud url
        if (/soundcloud\.com/.test(sourceUrl)) {
          // 1. Use resolve API to get track info
          const resolveResp = await fetch(
            `https://api.soundcloud.com/resolve?url=${encodeURIComponent(sourceUrl)}&client_id=${clientId}`
          );
          if (!resolveResp.ok) throw new Error("Resolve API failed");
          const trackInfo = await resolveResp.json();

          // 2. Check if trackInfo has a stream_url
          // According to SoundCloud API, trackInfo.stream_url + ?client_id= is how to stream
          if (trackInfo.stream_url) {
            const streamUrl = `${trackInfo.stream_url}?client_id=${clientId}`;
            // You may need another fetch to get a `http_mp3_128_url` if available
            // Some newer APIs return `http_mp3_128_url` in trackInfo or under `trackInfo.media.transcodings`
            // We'll try trackInfo.media.transcodings if available
            if (trackInfo.media && Array.isArray(trackInfo.media.transcodings)) {
              // find a transcoding that has a format "progressive" or similar
              const prog = trackInfo.media.transcodings.find((t: any) =>
                t.format && (t.format.protocol === "progressive" || t.format.protocol === "http")
              );
              if (prog && prog.url) {
                // fetch the actual mp3 URL
                const transResp = await fetch(`${prog.url}?client_id=${clientId}`);
                if (transResp.ok) {
                  const transJson = await transResp.json();
                  if (transJson.url) {
                    // this `url` should be a direct streamable mp3
                    if (!isCancelled) {
                      setAudioSrc(transJson.url);
                      return;
                    }
                  }
                }
              }
            }

            // If no better option, fallback to stream_url
            if (!isCancelled) {
              setAudioSrc(streamUrl);
              return;
            }
          }
        }

        // If not a SoundCloud link, or resolution failed, assume direct link
        if (!isCancelled) {
          setAudioSrc(sourceUrl);
        }
      } catch (err) {
        console.warn("SoundCloud resolution failed:", err);
        if (!isCancelled) {
          // fallback
          setAudioSrc(sourceUrl);
        }
      }
    };

    tryResolveSoundCloud();

    return () => {
      isCancelled = true;
    };
  }, [sourceUrl, clientId]);

  // Setup audio element when audioSrc is available
  useEffect(() => {
    if (!audioSrc) return;

    const audio = new Audio(audioSrc);
    setAudioElem(audio);

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", onEnded);
    };
  }, [audioSrc]);

  const togglePlayPause = () => {
    if (iframeSrc) {
      // If using iframe (widget) fallback: can implement play/pause via SoundCloud widget API
      // For simplicity, let's skip that for now
      return;
    }

    if (!audioElem) return;

    if (isPlaying) {
      audioElem.pause();
    } else {
      audioElem.play().catch(err => {
        console.warn("Play error:", err);
      });
    }

    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioElem) return;
    const newTime = parseFloat(e.target.value);
    audioElem.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="dua-player space-y-4">
      {title && <h3 className="text-lg font-semibold">{title}</h3>}

      {audioSrc ? (
        <div className="flex items-center gap-3">
          <Button
            onClick={togglePlayPause}
            size="sm"
            variant="outline"
            className="w-12 h-12 rounded-full"
          >
            {isPlaying ? "⏸️" : "▶️"}
          </Button>
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading audio...</div>
      )}

      {/* Fallback: if audioSrc is not available or not streamable, embed via iframe */}
      { (!audioSrc || !audioElem) && /soundcloud\.com/.test(sourceUrl) && (
        <iframe
          width="100%"
          height="300"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(sourceUrl)}&auto_play=false&visual=true`}
        ></iframe>
      )}
    </div>
  );
}