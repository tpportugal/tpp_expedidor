import IssuesResolvingChangesetControllerMixin from 'tpp-dispatcher/mixins/issues-resolving-changeset-controller';
import { module, test } from 'qunit';
import EmberObject from '@ember/object';

module('Unit | Mixin | issues resolving changeset controller');

// Replace this with your real tests.
test('it works', function(assert) {
  let IssuesResolvingChangesetControllerObject = EmberObject.extend(IssuesResolvingChangesetControllerMixin);
  let subject = IssuesResolvingChangesetControllerObject.create();
  assert.ok(subject);
});
