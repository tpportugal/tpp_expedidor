import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  currentUser: service(),
  closeText: 'Fechar',
  okText: 'OK',
  actions: {
    ok: function() {
      this.$('.modal').modal('hide');
      this.sendAction('ok');
    },
    danger: function() {
      this.$('.modal').modal('hide');
      this.sendAction('danger');
    }
  },
  show: function() {
    this.$('.modal').modal().on('hidden.bs.modal', function() {
      this.sendAction('close');
    }.bind(this));
  }.on('didInsertElement')
});
