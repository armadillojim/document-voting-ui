import React, { Component } from 'react';
import './DocumentTable.css';

class DocumentTableRow extends Component {
  render() {
    const id = this.props._id;
    const snippet = JSON.stringify(this.props.files);
    const vote = this.props.vote;
    const status = this.props.status ? 'success' : 'danger';
    return (
      <tr>
        <td className="id">{id}</td>
        <td className="snippet">{snippet}</td>
        <td className="vote">{vote}</td>
        <td className={`status ${status}`}></td>
      </tr>
    );
  }
}

class DocumentTable extends Component {
  constructor(props) {
    super(props);
    this.state = { documents: [] };
  }

  pushDocument(document, vote, status) {
    document.vote = vote;
    document.status = status;
    this.setState(prevState => {
      const documents = prevState.documents;
      documents.unshift(document);
      return { documents: documents.slice(0, this.props.length) };
    })
  }

  render() {
    const rows = this.state.documents.map(document => (
      <DocumentTableRow key={document._id} {...document} />
    ));
    return (
      <div className="DocumentTable table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Snippet</th>
              <th>Vote</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DocumentTable;
