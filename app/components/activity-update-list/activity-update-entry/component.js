import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'li',
  classNames: ['list-group-item'],
  entityUrl: computed('activityUpdate', function() {
    return this.router.generate(
      `${this.get('activityUpdate.entity_type')}s.show`,
      this.get()
    );
  })
});
