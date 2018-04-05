import Mixin from '@ember/object/mixin';

export default Mixin.create({
  queryParams: {
    offset: {
      refreshModel: true
    },
    per_page: {
      refreshModel: true
    },
    sort_key: {
      refreshModel: true
    },
    sort_order: {
      refreshModel: true
    }
  }
});
