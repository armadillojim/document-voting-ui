import React, { Component } from 'react';
import Mousetrap from 'mousetrap';
import './Buttons.css';

const buttonLabels = [
  { btnClass: 'btn-danger',  vote: 'yes',   label: 'Yes, this is porn.' },
  { btnClass: 'btn-success', vote: 'no',    label: 'No, this is not porn.' },
  { btnClass: 'btn-warning', vote: 'maybe', label: 'Maybe this is porn.' },
  { btnClass: 'btn-default', vote: 'skip',  label: 'Skip this item.' }
];

class Button extends Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    this.props.onButtonClick(this.props.vote);
  }

  componentDidMount() {
    const voteCharacter = this.props.vote[0];
    Mousetrap.bind(voteCharacter, this.handleButtonClick);
  }

  componentWillUnmount() {
    const voteCharacter = this.props.vote[0];
    Mousetrap.unbind(voteCharacter, this.handleButtonClick);
  }

  render() {
    const btnClass = `btn ${this.props.btnClass} col-md-6`;
    return (
      <button disabled={!this.props.active} onClick={this.handleButtonClick} className={btnClass}>
        <span className="text-uppercase h2">{this.props.vote}</span>
        <span className="text-muted small">{this.props.label}</span>
      </button>
    )
  }
}

class Buttons extends Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(vote) {
    this.props.onButtonClick(vote);
  }

  render() {
    const buttons = buttonLabels.map(buttonLabel => (
      <Button key={buttonLabel.vote} {...buttonLabel} active={this.props.active} onButtonClick={this.handleButtonClick} />
    ));
    return (
      <div className="Buttons col-md-3">
        {buttons}
      </div>
    );
  }
}

export default Buttons;
