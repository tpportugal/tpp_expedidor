import { get } from '@ember/object';
import { later } from '@ember/runloop';
import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';

export default Mixin.create({
  currentUser: service(),
  getChanges: function() {

  },
  emptyChangeset: function() {
    let changeset = this.store.createRecord('changeset', {
      user: this.get('currentUser.user'),
      notes: 'Resolução do problema:'
    });
    changeset.get('change_payloads').createRecord();
    this.set('model.changeset', changeset);
  },
  pollChangesetApply: function(resolvingIssue, url, applicationAdapter) {
    var self = this;
    const flashMessages = get(this, 'flashMessages');
    applicationAdapter.ajax(url, 'post').then(function(response){
      if (response.status === 'completo') {
        flashMessages.clearMessages();
        flashMessages.add({
          message: 'Problema ' + resolvingIssue.id + ' resolvido com sucesso. Clique para fechar.',
          type: 'success',
          sticky: true
        });
        self.postSuccessTransition();
      }
      else if (response.status === 'agendado') {
        later(self.pollChangesetApply.bind(self, resolvingIssue, url, applicationAdapter), 2000);
      }
      else if (response.status === 'erro') {
        flashMessages.clearMessages();
        flashMessages.add({
          message: 'Erro ao resolver o problema ' + resolvingIssue.id + '. ' + response.errors + '. Clique para fechar.',
          type: 'danger',
          sticky: true
        });
        // clean the changeset, but leave edits.
        self.emptyChangeset();
      }
      else {
        later(self.pollChangesetApply.bind(self, resolvingIssue, url, applicationAdapter), 2000);
      }
    }).catch(function(e){
      flashMessages.clearMessages();
      flashMessages.add({
        message: 'Erro ao resolver o problema ' + resolvingIssue.id + '. ' + e.errors[0].message + '. Clique para fechar.',
        type: 'danger',
        sticky: true
      });
      // clean the changeset, but leave edits.
      self.emptyChangeset();
    });
  },

  actions: {
    saveChangeset: function() {
      const flashMessages = get(this, 'flashMessages');
      var self = this;
      return self.model.changeset.save()
        .then(function(changeset) {
          self.set('applyingSpinner', true);
          return changeset.apply_async();
        }).then(function(response) {
          self.set('applyingSpinner', false);
          self.set('showChangeset', false);
          flashMessages.info('A aplicar changeset para resolver o problema ' + self.model.selectedIssue.id);
          var applicationAdapter = self.store.adapterFor('changeset');
          var modelUrl = applicationAdapter.buildURL('changeset', self.get('model.changeset.id'));
          var applyUrl = modelUrl + '/apply_async';
          self.pollChangesetApply(self.model.selectedIssue, applyUrl, applicationAdapter);
        }).catch(function(error) {

        });
    },
    showChangeset: function() {
      var payload = {changes: this.getChanges()};
      this.model.changeset.get('change_payloads').get('firstObject').set('payload', payload);
      this.set('showChangeset', true);
    },
    hideChangeset: function() {
      this.set('showChangeset', false);
    }
  }
});
