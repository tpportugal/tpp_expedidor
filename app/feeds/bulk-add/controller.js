import Controller from '@ember/controller';
import ENV from 'tpp-dispatcher/config/environment'

export default Controller.extend({
  feedRegistryHost: ENV.feedRegistryHost,
  inputUrls: null,
  outputResults: [],
  actions: {
    add() {
      let urls = this.get("inputUrls").split("\n");
      urls.forEach((url) => {
        if (url !== "") {
          this.store.query('feed', { "url": url }).then((response) => {
            let onestopId = "";
            if (response.meta.total == 1) {
              onestopId = response.get('firstObject.onestop_id');
            }
            this.get("outputResults").addObject({
              url: url,
              onestopId: onestopId
            });
          });
        }
      })
    },
    clear() {
      this.get("outputResults").clear();
    }
  },
});
