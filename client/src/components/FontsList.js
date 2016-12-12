import React, {Component} from 'react';

class FontsList extends Component {
  componentWillMount() {
    this.props.fetchFonts();
  }

  renderFonts(fonts) {
    return fonts.map((font) => {
      return (
        <li>
          {JSON.stringify(font)}
        </li>
      );
    });
  }

  render() {
    const {fonts, loading, error} = this.props.fontsList;

    if (loading) {
      return (<div className="container"><h1>Fonts</h1><h3>Loading...</h3></div>);
    } else if (error) {
      return (<div className="alert alert-danger">Error: {error.message}</div>);
    }

    return (
      <div className="container">
        <h1>Fonts</h1>
        <ul className="list-group">
          {this.renderFonts(fonts)}
        </ul>
      </div>
    );
  }
}


export default FontsList;
