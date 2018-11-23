import React, { Component } from 'react';
import {
  Row,
  Col,
  Form,
  Button,
  notification,
  Select,
  DatePicker,
  Checkbox,
} from 'antd';
import { InputWithIcon } from '../molecules/Login/InputWithIcon';
import { Formik } from 'formik';
import { Notification } from '../atoms/Notification';
import { FormItemWithError } from '../molecules/FormItemWithError';
import { FormItemDatePicker } from '../molecules/FormItemDatePicker';
import { UserValidation } from '../atoms/schemas/UserValidation';
import moment from 'moment';

import api from '../../api';

const FormItem = Form.Item;
const Option = Select.Option;
const dateFormat = 'YYYY/MM/DD';
const defaultDate = moment('1920/01/01').format(dateFormat);

const emptyDepartments = [
  {
    id: '',
    departmentName: '',
  },
];

export class AddUserForm extends Component {
  state = {
    departments: '',
    dob: '',
    adminChecked: false,
  };

  handleSelectChange = value => {
    this.setState({ departments: value }, function() {});
  };

  handleDateChange = value => {
    value ? null : (value = moment(defaultDate));
    this.setState({ dob: value }, function() {});
  };

  handleCheckboxChange = () => {
    this.setState({ adminChecked: !this.state.adminChecked }, function() {});
  };

  render() {
    const initialValues = {
      firstName: '',
      lastName: '',
      email: '',
      telephone: '',
      idDepartment: '',
      dob: '',
    };

    let departmentList = this.props.departmentList.response || emptyDepartments;
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={UserValidation}
        onSubmit={(values, actions) => {
          values.idDepartment = this.state.departments;
          values.isAdmin = this.state.adminChecked;
          values.dob = moment(this.state.dob).format('YYYY-MM-DD');
          api
            .post('addUser', values)
            .then(({ data }) => {
              if (data.status) {
                Notification(
                  'success',
                  'User Created',
                  'User has been created and has received an email with link to complete registration.',
                );
              } else {
                Notification('error', 'Error', 'Error while creating user!');
              }
              actions.setSubmitting(false);
            })
            .catch(err => {
              console.log('There was an error:' + err);
              actions.setSubmitting(false);
              Notification('error', 'Error', 'Error while creating user!');
            });
        }}
        render={({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          isValid,
        }) => (
          <Row
            type="flex"
            justify="space-around"
            align="middle"
            className="addUser-wrap"
          >
            <Col>
              <h1>Create New User</h1>
              <Form className="addUser-form" onSubmit={handleSubmit}>
                <FormItemWithError
                  label="First Name"
                  iconType="user"
                  placeholder="Enter user first name"
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={values.firstName}
                />
                <FormItemWithError
                  label="Last Name"
                  iconType="user"
                  placeholder="Enter user last name"
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={values.lastName}
                />
                <FormItemWithError
                  label="Email"
                  iconType="mail"
                  placeholder="Enter user email"
                  type="email"
                  name="email"
                  id="email"
                  value={values.lastName}
                />
                <FormItemWithError
                  label="Tel."
                  iconType="phone"
                  placeholder="Enter user telephone number"
                  type="tel"
                  name="telephone"
                  id="telephone"
                  value={values.telephone}
                />
                <FormItem label="Department">
                  <Select
                    name="departments"
                    id="departments"
                    onChange={this.handleSelectChange}
                    defaultValue={departmentList[0].id}
                  >
                    {departmentList.map(function(department) {
                      return (
                        <Option key={department.id} value={department.id}>
                          {department.departmentName}
                        </Option>
                      );
                    })}
                  </Select>
                </FormItem>
                <FormItemDatePicker
                  label="Date of Birth"
                  dropdownClassName="dob"
                  name="dob"
                  id="dob"
                  onChange={this.handleDateChange}
                  defaultValue={moment(defaultDate)}
                />
                <FormItem>
                  <Checkbox
                    checked={this.state.adminChecked}
                    onChange={this.handleCheckboxChange}
                  >
                    Admin
                  </Checkbox>
                </FormItem>
                <FormItem>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    disabled={!isValid || isSubmitting}
                    loading={isSubmitting}
                  >
                    Create
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
