import Component from '@ember/component';
import { get } from '@ember/object';

export default Component.extend({
  dropDownExpanded: false,
  actions: {
    toggleDropDownExpanded: function() {
      this.toggleProperty('dropDownExpanded');
    },
    setAsActiveFeedVersion: function() {
      alert('TODO: fazer com que isto funcione no Banco de Dados!');
    },
    changeImportLevel: function(importLevel) {
      var self = this;
      var feedVersion = this.get('feedVersion');
      const flashMessages = get(this, 'flashMessages');
      feedVersion.set('import_level', importLevel);
      feedVersion.save().then(function() {
        flashMessages.add({
          message: "Nível de importação atualizado na versão da feed!",
          type: 'success',
          sticky: true
        });
        // TODO: force a reload of the feed model
      }).catch(function(error) {
        flashMessages.add({
          message: `Erro(s) ao atualizar nível de importação na versão da feed: ${error.message}`,
          type: 'danger',
          sticky: true
        });
      }).finally(function() {
        self.set('dropDownExpanded', false);
      });
    },
    enqueue: function(importLevel) {
      var self = this;
      const flashMessages = get(this, 'flashMessages');
      this.model.enqueue(importLevel)
      .then( () => {
        flashMessages.add({
          message: 'Importação da versão da feed agendada com sucesso!',
          type: 'success',
          sticky: true
        });
      }).catch( (e) => {
        flashMessages.add({
          message: `Erro ao agendar importação da versão da feed: ${e.message}`,
          type: 'danger',
          sticky: true
        });
      }).finally(function() {
        self.set('dropDownExpanded', false);
      });
    }
  }
});
