import Component from '@ember/component';
import computed from '@ember/object';

export default Component.extend({
  classNames: ['panel'],
  isSuccessful: computed('feedVersionImport.success', function() {
    var success = this.get('feedVersionImport').get('success');
    if (success === true) {
      return 'panel-success';
    } else if (success === false) {
      return 'panel-danger';
    } else {
      return 'panel-default';
    }
  })
});
