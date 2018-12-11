import React, { Component } from 'react';
import { LocaleProvider, DatePicker, message } from 'antd';
import { TaskDetailTemplate } from '../templates/TaskDetailTemplate';
import { connect } from 'react-redux';

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
  console.log("this.props.match.params.id: ",this.props.match.params.id);
  api.get('currentUser')
    .then(({data}) => {
        console.log('data>>>>>>>', data.response);
        this.setState(() => ({
          isLoading2: false,
          currentUser: data.response,
        }))
      });
  api.get('taskDetail/'+this.props.match.params.id)
    .then(({ data }) => {
      console.log("data: ",data);
      this.setState(() => ({
        taskDetailed: data.result,
				attachments: data.attachments,
        relatedUsers: data.relatedUsers,
        isAssignedToSelf: data.isAssignedToSelf
      }))
    });
    // if (this.state.currentUser.length > 0 && this.state.taskDetailed.length != 0) {
    //   this.setState(() => ({
    //     isLoading: false,
    //   }))
    // }

}


  render() {
    console.log("currentUser length: ", this.state.currentUser.length);
    console.log("taskDetailed: ", this.state.taskDetailed.length);
    
    

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
