import React, { Component } from 'react';
import { HomeTemplate } from '../templates/HomeTemplate';

import api from '../../api';

export class HomePage extends Component {
  state = {
    isLoading: true,
    isError: false,
    users: '',
    currentUser: '',
  };
  componentDidMount() {
    api.get('currentUser')
      .then(({data}) => {
          this.setState(() => ({
            currentUser: data.response,
          }))
        });
    api.get('userList').then(({ data }) => {
      this.setState(() => ({
        isLoading: false,
        users: data,
      }));
    });
  }

  render() {
    return (
      <HomeTemplate
        isLoading={this.state.isLoading}
        isError={this.state.error}
        users={this.state.users}
        currentUser={this.state.currentUser}
        error={this.state.error}
      />
    );
  }
}
