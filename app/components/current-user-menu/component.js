import Component from '@ember/component';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: 'ul',
  classNames: ['nav','navbar-nav','navbar-right'],
  session: service(),
  currentUser: service(),
  actions: {
    signOut() {
      const flashMessages = get(this, 'flashMessages');
      flashMessages.success("Sessão terminada.");
      this.get('session').invalidate();
    }
  }
});
