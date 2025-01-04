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

//<script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"></script>
