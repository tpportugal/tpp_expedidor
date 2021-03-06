import Route from '@ember/routing/route';
import { get } from '@ember/object';

export default Route.extend({
  model: function(params) {
    return this.store.find('changeset', params['changeset_id']);
  },
  actions: {
    apply: function() {
      const flashMessages = get(this, 'flashMessages');
      var self = this;
      var changeset = self.currentModel;
      changeset.apply().then(() => {
        flashMessages.add({
          message: `Changeset aplicado!`,
          type: 'success',
          sticky: true
        });
        changeset.reload();
      }).catch((error) => {
        flashMessages.add({
          message: `Erro(s) ao aplicar changeset: ${error.message}`,
          type: 'danger',
          sticky: true
        });
      });
    }
  }
});
