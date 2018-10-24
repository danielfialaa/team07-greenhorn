import React, { Component } from 'react';
import { LocaleProvider, DatePicker, message } from 'antd';
import { NewPasswordTemplate } from '../templates/NewPasswordTemplate';


export class NewPasswordPage extends Component {
  render() {
    return (
      <NewPasswordTemplate
        title="GreenHornn"
      />


    );
  }
}
