import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  feed: DS.belongsTo('feed', { async: true }),
  active_for_feed: DS.hasMany('feed', { async: true, inverse: 'active_feed_version' }),
  feed_version_imports: DS.hasMany('feed-version-import', { async: true }),
  feed_version_infos: DS.hasMany('feed-version-infos', { async: true }),
  changesets_imported_from_this_feed_version: DS.hasMany('changeset', { async: true, inverse: 'imported_from_feed_version' }),
  issues: DS.hasMany('issue', { async: true }),

  md5: DS.attr('string'),
  earliest_calendar_date: DS.attr('date'),
  latest_calendar_date: DS.attr('date'),
  tags: DS.attr(),
  fetched_at: DS.attr('date'),
  imported_at: DS.attr('date'),
  import_level: DS.attr('number'),
  import_status: DS.attr('string'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
  is_active_feed_version: DS.attr('boolean'),
  url: DS.attr('string'),
  download_url: DS.attr('string'),
  feedvalidator_url: DS.attr('string'),

  sha1: computed.alias('id'),
  import_level_at_least_level_one: computed.gte('import_level', 1),
  import_level_is_level_two: computed.equal('import_level', 2),
  import_level_at_least_level_two: computed.gte('import_level', 2),
  import_level_at_least_level_three: computed.gte('import_level', 3),
  import_level_at_least_level_four: computed.gte('import_level', 4),

  short_sha1: computed('sha1', function() {
    return this.id.slice(0,8) + "…";
  }),

  enqueue: function(import_level) {
    var adapter = this.get('store').adapterFor('feed');
    var url = adapter.urlPrefix() + '/webhooks/feed_eater';
    return adapter.ajax(url, 'post', {
      data: {
        feed_onestop_id: this.get('feed.onestop_id'),
        feed_version_sha1: this.get('sha1'),
        import_level: import_level
      }
    });
  }
});
