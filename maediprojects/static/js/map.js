var MAEDImap = {};
var markers = {}
var MAEDImap = function(elID) {
  var map, layerControl, year;

  this.addLocation = function(data) {
    var newLocation = new L.marker(
      new L.LatLng(
        data['latitude'],
        data['longitude']
      )
    );
    var popupContent = getPopupContent(data);
    newLocation.bindPopup(popupContent);
    map.addLayer(newLocation);
    markers[data.id] = newLocation;
  }
  
  this.removeLocation = function(data) {
    map.removeLayer(markers[data['id']]);
  }
  this.toggleLocation = function(data) {
    if (data.id in markers) {
      this.removeLocation(data);
      delete markers[data.id];
      return "removed";
    } else {
      this.addLocation(data);
      return "added";
    }
  }

  this._init = function () {
    layer_MapBox = new L.tileLayer(
    'https://d.tiles.mapbox.com/v3/markbrough.n3kod47p/{z}/{x}/{y}.png',{
        maxZoom: 15, attribution: 'MapBox Streets'
    })
    map = new L.Map(elID, {
        center: new L.LatLng(8,1),
        zoom: 5,
        maxZoom: 15
    });
    layer_MapBox.addTo(map);
    map.scrollWheelZoom.disable();
  }
  
  this.resize = function() {
    map.invalidateSize();
  }

  this.fitBounds = function(bounds) {
    map.fitBounds(bounds);
  }

  function getPopupContent(data) {
    var pc = data['name'];
    return pc;
  }
  
  function slugify(text)
  {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }

  this._init();
}
