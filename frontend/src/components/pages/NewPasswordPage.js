import React, { Component } from 'react';
import { NewPasswordTemplate } from '../templates/NewPasswordTemplate';

export class NewPasswordPage extends Component {
  render() {
    return <NewPasswordTemplate link={this.props.match.params.link} />;
  }
}
