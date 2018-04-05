import PaginatedSortableRouteMixin from '../../../mixins/paginated-sortable-route';
import { module, test } from 'qunit';
import EmberObject from '@ember/object';

module('Unit | Mixin | paginated route');

// Replace this with your real tests.
test('it works', function(assert) {
  let PaginatedSortableRouteObject = EmberObject.extend(PaginatedSortableRouteMixin);
  let subject = PaginatedSortableRouteObject.create();
  assert.ok(subject);
});
