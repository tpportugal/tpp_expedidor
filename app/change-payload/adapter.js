import { get } from '@ember/object';
import ApplicationAdapter from '../application/adapter';

export default ApplicationAdapter.extend({
  buildURL: function(type, id, snapshot) {
    return this.urlPrefix() + '/changesets/' + get(snapshot.record, 'changeset.id') + '/change_payloads/' + id;
  }
});
