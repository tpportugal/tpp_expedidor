import Route from '@ember/routing/route';
import PaginatedSortableRoute from 'tpp-dispatcher/mixins/paginated-sortable-route';
import FeedParamsRoute from 'tpp-dispatcher/mixins/feed-params-route';

export default Route.extend(FeedParamsRoute, PaginatedSortableRoute, {
  model: function(params) {
    return this.store.query('feed', params);
  }
});
