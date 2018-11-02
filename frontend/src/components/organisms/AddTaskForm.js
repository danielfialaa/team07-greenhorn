import React, { Component } from 'react';
import { Row,Col, Form, Button, Input, Select, DatePicker, Upload, Icon, message, notification } from 'antd';
import { InputWithIcon } from '../molecules/Login/InputWithIcon';
import { Formik } from 'formik';
import { Notification } from '../atoms/Notification';

import moment from 'moment';

import api from '../../api';

const FormItem = Form.Item;
const Option = Select.Option
const Dragger = Upload.Dragger;
const { TextArea } = Input;

const departments = [{
  value: 'HR',
  label: 'Human Resources',
}, {
  value: 'IT',
  label: 'IT',
}, {
  value: 'Fin',
  label: 'Finance',
}];

const attachments = {
    name: 'file',
    multiple: true,
    action: '//jsonplaceholder.typicode.com/posts/',
    onChange(info) {
      const status = info.file.status;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  }

export class AddTaskForm extends Component {
  state = {
    departments: "",
    name: "",
    description: "",
    attachments: "",
  }

  handleSelectChange = (value) => {
    console.log(value);
    this.setState({departments: value}, function () {
      console.log(this.state);
    });
  }

  render() {
      const initialValues = {
        department: '',
        name: '',
        description: '',
        attachments: '',
      };
      return (
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            values.department = this.state.departments;
            console.log(values);
            api.post('addTask', values)
              .then(({ data }) => {
                if (data.status) {
                  Notification('success', 'Task Created', 'Task has been created.')
                }else{
                  Notification('error', 'Error', 'Error while creating task!')
                }
                console.log(data);
                actions.setSubmitting(false);
              })
              .catch(err => console.log('There was an error:' + err))
          }}
          render={({
            values,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
          <Row type="flex" justify="space-around" align="middle" className="addTask-wrap">
            <Col>
              <h1>Create New Task</h1>
            <Form className="addTask-form" onSubmit={handleSubmit}>
            <FormItem label="Department">
              <Select
                name="departments"
                id="departments"
                placeholder="Choose responsible department"
                iconType="tags"
                onChange={this.handleSelectChange}
              >
                <Option value="HR" key="HR">Human Resources</Option>
                <Option value="IT" key="IT">IT</Option>
                <Option value="Fin" key="Fin">Finance</Option>
              </Select>
            </FormItem>
              <FormItem label="Name of task">
                <InputWithIcon
                  iconType="form" placeholder="Enter name of task" type="text" name="name"
                  id="name" value={values.name} onChange={handleChange} onBlur={handleBlur}
                />
              </FormItem>
              <FormItem label="Description">
                <TextArea rows={6} placeholder="Enter description of task" type="text" name="description"
                id="description" value={values.description} onChange={handleChange} onBlur={handleBlur}
                />
              </FormItem>
              <FormItem label="Template form">
              <Dragger {...values}>
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">Click or drag template file to this area to upload</p>
                  <p className="ant-upload-hint">Template to be attached to task and filled by an employee</p>
                </Dragger>
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button" disabled={isSubmitting} loading={isSubmitting}>
                  Create Task
                </Button>
              </FormItem>
            </Form>
            </Col>
          </Row>
          )}
        />
      );
    }
}
