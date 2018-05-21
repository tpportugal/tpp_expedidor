import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import ENV from 'tpp-dispatcher/config/environment';

const App = Application.extend({
  modulePrefix: ENV.modulePrefix,
  podModulePrefix: ENV.podModulePrefix,
  Resolver
});

loadInitializers(App, ENV.modulePrefix);

export default App;
