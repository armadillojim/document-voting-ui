import React, { Component } from 'react';
import './Buttons.css';

const buttonLabels = [
  { vote: 'yes',   label: 'Yes, this is porn.' },
  { vote: 'no',    label: 'No, this is not porn.' },
  { vote: 'maybe', label: 'Maybe this is porn.' },
  { vote: 'skip',  label: 'Skip this item.' }
];

class Button extends Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    this.props.onButtonClick(this.props.vote);
  }

  render() {
    return (
      <button disabled={!this.props.active} onClick={this.handleButtonClick}>
        <span className="vote">{this.props.vote}</span>
        <span className="label">{this.props.label}</span>
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
      <div className="Buttons">
        {buttons}
      </div>
    );
  }
}

export default Buttons;
