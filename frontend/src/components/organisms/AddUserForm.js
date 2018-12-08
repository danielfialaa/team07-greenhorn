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
import { Formik, Field } from 'formik';
import { Notification } from '../atoms/Notification';
import { FormItemWithError } from '../molecules/FormItemWithError';
import { FormItemDatePicker } from '../molecules/FormItemDatePicker';
import { UserValidation } from '../atoms/schemas/UserValidation';
import { FormItemDepartmentsSelect } from '../molecules/FormItemDepartmentsSelect';
import moment from 'moment';

import api from '../../api';

const FormItem = Form.Item;
const Option = Select.Option;
const dateFormat = 'YYYY/MM/DD';
const defaultDate = moment('1920/01/01').format(dateFormat);

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
    value ? null : (value = moment(defaultDate).format('YYYY-MM-DD'));
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

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={UserValidation}
        onSubmit={(values, actions, resetForm, setFieldValue) => {
          values.isAdmin = this.state.adminChecked;
          values.dob = moment(this.state.dob).format('YYYY-MM-DD');
          this.state.dob
            ? null
            : (values.dob = moment(defaultDate).format('YYYY-MM-DD'));
          api
            .post('addUser', values)
            .then(({ data }) => {
              if (data.status) {
                Notification(
                  'success',
                  'User Created',
                  'User has been created and has received an email with link to complete registration.',
                );
                this.state = { adminChecked: false };
                actions.resetForm();
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
          setFieldValue,
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
                  initialValues={''}
                  value={values.firstName}
                />
                <FormItemWithError
                  label="Last Name"
                  iconType="user"
                  placeholder="Enter user last name"
                  type="text"
                  name="lastName"
                  id="lastName"
                  initialValues={''}
                  value={values.lastName}
                />
                <FormItemWithError
                  label="Email"
                  iconType="mail"
                  placeholder="Enter user email"
                  type="email"
                  name="email"
                  id="email"
                  initialValues={''}
                  value={values.lastName}
                />
                <FormItemWithError
                  label="Tel."
                  iconType="phone"
                  placeholder="Enter user telephone number"
                  type="tel"
                  name="telephone"
                  id="telephone"
                  initialValues={''}
                  value={values.telephone}
                />
                <FormItemDepartmentsSelect
                  list={this.props.departmentList.response}
                  onChange={value => setFieldValue('idDepartment', value)}
                  name="idDepartment"
                />
                <FormItemDatePicker
                  label="Date of Birth"
                  dropdownClassName="dob"
                  name="dob"
                  id="dob"
                  onChange={this.handleDateChange}
                  initialValues={moment(defaultDate)}
                  defaultValue={moment(defaultDate)}
                />
                <Field
                  name="checkbox"
                  render={({ field }) => (
                    <FormItem>
                      <Checkbox
                        checked={this.state.adminChecked}
                        defaultChecked={this.state.adminChecked}
                        onChange={this.handleCheckboxChange}
                      >
                        Admin
                      </Checkbox>
                    </FormItem>
                  )}
                />

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
