import React from 'react';
import PropTypes from 'prop-types';
import {ImageSize} from '../../values';
import {dataUriToBlob} from '../../utils';

export default class ThumbResizeInput extends React.Component {
  static propTypes = {
    property: PropTypes.string,
    objectHolder: PropTypes.object,
    setEditingObjectProperty: PropTypes.func
  };

  static options = {acceptsProps: true};

  constructor(props) {
    super(props);

    this.state = {url: ''};
  }

  toDataUri = (img, width, height) => {
    if (!this.canvas) {
      return img;
    }
    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    this.canvas.width = width;
    this.canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
    return this.canvas.toDataURL();
  };

  onChange = e => {
    e.persist();
    const image = e.target.files[0];
    this.props.setEditingObjectProperty(this.props.property, image);
    if (image.type !== 'image/svg+xml') {
      const {width, height} = ImageSize.GRAPHIC_THUMB;
      const reader = new FileReader();
      reader.onload = e => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          this.setState({
            ...this.state, url: this.toDataUri(img, width, height)
          });
          const file = new File([dataUriToBlob(this.state.url)], image.name, {type: image.type});
          this.props.setEditingObjectProperty(this.props.property, file);
        };
      };
      reader.readAsDataURL(image);
    }
  };

  render() {
    return <div>
      <input type='file'
             className='form-control'
             onChange={this.onChange}
             accept='image/*'/>
      {this.state.url.length ? <img src={this.state.url} style={{marginTop: 4, height: 100}}/> : null}
      <canvas ref={c => this.canvas = c} hidden/>
    </div>;
  }
}
