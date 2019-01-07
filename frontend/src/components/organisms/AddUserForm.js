import React, { Component } from 'react';
import {
  Row,
  Col,
  Form,
  Button,
  Checkbox,
  Transfer
} from 'antd';
import { Formik, Field } from 'formik';
import { Notification } from '../atoms/Notification';
import { FormItemWithError } from '../molecules/FormItemWithError';
import { FormItemDatePicker } from '../molecules/FormItemDatePicker';
import { UserValidation } from '../atoms/schemas/UserValidation';
import { FormItemDepartmentsSelect } from '../molecules/FormItemDepartmentsSelect';
import moment from 'moment';

import api from '../../api';

const FormItem = Form.Item;
const dateFormat = 'YYYY/MM/DD';
const defaultDate = moment('1920/01/01').format(dateFormat);

export class AddUserForm extends Component {
  state = {
    departments: '',
    dob: '',
    adminChecked: false,
    mockData: [],
    targetKeys: [],
  };

  componentDidMount() {
		this.getMockData();
	}

  getMockData = () => {
		const mockData = [];
		api.get('groupList').then(({ data }) => {
			data.response.map(function(group){
				const data = {
					key: group.id.toString(),
					title: group.groupName,
					description: group.groupName,
					chosen: false,
				}
      return mockData.push(data)
			});
      this.setState({ mockData: mockData});

		});
  }

  filterOption = (inputValue, option) => {
		return option.description.indexOf(inputValue) > -1;
	}

	handleGroupChange = (targetKeys) => {
		this.setState({ targetKeys });
	}

  handleSelectChange = value => {
    this.setState({ departments: value }, function() {});
  };

  handleDateChange = value => {
    if(!value){
      value = moment(defaultDate).format('YYYY-MM-DD');
    }
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
      selectedGroup: '',
    };

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={UserValidation}
        onSubmit={(values, actions, resetForm, setFieldValue) => {
          values.isAdmin = this.state.adminChecked;
          values.dob = moment(this.state.dob).format('YYYY-MM-DD');
          if(!this.state.dob){
            values.dob = moment(defaultDate).format('YYYY-MM-DD')
          }
          values.selectedGroup = this.state.targetKeys;
          api
            .post('addUser', values)
            .then(({ data }) => {
              if (data.status) {
                Notification(
                  'success',
                  'User Created',
                  'User has been created and has received an email with link to complete registration.',
                );
                this.setState({ adminChecked: false });
                actions.resetForm();
              } else {
                Notification('error', 'Error', 'Error while creating user!');
              }
              actions.setSubmitting(false);
            })
            .catch(err => {
              actions.setSubmitting(false);
              Notification('error', 'Error', 'Error while creating user!');
            });
        }}
        render={({
          values,
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

                <FormItem label="Select Tasks for Your Group">
											<Transfer
												dataSource={this.state.mockData}
												showSearch
												filterOption={this.filterOption}
												targetKeys={this.state.targetKeys}
												onChange={this.handleGroupChange}
												render={item => item.title}
											/>
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
