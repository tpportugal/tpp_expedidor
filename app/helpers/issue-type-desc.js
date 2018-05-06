import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default Helper.extend({
  typeDescription: service('issue-type-desc'),
  compute(params) {
    return this.get('typeDescription').typeDescription(params[0]);
  }
});
