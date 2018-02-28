import React, { Component } from 'react';
import './Document.css';

class Document extends Component {
  render() {
    const data = this.props.document.files;
    const json = data ? JSON.stringify(data, null, 4) : null;
    return (
      <div className="Document col-md-9">
        <pre>{json}</pre>
      </div>
    );
  }
}

export default Document;
