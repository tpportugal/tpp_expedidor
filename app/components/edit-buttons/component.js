import Component from '@ember/component';

export default Component.extend({

  actions: {
    showChangeset() {
      this.sendAction('showChangeset');
    },
    closeDialog() {
      this.sendAction('closeDialog');
    }
  }
});
