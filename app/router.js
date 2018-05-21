import EmberRouter from '@ember/routing/router';
import ENV from 'tpp-dispatcher/config/environment';

const Router = EmberRouter.extend({
  location: ENV.locationType,
  rootURL: ENV.routerRootURL,
  scrollToTop: function() {
    window.scrollTo(0, 0);
  }.on('didTransition')
});

Router.map(function() {
  this.route('changesets', function() {
    this.route('show', { path: '/:changeset_id' });
    this.route('edit', { path: '/:changeset_id/edit' });
    this.route('new');
    this.route('change-payloads', { path: '/:changeset_id/change-payloads' }, function() {
      this.route('edit', { path: '/:change_payload_id/edit' });
    });
  });
  this.route('feeds', function() {
    this.route('show', { path: '/:feed_id' });
    this.route('bulk-add');
  });
  this.route('feed-versions', function () {
    this.route('show', { path: '/:feed_version_id' });
    this.route('upload');
  });
  this.route('feed-version-imports', function () {
    this.route('show', { path: '/:feed_version_import_id' });
  });
  this.route('operators', function() {
    this.route('show', { path: '/:operator_id' });
  });
  this.route('users', function() {
    this.route('show', { path: '/:user_id' });
    this.route('edit', { path: '/:user_id/edit' });
    this.route('new');
    this.route('sign_in');
  });
  this.route('issues', function() {
    this.route('route-geometry', function() {
      this.route('show', { path: '/:issue_id' });
    });
    this.route('new', { path: 'new/:feed_id' });
    this.route('show', { path: '/:issue_id' });
    this.route('feed-fetch', function() {
      this.route('show', { path: '/:issue_id' });
    });
    this.route('station-hierarchy', function() {
      this.route('show', { path: '/:issue_id' });
    });
  });
  this.route('stations');
  this.route('routingcheck');

  this.route('error', { path: "*path" });
});

export default Router;
