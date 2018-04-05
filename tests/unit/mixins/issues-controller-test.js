import IssuesControllerMixin from 'tpp-dispatcher/mixins/issues-controller';
import { module, test } from 'qunit';
import EmberObject from '@ember/object';

module('Unit | Mixin | issues controller');

// Replace this with your real tests.
test('it works', function(assert) {
  let IssuesControllerObject = EmberObject.extend(IssuesControllerMixin);
  let subject = IssuesControllerObject.create();
  assert.ok(subject);
});
