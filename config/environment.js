'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'tpp-dispatcher',
    environment: environment,
    rootURL: '/expedidor/',
    routerRootURL: '/expedidor/',
    locationType: 'auto',
    datastoreHost: 'https://api.tpp.pt',
    feedRegistryHost: 'https://tpp.pt/registo-de-feeds',
    // Valhalla
    valhallaHost: 'https://routing.tpp.pt/route',
    valhallaApiKey: 'valhalla-xwXfg5J',
    valhallaRateLimit: 600,
    // Thuderforest Maps
    thunderforestApiKey: 'GET_A_KEY@http://www.thunderforest.com/pricing/',
    mapboxApiKey: 'GET_A_KEY@https://www.mapbox.com/signup/',
    AUTH_TOKEN_LOCALSTORAGE_KEY: 'tpp-dispatcher-auth-token',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },
    moment: {
      includeLocales: ['pt']
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV['ember-toggle'] = {
    includedThemes: ['default', 'flip', 'light'],
    excludeBaseStyles: false,
    defaultShowLabels: true,
    defaultTheme: 'default',
    defaultSize: 'medium',
    defaultOffLabel: 'False',
    defaultOnLabel: 'True'
  };

  if (environment === 'development') {
    ENV.datastoreHost = 'https://api.tppgeo.cf';
  }

  if (environment === 'localhost') {
    ENV.datastoreHost = 'http://localhost:3000';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    // Fixes Assertion Failed: You cannot use the same root element (DIV) multiple times in an Ember.Application
    ENV.APP.autoboot = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    if (process.env['BUILD'] === 'staging') {
      // Production build for staging domain. Use BUILD=staging before ember build command
      ENV.datastoreHost = 'https://api.tppgeo.cf';
      ENV.feedRegistryHost = 'https://tppgeo.cf/registo-de-feeds';
      ENV.valhallaHost = 'https://routing.tppgeo.cf/route';
      ENV.valhallaApiKey = 'valhalla-tQaRSNc';
      ENV.thunderforestApiKey = 'GET_A_KEY@http://www.thunderforest.com/pricing/';
      ENV.mapboxApiKey = 'GET_A_KEY@https://www.mapbox.com/signup/';
      ENV.rootURL = '/expedidor/';
      ENV.routerRootURL = '/expedidor/';
      ENV.apiProxyKey = 'tpp-YFO6jk8';
    } else {
      // Production build for production domain.
      ENV.datastoreHost = 'https://api.tpp.pt';
      ENV.feedRegistryHost = 'https://tpp.pt/registo-de-feeds';
      ENV.valhallaHost = 'https://routing.tpp.pt/route';
      ENV.valhallaApiKey = 'valhalla-tQaRSNc';
      ENV.thunderforestApiKey = 'GET_A_KEY@http://www.thunderforest.com/pricing/';
      ENV.mapboxApiKey = 'GET_A_KEY@https://www.mapbox.com/signup/';
      ENV.rootURL = '/expedidor/';
      ENV.routerRootURL = '/expedidor/';
      ENV.apiProxyKey = 'tpp-Cc6l8Fk';
    }
  }

  // https://github.com/jpadilla/ember-simple-auth-token
  ENV['ember-simple-auth'] = {
    authenticationRoute: 'users.sign_in',
    routeAfterAuthentication: 'index',
    routeIfAlreadyAuthenticated: 'index'
  };

  ENV['ember-simple-auth-token'] = {
    serverTokenEndpoint: ENV.datastoreHost + '/v1/users/session',
    identificationField: 'email',
    passwordField: 'password',
    refreshAccessTokens: true,
    timeFactor: 1,
    refreshLeeway: 300 // Refresh the token 5 minutes (300s) before it expires.
  };

  return ENV;
};
