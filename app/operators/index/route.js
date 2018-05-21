import $ from 'jquery';
import { hash } from 'rsvp'
import Route from '@ember/routing/route';
import PaginatedSortableRoute from 'tpp-dispatcher/mixins/paginated-sortable-route';
import ENV from 'tpp-dispatcher/config/environment';

export default Route.extend(PaginatedSortableRoute, {
  queryParams: {
    tag_key: {
      refreshModel: true
    },
    tag_value: {
      refreshModel: true
    },
    country: {
      refreshModel: true
    },
    state: {
      refreshModel: true
    },
    metro: {
      refreshModel: true
    },
    without_feed: {
      refreshModel: true
    }
  },
  model: function(params) {
    let geographies = $.get(ENV.datastoreHost + '/v1/operators/aggregate').then(function(response) {
        return {
          countries: Object.keys(response.country),
          states: Object.keys(response.state),
          metros: Object.keys(response.metro),
        }
      });
    let operators = this.store.query('operator', params);
    return hash({
      geographies: geographies,
      operators: operators
    });
  }
});
