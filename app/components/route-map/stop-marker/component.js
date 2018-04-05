import Ember from 'ember';
import L from 'ember-leaflet';
import Component from '@ember/component';
// import config from '../../../config/environment';

export default Component.extend({
  onestop_id: '',
  markerStopIcon: L.icon({
    iconUrl: '/assets/images/station.png',
    iconSize: [36, 54],
    iconAnchor: [18, 54],
    popupAnchor: [0, -54]
  }),
  actions: {
    editEntityAdded: function(addEvent) {
      this.sendAction('editEntityAdded', addEvent.target, this.get('onestop_id'));
    }
  }
});
