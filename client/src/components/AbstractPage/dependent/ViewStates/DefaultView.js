import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Table from './Table/index';
import DefaultButtonGroup from './ButtonGroups/DefaultButtonGroup';

export default class DefaultView extends Component {
  static propTypes = {
    onAddNewBtnClick: PropTypes.func.isRequired,
    onImportBtnClick: PropTypes.func.isRequired
  };

  render() {
    return <section className='content'>
      {this.props.customDefaultRender ?
        <div className='row'>
          {this.props.customDefaultRender}
        </div> : null}
      <div className='row'>
        <div className='col-md-6'>
          <p>{`${this.props.title} entries: ${this.props.data.length}`}</p>
        </div>
        <div className='col-md-6'>
          <DefaultButtonGroup title={this.props.title}
                              onAddNewBtnClick={this.props.onAddNewBtnClick}
                              onImportBtnClick={this.props.onImportBtnClick}
                              onResetFilterBtnClick={() => this.props.restoreTableState(this.props.objectSample)}
                              enableImportJson={this.props.enableImportJson}/>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          <Table {...this.props}/>
        </div>
      </div>
    </section>;
  }
}
