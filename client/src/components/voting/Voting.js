import React, { Component } from 'react';
import './Voting.css';

import Buttons from './Buttons';
import Document from './Document';
import DocumentTable from './DocumentTable';

class Voting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDocument: false
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  checkResponse(res) {
    if (!res.ok) { throw res; }
    return res.json();
  }

  getDocument() {
    fetch('/api/document')
      .then(this.checkResponse)
      .then(data => { this.setState({ currentDocument: data }); })
      .catch(err => { this.setState({ currentDocument: false }); console.error(err); });
  }

  voteDocument(vote) {
    const currentDocument = this.state.currentDocument;
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vote)
    }
    fetch('/api/document/' + currentDocument._id, options)
      .then(this.checkResponse)
      .then(data => { this.documentTable.pushDocument(currentDocument, vote, true); })
      .catch(err => { this.documentTable.pushDocument(currentDocument, vote, false); console.error(err); });
  }

  handleButtonClick(vote) {
    if (vote !== 'skip') { this.voteDocument(vote); }
    this.getDocument();
  }

  componentDidMount() {
    this.getDocument();
  }

  render() {
    return (
      <div className="Voting">
        <Buttons active={!!this.state.currentDocument} onButtonClick={this.handleButtonClick} />
        <Document document={this.state.currentDocument} />
        <DocumentTable length={10} ref={ table => this.documentTable = table } />
      </div>
    );
  }
}

export default Voting;
