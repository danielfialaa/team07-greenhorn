import React, { Component } from 'react';
import { LocaleProvider, DatePicker, message } from 'antd';
import { AddUserTemplate } from '../templates/AddUserTemplate';


export class AddUserPage extends Component {
  render() {
    return (
      <AddUserTemplate
        title="Create New User"
      />


    );
  }
}
