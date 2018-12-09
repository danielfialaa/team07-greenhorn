import React, { Component } from 'react';
import { Row, Col, Select, DatePicker, Button, Form } from 'antd';
import { Input, Icon } from 'antd';
import moment from 'moment';
import { Formik, Field } from 'formik';
import { Notification } from '../atoms/Notification';
import { FormItemDatePicker } from '../molecules/FormItemDatePicker';
import api from '../../api';

const FormItem = Form.Item;
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
    dateOfDeadline: moment(defaultDeadline).format('YYYY-MM-DD'),
    userId: '',
    reporterId: '',
    status: '',
  };

  handleDeadlineDateChange = value => {
    value ? null : (value = moment(defaultDeadline));
    this.setState(
      { dateOfDeadline: moment(value).format('YYYY-MM-DD') },
      function() {},
    );
  };

  render() {
    const initialValues = {
      idUser: '',
      idTask: '',
      idReporter: '',
      idRequestor: '',
      dateOfAssignment: '',
      dateOfDeadline: '',
      status: 'TBD',
    };

    let requestorList = this.props.requestorList || emptyRequestorList;
    let taskList = this.props.taskList || emptyTaskList;
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions, resetForm) => {
          console.log(moment(this.state.dateOfDeadline).format('YYYY-MM-DD'));
          values.dateOfDeadline = this.state.dateOfDeadline;
          values.idUser = this.props.userId;
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
                actions.resetForm();
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
          setFieldValue,
          isSubmitting,
        }) => (
          <Form className="assignTask-form" onSubmit={handleSubmit}>
            <Row>
              <Col span={8}>
                <Field
                  name="idTask"
                  id="tasks"
                  render={({ field }) => (
                    <FormItem label="Select a task:">
                      <Select
                        {...field}
                        onChange={value => setFieldValue('idTask', value)}
                        onBlur={handleBlur}
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
                    </FormItem>
                  )}
                />
              </Col>
              <Col span={8}>
                <Field
                  name="idRequestor"
                  id="requestor"
                  render={({ field }) => (
                    <FormItem label="Select a requestor: ">
                      <Select
                        onBlur={handleBlur}
                        {...field}
                        onChange={value => setFieldValue('idRequestor', value)}
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
                    </FormItem>
                  )}
                />
              </Col>
              <Col span={8}>
                <FormItemDatePicker
                  label="Select a deadline:"
                  dropdownClassName="dateOfDeadline"
                  name="dateOfDeadline"
                  id="dateOfDeadline"
                  defaultValue={moment(defaultDeadline)}
                  disabledDate={disabledDate}
                  style={{
                    width: '-webkit-fill-available',
                    margin: '1px 5px 5px 5px',
                  }}
                  onChange={this.handleDeadlineDateChange}
                />
              </Col>
            </Row>
            <Row>
              <Col span={6} offset={18}>
                <FormItem>
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
                </FormItem>
              </Col>
            </Row>
          </Form>
        )}
      />
    );
  }
}
