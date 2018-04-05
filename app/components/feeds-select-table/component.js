import Component from '@ember/component';

export default Component.extend({
  actions: {
    feedClicked: function(feed) {
      this.sendAction('feedClicked', feed);
    }
  }
});
