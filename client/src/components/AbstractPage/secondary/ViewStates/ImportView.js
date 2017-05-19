import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImportButtonGroup from '../ButtonGroups/ImportButtonGroup';
import {IMPORT_URL_INFO} from '../../../../strings';
const LEAVE_URL_OPTION = 'Import';
const KEEP_URL_OPTION = 'Keep';

/**
 * The component renders view for the json import.
 */
export default class ImportView extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    handleFileSelection: PropTypes.func.isRequired,
    updateObject: PropTypes.func.isRequired,
    onCancelBtnClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {baseUrl: '', urlOption: LEAVE_URL_OPTION};
  }

  render() {
    return <section>
      <div className='row'>
        <div className='col-md-12'>
          <section className='content'>
            <div className='box box-info'>
              <div className='box-header with-border'>
                <h3 className='box-title'>{`${this.props.title} information`}</h3>
              </div>
              <form className='form-horizontal'>
                <div className='box-body'>
                  <div className='form-group'>
                    <div className='col-md-3'>
                      <p>Import from file</p>
                    </div>
                    <div className='col-md-9'>
                      <input type='file' className='form-control' accept='.json'
                             onChange={this.props.handleFileSelection}/>
                    </div>
                  </div>
                  <div className='form-group'>
                    <div className='col-md-3'>
                      <select className='form-control'
                              onChange={e => this.setState({...this.state, urlOption: e.target.value})}
                              value={this.state.urlOption}>
                        <option value={LEAVE_URL_OPTION}>Leave URL's as is</option>
                        <option value={KEEP_URL_OPTION}>Keep original URL's</option>
                      </select>
                    </div>
                    <div className='col-md-9'>
                      {this.state.urlOption === LEAVE_URL_OPTION ?
                        <input disabled type='text' className='form-control'
                               value=''/> :
                        <input type='text' className='form-control'
                               placeholder={IMPORT_URL_INFO}
                               value={this.state.baseUrl}
                               onChange={e => this.setState({...this.state, baseUrl: e.target.value})}/>}
                    </div>
                  </div>
                  <textarea className='form-control' style={{marginBottom: 6}} rows={15}
                            value={this.props.json}
                            onChange={e => this.props.changeJsonValue(e.target.value)}/>
                </div>
                <div className='box-footer'>
                  <ImportButtonGroup {...this.props} {...this.state}/>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </section>;
  }
}
