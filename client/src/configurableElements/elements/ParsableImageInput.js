import React from 'react';
import PropTypes from 'prop-types';
import {processSVGContent}  from '../../SvgConverter';
import intersection from 'lodash/intersection';

export default class ParsableImageInput extends React.Component {
  static propTypes = {
    property: PropTypes.string,
    objectHolder: PropTypes.object,
    setEditingObjectProperty: PropTypes.func
  };

  static options = {acceptsProps: true};

  onChange = (e, overwrite) => {
    e.persist();
    const image = e.target.files[0];
    this.props.setEditingObjectProperty(this.props.property, image);
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        ...this.state,
        imgUrl: reader.result
      });
      if (image.type === 'image/svg+xml') {
        if (overwrite) {
          const r = new FileReader();
          r.onload = e => {
            const contents = e.target.result;
            const {graphicObject, newDom, colors} = processSVGContent(contents);
            const blob = new Blob([newDom], {type: 'application/octet-binary'});
            const file = new File([blob], image.name, {type: image.type});
            this.props.setEditingObjectProperty(this.props.property, file);
            this.props.setEditingObjectProperty(null, {...this.props.objectHolder, ...graphicObject});
            const foundColors = intersection(this.props.colors.map(c => c.value), colors);
            if (foundColors.length < colors.length) {
              this.props.addNotification('warning', 'Some of the colors from the selected image are not present' +
                ' in the color list.');
            }
          };
          r.readAsText(image);
        } else {
          this.props.addNotification('info', 'Some options might be parsed from the selected svg image',
            'Try parsing multicolor option and colorizable elements from the image?',
            15, f => this.onChange(e, true));
        }
      }
    };
    reader.readAsDataURL(image);
  };

  render() {
    return <input type='file'
                  className='form-control'
                  onChange={this.onChange}
                  accept='image/*'/>;
  }
}
