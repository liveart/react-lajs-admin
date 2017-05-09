import React, {Component} from 'react';

export default class TextEffects extends Component {

  render() {
    return (
      <div className='panel panel-default'>
        <div className='panel-body'>
          <div className='form-group'>
            <div className='col-md-3'>
              <p>Config: </p>
            </div>
            <div className='col-md-9'>
              <input type='text' className='form-control'
                     value={this.props.textEffects ? this.props.textEffects.config : ''}
                     onChange={e => this.props.handleSelectedObjectChange('textEffects', {
                       ...this.props.textEffects,
                       config: e.target.value
                     })}/>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-md-3'>
              <p>Url: </p>
            </div>
            <div className='col-md-9'>
              <input type='text' className='form-control'
                     value={this.props.textEffects ? this.props.textEffects.url : ''}
                     onChange={e => this.props.handleSelectedObjectChange('textEffects', {
                       ...this.props.textEffects,
                       url: e.target.value
                     })}/>
            </div>
          </div>
        </div>
      </div>);
  }
}
