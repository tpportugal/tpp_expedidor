import { moduleForModel, test } from 'ember-qunit';

moduleForModel('issue', 'Unit | Model | issue', {
  // Specify the other units that are required for this test.
  needs: ['service:issue-type-desc']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
