document.addEventListener("DOMContentLoaded", () => {
  // 1. Setup Audio
  const bgMusic = new Audio('assets/music/everything.mp3');
  bgMusic.loop = true;

  // 2. The play logic
  const playBtn = document.getElementById('play-button');
  const overlay = document.getElementById('play-overlay');
  const content = document.querySelector('.page-content');

  playBtn.addEventListener('click', () => {
      // Start the music
      bgMusic.play();

      // Hide overlay and show content
      overlay.style.opacity = '0';
      setTimeout(() => {
          overlay.style.display = 'none';
          content.style.display = 'block';
          
      }, 500);
  });
    const smileImages = [
        "assets/images/smiles/smile2.jpeg",
        "assets/images/smiles/smile3.jpeg",
        "assets/images/smiles/smile4.jpeg",
        "assets/images/smiles/smile5.jpeg",
        "assets/images/smiles/smile6.jpeg",
        "assets/images/smiles/smile7.jpeg",
        "assets/images/smiles/smile8.jpeg",
        "assets/images/smiles/smile9.jpeg",
        "assets/images/smiles/smile10.jpeg",
        "assets/images/smiles/smile11.jpeg",
        "assets/images/smiles/smile12.jpeg",
        "assets/images/smiles/smile13.jpeg"
    ];
    

    const orbit = document.querySelector(".orbit");
    const radius = window.innerWidth * 0.01;    
    let angle = 0;
    let index = 0;
    
    function spawnSmile() {
      const wrapper = document.createElement("div");
      wrapper.className = "orbiter";
    
      const img = document.createElement("img");
      img.src = smileImages[index % smileImages.length];
    
      wrapper.appendChild(img);
      orbit.appendChild(wrapper);
    
      const startAngle = angle;
      angle += 360 / 8;
      index++;
    
      wrapper.style.transform = `
        rotate(${startAngle}deg)
        translate(${radius}px)

      `;
    
      img.style.transform = `rotate(-${startAngle}deg)`;
      wrapper.animate(
        [
          { opacity: 0 },
          { opacity: 1 },
          { opacity: 1 },
          { opacity: 0 }
        ],
        {
          duration: 9000,
          easing: "ease-in-out",
          fill: "forwards"
        }
      );
    
      setTimeout(() => wrapper.remove(), 9000);
    }
    
    setInterval(spawnSmile, 800);
});