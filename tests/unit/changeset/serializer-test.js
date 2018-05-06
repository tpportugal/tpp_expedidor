import { moduleForModel, test } from 'ember-qunit';

moduleForModel('changeset', 'Unit | Serializer | changeset', {
  // Specify the other units that are required for this test.
  needs: ['serializer:changeset', 'model:change-payload', 'model:user', 'model:feed', 'model:activity-update']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
