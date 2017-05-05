import forEach from 'lodash/forEach';
import includes from 'lodash/includes';
import keys from 'lodash/keys';

export default class Polygon {
  constructor(data, sample, holder, comparators) {
    this.data = data;
    this.sample = sample;
    this.holder = holder;
    this.comparators = comparators;
  }

  sortRows = () => {
    const rows = [];

    forEach(this.data, d => {
      let add = true;
      keys(this.sample).forEach(key => {
        if (!add) {
          return;
        }
        if (this.sample[key].showInTable === false) {
          add = true;
        } else if (typeof this.holder[key] !== 'object') {
          if (typeof d[key] === 'undefined') {
            add = this.holder[key] === '';
          } else if (typeof d[key] === 'boolean') {
            add = true;
          } else if (this.comparators && this.comparators.hasOwnProperty(key)) {
            add = this.comparators[key](String(d[key]),
              String(this.holder[key]));
          } else if (!includes(d[key], this.holder[key])) {
            add = false;
          }
        }
      });

      if (add) {
        rows.push(d);
      }
    });
    return rows;
  };
}
