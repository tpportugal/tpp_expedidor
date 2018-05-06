import { moduleForModel, test } from 'ember-qunit';

moduleForModel('feed', 'Unit | Serializer | feed', {
  // Specify the other units that are required for this test.
  needs: ['serializer:feed', 'model:feed-version', 'model:changeset', 'model:issue', 'model:operator', 'model:activity-update']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  var record = this.subject();

  var serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
