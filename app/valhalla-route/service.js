import { later } from '@ember/runloop';
import { throttle } from '@ember/runloop';
import Service from '@ember/service';
import $ from 'jquery';
import ENV from 'tpp-dispatcher/config/environment';

export default Service.extend({
  queue: [],
  rate_limit: ENV.valhallaRateLimit,
  api_key: ENV.valhallaApiKey,
  url: ENV.valhallaHost,
  url_lrm: "https://valhalla.github.io/demos/routing/index.html#",
  run() {
    var job = this.get('queue').shift();
    return $.getJSON(job.url).then(function(trip){
      job.success(trip);
    }, function(failure) {
      job.failure(failure);
    });
  },
  poll() {
    // Run the throttled function
    throttle(this, this.run, this.get('rate_limit'));
    // Return if no items left to process
    if (this.get('queue').length) {
      // Re-poll
      var self = this;
      later(function() {
        self.poll();
      }, this.get('rate_limit'));
    }
  },
  add(url, success, failure) {
    var job = {
      url: url,
      success: success,
      failure: failure
    }
    this.get('queue').push(job);
    this.poll();
    return job;
  },
  empty() {
    // console.log('empty queue');
    this.get('queue').setObjects([]);
  },
  // Get Valhalla Route
  get_url(params) {
    var api_key = this.get('api_key');
    var url = this.get('url');
    return url + "?" + $.param({json: JSON.stringify(params), api_key: api_key});
  },
  get_url_lrm(params) {
    return this.get('url_lrm') + $.param({
      loc: [params.locations[0].lat, params.locations[0].lon].join(','),
      locations: JSON.stringify(params.locations),
      costing: JSON.stringify(params.costing),
      costing_options: JSON.stringify(params.costing_options),
      datetime: JSON.stringify(params.date_time)
    });
  },
  route_params(origin_coords, destination_coords, departure_date_time) {
    return {
      locations: [
        {lon: origin_coords[0], lat: origin_coords[1], type: 'break'},
        {lon: destination_coords[0], lat: destination_coords[1], type: 'break'}
      ],
      costing: 'multimodal',
      costing_options: {
        transit: {
          use_bus: 0.3,
          use_rail: 0.6,
          use_transfers: 0.3
        }
      },
      date_time: {
        type: 1,
        value: departure_date_time.toISOString().slice(0,16)
      }
    };
  }
});
