import React, { Component } from 'react';
import { Row,Col, Form, Button, Input, Select, DatePicker, Upload, Icon, message, notification } from 'antd';
import { InputWithIcon } from '../molecules/Login/InputWithIcon';
import { Formik } from 'formik';
import { Notification } from '../atoms/Notification';
import { AddTaskValidation } from '../atoms/schemas/AddTaskValidation';
import * as Yup from 'yup';
import { FormItemWithError } from '../molecules/FormItemWithError';
import { UploadFile } from '../molecules/UploadFile';
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

const uploadRoute = {
    name: 'file',
    multiple: false,
    action: '/api/uploadTaskFile',
		headers: {
			Authorization: localStorage.getItem('token'),
		}
  }

export class AddTaskForm extends Component {
  state = {
    departments: "",
    name: "",
    description: "",
    filePath: "",
    success: false,
  }

	updateFileData = (filePath) => {
		console.log('Data from child: ',filePath);
		this.setState({filePath: filePath});
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
        filePath: '',
      };

      let departmentList = this.props.departmentList.response || emptyDepartments;
      return (
        <Formik
          initialValues={initialValues}
          validationSchema={AddTaskValidation}
          onSubmit={(values, actions) => {
          values.idDepartment = this.state.departments;
					values.filePath = this.state.filePath;

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
						setFieldValue,
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

							{/*
								<FormItem>
									<Upload {...attachments}>
										<Button>
											<Icon type="upload" /> Click to Upload
										</Button>
									</Upload>
								</FormItem>
							<FormItem>
							<input id="file" name="file" type="file" onChange={(event) => {
							setFieldValue("file", event.currentTarget.files[0]);
							}} />
							</FormItem>

							*/}
							<UploadFile
								 label="Template form"
								 {...uploadRoute}
								 triggerParentUpdate={this.updateFileData.bind(this)}
								 />




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
