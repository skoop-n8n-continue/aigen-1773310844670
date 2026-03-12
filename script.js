document.addEventListener('DOMContentLoaded', () => {
  // Simple auto-scroll functionality for digital signage
  // Only scrolls if the content height is greater than the container height
  const container = document.getElementById('menu-content');

  if (!container) return;

  let scrollPosition = 0;
  let scrollDirection = 1;
  const scrollSpeed = 0.5; // pixels per frame
  const pauseTime = 3000; // pause at top and bottom
  let isPaused = false;

  function autoScroll() {
    if (isPaused) {
      requestAnimationFrame(autoScroll);
      return;
    }

    // Check if scrolling is needed
    if (container.scrollHeight <= container.clientHeight) {
      // Content fits entirely, no need to scroll
      return;
    }

    scrollPosition += scrollSpeed * scrollDirection;
    container.scrollTop = scrollPosition;

    // Check boundaries and pause
    if (scrollPosition >= container.scrollHeight - container.clientHeight) {
      // Reached bottom
      scrollDirection = -1;
      isPaused = true;
      setTimeout(() => { isPaused = false; }, pauseTime);
    } else if (scrollPosition <= 0) {
      // Reached top
      scrollDirection = 1;
      isPaused = true;
      setTimeout(() => { isPaused = false; }, pauseTime);
    }

    requestAnimationFrame(autoScroll);
  }

  // Wait a bit before starting the scroll
  setTimeout(() => {
    requestAnimationFrame(autoScroll);
  }, pauseTime);
});