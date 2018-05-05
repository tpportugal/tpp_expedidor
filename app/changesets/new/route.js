import { hash } from 'rsvp';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),
  model: function() {
    let changeset = this.store.createRecord('changeset', {
      user: this.get('currentUser.user'),
      notes: ''
    });
    changeset.get('change_payloads').createRecord();
    let users = this.store.query('user', { per_page: false });
    return hash({
      changeset: changeset,
      users: users
    });
  },
  actions: {
    create: function() {
      let self = this;
      let changeset = self.currentModel.changeset;
      const flashMessages = get(this, 'flashMessages');
      changeset.save().then(function() {
        self.transitionTo('changesets.show', changeset);
      }).catch(function(error) {
        flashMessages.add({
          message: `Erro(s) ao criar changeset: ${error.message}`,
          type: 'danger',
          sticky: true
        });
      });

    }
  }
});
