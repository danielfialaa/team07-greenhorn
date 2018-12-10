import React, { Component } from 'react';
import { LocaleProvider, DatePicker, message } from 'antd';
import { UserSettingsTemplate } from '../templates/UserSettingsTemplate';
import { connect } from 'react-redux';

import api from '../../api';

export class UserSettingsPage extends Component {
  state = {
    isLoading: true,
    userInfo: '',
  };

  componentDidMount() {
    api.get('currentUser').then(({ data }) => {
      this.setState(() => ({
        userInfo: data.response[0],
        isLoading: false,
      }));
    });
  }

  render() {
    return (
      <UserSettingsTemplate
        isLoading={this.state.isLoading}
        userInfo={this.state.userInfo}
        title="EDIT PROFILE"
      />
    );
  }
}
