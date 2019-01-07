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
            console.log('data.response >>>>>>>', data.response);
            this.setState(() => ({
                currentUser: data.response,
                isLoading: false,
            }))
            console.log('data.response STATE>>>>>>>', this.state.currentUser);
            
    });
    api.get('allTasks/'+this.props.match.params.id)
        .then(({ data }) => {
            console.log('TASK COUNT', data);
            this.setState(() => ({
                isLoading: false,
                allTasks: data,
            }))
            console.log('TASK COUNT STATE>>>>>>>', this.state.allTasks);
    });

    api.get('doneTasks/'+this.props.match.params.id)
        .then(({ data }) => {
            console.log('TASK DONE', data);
            this.setState(() => ({
                isLoading: false,
                doneTasks: data,
            }))
            console.log('TASK DONE STATE>>>>>>>', this.state.doneTasks);
    });

    api.get('tbdTasks/'+this.props.match.params.id)
        .then(({ data }) => {
            console.log('TASK TBD', data);
            this.setState(() => ({
                isLoading: false,
                tbdTasks: data,
            }))
            console.log('TASK TBD STATE>>>>>>>', this.state.tbdTasks);
    });

    api.get('assignedTasks/'+this.props.match.params.id)
        .then(({ data }) => {
            console.log('DATA', data);
            this.setState(() => ({
                isLoading: false,
                tasks: data,
            }))
            console.log('DATA STATE>>>>>>>', this.state.tasks);
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
