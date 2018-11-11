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
    tasks: '',
    userId: '',
    requestorId: '',
    reporterList: '',
  };

  componentDidMount() {
    api.get('userAdministration/'+this.props.match.params.id).then(({ data }) => {
      this.setState(() => ({
        userInfo: data.response[0],
        userId: data.response[0].id,
      }));
    });

    api.get('tasks').then(({ data }) => {
      this.setState(() => ({
        taskList: data.response,
      }));
    });

    api.get('taskList/'+this.props.match.params.id).then(({ data }) => {
      this.setState(() => ({
        isLoading: false,
        tasks: data,
      }));
    });
  }

  render() {
    return (
      <UserAdministrationTemplate
        isLoading={this.state.isLoading}
        userInfo={this.state.userInfo}
        taskList={this.state.taskList}
        tasks={this.state.tasks}
        userId={this.state.userId}
        title="User profile"
      />
    );
  }
}
