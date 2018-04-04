import { computed } from '@ember/object';
import DS from 'ember-data';
import Stop from 'tpp-dispatcher/stop/model';

export default Stop.extend({
  routes_serving_stop: DS.attr(),
  parent_stop: DS.belongsTo('stop-station', { modelFor: 'stop-station' }),
  parent_stop_onestop_id: computed('parent_stop', {
    get(key) {
      return this.get('parent_stop').get('id');
    },
    set(key, value) {
      this.set('parent_stop', value);
    }
  }),
  issues: DS.hasMany('issue'),
  entityType: function() {
    return 'stopPlatform';
  },
  toChange: function() {
    return {
      onestopId: this.id,
      parentStopOnestopId: this.get('parent_stop').get('id'),
      name: this.get('name'),
      timezone: this.get('timezone'),
      geometry: this.get('geometry'),
      geometryReversegeo: this.get('geometry_reversegeo')
    };
  }
});
