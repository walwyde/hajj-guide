hajj-steps-canvas.zip
Contents:
- hajj-steps-canvas.js : ES module exporting HAJJ_STEPS_CANVAS (plain JavaScript)
- README.txt : instructions

How to use:
1) Move hajj-steps-canvas.js into your frontend project (e.g., /lib or /data).
2) Import:
   import HAJJ_STEPS from '/path/to/hajj-steps-canvas.js';
3) Use HAJJ_STEPS[i].frames for sequential canvas display (line-by-line).
4) Replace image `src` values with your hosted images in /public/images/hajj/ for production.

Notes:
- This environment cannot download external images. The 'images' array contains search URLs (Unsplash/Wikimedia) to find safe, high-quality illustrations.
- If you'd like, I can produce placeholder SVGs or icons for each step and include them directly in the zip.
