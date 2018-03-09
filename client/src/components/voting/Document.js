import React, { Component } from 'react';
import Mousetrap from 'mousetrap';
import './Document.css';

const translationServiceUrls = {
  bing: 'https://www.bing.com/translator/?to=en&text=',
  google: 'https://translate.google.com/#auto/en/',
  yandex: 'https://translate.yandex.com/?lang=en&text=',
};

class Document extends Component {
  constructor(props) {
    super(props);
    this.handleTranslationClick = this.handleTranslationClick.bind(this);
  }

  handleTranslationClick() {
    const query = encodeURIComponent(this.formatDocument());
    const baseUrl = translationServiceUrls[process.env.REACT_APP_TRANSLATION_SERVICE];
    const url = baseUrl + query;
    if (this.translationWindow && !this.translationWindow.closed) {
      this.translationWindow.location = url;
      this.translationWindow.focus()
    }
    else {
      this.translationWindow = window.open(url, '_blank');
    }
  }

  componentDidMount() {
    Mousetrap.bind('ctrl+t', this.handleTranslationClick);
  }

  componentWillUnmount() {
    Mousetrap.unbind('ctrl+t', this.handleTranslationClick);
    if (this.translationWindow && !this.translationWindow.closed) {
      this.translationWindow.close();
    }
  }

  formatDocument() {
    const fileObjects = this.props.document.files;
    const fileNames = fileObjects ? fileObjects.map(metadata => metadata.path) : [];
    const json = fileNames ? JSON.stringify(fileNames, null, 4) : null;
    return json;
  }

  render() {
    return (
      <div className="Document col-md-9">
        <pre>{this.formatDocument()}</pre>
        <button onClick={this.handleTranslationClick} className="btn">T</button>
      </div>
    );
  }
}

export default Document;
