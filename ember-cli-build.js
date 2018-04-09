'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var prependUrl;
  // TODO: put assets on CloudFront CDN
  if (EmberApp.env() === 'staging') {
    prependUrl = '/expedidor/';
  } else if (EmberApp.env() === 'production') {
    prependUrl = '/expedidor/';
  }

  let app = new EmberApp(defaults, {
    minifyJS: {
      enabled: ['staging', 'production'].indexOf(EmberApp.env()) >= 0
    },
    minifyCSS: {
      enabled: ['staging', 'production'].indexOf(EmberApp.env()) >= 0
    },
    // http://ember-cli.com/user-guide/#source-maps
    sourcemaps: {
      enabled: EmberApp.env() !== 'production'
    },
    // https://github.com/aexmachina/ember-cli-sass#usage
    sassOptions: {
      sourceMap: EmberApp.env() !== 'production'
    },
    // http://ember-cli.com/user-guide/#fingerprinting-and-cdn-urls
    fingerprint: {
      enabled: ['staging', 'production'].indexOf(EmberApp.env()) >= 0,
      prepend: prependUrl
    },
    // https://www.npmjs.com/package/ember-cli-bootstrap-sassy#bootstrap-javascript
    'ember-cli-bootstrap-sassy': {
      'glyphicons': true
    },
    // https://github.com/martndemus/ember-cli-font-awesome#customize-with-sassscss
    'ember-font-awesome': {
      useScss: true,
      includeComponent: true
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  // import locale for bootstrap-datepicker
  app.import('node_modules/bootstrap-datepicker/js/locales/bootstrap-datepicker.pt.js');

  // import code and styles for JSON Editor
  // used by app/components/json-editor/component.js
  app.import('node_modules/jsoneditor/dist/jsoneditor.js');
  app.import('node_modules/jsoneditor/dist/jsoneditor.css');
  app.import('node_modules/jsoneditor/dist/img/jsoneditor-icons.svg', {
    destDir: 'assets/img'
  });

  return app.toTree();
};
