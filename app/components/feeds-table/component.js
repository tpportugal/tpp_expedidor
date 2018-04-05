import Component from '@ember/component';
import { get } from '@ember/object';
import { allSettled } from 'rsvp';
import { inject as service } from '@ember/service';
import SelectableModelComponent from 'tpp-dispatcher/mixins/selectable-model-component';


export default Component.extend(SelectableModelComponent, {
  session: service(),
  classNames: ['table-responsive'],
  getSelectableModels: function() {
    return this.get('feeds');
  },
  selectableModelDefault: false,
  actions: {
    enqueueSelectedFeedsForImport: function(importLevel) {
      const flashMessages = get(this, 'flashMessages');
      let importPromises = this.get('selectedFeeds').map(function(feed) {
        return feed.content.enqueue(importLevel);
      });
      allSettled(importPromises).then( () => {
        flashMessages.add({
          message: `A importação da(s) versão(ões) mais recente(s) da(s) feed(s) foi agendada com sucesso!`,
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
