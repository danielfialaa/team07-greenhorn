import React, { Component } from 'react';
import { UserAdministrationTemplate } from '../templates/UserAdministrationTemplate';

import api from '../../api';

export class UserAdministrationPage extends Component {
  state = {
    isLoading: true,
    userInfo: '',
    taskList: '',
    tasks: '',
    userId: this.props.match.params.id,
    reporterId: '',
    requestorList: '',
    currentUser: '',
  };

  componentDidMount() {
    api
      .get('userAdministration/' + this.props.match.params.id)
      .then(({ data }) => {
        this.setState(() => ({
          userInfo: data.response[0],
          userId: data.response[0].id,
        }));
      });

    api.get('currentUser')
      .then(({data}) => {
          this.setState(() => ({
            currentUser: data.response,
          }))
        });

    api.get('userList').then(({ data }) => {
      this.setState(() => ({
        requestorList: data.response,
      }));
    });

    api.get('tasks').then(({ data }) => {
      this.setState(() => ({
        taskList: data.response,
      }));
    });

    api.get('taskList/' + this.props.match.params.id).then(({ data }) => {
      this.setState(() => ({
        isLoading: false,
        tasks: data.response,
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
        requestorList={this.state.requestorList}
        currentUser={this.state.currentUser}
        title="User profile"
      />
    );
  }
}
