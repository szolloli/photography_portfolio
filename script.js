var images = {
    'neuart': ['000015.JPG','000012.JPG','000025.JPG','000017.JPG','000028.JPG','img004.jpg','img005.jpg','img015.jpg','img022.jpg','img024.jpg','img044.jpg','img054.jpg','img058.jpg','img080.jpg','img083.jpg','img084.jpg' ],
    'where_you_are': ['01.jpg', '02.jpg', '23.jpg', '04.jpg', '07.jpg', '08.jpg', '11.jpg', '09.jpg'],
    'editorial': ['000011.JPG','000010.JPG', '000009.JPG','000011 (1).JPG','000013.JPG','000014.JPG','000015.JPG','000016.JPG','000017.JPG','000018.JPG','000023.JPG','000024.JPG','000028.JPG','000029.JPG'],
    'protests': ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg'],
    'edge': ['szolloli_01_portret.jpeg','szolloli_02_portret.jpeg','szolloli_03_portret.jpeg','szolloli_04_portret.jpeg',
    'szolloli_05_portret.jpeg','szolloli_06_portret.jpeg','szolloli_07_portret.jpeg',
    'szolloli_09_portret.jpeg','szolloli_10_portret.jpeg']
};

var about = `
<div class="fl-rich-text">
<p class="p1"><span class="s1">Oliver Szöllösi is a Slovak photographer, currently based in Prague, Czech Republic, primarily making work that explores his relationship to places where he grew up and people who he grew up with.</span></p>
<p>Oliver also explores the boundaries of today's photography through experiments with generative neural networks trained on his own photographs.</p>
<p>For inquiries, commissions and print sales please email Oliver directly:</p>
<p class="p1"><b>oliver.szollosi1(at)gmail.com</b></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h3><strong>Exhibitions</strong></h3>
<p class="p1"><strong><span class="s1">2022</span></strong></p>
<p class="p1"><span class="s1">Neuart winter edition</span></p>
<p class="p1"><strong><span class="s1">2023</span></strong></p>
<p class="p1"><span class="s1">DIF2023 - CIIRC</span></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h3 class="p1">Clients</h3>
<p class="p1">Gangsta Punk, Neuart</p>
</div>`

var gallery = `
<div class="real-arrow-content">
<p data-action="left" class='btn-chevron left bx bx-chevron-left'>
<span class="material-symbols-outlined">
&lt;</span>
</p>

  <div class="content">

    <div id="slider" class="slider">
    </div>

  </div>

  <p data-action="right" class='btn-chevron right bx bx-chevron-right'>
  <span class="material-symbols-outlined">
  &gt;</span>
  </p>
  </div>
`

var currentProject = 'neuart';
var currentIndex = 0;
let i = 0;
let sliderImage = [];
let btnChevron = document.querySelectorAll(".btn-chevron");



function openAbout() {
  var oldAlbum = document.getElementById(currentProject);
  oldAlbum.removeAttribute('class');

  var album = document.getElementById("about");
  album.className = 'selected-album';

  currentProject = 'about';

  var content = document.getElementById("content");
  content.innerHTML = about;
}

// function preloadImages(array) {
//   if (!preloadImages.list) {
//       preloadImages.list = [];
//   }
//   var list = preloadImages.list;
//   for (var i = 0; i < array.length; i++) {
//       var img = new Image();
//       img.onload = function() {
//           var index = list.indexOf(this);
//           if (index !== -1) {
//               // remove image from the array once it's loaded
//               // for memory consumption reasons
//               list.splice(index, 1);
//           }
//       }
//       list.push(img);
//       img.src = array[i];
//   }
// }

// preloadImages(["url1.jpg", "url2.jpg", "url3.jpg"]);

let resetCarousel = () => {
  i = 0;

  const content = document.getElementsByClassName('content')[0];
  if (!content) return;
  content.innerHTML = `<div id="slider" class="slider"></div>`;
  slider = document.getElementById('slider');
}

let initGallery = () => {
  sliderImage = Array.from(document.querySelectorAll(".slider-image"));
  currentProject = "where_you_are"

}

let resetGallery = () => {
  if (document.getElementById('slider') == null) {
    // slider = document.createElement('div');
    // slider.id = 'slider';
    // slider.className = 'slider';

    var content = document.getElementById("content");
    content.innerHTML = gallery;
    slider = document.getElementById("slider");

    btnChevron = document.querySelectorAll(".btn-chevron");
    btnChevron.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.className.includes("right")) {
            i++;
            return moveImage();
        }
        i--;
        return moveImage();
      })
    })

    

  }
}

let openGallery = (projectName) => {
  if (i != 0) {
    resetCarousel();
  }
  // setPosition(0);

  var oldAlbum = document.getElementById(currentProject);
  oldAlbum.removeAttribute('class');

  var album = document.getElementById(projectName);
  album.className = 'selected-album';

  currentProject = projectName;
  // var slider = document.getElementById('slider');

  slider.innerHTML = ""; // Clear existing gallery
  resetGallery()
  // Replace the following with your own logic to fetch images for each project


  // var projectImages = images[projectName];
  // slider.innerHTML = ''

  for (var j = 0; j < images[projectName].length; j++) {
    image = document.createElement('img');
    image.src = 'assets/' + projectName + '/' + images[projectName][j];
    image.className = 'slider-image';

    let imageContainer = document.createElement('div');
    imageContainer.appendChild(image);
    imageContainer.className = 'image-wrap';
    slider.appendChild(imageContainer);
  }

  sliderImage = Array.from(document.querySelectorAll(".slider-image"));
  index = 0


  



  // <img data-info="Image Description 1" class="slider-image" fetchpriority="low" src="assets/01.jpeg"></img>

  // enlargeImage(currentIndex);
}


var enlargedImage = null;

function checkKey(e) {

    e = e || window.event;
    if (e.keyCode == '37') {
      i--;
      moveImage();
    }
    else if (e.keyCode == '39') {
      i++;
      moveImage();
    }

}


document.onkeydown = checkKey;





const content = document.querySelector(".content");
let slider = document.querySelector(".slider");

let reset = (container, clase) => {
    container.forEach(item => item.classList.remove(clase));
}

let createInfo = text => {
    const sliderInfo = document.createElement("p");
    sliderInfo.className = "slider-info";
    sliderInfo.textContent = text;
    content.appendChild(sliderInfo);
};

let setPosition = (index) => {
    let width = sliderImage[index].getBoundingClientRect().width;
    slider.style.transform = `translateX(-${width * index}px)`;
}

let moveImage = () => {
    if (i === sliderImage.length) {
        i = 0; // Si el contador ya llego al ultimo item, lo manda al primer item.
    } else if (i == -1) {
        i = sliderImage.length - 1; // Si llego al primero lo manda hasta el ultimo.
    }
    reset(sliderImage, 'slider-image-active');
    setPosition(i);
};

btnChevron.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.dataset.action == "right") {
        i++;
        return moveImage();
    }
    i--;
    return moveImage();
  })
})




window.onload = initGallery();

// let sliderImage = Array.from(document.querySelectorAll(".slider-image"));
Image(i);
