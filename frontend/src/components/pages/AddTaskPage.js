import React, { Component } from 'react';
import { LocaleProvider, DatePicker, message } from 'antd';
import { AddTaskTemplate } from '../templates/AddTaskTemplate';
import api from '../../api';


export class AddTaskPage extends Component {
  state = {
    departmentList: "",
  }

  componentDidMount() {
    api.get('departmentList')
      .then(({ data }) => {
        console.log(data);
        this.setState(() => ({
          departmentList: data,
        }))
    })
  }
  render() {
    return (
      <AddTaskTemplate
        title="Create New Task" departmentList={this.state.departmentList}
      />


    );
  }
}
