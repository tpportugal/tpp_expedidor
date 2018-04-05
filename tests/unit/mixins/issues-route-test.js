import IssuesRouteMixin from 'tpp-dispatcher/mixins/issues-route';
import { module, test } from 'qunit';
import EmberObject from '@ember/object';

module('Unit | Mixin | issues route');

// Replace this with your real tests.
test('it works', function(assert) {
  let IssuesRouteObject = EmberObject.extend(IssuesRouteMixin);
  let subject = IssuesRouteObject.create();
  assert.ok(subject);
});
