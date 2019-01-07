import React, { Component } from 'react';
import { AddGroupTemplate } from '../templates/AddGroupTemplate';
import api from '../../api';

export class AddGroupPage extends Component {
	state = {
		tasks: "",
	};

	componentDidMount(){
		api.get('tasks').then(({ data }) => {
      this.setState(() => ({
        tasks: data.response,
      }));
    });
	}



  render() {
    return (
      <AddGroupTemplate
        title="Create New Group" tasks={this.state.tasks}
      />
    );
  }
}
