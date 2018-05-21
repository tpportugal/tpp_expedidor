import { computed } from '@ember/object';
import DS from 'ember-data';
import Stop from 'tpp-dispatcher/stop/model';

function next_fragment(entities, separator) {
  var ids = entities.map(function(i) {return i.id.split(separator)[1]; });
  var fragment = "";
  for (var i=0; i < 1000; i++) {
    fragment = String(i);
    if (ids.indexOf(fragment) === -1) {
      break;
    }
  }
  return fragment;
}

export default Stop.extend({
  routes_serving_stop_and_platforms: DS.attr(),
  stop_platforms: DS.hasMany('stop-platform', { async:true, modelFor: 'stop-platform', inverse: 'parent_stop'}),
  stop_egresses:  DS.hasMany('stop-egress', { async: true, modelFor: 'stop-egress', inverse: 'parent_stop'}),
  issues: DS.hasMany('issue', { async: true }),
  stationPlatformLines: computed('coordinates', 'stop_platforms.@each.coordinates', function() {
    var origin = this.get('coordinates');
    return this.get('stop_platforms').map(function(stop_platform) {
      return [origin, stop_platform.get('coordinates')];
    });
  }),
  stationEgressLines: computed('coordinates', 'stop_egresses.@each.coordinates', function() {
    var origin = this.get('coordinates');
    return this.get('stop_egresses').map(function(stop_platform) {
      return [origin, stop_platform.get('coordinates')];
    });
  }),
  newPlatform: function() {
    var separator = '<';
    var fragment = next_fragment(this.get('stop_platforms'), separator);
    return this.get('stop_platforms').createRecord(
      {
        id: this.id + separator + fragment,
        timezone: this.get('timezone'),
        geometry: this.get('geometry_centroid'),
        name: 'Nova Platforma'
      }
    );
  },
  newEgress: function() {
    var separator = '>';
    var fragment = next_fragment(this.get('stop_egresses'), separator);
    return this.get('stop_egresses').createRecord(
      {
        id: this.id + separator + fragment,
        timezone: this.get('timezone'),
        geometry: this.get('geometry_centroid'),
        name: 'Nova Saída'
      }
    );
  }
});
