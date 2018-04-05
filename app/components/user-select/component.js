import Component from '@ember/component';

export default Component.extend({
  userMatcher(user, term) {
    return (user.get('name') + ' ' + user.get('email')).indexOf(term);
  }
});
