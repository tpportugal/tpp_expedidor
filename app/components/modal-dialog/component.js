import Component from '@ember/component';

export default Component.extend({
  closeText: 'Close',
  okText: 'OK',
  actions: {
    ok: function() {
      this.$('.modal').modal('hide');
      this.sendAction('ok');
    }
  },
  didInsertElement() {
    this.$('.modal').modal().on('hidden.bs.modal', function() {
      this.sendAction('close');
    }.bind(this));
  }
});
