import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Select, {Creatable} from 'react-select';

export default class ColorizableRow extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    nameInputHandler: PropTypes.func.isRequired,
    idInputHandler: PropTypes.func.isRequired,
    colorizableValue: PropTypes.object.isRequired,
    colorizableOptions: PropTypes.arrayOf(PropTypes.any),
    colorizableHandler: PropTypes.func.isRequired,
    deleteColorizableRow: PropTypes.func.isRequired,
    colorgroupValue: PropTypes.object.isRequired,
    colorgroupOptions: PropTypes.arrayOf(PropTypes.any),
    colorgroupHandler: PropTypes.func.isRequired,
    colorgroupsLoading: PropTypes.bool,
    colorValue: PropTypes.arrayOf(PropTypes.any).isRequired,
    colorOptions: PropTypes.arrayOf(PropTypes.any),
    colorHandler: PropTypes.func.isRequired,
    colorsLoading: PropTypes.bool
  };

  render() {
    const {item} = this.props;
    return <tr>
      <td className='col-md-4'>
        <input type='text' className='form-control'
               value={item.name}
               onChange={this.props.nameInputHandler}/>
      </td>
      <td className='col-md-4'>
        <input type='text' className='form-control'
               value={item.id}
               onChange={this.props.idInputHandler}/>
      </td>
      <td className='col-md-4'>
        <Select style={{marginBottom: 6}}
                value={this.props.colorizableValue}
                labelKey='name'
                options={this.props.colorizableOptions}
                onChange={this.props.colorizableHandler}
                clearable={false}
        />
        {!item.assignColorgroup ?
          <Creatable value={this.props.colorValue}
                     multi={true}
                     labelKey='name'
                     options={this.props.colorOptions}
                     onChange={this.props.colorHandler}
                     isLoading={this.props.colorsLoading}/> :
          <Select value={this.props.colorgroupValue}
                  labelKey='name'
                  options={this.props.colorgroupOptions}
                  onChange={this.props.colorgroupHandler}
                  isLoading={this.props.colorgroupsLoading}/>
        }
      </td>
      <td><a className='btn btn-danger btn-xs' href='#'
             onClick={this.props.deleteColorizableRow}>
        <i className='fa fa-ban'/></a></td>
    </tr>;
  }
}
