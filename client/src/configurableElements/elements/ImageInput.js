import React from 'react';
import PropTypes from 'prop-types';

export default class ImageInput extends React.Component {
  static propTypes = {
    setEditingObjectProperty: PropTypes.func
  };

  static options = {acceptsProps: true};

  constructor(props) {
    super(props);
    this.state = {url: ''};
  }

  onChange = e => {
    e.persist();
    const image = e.target.files[0];
    this.props.setEditingObjectProperty(this.props.property, image);
    const reader = new FileReader();
    reader.onload = e => {
      this.setState({
        ...this.state, url: e.target.result
      });
    };
    reader.readAsDataURL(image);
  };

  render() {
    return <div>
      <input type='file'
             className='form-control'
             onChange={this.onChange}
             accept='image/*'/>
      {this.state.url.length ? <img src={this.state.url} style={{marginTop: 4, height: 100}}/> : null}
    </div>;
  }
}
