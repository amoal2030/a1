import confetti from 'canvas-confetti';

/**
 * Fires high-energy celebratory confetti to encourage and celebrate client conversion / payment booking.
 */
export const triggerConversionCelebration = () => {
  // Center-burst with gold, emerald, and sky colors
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.65 },
    colors: ['#38bdf8', '#10b981', '#fbbf24', '#6366f1', '#f59e0b'],
    disableForReducedMotion: true,
  });

  // Secondary side bursts for extra delight
  setTimeout(() => {
    confetti({
      particleCount: 40,
      angle: 60,
      spread: 55,
      origin: { x: 0.1, y: 0.65 },
      colors: ['#10b981', '#38bdf8', '#fbbf24'],
    });
    confetti({
      particleCount: 40,
      angle: 120,
      spread: 55,
      origin: { x: 0.9, y: 0.65 },
      colors: ['#10b981', '#38bdf8', '#fbbf24'],
    });
  }, 180);
};
