import { computed } from '@ember/object';
import { all, hash  } from 'rsvp';
import ArrayProxy from '@ember/array/proxy';
import PromiseProxyMixin from '@ember/object/promise-proxy-mixin';
import DS from 'ember-data';
import EntityWithActivityModel from 'tpp-dispatcher/entity-with-activity/model';
/* global L */

export default EntityWithActivityModel.extend({
  created_or_updated_in_changeset: DS.belongsTo('changeset', { async: true }),
  identifiers: DS.attr(),
  trips: DS.attr(),
  stop_distances: DS.attr(),
  stop_pattern: DS.attr(),
  color: DS.attr('string'),
  route_onestop_id: DS.attr('string', {readOnly: true}),
  onestop_id: computed.alias('id'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
  geometry: DS.attr(),
  tags: DS.attr(),
  issues: DS.hasMany('issue', { async: true }),
  patterns: [
    {offset: 0, repeat: 20, symbol: L.Symbol.arrowHead({pixelSize: 12, pathOptions: {fillOpacity: 1, weight: 0}})}
  ],
  stopsWithDistances: computed('stop_pattern', function(){
    var self = this;
    var args = {};
    args.promise =  all(this.get('stop_pattern').map(function(stop_onestop_id, index){
      return hash({ stop: self.store.findRecord('stop', stop_onestop_id), distance: self.get('stop_distances')[index] });
    }));
    return ArrayProxy.extend(PromiseProxyMixin).create(args);
  }),
  coordinates: computed('geometry', function(){
    return this.get('geometry').coordinates.map(function(coord){
      return coord.slice().reverse();
    });
  }),
  setCoordinates: function(coords) {
    this.set('geometry', {type: 'LineString',
                          coordinates: coords.map(function(c) { return c.map(function(n) { return parseFloat(n.toFixed(5));  } ) })
    });
  },
  entityType: function() {
    return 'routeStopPattern';
  },
  toChange: function() {
    return {
      onestopId: this.get('onestop_id'),
      stopPattern: this.get('stop_pattern'),
      geometry: {
        type: "LineString",
        coordinates: this.get('geometry').coordinates
      }
    };
  }
});
