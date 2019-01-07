import React, { Component } from 'react';
import { UserTasksTemplate } from '../templates/UserTasksTemplate';

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
          this.setState(() => ({
            currentUser: data.response,
          }))
        });
		api.get('taskList/'+this.props.match.params.id)
			.then(({ data }) => {
				this.setState(() => ({
					isLoading: false,
          tasks: data.response,
				}))
			});
	}

  render() {
    return (
      <UserTasksTemplate
				isLoading= {this.state.isLoading}
        isError={this.state.error}
        tasks={this.state.tasks}
        currentUser={this.state.currentUser}
        error={this.state.error}
      />


    );
  }
}
