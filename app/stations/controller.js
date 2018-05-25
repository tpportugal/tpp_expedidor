import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

/* The only purpose of this controller is to set default query parameters */
export default Controller.extend({
  lat: 39.3999,
  lng: -8.2245,
  zoom: 8,
  currentUser: service(),
  getChanges: function() {
    var entities = [];
    entities = entities.concat(this.store.peekAll('stop-station').filter(function(e) { return e.get('hasDirtyAttributes'); }));
    entities = entities.concat(this.store.peekAll('stop-platform').filter(function(e) { return e.get('hasDirtyAttributes'); }));
    entities = entities.concat(this.store.peekAll('stop-egress').filter(function(e) { return e.get('hasDirtyAttributes'); }));
    return entities.map(function(e) {
      var ret = {};
      ret['action'] = 'createUpdate';
      ret[e.entityType()] = e.toChange();
      return ret;
    });
  },
  actions: {
    showChangeset: function() {
      var payload = {changes: this.getChanges()};
      this.model.changeset.get('change_payloads').get('firstObject').set('payload', payload);
      this.set('showChangeset', true);
    },
    hideChangeset: function() {
      this.set('showChangeset', false);
    },
    saveChangeset: function() {
      const flashMessages = get(this, 'flashMessages');
      var self = this;
      return this.model.changeset.save()
        .then(function() {
          flashMessages.add({
            message: `Changeset criado`,
            type: 'success',
            sticky: true
          });
          self.set('showChangeset', false);
        }).catch(function(error) {
          flashMessages.add({
            message: `Erro(s) ao atualizar a carga do changeset: ${error.message}`,
            type: 'danger',
            sticky: true
          });
        });
    },
    applyChangeset: function() {
      const flashMessages = get(this, 'flashMessages');
      var self = this;
      return this.model.changeset.save()
        .then(function(changeset) {
          return changeset.apply();
        }).then(function() {
          flashMessages.add({
            message: `Changeset criado & aplicado`,
            type: 'success',
            sticky: true
          });
          self.set('showChangeset', false);
        }).catch(function(error) {
          flashMessages.add({
            message: `Erro(s) ao atualizar a carga do changeset: ${error.message}`,
            type: 'danger',
            sticky: true
          });
        });
    },
    setBounds: function() {
      this.set('bbox', this.get('bounds').toBBoxString());
    }
  }
});
