import React, { Component } from 'react';
import { Row,Col, Form, Button, Input, Select, DatePicker, Upload, Icon, message, notification } from 'antd';
import { InputWithIcon } from '../molecules/Login/InputWithIcon';
import { Formik } from 'formik';
import { Notification } from '../atoms/Notification';
import { AddTaskValidation } from '../atoms/schemas/AddTaskValidation';
import * as Yup from 'yup';
import { FormItemWithError } from '../molecules/FormItemWithError';
//import { UploadFile } from '../molecules/UploadFile';
import moment from 'moment';

import api from '../../api';

const FormItem = Form.Item;
const Option = Select.Option
const Dragger = Upload.Dragger;
const { TextArea } = Input;

const emptyDepartments = [{
  id: '',
  departmentName: '',
}];

const __dirname = "C:\\Users\\jvobornik\\Documents\\Greenhorn-uploadedFiles";
//const __dirname = "//jsonplaceholder.typicode.com/posts/";
const attachments = {
    name: 'file',
    multiple: true,
    action: __dirname,
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
    success: false,
  }

  handleSelectChange = (value) => {
    console.log(value);
    this.setState({departments: value}, function () {
      console.log(this.state);
    });
  }

  render() {
      const initialValues = {
        idDepartment: '',
        name: '',
        description: '',
        attachments: '',
      };
      
      let departmentList = this.props.departmentList.response || emptyDepartments;
      return (
        <Formik
          initialValues={initialValues}
          validationSchema={AddTaskValidation}
          onSubmit={(values, actions) => {
          values.idDepartment = this.state.departments;

            console.log('tisknu values', values);
            api.post('addTask', values)
              .then(({ data }) => {
                if (data.status) {
                  Notification('success', 'Task Created', 'Task has been created.');
                  values.name = '';
                  values.description = '';
                  this.setState(() => ({
                    success: true
                  }))
                  console.log("values.attachments:", values.attachments);
                  values.attachments = '';
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
            isValid,
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
              {
                departmentList.map(function(department) {
                  return <Option key={department.id}
                  value={department.id}>{department.departmentName}</Option>;
                })
              }
              </Select>
            </FormItem>
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
                <TextArea rows={6} placeholder="Enter description of task" type="text" name="description"
                id="description" value={values.description} onChange={handleChange} onBlur={handleBlur}
                />
              </FormItem>
              <FormItem label="emplate form">
              <Dragger {...attachments}>
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">Select the attachment. Uploaded file will be attached to the task</p>
                </Dragger>
              </FormItem>
        {/*      <UploadFile
              label="Template form"
              name="name"
              id="name"
              value={values.name}
              />
*/}
              <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button" disabled={!isValid || isSubmitting} loading={isSubmitting}>
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
