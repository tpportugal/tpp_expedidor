import { moduleFor, test } from 'ember-qunit';

moduleFor('route:changesets/edit', 'Unit | Route | changesets/edit', {
  // Specify the other units that are required for this test.
  needs: ['service:session']
});

test('it exists', function(assert) {
  var route = this.subject();
  assert.ok(route);
});
