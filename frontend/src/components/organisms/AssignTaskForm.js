import React, { Component } from 'react';
import { Row, Col, Select, DatePicker, Button } from 'antd';
import { Input, Icon } from 'antd';
import moment from 'moment';
import { Formik } from 'formik';

import api from '../../api';

const Option = Select.Option;
const dateFormat = 'YYYY/MM/DD';

const emptyTaskList = [
  {
    id: '',
    taskName: '',
  },
];

export class AssignTaskForm extends Component {
  state = {
    tasks: '',
    dob: '',
    userId: '',
    requestorId: '',
  };

  handleSelectChange = value => {
    this.setState({ tasks: value }, function() {});
  };

  handleDateChange = value => {
    this.setState({ dob: value }, function() {});
  };

  render() {
    const initialValues = {
      idTask: '',
      dob: '',
    };

    let taskList = this.props.taskList || emptyTaskList;
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          api
            .post('assignTask', values)
            .then(({ data }) => {
              if (data.status) {
                Notification(
                  'success',
                  'Task assigned',
                  'task has been succesfully assigned',
                );
              } else {
                Notification('error', 'Error', 'Error while assigning task!');
              }
              actions.setSubmitting(false);
            })
            .catch(err => {
              console.log('There was an error:' + err);
              actions.setSubmitting(false);
              Notification('error', 'Error', 'Error while assigning task!');
            });
        }}
        render={({ isSubmitting }) => (
          <div>
            <Row>
              <Col span={12}>
                <Select
                  name="tasks"
                  id="tasks"
                  onChange={this.handleSelectChange}
                  placeholder="Select a task"
                  style={{
                    width: '-webkit-fill-available',
                    margin: '5px 5px 5px 5px',
                  }}
                >
                  {taskList.map(function(task) {
                    return (
                      <Option key={task.id} value={task.id}>
                        {task.name}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
              <Col span={12}>
                <Select
                  name="tasks"
                  id="tasks"
                  onChange={this.handleSelectChange}
                  placeholder="Select a reporter"
                  style={{
                    width: '-webkit-fill-available',
                    margin: '5px 5px 5px 5px',
                  }}
                >
                  {taskList.map(function(task) {
                    return (
                      <Option key={task.id} value={task.id}>
                        {task.name}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <DatePicker
                  dropdownClassName="dob"
                  placeholder="Select deadline"
                  name="dob"
                  id="dob"
                  style={{
                    width: '-webkit-fill-available',
                    margin: '5px 5px 5px 5px',
                  }}
                  onChange={this.handleDateChange}
                />
              </Col>
              <Col span={8}>
                <DatePicker
                  dropdownClassName="dob"
                  placeholder="Select notification date"
                  name="dob"
                  id="dob"
                  style={{
                    width: '-webkit-fill-available',
                    margin: '5px 5px 5px 5px',
                  }}
                  onChange={this.handleDateChange}
                />
              </Col>
              <Col span={8}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  style={{
                    width: '-webkit-fill-available',
                    margin: '5px 5px 5px 5px',
                  }}
                >
                  Assign
                </Button>
              </Col>
            </Row>
          </div>
        )}
      />
    );
  }
}
