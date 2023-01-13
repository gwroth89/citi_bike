// var newYorkCoords = [40.73, -74.0059];
// var mapZoomLevel = 12;

let baseURL = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json"

// Create the createMap function.
function createMap (bikeStations) {

  // Create the tile layer that will be the background of our map.
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });

  // Create a baseMaps object to hold the lightmap layer.

let baseMaps = {
  "Street Map": street
};

  // Create an overlayMaps object to hold the bikeStations layer.

let overlayMaps = {
  bikeStations: bikeStations
};

  // Create the map object with options.
let myMap = L.map("map-id", {
  center: [40.73, -74.0059],
  zoom: 12 
});

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);
}
// Create the createMarkers function.
function createMarkers(response)
  // Pull the "stations" property from response.data.
 {
  let markers = response.data.stations

  
  // Initialize an array to hold the bike markers.
  let bikeMarkers = []

  // Loop through the stations array.
    // For each station, create a marker, and bind a popup with the station's name.
    for (var i = 0; i < markers.length; i++) {
      // loop through the cities array, create a new marker, and push it to the cityMarkers array
      bikeMarkers.push(
        L.marker([markers[i].lat, markers[i].lon]).bindPopup("<h1>" + markers[i].name + "</h1>")
      );
    }

  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  createMap(L.layerGroup(bikeMarkers));
  }
// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json(baseURL).then(createMarkers)