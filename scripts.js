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

document.addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('open-modal')) {
    // Grab the clicked button and its data attributes
    var btn = e.target;
    var title = btn.getAttribute('data-title');
    var media = btn.getAttribute('data-media');
    var date = btn.getAttribute('data-date');
    var coordinates = btn.getAttribute('data-coordinates');
    var description = btn.getAttribute('data-description');

    // Update modal title
    document.getElementById('universalModalLabel').textContent = title;

    // Determine if the media is video or image based on file extension
    var mediaContainer = document.querySelector('#universalModal .media-container');
    if (media.match(/\.(mp4|webm|ogg)$/i)) {
      mediaContainer.innerHTML = '<video controls style="width:100%; height:100%; object-fit:contain;">' +
                                 '<source src="' + media + '" type="video/mp4">' +
                                 'Your browser does not support the video tag.' +
                                 '</video>';
    } else {
      mediaContainer.innerHTML = '<img src="' + media + '" alt="' + title + '" style="width:100%; height:100%; object-fit:contain;">';
    }

    // Update details
    document.querySelector('.modal-date').textContent = "Date Taken: " + date;
    document.querySelector('.modal-coordinates').textContent = "Coordinates: " + coordinates;
    document.querySelector('.modal-description').textContent = description;

    // Show the modal (using Bootstrap 5's JS API)
    var modalEl = document.getElementById('universalModal');
    var modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
    modal.show();
  }
});