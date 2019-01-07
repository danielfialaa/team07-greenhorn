import React, { Component } from 'react';
import {
  Row,
  Col,
  Form,
  Button,
  Input,
} from 'antd';
import { Formik} from 'formik';
import { Notification } from '../atoms/Notification';
import { AddTaskValidation } from '../atoms/schemas/AddTaskValidation';
import { FormItemWithError } from '../molecules/FormItemWithError';
import { FormItemDepartmentsSelect } from '../molecules/FormItemDepartmentsSelect';
import { UploadFile } from '../molecules/UploadFile';

import api from '../../api';

const FormItem = Form.Item;
const { TextArea } = Input;

const uploadRoute = {
  name: 'file',
  multiple: false,
  action: '/api/uploadTaskFile',
  headers: {
    Authorization: localStorage.getItem('token'),
  },
};

export class AddTaskForm extends Component {
  state = {
    departments: '',
    name: '',
    description: '',
    filePath: [],
    success: false,
    fileList: [],
  };

  updateFileData = filePath => {
    this.setState(prevState => ({
      filePath: [...prevState.filePath, filePath],
    }));
  };

  render() {
    const initialValues = {
      idDepartment: '',
      name: '',
      description: '',
      filePath: '',
    };

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={AddTaskValidation}
        onSubmit={(values, actions, resetForm) => {
          values.filePath = this.state.filePath;

          api
            .post('addTask', values)
            .then(({ data }) => {
              if (data.status) {
                Notification(
                  'success',
                  'Task Created',
                  'Task has been created.',
                );
                values.name = '';
                values.description = '';
                this.setState(() => ({
                  success: true,
                  fileList: [] 
                }));
                actions.resetForm();
              } else {
                Notification('error', 'Error', 'Error while creating task!');
              }
              actions.setSubmitting(false);
            })
            .catch(err => Notification('error', 'Error', 'Error while creating task!'));
        }}
        render={({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          isValid,
          setFieldValue,
        }) => (
          <Row
            type="flex"
            justify="space-around"
            align="middle"
            className="addTask-wrap"
          >
            <Col>
              <h1>Create New Task</h1>
              <Form className="addTask-form" onSubmit={handleSubmit}>
                <FormItemDepartmentsSelect
                  list={this.props.departmentList.response}
                  onChange={value => setFieldValue('idDepartment', value)}
                  name="idDepartment"
                />
                <FormItemWithError
                  label="Name of task"
                  iconType="form"
                  placeholder="Enter name of task"
                  type="text"
                  name="name"
                  id="name"
                  value={values.name}
                />
                <FormItem label="Description">
                  <TextArea
                    rows={6}
                    placeholder="Enter description of task"
                    type="text"
                    name="description"
                    id="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormItem>
                <UploadFile
                  {...uploadRoute}
                  triggerParentUpdate={this.updateFileData.bind(this)}
                  defaultFileList={this.state.fileList}
                />
                <FormItem>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    disabled={!isValid || isSubmitting}
                    loading={isSubmitting}
                  >
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
