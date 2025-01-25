function initMap() {
  var location = { lat: 60.192059, lng: 24.945831 };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: location
  });

  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
}

document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM fully loaded, initializing map.");
  // Initialize the map
  var map = L.map("map").setView([63.0577, 30.3464], 10); // Coordinates for Patvinsuo National Park

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Add a marker for Patvinsuo National Park
  var marker = L.marker([63.11586232190913, 30.69928421435293]).addTo(map);

  // Add a popup to the marker
  marker.bindPopup('<b>Patvinsuo National Park</b><br>Experience the beauty of Finnish wetlands.').openPopup();
});

