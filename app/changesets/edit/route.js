import { hash } from 'rsvp';
import { get } from '@ember/object';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model: function(params) {
    let changeset = this.store.find('changeset', params['changeset_id']);
    let users = this.store.query('user', { per_page: false });
    return hash({
      changeset: changeset,
      users: users
    });
  },
  actions: {
    delete: function() {
      let self = this;
      let changeset = self.currentModel.changeset;
      const flashMessages = get(this, 'flashMessages');
      changeset.destroyRecord().then(() => {
        flashMessages.add({
          message: "Changeset apagado!",
          type: 'success',
          sticky: true
        });
        self.transitionTo('changesets');
      }).catch(function(error) {
        flashMessages.add({
          message: `Erro(s) ao apagar changeset: ${error.message}`,
          type: 'danger',
          sticky: true
        });
      });
    },
    update: function() {
      const flashMessages = get(this, 'flashMessages');
      let self = this;
      let changeset = self.currentModel.changeset;
      changeset.save().then(function() {
        flashMessages.add({
          message: "Changeset atualizado!",
          type: 'success',
          sticky: true
        });
        self.transitionTo('changesets.show', changeset);
      }).catch(function(error) {
        flashMessages.add({
          message: `Erro(s) ao atualizar changeset: ${error.message}`,
          type: 'danger',
          sticky: true
        });
      });
    }
  }
});
