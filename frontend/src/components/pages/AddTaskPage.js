import React, { Component } from 'react';
import { LocaleProvider, DatePicker, message } from 'antd';
import { AddTaskTemplate } from '../templates/AddTaskTemplate';


export class AddTaskPage extends Component {
  render() {
    return (
      <AddTaskTemplate
        title="Create new task"
      />


    );
  }
}
