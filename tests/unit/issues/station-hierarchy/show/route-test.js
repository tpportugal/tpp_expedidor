import { moduleFor, test } from 'ember-qunit';

moduleFor('route:issues/station-hierarchy/show', 'Unit | Route | issues/station hierarchy/show', {
  // Specify the other units that are required for this test.
  needs: ['service:session', 'service:current-user']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
