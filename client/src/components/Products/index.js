import React, {Component} from 'react';
import {PTypes} from './PropTypes';
import View from './View';
import * as helpers from '../Graphics/helpers';
import {STATUS_EDITING, STATUS_CREATING, STATUS_DEFAULT, SIZES} from '../../definitions';
import {NotificationTypes, NotificationMessages} from '../../strings';
import map from 'lodash/map';
import forEach from 'lodash/forEach';
import forOwn from 'lodash/forOwn';
import findIndex from 'lodash/findIndex';
import {getFileUrl} from '../../utils';
import '../../../public/assets/css/cropper.css';
import * as ProductModel from '../../../../common/models/product.json';
const Location = ProductModel.properties.locations.type[0];

export default class ProductsComponent extends Component {
  static propTypes = PTypes;

  constructor(props) {
    super(props);
    this.state = {newColorizables: [], newColors: [], imgUrl: '', mainImgUrl: '', location: -1};
  }

  componentWillMount() {
    this.props.fetchProductsCategories();
  }

  componentWillReceiveProps(props) {
    if (this.props.status === STATUS_DEFAULT && (props.status === STATUS_CREATING || props.status === STATUS_EDITING)) {
      this.props.fetchColors();
      this.props.fetchColorgroups();
      if (this.state.location > -1) {
        this.setState({
          ...this.state, location: -1
        });
      }
    }
  }

  handleSelectedObjectArrayChange = (arrName, ind, propName, event) => {
    const arr = this.props.objectHolder[arrName];
    (arr[ind])[propName] = event.target.value;
    this.props.setEditingObjectProperty(arrName, [...arr]);
  };

  handleSelectedObjectArrayAddNew = (arrName, obj) => {
    let arr = this.props.objectHolder[arrName];
    if (typeof arr !== 'object') {
      arr = [];
    }
    arr[arr.length] = {...obj};
    this.props.setEditingObjectProperty(arrName, [...arr]);
  };

  handleSelectedObjectArrayDeleteElement = (arrName, key) => {
    const arr = this.props.objectHolder[arrName];
    arr.splice(key, 1);
    this.props.setEditingObjectProperty(arrName, [...arr]);
  };

  handleSelectedObjectArrayArrayAddNew = (fArr, sArr, colorizableKey, obj) => {
    let arr = (this.props.objectHolder[fArr]);
    if (typeof (arr[colorizableKey])[sArr] !== 'object') {
      (arr[colorizableKey])[sArr] = [];
    }
    ((arr[colorizableKey])[sArr])[(arr[colorizableKey])[sArr].length] = {...obj};
    this.props.setEditingObjectProperty(fArr, [...arr]);
  };

  handleSelectedObjectAddNewArray = (fArr, sArr, key, obj) => {
    let arr = (this.props.objectHolder[fArr]);
    if (typeof (arr[key])[sArr] !== 'object') {
      (arr[key])[sArr] = [];
    }
    ((arr[key])[sArr])[(arr[key])[sArr].length] = [...obj];
    this.props.setEditingObjectProperty(fArr, [...arr]);
  };

  handleSelectedObjectArrayArrayDeleteElement = (fArr, sArr, colorizableKey, key) => {
    const arr = (this.props.objectHolder[fArr]);
    ((arr[colorizableKey])[sArr]).splice(key, 1);
    this.props.setEditingObjectProperty(fArr, [...arr]);
  };

  handleSelectedObjectArrayArrayChange = (fArrName, sArrName, fInd, sInd, propName, event) => {
    const colorizables = this.props.objectHolder[fArrName];
    if (propName === 'image') {
      colorizables[fInd][sArrName][sInd][propName] = event.target.files[0];
    } else if (sArrName === 'editableAreaUnitsRange') {
      colorizables[fInd][sArrName][sInd][propName] = Number(event.target.value);
    } else {
      colorizables[fInd][sArrName][sInd][propName] = event.target.value;
    }
    this.props.setEditingObjectProperty(fArrName, [...colorizables]);
  };

  handleSelectedObjectChange = (propertyName, event) => {
    this.props.setEditingObjectProperty(propertyName, event.target.value);
  };

  handleSelectedObjectDataChange = (prop, propertyName, event) => {
    const object = this.props.objectHolder[prop];
    object[propertyName] = event.target.value;
    this.props.setEditingObjectProperty(prop, object);
  };

  updateObjectData = (prop, propertyName, value) => {
    const object = {...this.props.objectHolder[prop]};
    object[propertyName] = value;
    this.props.setEditingObjectProperty(prop, {...object});
  };


  onColorsSelectChange = (val, key) => {
    const arr = this.props.objectHolder.colors;
    if (val) {
      arr[key].name = val.name;
      arr[key].value = val.value;
      this.props.setEditingObjectProperty('colors', [...arr]);
    }
  };

  handleColorLocationActionOption = (option, key, k) => {
    let colors = this.props.objectHolder.colors;
    colors[key].location[k].name = option.value;
    this.props.setEditingObjectProperty('colors', colors);
  };

  addColorsRow = () => (
    this.handleSelectedObjectArrayAddNew('colors', {name: '', value: '', location: []})
  );

  deleteColorsRow = key => (
    this.handleSelectedObjectArrayDeleteElement('colors', key)
  );

  addEditableAreaSizeRow = () => (
    this.handleSelectedObjectArrayAddNew('editableAreaSizes',)
  );

  deleteEditableAreaSizeRow = key => (
    this.handleSelectedObjectArrayDeleteElement('editableAreaSizes', key)
  );

  addLocationRow = colorId => (
    this.handleSelectedObjectArrayArrayAddNew('colors', 'location', colorId, {name: '', image: ''})
  );

  deleteLocationRow = (colorId, key) => (
    this.handleSelectedObjectArrayArrayDeleteElement('colors', 'location', colorId, key)
  );

  getSizeOptions = () => {
    if (!SIZES || !SIZES.length) {
      return [];
    }
    return map(SIZES, col => ({value: col, name: col}));
  };

  getSelectedSizeOptions = () => {
    if (!this.props.objectHolder.sizes || !this.props.objectHolder.sizes.length) {
      return [];
    }

    if (typeof (this.props.objectHolder.sizes)[0] === 'string') {
      return map(this.props.objectHolder.sizes, col => ({value: col, name: col}));
    }

    return this.props.objectHolder.sizes;
  };

  onSizeSelectChange = val => {
    const arr = [];
    if (val) {
      forEach(val, v => arr.push(v.name));
      this.props.setEditingObjectProperty('sizes', arr);
    }
  };

  createCustomOption = customOptionInput => {
    if (!customOptionInput || !customOptionInput.value || !customOptionInput.value.length) {
      this.props.addNotification(NotificationTypes.ERR, NotificationMessages.INCORRECT_PROPERTY_NAME);
      return;
    }
    let data = {...this.props.objectHolder.data};
    data[customOptionInput.value] = '';
    customOptionInput.value = '';
    this.props.setEditingObjectProperty('data', data);
  };

  removeCustomOption = (prop, accepted) => {
    if (!accepted) {
      this.props.addNotification(NotificationTypes.INFO, NotificationMessages.ARE_YOU_SURE,
        `Option ${prop} will be deleted.`,
        15, f => this.removeCustomOption(prop, true));
      return;
    }
    let data = this.props.objectHolder.data;
    delete data[prop];
    this.props.setEditingObjectProperty('data', {...data});
  };

  getLocationsInputValue = propertyName => {
    if (this.state.location < 0 || !this.props.objectHolder.locations ||
      !this.props.objectHolder.locations.length) {
      return '';
    }
    return ((this.props.objectHolder.locations)[this.state.location])[propertyName];
  };

  getImageUrl = image => {
    if (!image) {
      return;
    }
    if (typeof image === 'string') {
      return getFileUrl(image);
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        ...this.state,
        mainImgUrl: reader.result
      });
    };
    reader.readAsDataURL(image);
    return this.state.mainImgUrl;
  };

  deleteCurrentLocation = () => {
    const locs = this.props.objectHolder.locations;
    locs.splice(this.state.location, 1);
    this.props.setEditingObjectProperty('locations', [...locs]);
    this.setState({
      ...this.state, location: -1
    });
  };

  addUnitsRangeRow = key => (
    this.handleSelectedObjectAddNewArray('locations', 'editableAreaUnitsRange', key, [])
  );

  deleteUnitsRangeRow = (locationId, key) =>
    helpers.updateArray(
      helpers.deleteFromDblNestedArray(this.props.objectHolder, 'locations',
        'editableAreaUnitsRange', locationId, key));

  handleLocationsNestedFileChoose = (prop, e) => {
    const locs = [...this.props.objectHolder.locations];
    (locs[this.state.location])[prop] = e.target.files[0];
    this.props.setEditingObjectProperty('locations', locs);
  };

  changeNestedHolderArrValue = (topArrPropName, topInd, changingArrPropName, changingArrInd, value) => {
    const topArr = [...this.props.objectHolder[topArrPropName]];
    ((topArr[topInd])[changingArrPropName])[changingArrInd] = value;
    this.props.setEditingObjectProperty(topArrPropName, [...topArr]);
  };

  changeLocationsNestedArrValue = (changingArrPropName, changingArrInd, value) =>
    this.changeNestedHolderArrValue('locations', this.state.location, changingArrPropName, changingArrInd, value);

  changeNestedHolderValue = (topArrPropName, topInd, changingPropName, value) => {
    const topArr = this.props.objectHolder[topArrPropName];
    ((topArr[topInd])[changingPropName]) = value;
    this.props.setEditingObjectProperty(topArrPropName, [...topArr]);
  };

  changeLocationsNestedHolderValue = (changingPropName, value) =>
    this.changeNestedHolderValue('locations', this.state.location, changingPropName, value);

  crop = cropper => {
    if (!cropper) {
      return;
    }
    const data = cropper.getData();
    forOwn(data, (value, key) => {
      if (value === '-0.00') {
        data[key] = '0.00';
      }
    });
    this.changeLocationsNestedArrValue('editableArea', 0, Number(data.x.toFixed(2)));
    this.changeLocationsNestedArrValue('editableArea', 1, Number(data.y.toFixed(2)));
    this.changeLocationsNestedArrValue('editableArea', 2, Number((data.width + data.x).toFixed(2)));
    this.changeLocationsNestedArrValue('editableArea', 3, Number((data.height + data.y).toFixed(2)));
  };

  handleNewOption = val => {
    let obj = {};
    forEach(Object.getOwnPropertyNames(Location), p => {
      if (Location[p] && (Location[p].type === 'array' || Array.isArray(Location[p].type))) {
        obj[p] = [];
      } else {
        if (Location[p] && typeof Location[p].default === 'boolean') {
          obj[p] = Location[p].default;
        } else {
          obj[p] = '';
        }
      }
    });
    this.props.setEditingObjectProperty('locations', [...this.props.objectHolder.locations,
      {...obj, name: val.name}]);
    this.setState({
      ...this.state, location: findIndex(this.props.objectHolder.locations,
        loc => loc.name === val.name)
    });
  };

  handleOptionChange = val => {
    if (!val) {
      this.setState({
        ...this.state, location: -1
      });
      return;
    }
    this.setState({
      ...this.state, location: findIndex(this.props.objectHolder.locations,
        loc => loc.name === val.name)
    });
  };

  handleNewLocation = () => {
    const val = 'New location';
    let obj = {};
    forEach(Object.getOwnPropertyNames(Location), p => {
      if (Location[p] && (Location[p].type === 'array' || Array.isArray(Location[p].type))) {
        obj[p] = [];
      } else {
        if (Location[p] && typeof Location[p].default === 'boolean') {
          obj[p] = Location[p].default;
        } else {
          obj[p] = '';
        }
      }
    });
    this.props.setEditingObjectProperty('locations', [...this.props.objectHolder.locations,
      {...obj, name: val}]);
    this.setState({
      ...this.state, location: findIndex(this.props.locations,
        loc => loc.name === val)
    });
  };

  render() {
    return (
      <View {...this.props} {...this.state} {...this} {...helpers}
      />
    );
  }
}
