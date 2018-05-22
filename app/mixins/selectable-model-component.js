import { notEmpty } from '@ember/object/computed';
import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import ObjectProxy from '@ember/object/proxy';

export default Mixin.create({
  getSelectableModels: function() {
    return this.get('models')
  },
  selectableModelDefault: true,
  selectableModels: computed(function () {
    let def = this.selectableModelDefault;
    return this.getSelectableModels().map(function (model) {
      return ObjectProxy.create({
        content: model,
        isSelected: def
      });
    });
  }),
  selectedModels: computed('selectableModels.@each.isSelected', function() {
    return this.get('selectableModels').filterBy('isSelected', true);
  }),
  anyModelsSelected: notEmpty('selectedModels'),
  allModelsSelected: computed('selectedModels.[]', function() {
    return (this.get('selectedModels.length') === this.get('models.length')) && (this.get('models.length') > 0);
  }),
  actions: {
    selectNone: function () {
      this.get("selectableModels").forEach(function (model) {
        model.set("isSelected", false);
      });
    },
    selectAll: function () {
      this.get("selectableModels").forEach(function (model) {
        model.set("isSelected", true);
      });
    }
  }
});
