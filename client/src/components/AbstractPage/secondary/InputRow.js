import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

export default class InputRow extends Component {
  static propTypes = {
    required: PropTypes.bool,
    title: PropTypes.string.isRequired,
    element: PropTypes.object.isRequired,
    hint: PropTypes.string,
    titleCol: PropTypes.number,
    elementCol: PropTypes.number
  };

  render() {
    const {required, title, element, hint, titleCol, elementCol} = this.props;

    return <div className='form-group'>
      <div className={'col-md-' + (titleCol || 2)}>
        <p className={required ? 'req' : ''}>
          {title}
          {hint ? <small>&nbsp;<i className='fa fa-question'
                                  data-tip={hint}/>
          </small> : null}
        </p>
        {hint ? <ReactTooltip effect='solid'/> : null}
      </div>
      <div className={'col-md-' + (elementCol || 10)}>
        {element}
      </div>
    </div>;
  }
}
