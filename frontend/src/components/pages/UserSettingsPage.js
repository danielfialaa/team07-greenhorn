import React, { Component } from 'react';
import { LocaleProvider, DatePicker, message } from 'antd';
import { UserSettingsTemplate } from '../templates/UserSettingsTemplate';

import api from '../../api';

export class UserSettingsPage extends Component {
  state = {
    userInfo: "",
  }

  componentDidMount(){
    api.get('currentUser')
    .then(({ response }) => {
      console.log(response);
      this.setState({
        userInfo: response
      });
				console.log(this.state.userInfo);
    })
  }

  render() {
    return (
      <UserSettingsTemplate userInfo = {this.state.userInfo}
        title="Edit profile"
      />
    );
  }
}
