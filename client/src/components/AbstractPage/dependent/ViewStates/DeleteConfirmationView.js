import React, {Component} from 'react';

export default class DeleteConfirmationView extends Component {
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
                  {typeof this.props.renderDeleteConfirmationDialog === 'object' ?
                    this.props.renderDeleteConfirmationDialog : null}
                </div>
                <div className='box-footer'>
                  {typeof this.props.renderDeleteConfirmationButtons === 'object' ?
                    this.props.renderDeleteConfirmationButtons : null}
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </section>;
  }
}
