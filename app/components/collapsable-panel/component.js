import Component from '@ember/component';

export default Component.extend({
  classNames: ['panel'],
  classNameBindings: ['panelClass'],
  panelClass: 'panel-default',
  show: false,
  actions: {
    toggleCollapse: function() {
      this.toggleProperty("show");
    }
  }
});
