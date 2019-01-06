import React, { Component } from 'react';
import { DashboardTemplate } from '../templates/DashboardTemplate';

import api from '../../api';

export class DashboardPage extends Component {
  state = {
    isLoading: true,
    isError: false,
    allTasks: 0,
    tbdTasks: 0,
    doneTasks: 0,
    currentUser: '',
    tasks: "",
  };
  componentDidMount() {
    api.get('currentUser')
      .then(({data}) => {
            console.log('data.response >>>>>>>', data.response);
            this.setState(() => ({
                currentUser: data.response,
                isLoading: false,
        }))
    });
    api.get('allTasks/'+this.props.match.params.id)
        .then(({ data }) => {
            console.log('TASK COUNT', data);
            this.setState(() => ({
                isLoading: false,
                allTasks: data,
            }))
    });

    api.get('doneTasks/'+this.props.match.params.id)
        .then(({ data }) => {
            console.log('TASK DONE', data);
            this.setState(() => ({
                isLoading: false,
                doneTasks: data,
            }))
    });

    api.get('tbdTasks/'+this.props.match.params.id)
        .then(({ data }) => {
            console.log('TASK TBD', data);
            this.setState(() => ({
                isLoading: false,
                tbdTasks: data,
            }))
    });

    api.get('assignedTasks/'+this.props.match.params.id)
        .then(({ data }) => {
            console.log('DATA', data);
            this.setState(() => ({
                isLoading: false,
                tasks: data,
            }))
    });
}

  render() {
    const { isLoading, myTasks, isLoaded, isError, currentUser, error } = this.props;
    return (
      <DashboardTemplate
        isLoading={this.state.isLoading}
        isError={this.state.error}
        tasks={this.state.tasks}
        myTasks={this.state.myTasks}
        currentUser={this.state.currentUser}
        error={error}
      />
    );
  }
}
