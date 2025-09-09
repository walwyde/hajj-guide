
// import { useCallback, useEffect, useRef, useState } from "react";
// import cn from "@/lib/utils/cn";

// type AnimatedCanvasTextProps = {
//   text: string;
//   className?: string;
//   speed?: number;
//   font?: string;
//   onComplete?: () => void; // Fires when text fully revealed
// };

// export function AnimatedCanvasText({
//   text,
//   className,
//   speed = 40,
//   font = "18px Inter, sans-serif",
//   onComplete,
// }: AnimatedCanvasTextProps) {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   const [isPlaying, setIsPlaying] = useState(false);
//   const [visibleCount, setVisibleCount] = useState(0);
//   const [isComplete, setIsComplete] = useState(false);

//   const animRef = useRef<number | null>(null);
//   const startRef = useRef<number | null>(null);
//   const carryElapsedRef = useRef<number>(0);

//   const fullTextRef = useRef<string>("");
//   const lineHeightRef = useRef<number>(28);
//   const padding = 20;

//   const draw = useCallback(
//     (count: number) => {
//       const c = canvasRef.current;
//       if (!c) return;
//       const ctx = c.getContext("2d");
//       if (!ctx) return;

//       const rect = c.getBoundingClientRect();
//       const lh = lineHeightRef.current;

//       ctx.clearRect(0, 0, rect.width, rect.height);

//       const content = fullTextRef.current.slice(0, count);
//       const lines = content.split("\n");

//       let y = padding;
//       for (let i = 0; i < lines.length; i++) {
//         ctx.fillText(lines[i], padding, y);
//         y += lh;
//       }

//       // Caret if still animating
//       if (isPlaying && count < fullTextRef.current.length) {
//         const last = lines[lines.length - 1] || "";
//         const caretX = padding + ctx.measureText(last).width;
//         const caretY = y - lh;
//         ctx.fillRect(caretX, caretY, 1, lh);
//       }
//     },
//     [isPlaying]
//   );

//   const computeLayout = useCallback(() => {
//     const c = canvasRef.current;
//     if (!c) return;
//     const dpr = Math.max(1, window.devicePixelRatio || 1);
//     const rect = c.getBoundingClientRect();
//     const ctx = c.getContext("2d");
//     if (!ctx) return;

//     c.width = Math.floor(rect.width * dpr);
//     c.height = Math.floor(200 * dpr);

//     ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
//     ctx.font = font;
//     ctx.textBaseline = "top";
//     ctx.fillStyle = "hsl(var(--foreground))";

//     const maxWidth = rect.width - padding * 2;
//     const words = text.split(/\s+/);
//     const lines: string[] = [];
//     let line = "";

//     for (const w of words) {
//       const test = line ? line + " " + w : w;
//       if (ctx.measureText(test).width > maxWidth && line) {
//         lines.push(line);
//         line = w;
//       } else {
//         line = test;
//       }
//     }
//     if (line) lines.push(line);

//     fullTextRef.current = lines.join("\n");

//     const lh = lineHeightRef.current;
//     const totalHeightCss = padding + lines.length * lh + padding;
//     c.height = Math.floor(totalHeightCss * dpr);

//     ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
//     ctx.font = font;
//     ctx.textBaseline = "top";
//     ctx.fillStyle = "hsl(var(--foreground))";

//     draw(visibleCount);
//   }, [text, font, visibleCount, draw]);

//   const tick = useCallback(
//     (ts: number) => {
//       if (startRef.current == null) startRef.current = ts;
//       const elapsed = ts - startRef.current + carryElapsedRef.current;
//       const total = fullTextRef.current.length;
//       const nextCount = Math.min(total, Math.floor(elapsed / speed));

//       if (nextCount !== visibleCount) {
//         setVisibleCount(nextCount);
//         draw(nextCount);
//       }

//       if (nextCount >= total) {
//         setIsPlaying(false);
//         setIsComplete(true);
//         animRef.current = null;
//         onComplete?.();
//         return;
//       }

//       animRef.current = requestAnimationFrame(tick);
//     },
//     [speed, draw, visibleCount, onComplete]
//   );

//   const play = useCallback(() => {
//     if (isPlaying) return;
//     setIsPlaying(true);
//     setIsComplete(false);
//     carryElapsedRef.current = visibleCount * speed;
//     startRef.current = null;
//     animRef.current = requestAnimationFrame(tick);
//   }, [isPlaying, visibleCount, speed, tick]);

//   const restart = useCallback(() => {
//     if (animRef.current) cancelAnimationFrame(animRef.current);
//     setVisibleCount(0);
//     setIsComplete(false);
//     setIsPlaying(true);
//     carryElapsedRef.current = 0;
//     startRef.current = null;
//     animRef.current = requestAnimationFrame(tick);
//   }, [tick]);

//   useEffect(() => {
//     computeLayout();
//     const onResize = () => computeLayout();
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, [computeLayout]);

//   useEffect(() => {
//     return () => {
//       if (animRef.current) cancelAnimationFrame(animRef.current);
//     };
//   }, []);

//   return (
//     <div className={cn("relative", className)}>
//       <canvas
//         ref={canvasRef}
//         className="w-full h-auto min-h-[200px] bg-background border border-border rounded-lg"
//         style={{
//           filter: "sepia(0.1) contrast(1.1)",
//           background:
//             "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--muted)) 100%)",
//         }}
//       />
//       <div className="mt-3 flex items-center gap-2">
//         {!isPlaying && !isComplete && (
//           <button
//             onClick={play}
//             className="px-3 py-1 rounded-md border text-sm hover:bg-accent/10"
//           >
//             ▶ Play
//           </button>
//         )}
//         {isPlaying && (
//           <button
//             onClick={restart}
//             className="px-3 py-1 rounded-md border text-sm hover:bg-accent/10"
//           >
//             ⟲ Restart
//           </button>
//         )}
//         {isComplete && (
//           <button
//             onClick={restart}
//             className="px-3 py-1 rounded-md border text-sm hover:bg-accent/10"
//           >
//             ⟲ Restart
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }


import { useCallback, useEffect, useRef, useState } from "react";
import cn from "@/lib/utils/cn";

type AnimatedCanvasTextProps = {
  text: string;
  className?: string;
  speed?: number;
  font?: string;
  onComplete?: () => void; // Fires when text fully revealed
};

export function AnimatedCanvasText({
  text,
  className,
  speed = 20,
  font = "16px Inter, sans-serif",
  onComplete,
}: AnimatedCanvasTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const animRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const carryElapsedRef = useRef<number>(0);

  const fullTextRef = useRef<string>("");
  const lineHeightRef = useRef<number>(32); // Increased for better separation
  const padding = 20;
  const bulletOffset = 10;

  const draw = useCallback(
    (count: number) => {
      const c = canvasRef.current;
      if (!c) return;
      const ctx = c.getContext("2d");
      if (!ctx) return;

      const rect = c.getBoundingClientRect();
      const lh = lineHeightRef.current;

      ctx.clearRect(0, 0, rect.width, rect.height);

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, rect.height);
      gradient.addColorStop(0, 'hsl(0, 0%, 100%)'); // --background
      gradient.addColorStop(1, 'hsl(220, 14%, 96%)'); // --muted
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      const content = fullTextRef.current.slice(0, count);
      const lines = content.split("\n");

      let y = padding;
      for (let i = 0; i < lines.length; i++) {
        // Draw bullet
        ctx.beginPath();
        ctx.arc(padding - bulletOffset, y + lh / 2, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'hsl(262, 83%, 58%)'; // --accent
        ctx.fill();
        ctx.closePath();

        // Draw text
        ctx.fillStyle = 'hsl(222, 84%, 5%)'; // --foreground
        ctx.fillText(lines[i], padding, y);
        y += lh;
      }

      // Caret if still animating
      if (isPlaying && count < fullTextRef.current.length) {
        const last = lines[lines.length - 1] || "";
        const caretX = padding + ctx.measureText(last).width;
        const caretY = y - lh;
        ctx.fillStyle = 'hsl(222, 84%, 5%)'; // --foreground
        ctx.fillRect(caretX, caretY, 1, lh);
      }
    },
    [isPlaying]
  );

  const computeLayout = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const rect = c.getBoundingClientRect();
    const ctx = c.getContext("2d");
    if (!ctx) return;

    c.width = Math.floor(rect.width * dpr);
    c.height = Math.floor(200 * dpr);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = font;
    ctx.textBaseline = "top";
    ctx.fillStyle = "hsl(222, 84%, 5%)"; // --foreground

    const maxWidth = rect.width - padding * 3; // Extra padding for bullet
    const lines = text.split("\n"); // Split by newlines from input
    const wrappedLines: string[] = [];

    // Wrap each line if it exceeds maxWidth
    for (const line of lines) {
      let currentLine = "";
      const words = line.split(/\s+/);
      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        if (ctx.measureText(testLine).width > maxWidth && currentLine) {
          wrappedLines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) wrappedLines.push(currentLine);
    }

    fullTextRef.current = wrappedLines.join("\n");

    const lh = lineHeightRef.current;
    const totalHeightCss = padding + wrappedLines.length * lh + padding;
    c.height = Math.floor(totalHeightCss * dpr);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = font;
    ctx.textBaseline = "top";
    ctx.fillStyle = "hsl(222, 84%, 5%)"; // --foreground

    draw(visibleCount);
  }, [text, font, visibleCount, draw]);

  const tick = useCallback(
    (ts: number) => {
      if (startRef.current == null) startRef.current = ts;
      const elapsed = ts - startRef.current + carryElapsedRef.current;
      const total = fullTextRef.current.length;
      const nextCount = Math.min(total, Math.floor(elapsed / speed));

      if (nextCount !== visibleCount) {
        setVisibleCount(nextCount);
        draw(nextCount);
      }

      if (nextCount >= total) {
        setIsPlaying(false);
        setIsComplete(true);
        animRef.current = null;
        onComplete?.();
        return;
      }

      animRef.current = requestAnimationFrame(tick);
    },
    [speed, draw, visibleCount, onComplete]
  );

  const play = useCallback(() => {
    if (isPlaying) return;
    setIsPlaying(true);
    setIsComplete(false);
    carryElapsedRef.current = visibleCount * speed;
    startRef.current = null;
    animRef.current = requestAnimationFrame(tick);
  }, [isPlaying, visibleCount, speed, tick]);

  const restart = useCallback(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    setVisibleCount(0);
    setIsComplete(false);
    setIsPlaying(true);
    carryElapsedRef.current = 0;
    startRef.current = null;
    animRef.current = requestAnimationFrame(tick);
  }, [tick]);

  useEffect(() => {
    computeLayout();
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisibleCount(text.length);
      setIsComplete(true);
      draw(text.length);
    }
    const onResize = () => computeLayout();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [computeLayout, text, draw]);

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div className={cn("relative", className)}>
      <canvas
        ref={canvasRef}
        className="w-full h-auto min-h-[200px] bg-background border border-border rounded-lg"
        style={{
          filter: "sepia(0.1) contrast(1.1)",
        }}
        aria-hidden="true"
      />
      <div className="mt-3 flex items-center gap-2">
        {!isPlaying && !isComplete && (
          <button
            onClick={play}
            className="px-3 py-1 rounded-md border text-sm hover:bg-accent/10"
          >
            ▶ Play
          </button>
        )}
        {(isPlaying || isComplete) && (
          <button
            onClick={restart}
            className="px-3 py-1 rounded-md border text-sm hover:bg-accent/10"
          >
            ⟲ Restart
          </button>
        )}
      </div>
    </div>
  );
}