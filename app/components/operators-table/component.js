import Component from '@ember/component';
import ENV from 'tpp-dispatcher/config/environment';

export default Component.extend({
  feedRegistryHost: ENV.feedRegistryHost
});
