import Ember from 'ember';
import SelectableModelComponent from 'tpp-dispatcher/mixins/selectable-model-component';
import { inject as service } from '@ember/service';

export default Ember.Component.extend(SelectableModelComponent, {
  session: service(),
  classNames: ['table-responsive'],
  getSelectableModels: function() {
    return this.get('feeds');
  },
  selectableModelDefault: false,
  actions: {
    enqueueSelectedFeedsForImport: function(importLevel) {
      const flashMessages = Ember.get(this, 'flashMessages');
      let importPromises = this.get('selectedFeeds').map(function(feed) {
        return feed.content.enqueue(importLevel);
      });
      Ember.RSVP.allSettled(importPromises).then( () => {
        flashMessages.add({
          message: 'A importação da(s) versão(ões) mais recente(s) da(s) feed(s) foi agendada com sucesso!',
          type: 'success',
          sticky: true
        });
      }).catch( (e) => {
        flashMessages.add({
          message: `Erro ao agendar importação da(s) feed(s): ${e.message}`,
          type: 'danger',
          sticky: true
        });
      });
    }
  }
});
