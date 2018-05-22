import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';

const TimeSinceWithMouseoverComponent = Component.extend({
  tagName: 'abbr',
  dateAsString: computed('date', function() {
    let date = this.get('date');
    if (isPresent(date)) {
      return this.get('date').toString();
    }
  }),
  attributeBindings: ['title'],
  title: alias('dateAsString')
});

TimeSinceWithMouseoverComponent.reopenClass({
  positionalParams: 'date'
});

export default TimeSinceWithMouseoverComponent;
