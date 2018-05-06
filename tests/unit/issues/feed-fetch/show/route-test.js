import { moduleFor, test } from 'ember-qunit';

moduleFor('route:issues/feed-fetch/show', 'Unit | Route | issues/feed fetch/show', {
  // Specify the other units that are required for this test.
  needs: ['service:session', 'service:current-user']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
