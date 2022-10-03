let images = [{
    url: "https://img.favcars.com/toyota/mark-ii/toyota_mark_ii_1998_pictures_1.jpg",
    title: "Toyota Mark II (X100) 1998–2000"
}, {
    url: "https://img.favcars.com/toyota/mark-ii/wallpapers_toyota_mark-ii_1994_1.jpg",
    title: "Toyota Mark II (90) 1994–96"
}, {
    url: "https://img.favcars.com/toyota/mark-ii/wallpapers_toyota_mark-ii_1990_1.jpg",
    title: "Toyota Mark II Hardtop 2.5 GT TwinTurbo (JZX81) 1990–92"
}, {
    url: "https://img.favcars.com/toyota/mark-ii/toyota_mark_ii_1988_wallpapers_1.jpg",
    title: "Toyota Mark II Sedan (X80) 1988–96"
}, {
    url: "https://img.favcars.com/toyota/mark-ii/toyota_mark-ii_1976_pictures_1.jpg",
    title: "Toyota Mark II Hardtop Coupe 1976–80"
}, {
    url: "https://img.favcars.com/toyota/mark-ii/pictures_toyota_mark_ii_1973_1.jpg",
    title: "Toyota Corona Mark II Hardtop Coupe 1973–75"
}, {
    url: "https://img.favcars.com/toyota/mark-ii/photos_toyota_mark-ii_1968_2.jpg",
    title: "Toyota Corona Mark II Station Wagon (T78/T79) 1968–72"
}];




function initSlider(options) {
  if (!images || !images.length) return;
  
  options = options || {
    titles: false,
    dots: true,
    autoplay: false
  };
  
  let sliderImages = document.querySelector(".slider__images");
  let sliderArrows = document.querySelector(".slider__arrows");
  let sliderDots = document.querySelector(".slider__dots");
  
  initImages();
  initArrows();
  
  if (options.dots) {
    initDots();
  }
  
  if (options.titles) {
    initTitles();
  }
  
  if (options.autoplay) {
    initAutoplay();
  }
  
  function initImages() {
    images.forEach((image, index) => {
      let imageDiv = `<div class="image n${index} ${index === 0? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
      sliderImages.innerHTML += imageDiv;
    });
  }
  
  function initArrows() {
    sliderArrows.querySelectorAll(".slider__arrow").forEach(arrow => {
      arrow.addEventListener("click", function() {
        let curNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber;
        if (arrow.classList.contains("left")) {
          nextNumber = curNumber === 0? images.length - 1 : curNumber - 1;
        } else {
          nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
        }
        moveSlider(nextNumber);
      });
    });
  }
  
  function initDots() {
    images.forEach((image, index) => {
      let dot = `<div class="slider__dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
      sliderDots.innerHTML += dot;
    });
    sliderDots.querySelectorAll(".slider__dots-item").forEach(dot => {
      dot.addEventListener("click", function() {
        moveSlider(this.dataset.index);
      })
    })
  }
  
  function moveSlider(num) {
    sliderImages.querySelector(".active").classList.remove("active");
    sliderImages.querySelector(".n" + num).classList.add("active");
    if (options.dots) {
      sliderDots.querySelector(".active").classList.remove("active");
      sliderDots.querySelector(".n" + num).classList.add("active");
    }
    if (options.titles) changeTitle(num);
  }
  
  function initTitles() {
    let titleDiv = `<div class="slider__images-title">${images[0].title}</div>`;
    sliderImages.innerHTML += cropTitle(titleDiv, 50);
  }
  
  function changeTitle(num) {
    if (!images[num].title) return;
    let sliderTitle = sliderImages.querySelector(".slider__images-title");
    sliderTitle.innerText = cropTitle(images[num].title, 50);
  }
  
  function cropTitle(title, size) {
    if (title.length <= size) {
      return title;
    } else {
      return title.substr(0, size) + "...";
    }
  }
  
  function initAutoplay() {
    setInterval(() => {
      let curNumber = +sliderImages.querySelector(".active").dataset.index;
      let nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
      moveSlider(nextNumber);
    }, options.autoplayInterval);
  }
}

let sliderOptions = {
  dots: true,
  titles: true,
  autoplay: true,
  autoplayInterval: 5000
};

document.addEventListener("DOMContentLoaded", function() {
  initSlider(sliderOptions);
});