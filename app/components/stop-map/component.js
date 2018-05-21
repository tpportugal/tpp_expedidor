import Component from '@ember/component';
import ENV from 'tpp-dispatcher/config/environment';
/* global L */

var stopStationIcon = L.icon({
  iconUrl: '/assets/images/station.png',
  iconSize: [36, 54],
  iconAnchor: [18, 54],
  popupAnchor: [0, -54]
});

var stopPlatformIcon = L.icon({
  iconUrl: '/assets/images/train.png',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
  popupAnchor: [0, -16]
});

// icon source: https://thenounproject.com/search/?q=stairs&i=9
var stopEgressIcon = L.icon({
  iconUrl: '/assets/images/stairs.png',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
  popupAnchor: [0, -16]
});

export default Component.extend({
  osmUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  transitUrl: "https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey="
              + ENV.thunderforestApiKey,
  cartoUrl: "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
  stopPlatformIcon: stopPlatformIcon,
  stopEgressIcon: stopEgressIcon,
  stopStationIcon: stopStationIcon,
  lat: 0,
  lng: 0,
  zoom: 0,
  bounds: null,
  actions: {
    layerControlEvent(event){
    },
    updateView(e) {
      let center = e.target.getCenter();
      var zoom = e.target.getZoom();
      var bounds = e.target.getBounds();
      this.set('lat', center.lat);
      this.set('lng', center.lng);
      this.set('zoom', zoom);
      this.set('bounds', bounds);
    },
    updateStopCoordinates(stop, e) {
      let location = e.target.getLatLng();
      stop.setCoordinates([location.lng, location.lat]);
    }
  }
});
