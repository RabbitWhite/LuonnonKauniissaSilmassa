// Global variable for the Leaflet map instance
window.map = null;

document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM fully loaded, initializing Leaflet map.");
  // Initialize the Leaflet map and store it globally
  window.map = L.map("map").setView([63.0577, 30.3464], 10); // Coordinates for Patvinsuo National Park

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  }).addTo(window.map);

  // Add a marker for Patvinsuo National Park
  var marker = L.marker([63.11586232190913, 30.69928421435293]).addTo(window.map);
  marker.bindPopup('<b>Patvinsuo National Park</b><br>Experience the beauty of Finnish wetlands.').openPopup();
});

// Global variable to keep track of the current marker
window.currentMarker = null;

function goToMap(lat, lng) {
  // Ensure that the global map is defined
  if (!window.map) {
    console.error("Map has not been initialized.");
    return;
  }

  // Remove previous marker if it exists
  if (window.currentMarker) {
    window.map.removeLayer(window.currentMarker);
  }

  // Add a new marker at the provided coordinates
  window.currentMarker = L.marker([lat, lng]).addTo(window.map);

  // Center the map around the new marker and adjust the zoom level as needed
  window.map.setView([lat, lng], 13); // Adjust zoom level if required

  // Optionally, scroll the page smoothly to the map section
  document.getElementById("map").scrollIntoView({ behavior: 'smooth' });

  // Close any open Bootstrap modals
  document.querySelectorAll('.modal.show').forEach(modalEl => {
    let modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) {
      modalInstance.hide();
    }
  });

  // Delay the scroll action to allow the modal to fully close
  setTimeout(() => {
    document.getElementById('map').scrollIntoView({ behavior: 'smooth' });
  }, 500); // Adjust the delay as needed (e.g., 300ms to 500ms)
}
/*
document.addEventListener('click', function(e) {
  // Check if the clicked element is (or is inside) an element with the class "open-modal"
  var modalContainer = e.target.closest('.open-modal');
  if (modalContainer) {
    // Retrieve data attributes from the container
    var title = modalContainer.getAttribute('data-title');
    var media = modalContainer.getAttribute('data-media');
    var date = modalContainer.getAttribute('data-date');
    var coordinates = modalContainer.getAttribute('data-coordinates');
    var description = modalContainer.getAttribute('data-description');

    // Update your universal modal (assuming you have a modal with these placeholders)
    document.getElementById('universalModalLabel').textContent = title;
    
    var mediaContainer = document.querySelector('#universalModal .media-container');
    if (media.match(/\.(mp4|webm|ogg)$/i)) {
      mediaContainer.innerHTML = '<video controls style="width:100%; height:100%; object-fit:contain;">' +
                                 '<source src="' + media + '" type="video/mp4">' +
                                 'Your browser does not support the video tag.' +
                                 '</video>';
    } else {
      mediaContainer.innerHTML = '<img src="' + media + '" alt="' + title + '" style="width:100%; height:100%; object-fit:contain;">';
    }
    
    document.querySelector('.modal-date').textContent = "Date Taken: " + date;
    document.querySelector('.modal-coordinates').textContent = "Coordinates: " + coordinates;
    document.querySelector('.modal-description').textContent = description;
    
    // Open the modal using Bootstrap's modal API
    var modalEl = document.getElementById('universalModal');
    var modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
    modal.show();
  }
});
*/
document.addEventListener('DOMContentLoaded', function() {
  // Helper function to load a carousel from JSON
  function loadCarousel(jsonUrl, carouselId) {
    fetch(jsonUrl)
      .then(response => response.json())
      .then(data => {
        const carouselInner = document.querySelector(`#${carouselId} .carousel-inner`);
        data.forEach((item, index) => {
          // Create carousel item
          const carouselItem = document.createElement('div');
          carouselItem.classList.add('carousel-item');
          if (index === 0) carouselItem.classList.add('active');

          // Use preview image if available, else fallback to media (for images)
          const thumbSrc = item.preview ? item.preview : item.media;
          
          // Build the inner HTML with centering and overlay classes
          carouselItem.innerHTML = `
            <div class="text-center">
              <div class="open-modal position-relative" 
                   data-title="${item.title}"
                   data-media="${item.media}"
                   data-date="${item.date}"
                   data-coordinates="${item.coordinates}"
                   data-description="${item.description}">
                <img src="${thumbSrc}" alt="${item.title}" class="img-responsive mx-auto d-block">
                <div class="overlay">
                  <span>Details</span>
                </div>
              </div>
            </div>
          `;
          carouselInner.appendChild(carouselItem);
        });
      })
      .catch(error => console.error('Error loading gallery data from ' + jsonUrl + ':', error));
  }
  
  // Load the two carousels from separate JSON files
  loadCarousel('images.json', 'galleryCarousel');
  loadCarousel('videos.json', 'videoCarousel');
  
  // Event delegation to handle clicks on any open-modal container
  document.addEventListener('click', function(e) {
    const modalContainer = e.target.closest('.open-modal');
    if (modalContainer) {
      // Retrieve data attributes
      const title = modalContainer.getAttribute('data-title');
      const media = modalContainer.getAttribute('data-media');
      const date = modalContainer.getAttribute('data-date');
      const coordinates = modalContainer.getAttribute('data-coordinates');
      const description = modalContainer.getAttribute('data-description');

      // Update universal modal content
      document.getElementById('universalModalLabel').textContent = title;
      const mediaContainer = document.querySelector('#universalModal .media-container');
      if (media.match(/\.(mp4|webm|ogg)$/i)) {
        mediaContainer.innerHTML = `<video controls style="width:100%; height:100%; object-fit:contain;">
                                      <source src="${media}" type="video/mp4">
                                      Your browser does not support the video tag.
                                    </video>`;
      } else {
        mediaContainer.innerHTML = `<img src="${media}" alt="${title}" style="width:100%; height:100%; object-fit:contain;">`;
      }
      
      document.querySelector('.modal-date').textContent = "Date Taken: " + date;
      document.querySelector('.modal-coordinates').textContent = "Coordinates: " + coordinates;
      document.querySelector('.modal-description').textContent = description;
      
      // Open the modal using Bootstrap's API
      const modalEl = document.getElementById('universalModal');
      const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      modal.show();
    }
  
/*

document.addEventListener('DOMContentLoaded', function() {
  // Fetch the JSON file
  fetch('images.json')
    .then(response => response.json())
    .then(data => {
      const carouselInner = document.querySelector('.carousel-inner');
      
      data.forEach((item, index) => {
        // Create the carousel item container
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        // Mark the first item as active
        if (index === 0) {
          carouselItem.classList.add('active');
        }
      
        // Create the inner HTML for the item, including centering classes
        carouselItem.innerHTML = `
        <div class="text-center">
          <div class="open-modal position-relative" 
               data-title="${item.title}"
               data-media="${item.media}"
               data-date="${item.date}"
               data-coordinates="${item.coordinates}"
               data-description="${item.description}">
            <img src="${item.media}" alt="${item.title}" class="img-responsive mx-auto d-block">
            <div class="overlay">
              <span>Details</span>
            </div>
          </div>
        </div>
        `;
      
        // Append the item to the carousel inner container
        carouselInner.appendChild(carouselItem);
      });
    })
    .catch(error => console.error('Error loading gallery data:', error));
  
  // Add event listener to open the modal when an image is clicked
  document.addEventListener('click', function(e) {
    const modalContainer = e.target.closest('.open-modal');
    if (modalContainer) {
      // Retrieve the data from the element
      const title = modalContainer.getAttribute('data-title');
      const media = modalContainer.getAttribute('data-media');
      const date = modalContainer.getAttribute('data-date');
      const coordinates = modalContainer.getAttribute('data-coordinates');
      const description = modalContainer.getAttribute('data-description');

      // Update the universal modal (assumes your modal has matching placeholders)
      document.getElementById('universalModalLabel').textContent = title;

      // Update media content in the modal (you can adapt to handle video or image)
      const mediaContainer = document.querySelector('#universalModal .media-container');
      if (media.match(/\.(mp4|webm|ogg)$/i)) {
        mediaContainer.innerHTML = `<video controls style="width:100%; height:100%; object-fit:contain;">
                                      <source src="${media}" type="video/mp4">
                                      Your browser does not support the video tag.
                                    </video>`;
      } else {
        mediaContainer.innerHTML = `<img src="${media}" alt="${title}" style="width:100%; height:100%; object-fit:contain;">`;
      }
      
      // Update details in the modal
      document.querySelector('.modal-date').textContent = "Date Taken: " + date;
      document.querySelector('.modal-coordinates').textContent = "Coordinates: " + coordinates;
      document.querySelector('.modal-description').textContent = description;
      
      // Open the modal using Bootstrap's API
      var modalEl = document.getElementById('universalModal');
      var modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      modal.show();
    }*/
  });
});
