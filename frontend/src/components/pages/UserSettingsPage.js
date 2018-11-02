import React, { Component } from 'react';
import { LocaleProvider, DatePicker, message } from 'antd';
import { UserSettingsTemplate } from '../templates/UserSettingsTemplate';


export class UserSettingsPage extends Component {
  render() {
    return (
      <UserSettingsTemplate
        title="Edit profile"
      />
    );
  }
}
