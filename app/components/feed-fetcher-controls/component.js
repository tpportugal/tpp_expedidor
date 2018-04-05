import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';
import { get } from '@ember/object';

export default Component.extend({
  tagName: 'span',
  store: service(),
  buttonText: 'Buscar',
  actions: {
    fetchFeeds: function() {
      var adapter = this.get('store').adapterFor('feed');
      var url = adapter.urlPrefix() + '/webhooks/feed_fetcher';
      const flashMessages = get(this, 'flashMessages');
      var params = {};
      if (isPresent(this.get("feed"))) {
        params["data"] = {
          feed_onestop_id: this.get("feed.onestop_id")
        };
      } else if (isPresent(this.get("feeds"))) {
        params["data"] = {
          feed_onestop_id: this.get("feeds").mapBy("onestop_id").join(",")
        };
      }
      let self = this;
      adapter.ajax(url, 'post', params)
        .then( () => {
          flashMessages.add({
            message: `Iniciando busca de feed(s)!`,
            type: 'success',
            sticky: true
          });
        }).catch(function(error) {
          flashMessages.add({
            message: `Erro(s) ao buscar feed(s): ${error.message}`,
            type: 'danger',
            sticky: true
          });
        });
    }
  }
});
