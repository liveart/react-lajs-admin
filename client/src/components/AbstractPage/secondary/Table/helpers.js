import forEach from 'lodash/forEach';
import includes from 'lodash/includes';
import keys from 'lodash/keys';

export function sortRows(data, sample, holder, comparators) {
  const rows = [];
  forEach(data, d => {
    let add = true;
    keys(sample).forEach(key => {
      if (!add) {
        return;
      }
      if (sample[key].showInTable === false) {
        add = true;
      } else if (typeof holder[key] !== 'object') {
        if (typeof d[key] === 'undefined') {
          add = holder[key] === '';
        } else if (typeof d[key] === 'boolean') {
          add = true;
        } else if (comparators && comparators.hasOwnProperty(key)) {
          add = comparators[key](String(d[key]), String(holder[key]));
        } else if (!includes(d[key], holder[key])) {
          add = false;
        }
      }
    });

    if (add) {
      rows.push(d);
    }
  });
  return rows;
}
