import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';

export default Mixin.create({
  per_page: '50',
  queryParams: [
    "offset",
    "per_page",
    "sort_key",
    "sort_order"
  ],
  offset: 0,
  hasPreviousPage: computed("offset", function() {
    return this.get("offset") > 0;
  }),
  hasNextPage: computed("model.meta.next", function() {
    if (isPresent(this.get('model.meta.next'))) {
      return true;
    } else {
      return false;
    }
  }),
  previousOffset: computed("offset", function() {
    let perPage = this.get("per_page");
    if (perPage !== '∞') {
      return Number(this.get("offset")) - Number(perPage);
    } else {
      return 0;
    }
  }),
  nextOffset: computed("offset", function() {
    let perPage = this.get("per_page");
    if (perPage !== '∞') {
      return Number(this.get("offset")) + Number(perPage);
    } else {
      return 0;
    }
  })
});
