import { moduleFor, test } from 'ember-qunit';

moduleFor('route:issues/route-geometry/show', 'Unit | Route | issues/route geometry/show', {
  // Specify the other units that are required for this test.
  needs: ['service:session', 'service:current-user']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
