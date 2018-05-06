import { moduleForModel, test } from 'ember-qunit';

moduleForModel('issue', 'Unit | Serializer | issue', {
  // Specify the other units that are required for this test.
  needs: ['serializer:issue', 'service:issue-type-desc', 'model:entity-with-issue']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
