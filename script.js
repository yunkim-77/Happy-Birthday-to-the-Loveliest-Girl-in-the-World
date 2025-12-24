document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("img[data-sound]").forEach(img => {
    const audio = new Audio(img.dataset.sound);

    img.addEventListener("click", () => {
      audio.currentTime = 0;
      audio.play().catch(err => {
        console.log("Audio play failed:", err);
      });
    });
  });
});
