const pageFlip = new St.PageFlip(
    document.getElementById("book"),
    {
      width: 350,
      height: 500,
      size: "stretch",
      maxShadowOpacity: 0.5,
      showCover: true,
      mobileScrollSupport: false
    }
  ); 
  
  pageFlip.loadFromHTML(document.querySelectorAll(".page"));
  