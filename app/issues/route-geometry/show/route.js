import Ember from 'ember';
import L from 'ember-leaflet';
import { get } from '@ember/object';
import { hash } from 'rsvp';
import { Promise } from 'rsvp';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import IssuesRoute from 'tpp-dispatcher/mixins/issues-route';

export default Route.extend(IssuesRoute, {
  currentUser: service(),

  model: function(params) {
    // In the future, it would be worthwhile to consider keeping entities
    // and their edits across issues.
    this.store.unloadAll('changeset');
    this.store.unloadAll('change_payload');
    this.store.unloadAll('stop');
    this.store.unloadAll('route-stop-pattern');
    // leave issues, so as to not have to repopulate issues table

    const flashMessages = get(this, 'flashMessages');
    let self = this;

    let changeset = self.store.createRecord('changeset', {
      user: self.get('currentUser.user'),
      notes: 'Resolução do problema:'
    });

    changeset.get('change_payloads').createRecord();

    return hash({
      changeset: changeset
    }).then(function(model){
      return hash({
        changeset: model.changeset,
        users: self.store.query('user', { per_page: false })
      });
    }).then(function(model){
      return hash({
        changeset: model.changeset,
        users: model.users,
        selectedIssue: self.store.findRecord('issue', params['issue_id'], { reload: true })
      });
    }).then(function(model){
      let stopIds = [];
      model.selectedIssue.get('entities_with_issues').forEach(function(entity){
        if (entity.get('onestop_id').split('-')[0] === 's') {
          stopIds.push(entity.get('onestop_id'));
        }
      });

      let getStops = function(stopIds) {
        return new Promise(function(resolve, reject){
          if (stopIds.length > 0) {
            resolve(self.store.query('stop', {onestop_id: stopIds.join(',')}));
          }
          else {
            // sometimes issues don't have stops
            resolve();
          }
        });
      }

      return hash({
        changeset: model.changeset,
        users: model.users,
        selectedIssue: model.selectedIssue,
        issueStops: getStops(stopIds)
      });
    }).then(function(model){
      let rspIds = [];
      model.selectedIssue.get('entities_with_issues').forEach(function(entity){
        if (entity.get('onestop_id').split('-')[0] === 'r') {
          rspIds.push(entity.get('onestop_id'));
        }
      });

      let getRSPs = function(rspIds) {
        return new Promise(function(resolve, reject){
          resolve(self.store.query('route-stop-pattern', {onestop_id: rspIds.join(',')}));
        });
      }

      return hash({
        changeset: model.changeset,
        users: model.users,
        selectedIssue: model.selectedIssue,
        issueStops: model.issueStops,
        issueRouteStopPatterns: getRSPs(rspIds)
      });
    }).then(function(model){
      let bounds = new L.latLngBounds([]);

      if (model.issueStops) {
        model.issueStops.forEach(function(stop){
          bounds.extend(new L.latLng(stop.get('coordinates')));
        });
      }

      if (model.issueRouteStopPatterns) {
        model.issueRouteStopPatterns.forEach(function(rsp){
          // Distance calc issue details come with a full array of stop distances along the RSP
          if (model.selectedIssue.get('issue_type') == 'distance_calculation_inaccurate') {
            let re = 'Distâncias: \\[.+\\]';
            let match = model.selectedIssue.get('details').match(re);
            if (match) {
              rsp.set('stop_distances', JSON.parse(match[0].replace('Distâncias: ', '')));
              model.selectedIssue.set('details', model.selectedIssue.get('details').replace(/Distâncias: \[.+\]/, ''));
            }
          }

          rsp.get('coordinates').forEach(function(coord){
            bounds.extend(new L.latLng(coord));
          });
        });
      }

      return hash({
        changeset: model.changeset,
        users: model.users,
        selectedIssue: model.selectedIssue,
        issueStops: model.issueStops,
        issueRouteStopPatterns: model.issueRouteStopPatterns,
        bounds: bounds
      });
    }).catch((error) => {
      flashMessages.add({
        message: `Erro(s): ${error.message}`,
        type: 'danger',
        sticky: true
      });
    });
  }
});
