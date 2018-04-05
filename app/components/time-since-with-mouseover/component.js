import Component from '@ember/component';
import { isPresent } from '@ember/utils';
import { computed } from '@ember/object';

const TimeSinceWithMouseoverComponent = Component.extend({
  tagName: 'abbr',
  dateAsString: computed('date', function() {
    let date = this.get('date');
    if (isPresent(date)) {
      return this.get('date').toString();
    }
  }),
  attributeBindings: ['title'],
  title: computed.alias('dateAsString')
});

TimeSinceWithMouseoverComponent.reopenClass({
  positionalParams: 'date'
});

export default TimeSinceWithMouseoverComponent;
