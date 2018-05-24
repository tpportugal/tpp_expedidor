import Controller from '@ember/controller';
import ENV from 'tpp-dispatcher/config/environment';

export default Controller.extend({
  feedRegistryHost: ENV.feedRegistryHost
});
