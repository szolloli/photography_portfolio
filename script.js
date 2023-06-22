

//, 'assets/img005.jpg', 'assets/img006.jpg', 'assets/img008.jpg'],
var images = {
    'neuart': ['000015.JPG','000017.JPG','000012.JPG','000025.JPG','000028.JPG'],
    'where_you_are': ['image4.jpg', 'image5.jpg', 'image6.jpg'],
    'editorial': ['image7.jpg', 'image8.jpg', 'image9.jpg'],
    'edge': ['szolloli_01_portret.jpeg','szolloli_02_portret.jpeg','szolloli_03_portret.jpeg','szolloli_04_portret.jpeg',
    'szolloli_05_portret.jpeg','szolloli_06_portret.jpeg','szolloli_07_portret.jpeg',
    'szolloli_09_portret.jpeg','szolloli_10_portret.jpeg']
};




var currentProject = 'neuart';
var currentIndex = 0;

function openGallery(projectName) {

  var oldAlbum = document.getElementById(currentProject);
  oldAlbum.removeAttribute('class');

  var album = document.getElementById(projectName);
  album.className = 'selected-album';

  currentProject = projectName;
  var slider = document.getElementById('slider');
  slider.innerHTML = ""; // Clear existing gallery

  // Replace the following with your own logic to fetch images for each project


  // var projectImages = images[projectName];
  // slider.innerHTML = ''

  for (var i = 0; i < images[projectName].length; i++) {
    image = document.createElement('img');
    image.src = 'assets/' + projectName + '/' + images[projectName][i];
    image.className = 'slider-image'
    slider.appendChild(image);
  }

  sliderImage = Array.from(document.querySelectorAll(".slider-image"));
  index = 0


  



  // <img data-info="Image Description 1" class="slider-image" src="assets/01.jpeg"></img>

  // enlargeImage(currentIndex);
}


var enlargedImage = null;

function checkKey(e) {

    e = e || window.event;
    if (e.keyCode == '37') {
      i--;
      moveImage();
      // currentIndex = (currentIndex - 1) % images[currentProject].length;
      // enlargedImage.src = images[currentProject][currentIndex];
    }
    else if (e.keyCode == '39') {
      i++;
      moveImage();
      // currentIndex = (currentIndex + 1) % images[currentProject].length;
      // enlargedImage.src = images[currentProject][currentIndex];
    }

}



function enlargeImage(index) {

  var galleryImages = document.querySelectorAll('#gallery img');
  var gallery = document.getElementById('gallery')

  //var overlay = document.createElement('div');
  //overlay.className = 'overlay';
  //overlay.addEventListener('click', closeEnlargedView); 

  var imageContainer = document.createElement('div');
  imageContainer.className = 'image-container';


  enlargedImage = document.createElement('img');
  console.log(images);
  enlargedImage.src = images[currentProject][currentIndex];
  enlargedImage.className = 'enlarged-image';
  document.onkeydown = checkKey;


  var prevButton = document.createElement('span');
  prevButton.innerHTML = '&#8249;';
  prevButton.className = 'nav-button';
  prevButton.addEventListener('click', navigateImages.bind(null, currentIndex - 1));

  var nextButton = document.createElement('span');
  nextButton.innerHTML = '&#8250;';
  nextButton.className = 'nav-button';
  nextButton.addEventListener('click', navigateImages.bind(null, currentIndex + 1));

  imageContainer.appendChild(prevButton);
  imageContainer.appendChild(enlargedImage);
  imageContainer.appendChild(nextButton);
  gallery.appendChild(imageContainer);

  document.body.appendChild(overlay);
}

function closeEnlargedView() {
  var overlay = document.querySelector('.overlay');
  overlay.parentNode.removeChild(overlay);
  currentIndex = 0;
}

function navigateImages(index) {
  var galleryImages = document.querySelectorAll('#gallery img');
  var maxIndex = galleryImages.length - 1;

  if (index < 0) {
    index = maxIndex;
  } else if (index > maxIndex) {
    index = 0;
  }

  var currentImage = galleryImages[index];
  var enlargedImage = document.querySelector('.enlarged-image');
  enlargedImage.src = currentImage.src;
}

document.onkeydown = checkKey;
