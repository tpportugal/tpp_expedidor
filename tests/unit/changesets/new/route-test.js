import { moduleFor, test } from 'ember-qunit';

moduleFor('route:changesets/new', 'Unit | Route | changesets/new', {
  // Specify the other units that are required for this test.
  needs: ['service:session', 'service:current-user']
});

test('it exists', function(assert) {
  var route = this.subject();
  assert.ok(route);
});
