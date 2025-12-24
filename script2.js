document.addEventListener("DOMContentLoaded", () => {
    // Select all images with a data-sound attribute
    document.querySelectorAll("img[data-sound]").forEach(img => {
    
        const shakeImg = document.getElementById("shake");

      const handleClick = (e) => {
        e.stopPropagation(); // prevent parent interference
  
        // Play the sound
        const audio = new Audio(img.dataset.sound);
        audio.volume = 1;
        audio.currentTime = 0;
        audio.play().catch(err => console.log("Audio failed:", err));
        shakeImg.classList.add("shake");

        // Remove the class after the animation ends
        setTimeout(() => {
          shakeImg.classList.remove("shake");
        }, 500); // match duration of CSS animation
    
      };
  
      // Attach click handler
      img.addEventListener("click", handleClick);
    });
  });
  