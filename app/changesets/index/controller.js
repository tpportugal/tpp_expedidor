import Controller from '@ember/controller';
import PaginatedSortableController from 'tpp-dispatcher/mixins/paginated-sortable-controller';

export default Controller.extend(PaginatedSortableController, {
  applied: false,
  sort_key: 'updated_at',
  sort_order: 'desc'
});
