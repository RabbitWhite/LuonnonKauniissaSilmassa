// Global variable for the Leaflet map instance
window.map = null;
window.currentMarker = null;

document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM fully loaded, initializing Leaflet map.");

  // Initialize the Leaflet map centered on Patvinsuo National Park
  window.map = L.map("map").setView([63.0577, 30.3464], 10);

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  }).addTo(window.map);

  // Add a default marker for Patvinsuo National Park
  const marker = L.marker([63.11586232190913, 30.69928421435293]).addTo(window.map);
  marker.bindPopup('<b>Patvinsuo National Park</b><br>Experience the beauty of Finnish wetlands.').openPopup();
});

// Focus map on given coordinates and close modal if open
function goToMap(lat, lng) {
  if (!window.map) {
    console.error("Map has not been initialized.");
    return;
  }

  // Remove previous marker if it exists
  if (window.currentMarker) {
    window.map.removeLayer(window.currentMarker);
  }

  // Add new marker and center view
  window.currentMarker = L.marker([lat, lng]).addTo(window.map);
  window.map.setView([lat, lng], 13);

  // Smooth scroll to map
  document.getElementById("map").scrollIntoView({ behavior: 'smooth' });

  // Close any open modals
  document.querySelectorAll('.modal.show').forEach(modalEl => {
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) {
      modalInstance.hide();
    }
  });

  // Delay scroll to map for smoother transition after modal closes
  setTimeout(() => {
    document.getElementById('map').scrollIntoView({ behavior: 'smooth' });
  }, 500);
}

document.addEventListener('DOMContentLoaded', function () {
  /**
   * Load carousel items dynamically from JSON
   * @param {string} jsonUrl - URL to the JSON file
   * @param {string} carouselId - ID of the carousel container
   */
  function loadCarousel(jsonUrl, carouselId) {
    fetch(jsonUrl)
      .then(response => response.json())
      .then(data => {
        const carouselInner = document.querySelector(`#${carouselId} .carousel-inner`);
        data.forEach((item, index) => {
          const carouselItem = document.createElement('div');
          carouselItem.classList.add('carousel-item');
          if (index === 0) carouselItem.classList.add('active');

          const thumbSrc = item.preview ? item.preview : item.media;

          carouselItem.innerHTML = `
            <div class="text-center">
              <div class="open-modal position-relative" 
                   data-title="${item.title}"
                   data-media="${item.media}"
                   data-date="${item.date}"
                   data-coordinates="${item.coordinates}"
                   data-description="${item.description}">
                <img src="${thumbSrc}" alt="${item.title}" class="img-responsive mx-auto d-block">
                <div class="overlay"><span>Details</span></div>
              </div>
            </div>
          `;

          carouselInner.appendChild(carouselItem);
        });
      })
      .catch(error => console.error('Error loading gallery data from ' + jsonUrl + ':', error));
  }

  // Load image and video carousels
  loadCarousel('images.json', 'galleryCarousel');
  loadCarousel('videos.json', 'videoCarousel');

  document.addEventListener('click', function(e) {
    const modalContainer = e.target.closest('.open-modal');
    if (modalContainer) {
      // Retrieve data attributes
      const title = modalContainer.getAttribute('data-title');
      const media = modalContainer.getAttribute('data-media');
      const date = modalContainer.getAttribute('data-date');
      const coordinates = modalContainer.getAttribute('data-coordinates');
      const description = modalContainer.getAttribute('data-description');
  
      // Update modal title and details
      document.getElementById('universalModalLabel').textContent = title;
      document.querySelector('.modal-date').textContent = "Date Taken: " + date;
      document.querySelector('.modal-coordinates').textContent = "Coordinates: " + coordinates;
      document.querySelector('.modal-description').textContent = description;
  
      // Instead of injecting the media, inject a button in the media container:
      const mediaContainer = document.querySelector('#universalModal .media-container');
      mediaContainer.innerHTML = 
      `<button class="btn btn-sm btn-primary open-new-window">Open Media in New Window</button><br>
      <button id="showOnMapButton" class="btn btn-secondary mt-3">Show on Map</button>`;
      
      // Attach click event for the button to open media in new window
      const button = mediaContainer.querySelector('.open-new-window');
      button.addEventListener('click', function() {
        window.open(media, '_blank');
      });

      // Attach event listener to the "Show on Map" button:
    // Parse the coordinates string into numbers:
    let [lat, lng] = coordinates.split(',').map(s => parseFloat(s.trim()));
    document.getElementById('showOnMapButton').onclick = function() {
      goToMap(lat, lng);
    };
      
      // Open the modal
      const modalEl = document.getElementById('universalModal');
      const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      modal.show();
    }
  });
});

// Collapse mobile nav menu after link click
document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        new bootstrap.Collapse(navbarCollapse).hide();
      }
    });
  });
});

