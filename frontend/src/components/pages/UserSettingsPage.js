import React, { Component } from 'react';
import { LocaleProvider, DatePicker, message } from 'antd';
import { UserSettingsTemplate } from '../templates/UserSettingsTemplate';
import { connect } from 'react-redux';

import api from '../../api';

export class UserSettingsPage extends Component {
  state = {
    userInfo: "",
  }

  componentDidMount(){
    api.get('currentUser')
    .then(({ data }) => {
      console.log("current user");
      this.setState(() => ({
          userInfo: data.response[0]
      }));
				console.log(this.state.userInfo);
    })
  }

  render() {
    console.log(this.state.userInfo);
    return (
      <UserSettingsTemplate userInfo = {this.state.userInfo}
        title="Edit profile"
      />
    );
  }
}
