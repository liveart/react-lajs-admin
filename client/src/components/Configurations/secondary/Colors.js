import React, {Component} from 'react';

export default class Colors extends Component {

  render() {
    const empty = '', colors = 'colors';

    return (
      <div className='panel panel-default'>
        <div className='panel-body'>
          <div className='form-group'>
            <div className='col-md-3'>
              <p>Url: </p>
            </div>
            <div className='col-md-9'>
              <input type='text' className='form-control'
                     value={this.props.colors ? this.props.colors.url : empty}
                     onChange={e => this.props.handleSelectedObjectChange(colors, {
                       ...this.props.colors,
                       url: e.target.value
                     })}/>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-md-3'>
              <p>Pantones Url: </p>
            </div>
            <div className='col-md-9'>
              <input type='text' className='form-control'
                     value={this.props.colors ? this.props.colors.pantones_url : empty}
                     onChange={e => this.props.handleSelectedObjectChange(colors, {
                       ...this.props.colors,
                       pantones_url: e.target.value
                     })}/>
            </div>
          </div>
        </div>
      </div>);
  }
}
