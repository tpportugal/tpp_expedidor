import { moduleForModel, test } from 'ember-qunit';

moduleForModel('feed-version', 'Unit | Serializer | feed version', {
  // Specify the other units that are required for this test.
  needs: ['serializer:feed-version', 'model:feed', 'model:feed-version-import','model:feed-version-info', 'model:changeset', 'model:issue']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  var record = this.subject();

  var serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
