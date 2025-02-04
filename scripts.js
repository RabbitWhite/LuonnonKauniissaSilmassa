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