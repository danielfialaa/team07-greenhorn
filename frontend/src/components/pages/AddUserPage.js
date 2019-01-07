import React, { Component } from 'react';
import { AddUserTemplate } from '../templates/AddUserTemplate';
import api from '../../api';

export class AddUserPage extends Component {
  state = {
    departmentList: '',
  };

  componentDidMount() {
    api.get('departmentList').then(({ data }) => {
      this.setState(() => ({
        departmentList: data,
      }));
    });
  }
  render() {
    return (
      <AddUserTemplate
        title="Create New User"
        departmentList={this.state.departmentList}
      />
    );
  }
}
