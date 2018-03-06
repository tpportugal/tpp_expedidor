import { helper } from '@ember/component/helper';

export function numberAsPips(params) {
  let selectedNumber = params[0];
  let totalNumber = params[1];
  let string = "";
  for (let i = 0; i < selectedNumber; i++) {
    string = string + "■";
  }
  for (let i = 0; i < (totalNumber - selectedNumber); i++) {
    string = string + "□";
  }
  return string;
}

export default helper(numberAsPips);
