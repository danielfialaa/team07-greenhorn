import React, { Component } from 'react';
import { LocaleProvider, DatePicker, message } from 'antd';
import { UserTasksTemplate } from '../templates/UserTasksTemplate';
import { connect } from 'react-redux';

import api from '../../api';


export class UserTaskPage extends Component {
  state = {
		isLoading: true,
		isError: false,
		tasks: ""
    }

	componentDidMount() {
		console.log("ehm");
		api.get('taskList')
			.then(({ data }) => {
				console.log("hmm");
				this.setState(() => ({
					isLoading: false,
          tasks: data
				}))
			})
	}

  render() {
		const { isLoading, tasks, isLoaded, isError, error } = this.props;
    return (
      <UserTasksTemplate
				isLoading= {this.state.isLoading}
        isError={this.state.error}
        tasks={this.state.tasks}
        error={error}
      />


    );
  }
}
