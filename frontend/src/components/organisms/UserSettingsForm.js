import React, { Component } from 'react';
import { Row,Col, Form, Button, notification, Select, DatePicker } from 'antd';
import { InputWithIcon } from '../molecules/Login/InputWithIcon';
import { Formik } from 'formik';
import { Notification } from '../atoms/Notification';
import moment from 'moment';

import api from '../../api';

const FormItem = Form.Item;
const Option = Select.Option

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

export class UserSettingsForm extends Component {
	state = {
		departments: "",
		dob: "",
	}

	handleSelectChange = (value) => {
		console.log(value);
		this.setState({departments: value}, function () {
			console.log(this.state);
		});
	}

	handleDateChange = (value) => {
		console.log(value);
		this.setState({dob: value}, function () {
			console.log(this.state);
		});
	}

	render() {
	    const initialValues = {
				firstName: '',
				lastName: '',
				telephone: '',
				dob: null,
			};
	    return (
	      <Formik
	        initialValues={initialValues}
	        onSubmit={(values, actions) => {
						values.department = this.state.departments;
						values.dob = this.state.dob.format("YYYY-MM-DD");
						console.log(values);
	          api.put('updateUser', values)
	            .then(({ data }) => {
								if (data.status) {
									Notification('success', 'User Updated', 'User information has been succesfully updated')
								}else{
									Notification('error', 'Error', 'Error while updating user!')
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
					<Row type="flex" justify="space-around" align="middle" className="addUser-wrap">
						<Col>
							<h1>Edit User Profile</h1>
						<Form className="editUser-form" onSubmit={handleSubmit}>
							<FormItem label="Change user first name">
								<InputWithIcon
									iconType="user" placeholder="" type="text" name="firstName"
									id="firstName" value={values.firstName} onChange={handleChange} onBlur={handleBlur}
								/>
							</FormItem>
							<FormItem label="Change user last name">
								<InputWithIcon
									iconType="user" placeholder="" type="text" name="lastName"
									id="lastName" value={values.lastName} onChange={handleChange} onBlur={handleBlur}
								/>
							</FormItem>
							<FormItem label="Change user telephone number">
								<InputWithIcon
									iconType="phone" placeholder="" type="tel" name="telephone"
									id="telephone" value = {values.telephone} onChange={handleChange} onBlur={handleBlur}
								/>
							</FormItem>
              <FormItem label="Date of Birth">
                <DatePicker
                  dropdownClassName = "dob"
                  name="dob" id="dob"
                   onChange={this.handleDateChange}
                />
              </FormItem>
							<FormItem>
								<Button type="primary" htmlType="submit" className="submit-changes-button" disabled={isSubmitting} loading={isSubmitting}>
									Confirm changes
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
