import React, { Component } from 'react';
import { TaskDetailTemplate } from '../templates/TaskDetailTemplate';

import api from '../../api';

export class TaskDetailPage extends Component {

state = {
  isLoading: true,
  isLoading2: true,
  isError: false,
  taskDetailed: "",
	attachments: [{},{}],
  relatedUsers: [{},{},{}],
  isAssignedToSelf: false,
  currentUser: "",
}

componentDidMount() {
  api.get('currentUser')
    .then(({data}) => {
        this.setState(() => ({
          isLoading2: false,
          currentUser: data.response,
        }))
      });
  api.get('taskDetail/'+this.props.match.params.id)
    .then(({ data }) => {
      this.setState(() => ({
        taskDetailed: data.result,
				attachments: data.attachments,
        relatedUsers: data.relatedUsers,
        isAssignedToSelf: data.isAssignedToSelf
      }))
    });
}


  render() {
    
    return (
    <TaskDetailTemplate
      isLoading= {this.state.isLoading||this.state.isLoading2}
      isError={this.state.error}
      taskDetailed={this.state.taskDetailed}
			attachments={this.state.attachments}
      relatedUsers={this.state.relatedUsers}
      isAssignedToSelf={this.state.isAssignedToSelf}
      currentUser={this.state.currentUser}
    />
    );
  }

}
