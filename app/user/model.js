import DS from 'ember-data';

export default DS.Model.extend({
  changesets: DS.hasMany('changeset', { async: true }),

  email: DS.attr('string'),
  name: DS.attr('string'),
  affiliation: DS.attr('string'),
  user_type: DS.attr('string'),
  admin: DS.attr('boolean'),
  password: DS.attr('string'),
  password_confirmation: DS.attr('string')
});
