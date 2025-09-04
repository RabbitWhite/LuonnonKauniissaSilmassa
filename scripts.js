// Utility function to escape HTML for security
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

let map = null;
let currentMarker = null;

document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM fully loaded, initializing Leaflet map.");

  // Initialize the Leaflet map centered on Patvinsuo National Park
  map = L.map("map").setView([63.0577, 30.3464], 10);

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Add a default marker for Patvinsuo National Park
  const marker = L.marker([63.11586232190913, 30.69928421435293]).addTo(map);
  marker.bindPopup('<b>Patvinsuo National Park</b><br>Experience the beauty of Finnish wetlands.').openPopup();

  // Carousel loader
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

          // Use escapeHTML for all dynamic values and fix loading="lazy" quote
          carouselItem.innerHTML = `
            <div class="text-center">
              <div class="open-modal position-relative" 
                   data-title="${escapeHTML(item.title)}"
                   data-media="${escapeHTML(item.media)}"
                   data-date="${escapeHTML(item.date)}"
                   data-coordinates="${escapeHTML(item.coordinates)}"
                   data-description="${escapeHTML(item.description)}"
                   aria-label="Open details for ${escapeHTML(item.title)}">
                <img src="${escapeHTML(thumbSrc)}" alt="${escapeHTML(item.title)}" class="img-responsive mx-auto d-block" loading="lazy" />
                <div class="overlay"><span>Details</span></div>
              </div>
            </div>
          `;
          carouselInner.appendChild(carouselItem);
        });
      })
      .catch(error => {
        console.error('Error loading gallery data from ' + jsonUrl + ':', error);
        const carouselInner = document.querySelector(`#${carouselId} .carousel-inner`);
        if (carouselInner) {
          carouselInner.innerHTML = `<div class="text-danger text-center">Failed to load gallery.</div>`;
        }
      });
  }

  loadCarousel('images.json', 'galleryCarousel');
  loadCarousel('videos.json', 'videoCarousel');

  // Modal event delegation (no inline handlers, only JS listeners)
  document.addEventListener('click', function(e) {
    const modalContainer = e.target.closest('.open-modal');
    if (modalContainer) {
      const title = modalContainer.getAttribute('data-title');
      const media = modalContainer.getAttribute('data-media');
      const date = modalContainer.getAttribute('data-date');
      const coordinates = modalContainer.getAttribute('data-coordinates');
      const description = modalContainer.getAttribute('data-description');

      document.getElementById('universalModalLabel').textContent = title;
      document.querySelector('.modal-date').textContent = "Date Taken: " + date;
      document.querySelector('.modal-coordinates').textContent = "Coordinates: " + coordinates;
      document.querySelector('.modal-description').textContent = description;

      const mediaContainer = document.querySelector('#universalModal .media-container');
      mediaContainer.innerHTML = '';

      // Clone and append modal buttons
      const template = document.getElementById('modalButtonTemplate');
      const clonedButtons = template.cloneNode(true);
      clonedButtons.classList.remove('d-none');
      mediaContainer.appendChild(clonedButtons);

      // Attach JS listeners (not inline handlers)
      const openNewWindowBtn = clonedButtons.querySelector('.open-new-window');
      if (openNewWindowBtn) {
        openNewWindowBtn.addEventListener('click', function () {
          // Open media in new window/tab
          window.open(media, '_blank');
        });
      }

      const showOnMapBtn = clonedButtons.querySelector('#showOnMapButtonTemplate');
      if (showOnMapBtn) {
        showOnMapBtn.addEventListener('click', function () {
          let [lat, lng] = coordinates.split(',').map(s => parseFloat(s.trim()));
          goToMap(lat, lng);

          // Close modal after showing on map
          const modalEl = document.getElementById('universalModal');
          const modalInstance = bootstrap.Modal.getInstance(modalEl);
          if (modalInstance) {
            modalInstance.hide();
          }
        });
      }

      // Do NOT append media automatically here

      // Open the modal
      const modalEl = document.getElementById('universalModal');
      const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      modal.show();
    }
  });

  // Collapse mobile nav menu after link click (JS listeners only)
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

// Focus map on given coordinates and close modal if open
function goToMap(lat, lng) {
  if (!map) {
    console.error("Map has not been initialized.");
    return;
  }

  // Remove previous marker if it exists
  if (currentMarker) {
    map.removeLayer(currentMarker);
  }

  // Add new marker and center view
  currentMarker = L.marker([lat, lng]).addTo(map);
  map.setView([lat, lng], 13);

  // Close any open modals
  document.querySelectorAll('.modal.show').forEach(modalEl => {
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) {
      modalInstance.hide();
    }
  });

  // Smooth scroll to map after modal closes
  setTimeout(() => {
    document.getElementById('map').scrollIntoView({ behavior: 'smooth' });
  }, 500);
}

