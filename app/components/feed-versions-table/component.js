import Component from '@ember/component';
import SelectableModelComponent from 'tpp-dispatcher/mixins/selectable-model-component';
import { inject as service } from '@ember/service';

export default Component.extend(SelectableModelComponent, {
  session: service(),
  classNames: ['table-responsive'],
  sortKey: null,
  getSelectableModels: function() {
    return this.get('models')
  },
  actions: {
  }
});
