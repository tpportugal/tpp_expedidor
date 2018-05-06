import Component from '@ember/component';

export default Component.extend({
  perPageOptions: [
    50,
    100,
    500,
    1000,
    '∞'
  ]
});
