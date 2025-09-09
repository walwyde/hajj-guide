// hajj-step-images.ts
export const STEP_IMAGES: Record<string, string> = {
  'ihram': '/hajj-images/hajj-ihram.jpg',
  'tawaf-qudum': '/hajj-images/hajj-tawaf-qudum.jpg',
  'sai': '/hajj-images/hajj-sai.jpg',
  'mina': '/hajj-images/hajj-mina.jpg',
  'arafah': '/hajj-images/hajj-arafah.jpg',
  'muzdalifah': '/hajj-images/hajj-muzdalifah.jpg',
  'jamarat': '/hajj-images/hajj-jamarat.jpg',
  'sacrifice': '/hajj-images/hajj-sacrifice.jpg',
  'halq-taqsir': '/hajj-images/hajj-halq-taqsir.jpg',
  'tawaf-ifadah': '/hajj-images/hajj-tawaf-ifadah.jpg',
};

export const getStepImage = (stepId: string): string => {
  return STEP_IMAGES[stepId] || '/hajj-images/default.jpg'; // fallback image if needed
};
