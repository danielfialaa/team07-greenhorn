import React, { Component } from 'react';
import { LocaleProvider, DatePicker, message } from 'antd';
import { TaskDetailTemplate } from '../templates/TaskDetailTemplate';
import { connect } from 'react-redux';

import api from '../../api';

export class TaskDetailPage extends Component {

state = {
  isLoading: true,
  isError: false,
  taskDetailed: "",
	attachments: "",
}

componentDidMount() {
  console.log("this.props.match.params.id: ",this.props.match.params.id);
  console.log("ehm");
  api.get('taskDetail/'+this.props.match.params.id)
    .then(({ data }) => {
      console.log("data: ",data);
      this.setState(() => ({
        isLoading: false,
        taskDetailed: data.result,
				attachments: data.attachments,
      }))
    })
}


  render() {

    return (
    <TaskDetailTemplate
      isLoading= {this.state.isLoading}
      isError={this.state.error}
      taskDetailed={this.state.taskDetailed}
			attachments={this.state.attachments}
    />
    );
  }

}
