import React, { Component } from 'react';
import { LocaleProvider, DatePicker, message } from 'antd';
import { UserAdministrationTemplate } from '../templates/UserAdministrationTemplate';
import { connect } from 'react-redux';

import api from '../../api';

export class UserAdministrationPage extends Component {
  state = {
    isLoading: true,
    userInfo: '',
    taskList: '',
  };

  componentDidMount() {
    api.get('userAdministration').then(({ data }) => {
      console.log('userAdministration');
      console.log(data);
      this.setState(() => ({
        userInfo: data.response[0],
      }));
    });

    api.get('taskList').then(({ data }) => {
      this.setState(() => ({
        taskList: data.response,
        isLoading: false,
      }));
      console.log('taskList');
      console.log(this.state.taskList);
    });
  }

  render() {
    return (
      <UserAdministrationTemplate
        isLoading={this.state.isLoading}
        userInfo={this.state.userInfo}
        taskList={this.state.taskList}
        title="User profile"
      />
    );
  }
}
