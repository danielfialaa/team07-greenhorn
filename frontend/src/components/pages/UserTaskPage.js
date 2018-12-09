import React, { Component } from 'react';
import { Header, LocaleProvider, DatePicker, message } from 'antd';
import { UserTasksTemplate } from '../templates/UserTasksTemplate';
import { connect } from 'react-redux';

import api from '../../api';


export class UserTaskPage extends Component {
  state = {
		isLoading: true,
		isError: false,
		tasks: "",
    currentUser: "",
    }

	componentDidMount() {
    api.get('currentUser')
      .then(({data}) => {
          console.log('data>>>>>>>', data.response);
          this.setState(() => ({
            currentUser: data.response,
          }))
        });
		api.get('taskList/'+this.props.match.params.id)
			.then(({ data }) => {
        console.log('task list data: ', data);
				this.setState(() => ({
					isLoading: false,
          tasks: data.response,
				}))
			});
	}

  render() {
		const { isLoading, tasks, isLoaded, isError, error, currentUser } = this.props;
    return (
      <UserTasksTemplate
				isLoading= {this.state.isLoading}
        isError={this.state.error}
        tasks={this.state.tasks}
        currentUser={this.state.currentUser}
        error={error}
      />


    );
  }
}
