import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    toggleCloseMessage: function() {
      this.set('closeMessage.show', false);
    },
    closeIssue: function() {
      this.model.selectedIssue.set('open', false);
      var self = this;
      self.model.selectedIssue.save().then(function(){
        self.set('closeMessage.show', false);
        self.postCloseTransition();
      }).catch(function(error){
        self.set('closeMessage', {show: true, error: true, message: 'Erro ao fechar problema ' + self.model.selectedIssue.id + '. ' + error.message});
      });
    },
    closeDialog: function() {
      this.set('closeMessage', {show: true, message: 'Fechar problema ' + this.model.selectedIssue.id });
    }
  }
});
