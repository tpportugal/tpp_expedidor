import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import DS from 'ember-data';

export default DS.Model.extend({
  onestop_id: alias('id'),
  name: DS.attr('string'),
  vehicle_type: DS.attr('string'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
  stops_served_by_route: DS.attr(),
  issues: DS.hasMany('issue', { async: true })
});
