import React, { Component } from 'react';
import { LocaleProvider, DatePicker, message } from 'antd';
import { HomeTemplate } from '../templates/HomeTemplate';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

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
          console.log('data.response >>>>>>>', data.response);
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
    const { isLoading, users, isLoaded, isError, currentUser, error } = this.props;
    return (
      <HomeTemplate
        isLoading={this.state.isLoading}
        isError={this.state.error}
        users={this.state.users}
        currentUser={this.state.currentUser}
        error={error}
      />
    );
  }
}
