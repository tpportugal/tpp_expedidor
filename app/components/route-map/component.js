import Component from '@ember/component';
import ENV from 'tpp-dispatcher/config/environment';
/* global L */

export default Component.extend({
  osmUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  transitLightUrl: "https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey="
                   + ENV.thunderforestApiKey,
  transitDarkUrl: "https://tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey="
                  + ENV.thunderforestApiKey,
  cartoUrl: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
  arcgisAerialUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  mapboxAerialUrl: "https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token="
                   + ENV.mapboxApiKey,
  transitOverlayUrl: "http://openptmap.org/tiles/{z}/{x}/{y}.png",
  openRailwayUrl: "https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png",
  options: {},
  draw: { polyline: false, polygon: false, rectangle: false, circle: false, marker: false },
  editing: false,
  edit: {
    featureGroup: L.featureGroup()
  },
  enableDeleting: false,
  willDestroyElement: function() {
    this._super(...arguments);
    // removeLayer event on individual layers doesn't seem to work for the purpose
    // of clearing the edit featureGroup, but this does.
    Object.values(this.get('edit.featureGroup')._layers).forEach(function(layer){
      this.get('edit.featureGroup').removeLayer(layer);
    }, this);
  },
  actions: {
    layerControlEvent(event){
    },
    actionDrawEdited: function(EditedEvent) {
      this.sendAction('actionDrawEdited', EditedEvent);
      this.set('editing', false);
    },
    actionDrawEditStart: function(EditedEvent) {
      this.set('editing', true);
    },
    actionDrawEditStop: function(EditedEvent) {
      this.set('editing', false);
    },
    editEntityAdded: function(layer, onestop_id) {
      this.get('edit.featureGroup').addLayer(layer);
      this.sendAction('editEntityAdded', layer._leaflet_id, onestop_id);
    }
  }
});
