document.addEventListener("DOMContentLoaded", () => {

    const smileImages = [
        "assets/images/smiles/smile2.jpeg",
        "assets/images/smiles/smile3.jpeg",
        "assets/images/smiles/smile4.jpeg",
        "assets/images/smiles/smile5.jpeg",
        "assets/images/smiles/smile6.jpeg",
        "assets/images/smiles/smile7.jpeg",
        "assets/images/smiles/smile8.jpeg",
        "assets/images/smiles/smile9.jpeg"
    ];
    

    const orbit = document.querySelector(".orbit");
    const radius = 50;
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
      angle += 360 / 6;
      index++;
    
      wrapper.style.transform = `
        rotate(${startAngle}deg)
        translate(${radius}px)

      `;
    
      wrapper.animate(
        [
          { opacity: 0 },
          { opacity: 1 },
          { opacity: 1 },
          { opacity: 0 }
        ],
        {
          duration: 6000,
          easing: "ease-in-out",
          fill: "forwards"
        }
      );
    
      setTimeout(() => wrapper.remove(), 6000);
    }
    
    setInterval(spawnSmile, 800);
});