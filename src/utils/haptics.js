export const triggerHapticFeedback = (duration = 50) => {
    if (navigator.vibrate) {
      navigator.vibrate(duration);
    }
  };