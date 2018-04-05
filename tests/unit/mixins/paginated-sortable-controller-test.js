import PaginatedSortableControllerMixin from '../../../mixins/paginated-sortable-controller';
import { module, test } from 'qunit';
import EmberObject from '@ember/object';

module('Unit | Mixin | paginated controller');

// Replace this with your real tests.
test('it works', function(assert) {
  let PaginatedSortableControllerObject = EmberObject.extend(PaginatedSortableControllerMixin);
  let subject = PaginatedSortableControllerObject.create();
  assert.ok(subject);
});
