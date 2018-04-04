import Ember from 'ember';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model: function(params) {
    return this.store.find('change-payload', params['change_payload_id']);
  },
  actions: {
    delete: function() {
      var self = this;
      var model = self.currentModel;
      var changeset = model.get('changeset');
      const flashMessages = Ember.get(this, 'flashMessages');
      model.destroyRecord().then(() => {
        flashMessages.add({
          message: 'Carga do changeset apagada!',
          type: 'success',
          sticky: true
        });
        self.transitionTo('changesets.show', changeset);
      }).catch(function(error) {
        flashMessages.add({
          message: `Erro(s) ao apagar carga do changeset: ${error.message}`,
          type: 'danger',
          sticky: true
        });
      });
    },
    update: function() {
      var self = this;
      var model = self.currentModel;
      var changeset = model.get('changeset');
      const flashMessages = Ember.get(this, 'flashMessages');
      model.set('payload', JSON.parse(model.get('stringified_payload')));
      model.save().then(function() {
        flashMessages.add({
          message: "Carga do changeset atualizada!",
          type: 'success',
          sticky: true
        });
        self.transitionTo('changesets.show', changeset);
      }).catch(function(error) {
        flashMessages.add({
          message: `Erro(s) ao atualizar carga do changeset: ${error.message}`,
          type: 'danger',
          sticky: true
        });
      });
    }
  }
});
