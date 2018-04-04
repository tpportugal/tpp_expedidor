import Ember from 'ember';
import Route from '@ember/routing/route';

export default Route.extend({
  model: function(params) {
    return this.store.find('user', params['user_id']);
  },
  actions: {
    update: function() {
      const flashMessages = Ember.get(this, 'flashMessages');
      var self = this;
      var user = self.currentModel;
      user.save().then(function() {
        flashMessages.add({
          message: `Utilizador atualizado!`,
          type: 'success',
          sticky: true
        });
        self.transitionTo('users.show', user);
      }).catch(function(error) {
        flashMessages.add({
          message: `Erro(s) ao atualizar utilizador: ${error.message}`,
          type: 'danger',
          sticky: true
        });
      });
    }
  }
});
