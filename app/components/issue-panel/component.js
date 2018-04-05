import Component from '@ember/component';

export default Component.extend({
    classNames: ['panel'],
    classNameBindings: ['panelClass'],
    panelClass: 'panel-default',
    issue: null,
    actions: {
      issueClicked: function(issue) {
        this.sendAction("issueClicked", issue);
      }
    }
});
