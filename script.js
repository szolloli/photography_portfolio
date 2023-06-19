
var images = {
    'project1': ['assets/img004.jpg', 'assets/img005.jpg', 'assets/img006.jpg', 'assets/img008.jpg'],
    'project2': ['image4.jpg', 'image5.jpg', 'image6.jpg'],
    'project3': ['image7.jpg', 'image8.jpg', 'image9.jpg']
};

var currentProject = null;

function openGallery(projectName) {
  currentProject = projectName;
  var galleryElement = document.getElementById('gallery');
  galleryElement.innerHTML = ""; // Clear existing gallery

  // Replace the following with your own logic to fetch images for each project


  var projectImages = images[projectName];

  for (var i = 0; i < projectImages.length; i++) {
    var imageElement = document.createElement('img');
    imageElement.src = projectImages[i];
    imageElement.addEventListener('click', enlargeImage);
    galleryElement.appendChild(imageElement);
  }
}

var currentIndex = 0;
var enlargedImage = null;

function checkKey(e) {

    e = e || window.event;
    if (e.keyCode == '37') {
      console.log('1231')
      currentIndex = (currentIndex - 1) % images[currentProject].length;
      enlargedImage.src = images[currentProject][currentIndex];
    }
    else if (e.keyCode == '39') {
      currentIndex = (currentIndex + 1) % images[currentProject].length;
      enlargedImage.src = images[currentProject][currentIndex];
    }

}

function enlargeImage(event) {
  var galleryImages = document.querySelectorAll('#gallery img');
  var currentIndex = Array.from(galleryImages).indexOf(event.target);

  var overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.addEventListener('click', closeEnlargedView); 

  var imageContainer = document.createElement('div');
  imageContainer.className = 'image-container';


  enlargedImage = document.createElement('img');
  enlargedImage.src = event.target.src;
  enlargedImage.className = 'enlarged-image';
  document.onkeydown = checkKey;



  var closeButton = document.createElement('span');
  closeButton.innerHTML = '&times;';
  closeButton.className = 'close-button';
  closeButton.addEventListener('click', closeEnlargedView);

  var prevButton = document.createElement('span');
  prevButton.innerHTML = '&#8249;';
  prevButton.className = 'nav-button';
  prevButton.addEventListener('click', navigateImages.bind(null, currentIndex - 1));

  var nextButton = document.createElement('span');
  nextButton.innerHTML = '&#8250;';
  nextButton.className = 'nav-button';
  nextButton.addEventListener('click', navigateImages.bind(null, currentIndex + 1));

  imageContainer.appendChild(closeButton);
  imageContainer.appendChild(prevButton);
  imageContainer.appendChild(enlargedImage);
  imageContainer.appendChild(nextButton);
  overlay.appendChild(imageContainer);

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
