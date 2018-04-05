import Ember from 'ember';
import L from 'ember-leaflet';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import IssuesRoute from 'tpp-dispatcher/mixins/issues-route';

export default Route.extend(IssuesRoute, {
  currentUser: service(),
  model: function(params) {
    this.store.unloadAll('changeset');
    this.store.unloadAll('change_payload');
    this.store.unloadAll('stop');
    this.store.unloadAll('stop-station');

    var self = this;
    return self.store.findRecord('issue', params['issue_id'], { reload: true }).then(function(selectedIssue){
      // Changeset
      let changeset = self.store.createRecord('changeset', {
        user: self.get('currentUser.user'),
        notes: 'Issue resolution:'
      });
      changeset.get('change_payloads').createRecord();
      // Users
      let users = self.store.query('user', { per_page: false });

      // Stops
      let stops = [];
      selectedIssue.get('entities_with_issues').forEach(function(entity){
        if (entity.get('onestop_id').split('-')[0] === 's') {
          stops.push(entity.get('onestop_id').split('<')[0]);
        }
      });
      return self.store.query('stop-station', { onestop_id: stops.join(',') }).then(function(stops){
        let bounds = new L.latLngBounds(stops.map(function(stop) {
          return new L.latLng(stop.get('coordinates'));
        }));
        let latLng = bounds.getCenter();
        return hash({
          selectedIssue: selectedIssue,
          changeset: changeset,
          lat: latLng.lat,
          lng: latLng.lng,
          users: users,
          stops: stops
        });
      });
    });
  }
});
