import React, {Component, PropTypes} from 'react';

export default class InfoWidget extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    iconClass: PropTypes.string.isRequired
  };

  render() {
    return (
      <div className="info-box">
        <span className="info-box-icon bg-red"><i className={this.props.iconClass}/></span>
        <div className="info-box-content">
          <span className="info-box-text">{this.props.title}</span>
          <span className="info-box-number">{this.props.number}</span>
        </div>
      </div>
    );
  }
}
