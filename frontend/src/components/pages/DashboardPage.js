import React, { Component } from 'react';
import { DashboardTemplate } from '../templates/DashboardTemplate';

import api from '../../api';

export class DashboardPage extends Component {
  state = {
    isLoading: true,
    isError: false,
    allTasks: {},
    tbdTasks: {},
    doneTasks: {},
    currentUser: [],
    tasks: [],
  };
  componentDidMount() {
    api.get('currentUser')
      .then(({data}) => {
            this.setState(() => ({
                currentUser: data.response,
                isLoading: false,
            }))
            
    });
    api.get('allTasks/'+this.props.match.params.id)
        .then(({ data }) => {
            this.setState(() => ({
                isLoading: false,
                allTasks: data,
            }))
    });

    api.get('doneTasks/'+this.props.match.params.id)
        .then(({ data }) => {
            this.setState(() => ({
                isLoading: false,
                doneTasks: data,
            }))
    });

    api.get('tbdTasks/'+this.props.match.params.id)
        .then(({ data }) => {
            this.setState(() => ({
                isLoading: false,
                tbdTasks: data,
            }))
    });

    api.get('assignedTasks/'+this.props.match.params.id)
        .then(({ data }) => {
            this.setState(() => ({
                isLoading: false,
                tasks: data,
            }))
    });
}

  render() {
    return (
      <DashboardTemplate
        isLoading={this.state.isLoading}
        isError={this.state.error}
        tasks={this.state.tasks}
        currentUser={this.state.currentUser}
        allTasks={this.state.allTasks}
        tbdTasks={this.state.tbdTasks}
        doneTasks={this.state.doneTasks}
        error={this.props.error}
      />
    );
  }
}
