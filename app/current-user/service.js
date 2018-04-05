import Service from '@ember/service';
import { isPresent } from '@ember/utils';
import { inject as service } from '@ember/service';
import { resolve } from 'rsvp';

export default Service.extend({
  session: service(),
  store: service(),
  user: null,

  load() {
    let userId = this.get('session.data.authenticated.user.id');
    if (isPresent(userId)) {
      return this.get('store').findRecord('user', userId).then((user) => {
        this.set('user', user);
      }).catch(() => {
        this.get('session').invalidate()
      });
    } else {
      return resolve();
    }
  }
});
