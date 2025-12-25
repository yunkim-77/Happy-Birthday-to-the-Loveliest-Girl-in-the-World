document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("img[data-sound]").forEach(img => {
      
      const handleClick = (e) => {
        e.stopPropagation(); // prevent parent interference
  
        // Play the sound
        const audio = new Audio(img.dataset.sound);
        audio.volume = 0.3;
        audio.currentTime = 0;
        audio.play();
  
        // If the image has class 'candle', change its source
        if (img.classList.contains("candle")) {
          img.src = "assets/images/candle2.png"; // new image path
  
  
          img.removeEventListener("click", handleClick);
  
          const delay2 = 500;
  
          setTimeout(() => {
            const audio = new Audio("assets/music/happybirthday.mp3");
            audio.play();
          }, delay2);
        }
          const delay = 2500;
  
          setTimeout(() => {
            // Play confetti sound
            const audio = new Audio("assets/music/confetti.mp3");
            audio.volume = 0.5;
            audio.play();
  
            // Launch confetti
            confetti({
              particleCount: 150,
              spread: 70,
              origin: { y: 0.6 },
            });
          }, delay);
          const heartPopTemplate = new Audio("assets/music/heartpop.mp3");
          function playHeartPop() {
            const pop = heartPopTemplate.cloneNode();
            pop.volume = 0.1;
          
            // Optional natural variation
            pop.playbackRate = 0.9 + Math.random() * 0.2;
          
            pop.play().catch(() => {});
          }
          
          function spawnHeart() {
            const heart = document.createElement("div");
            heart.className = "heart";
            heart.textContent = "❤️";
          
            heart.style.left = ((Math.random() * 25+37) + "vw");
            heart.style.top = "80vh";
          
            document.body.appendChild(heart);
          
            playHeartPop();
  
            setTimeout(() => {
              heart.remove();
            }, 3500);
          }
          const delay3 = 3500;
  
          setTimeout(() => {
            const heartInterval = setInterval(spawnHeart, 150);
          
            setTimeout(() => {
              clearInterval(heartInterval);
            }, 2500);
          }, delay3);
                  
  
  
      };
  
      img.addEventListener("click", handleClick);
    });
  });
  
  