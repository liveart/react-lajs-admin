import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ColorizableRow from './ColorizableRow';

export default class ColorizableTable extends Component {
  static propTypes = {
    colorizables: PropTypes.arrayOf(PropTypes.any),
    nameInputHandler: PropTypes.func.isRequired,
    idInputHandler: PropTypes.func.isRequired,
    getColorizableValue: PropTypes.func.isRequired,
    colorizableOptions: PropTypes.func.isRequired,
    colorizableHandler: PropTypes.func.isRequired,
    deleteColorizableRow: PropTypes.func.isRequired,
    getColorgroupValue: PropTypes.func.isRequired,
    colorgroupOptions: PropTypes.arrayOf(PropTypes.any),
    colorgroupHandler: PropTypes.func.isRequired,
    colorgroupsLoading: PropTypes.bool,
    getColorValue: PropTypes.func.isRequired,
    colorOptions: PropTypes.arrayOf(PropTypes.any),
    colorHandler: PropTypes.func.isRequired,
    colorsLoading: PropTypes.bool,
    addColorizableRow: PropTypes.func.isRequired
  };

  render() {
    return <div className='panel panel-default'>
      <table className='table table-bordered'>
        <thead>
        <tr>
          <th>Name</th>
          <th>Id</th>
          <th>Colors</th>
          <th/>
        </tr>
        </thead>
        <tbody>
        {this.props.colorizables ?
          this.props.colorizables.map((c, key) =>
            <ColorizableRow key={key}
                            index={key}
                            item={c}
                            nameInputHandler={e => this.props.nameInputHandler(e, key)}
                            idInputHandler={e => this.props.idInputHandler(e, key)}
                            colorizableValue={this.props.getColorizableValue(key)}
                            colorizableHandler={o => this.props.colorizableHandler(o, key)}
                            deleteColorizableRow={() => this.props.deleteColorizableRow(key)}
                            colorgroupValue={this.props.getColorgroupValue(key)}
                            colorgroupHandler={o => this.props.colorgroupHandler(o, key)}
                            colorValue={this.props.getColorValue(key)}
                            colorHandler={o => this.props.colorHandler(o, key)}
                            colorizableOptions={this.props.colorizableOptions(key)}
                            colorOptions={this.props.colorOptions}
                            colorgroupOptions={this.props.colorgroupOptions}/>) : null}
        </tbody>
      </table>
      <div className='panel-footer'>
        <a className='btn btn-primary btn-xs' href='#' onClick={this.props.addColorizableRow}>
          <i className='fa fa-plus'/> Add element</a>
      </div>
    </div>;
  }
}
