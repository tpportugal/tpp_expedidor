import Component from '@ember/component';

export default Component.extend({
  didInsertElement() {
    this.$('.modal').modal().on('hidden.bs.modal', function() {
      this.sendAction('close');
    }.bind(this));
  }
});
