import React, {Component} from 'react';

export default class Designs extends Component {

  render() {
    return (<div className='panel panel-default'>
      <div className='panel-body'>
        <div className='form-group'>
          <div className='col-md-3'>
            <p>Get Designs Url: </p>
          </div>
          <div className='col-md-9'>
            <input type='text' className='form-control'
                   value={this.props.getDesignsUrl}
                   onChange={e => this.props.handleSelectedObjectChange('getDesignsUrl', e.target.value)}/>
          </div>
        </div>
        <div className='form-group'>
          <div className='col-md-3'>
            <p>Save Design Url: </p>
          </div>
          <div className='col-md-9'>
            <input type='text' className='form-control'
                   value={this.props.saveDesignUrl}
                   onChange={e => this.props.handleSelectedObjectChange('saveDesignUrl', e.target.value)}/>
          </div>
        </div>
        <div className='form-group'>
          <div className='col-md-3'>
            <p>Load Design Url: </p>
          </div>
          <div className='col-md-9'>
            <input type='text' className='form-control'
                   value={this.props.loadDesignUrl}
                   onChange={e => this.props.handleSelectedObjectChange('loadDesignUrl', e.target.value)}/>
          </div>
        </div>
      </div>
    </div>);
  }
}
