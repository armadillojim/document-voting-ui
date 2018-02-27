import React, { Component } from 'react';
import './Status.css';

class StatusTable extends Component {
  render() {
    const total = this.props.statusData.total;
    const totalBreakdown = this.props.statusData.totalBreakdown;
    const resolvedBreakdown = this.props.statusData.resolvedBreakdown;
    return (
      <table>
        <thead>
          <tr>
            <th rowSpan="2">Total</th>
            <th colSpan="4">Total Breakdown</th>
            <th colSpan="2">Resolved Breakdown</th>
          </tr>
          <tr>
            <th>None</th>
            <th>One</th>
            <th>Ambiguous</th>
            <th>Resolved</th>
            <th>Unanimous</th>
            <th>Mixed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{total}</td>
            <td>{totalBreakdown.none}</td>
            <td>{totalBreakdown.one}</td>
            <td>{totalBreakdown.ambiguous}</td>
            <td>{totalBreakdown.resolved}</td>
            <td>{resolvedBreakdown.unanimous}</td>
            <td>{resolvedBreakdown.mixed}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

class StatusButton extends Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    this.props.onButtonClick();
  }

  render() {
    return (
      <button onClick={this.handleButtonClick}>
        Refresh Status
      </button>
    );
  }
}

class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      totalBreakdown: { none:0, one:0, ambiguous:0, resolved:0 },
      resolvedBreakdown: { unanimous:0, mixed:0 }
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    fetch('/api/status')
      .then(res => res.json())
      .then(data => { this.setState(data); })
      .catch(err => { console.error(err); });
  }

  render() {
    return (
      <div className="Status">
        <StatusButton onButtonClick={this.handleButtonClick} />
        <StatusTable statusData={this.state} />
      </div>
    );
  }
}

export default Status;
