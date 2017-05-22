import React from 'react';
import PropTypes from 'prop-types';
import {NotificationMessages, NotificationTypes} from '../../strings';
import {processSVGContent}  from '../../SvgConverter';
import intersection from 'lodash/intersection';

/**
 * Image input which also parses an image with SVGConverter
 * so as to get colorizable elements and transform the image.
 */
export default class ParsableImageInput extends React.Component {
  static propTypes = {
    property: PropTypes.string,
    objectHolder: PropTypes.object,
    setEditingObjectProperty: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {url: ''};
  }

  static options = {acceptsProps: true};

  onChange = (e, overwrite) => {
    e.persist();
    const image = e.target.files[0];
    this.props.setEditingObjectProperty(this.props.property, image);
    const reader = new FileReader();
    reader.onloadend = event => {
      if (image.type === 'image/svg+xml') {
        if (overwrite) {
          const r = new FileReader();
          r.onload = ev => {
            const contents = ev.target.result;
            const {graphicObject, newDom, colors} = processSVGContent(contents);
            const blob = new Blob([newDom], {type: 'application/octet-binary'});
            const file = new File([blob], image.name, {type: image.type});
            this.props.setEditingObjectProperty(this.props.property, file);
            this.props.setEditingObjectProperty(null, {...this.props.objectHolder, ...graphicObject});
            const foundColors = intersection(this.props.colors.map(c => c.value), colors);
            if (foundColors.length < colors.length) {
              this.props.addNotification(NotificationTypes.WARN, NotificationMessages.SVG_COLORS_MISSED);
            }
          };
          r.readAsText(image);
        } else {
          this.props.addNotification(NotificationTypes.INFO, NotificationMessages.SVG_CAN_BE_PARSED,
            NotificationMessages.SVG_IF_PARSE, 15, f => this.onChange(e, true));
        }
      }
      this.setState({
        ...this.state, url: event.target.result
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
