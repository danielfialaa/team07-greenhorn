import React, { Component } from 'react';
import { Row, Col, Select, DatePicker, Button, Form } from 'antd';
import { Input, Icon } from 'antd';
import moment from 'moment';
import { Formik, Field } from 'formik';
import { Notification } from '../atoms/Notification';
import { FormItemDatePicker } from '../molecules/FormItemDatePicker';
import api from '../../api';

const Option = Select.Option;
const dateFormat = 'YYYY/MM/DD';
const defaultDeadline = moment()
  .add(7, 'days')
  .format(dateFormat);

const emptyTaskList = [{ id: '', taskName: '' }];
const emptyRequestorList = [{ id: '', firstName: '', lastName: '' }];

function disabledDate(current) {
  return current && current < moment().endOf('day');
}

export class AssignTaskForm extends Component {
  state = {
    task: '',
    requestor: '',
    deadline: '',
    userId: '',
    reporterId: '',
  };

  handleTaskSelectChange = value => {
    this.setState({ task: value }, function() {});
  };
  handleRequestorSelectChange = value => {
    this.setState({ requestor: value }, function() {});
  };

  handleDeadlineDateChange = value => {
    value ? null : (value = moment(defaultDeadline));
    this.setState({ dateOfDeadline: value }, function() {});
  };

  render() {
    const initialValues = {
      idUser: '',
      idTask: '',
      idReporter: '',
      idRequestor: '',
      dateOfAssignment: '',
      dateOfDeadline: '',
    };

    let requestorList = this.props.requestorList || emptyRequestorList;
    let taskList = this.props.taskList || emptyTaskList;
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          values.idTask = this.state.task;
          values.idRequestor = this.state.requestor;
          values.idUser = this.props.userId;
          values.dateOfDeadline = moment(this.state.dateOfDeadline).format(
            'YYYY-MM-DD',
          );
          values.dateOfAssignment = moment().format('YYYY-MM-DD');
          api
            .post('assignTask', values)
            .then(({ data }) => {
              if (data.status) {
                Notification(
                  'success',
                  'Task assigned',
                  'Task has been succesfully assigned',
                );
              } else {
                Notification(
                  'error',
                  'Assign task error',
                  'Task and requestor must be selected!',
                );
              }
              actions.setSubmitting(false);
            })
            .catch(err => {
              console.log('There was an error:' + err);
              actions.setSubmitting(false);
              Notification('error', 'Error', 'Error while assigning task!');
            });
        }}
        render={({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form className="assignTask-form" onSubmit={handleSubmit}>
            <Row>
              <Col offset={6} span={8}>
                <Select
                  name="tasks"
                  id="tasks"
                  onChange={this.handleTaskSelectChange}
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
              <Col span={6}>
                <Select
                  name="tasks"
                  id="tasks"
                  onChange={this.handleRequestorSelectChange}
                  placeholder="Select a requestor"
                  style={{
                    width: '-webkit-fill-available',
                    margin: '5px 5px 5px 5px',
                  }}
                >
                  {requestorList.map(function(requestor) {
                    if (requestor.isAdmin) {
                      return (
                        <Option key={requestor.id} value={requestor.id}>
                          {requestor.firstName} {requestor.lastName}
                        </Option>
                      );
                    }
                  })}
                </Select>
              </Col>
            </Row>
            <Row>
              <Col offset={6} span={8}>
                <FormItemDatePicker
                  dropdownClassName="dateOfDeadline"
                  name="dateOfDeadline"
                  id="dateOfDeadline"
                  defaultValue={moment(defaultDeadline)}
                  disabledDate={disabledDate}
                  placeholder="Select deadline"
                  allowClear={true}
                  style={{
                    width: '-webkit-fill-available',
                    margin: '5px 5px 5px 5px',
                  }}
                  onChange={this.handleDeadlineDateChange}
                />
              </Col>
              <Col span={4}>
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
          </Form>
        )}
      />
    );
  }
}
