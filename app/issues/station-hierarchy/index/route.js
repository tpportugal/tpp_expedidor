import Route from '@ember/routing/route';
import IssuesRoute from 'tpp-dispatcher/mixins/issues-route';
import PaginatedSortableRoute from 'tpp-dispatcher/mixins/paginated-sortable-route';

export default Route.extend(IssuesRoute, PaginatedSortableRoute, {
  category: 'station_hierarchy'
});
