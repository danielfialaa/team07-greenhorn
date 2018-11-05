import React, { Component } from 'react';
import { Row,Col, Form, Button, notification, Select, DatePicker, Checkbox } from 'antd';
import { InputWithIcon } from '../molecules/Login/InputWithIcon';
import { Formik } from 'formik';
import { Notification } from '../atoms/Notification';
import moment from 'moment';

import api from '../../api';

const FormItem = Form.Item;
const Option = Select.Option

const emptyDepartments = [{
  id: '',
  departmentName: '',
}];

export class AddUserForm extends Component {

	state = {
		departments: "",
		dob: "",
		adminChecked: false,
	};

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
	handleCheckboxChange = () => {
		this.setState({adminChecked: !this.state.adminChecked}, function () {
			console.log(this.state);
		});
	}

	render() {
	    const initialValues = {
				firstName: '',
				lastName: '',
				email: '',
				telephone: '',
				idDepartment: '',
				dob: null,
			};
			let departmentList = this.props.departmentList.response || emptyDepartments;
			console.log(departmentList);
			console.log(this.props.departmentList.response);
	    return (
	      <Formik
	        initialValues={initialValues}
	        onSubmit={(values, actions) => {
						values.idDepartment = this.state.departments;
						values.dob = this.state.dob.format("YYYY-MM-DD");
						values.isAdmin = this.state.adminChecked;
						console.log(values);
	          api.post('addUser', values)
	            .then(({ data }) => {
								if (data.status) {
									Notification('success', 'User Created', 'User has been created and has received an email with link to complete registration.')
								}else{
									Notification('error', 'Error', 'Error while creating user!')
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
							<h1>Create New User</h1>
						<Form className="addUser-form" onSubmit={handleSubmit}>
							<FormItem label="First Name">
								<InputWithIcon
									iconType="user" placeholder="Enter user first name" type="text" name="firstName"
									id="firstName" value={values.firstName} onChange={handleChange} onBlur={handleBlur}
								/>
							</FormItem>
							<FormItem label="Last Name">
								<InputWithIcon
									iconType="user" placeholder="Enter user last name" type="text" name="lastName"
									id="lastName" value={values.lastName} onChange={handleChange} onBlur={handleBlur}
								/>
							</FormItem>
							<FormItem label="Email">
								<InputWithIcon
									iconType="mail" placeholder="Enter user email" type="email" name="email"
									id="email" value = {values.email} onChange={handleChange} onBlur={handleBlur}
								/>
							</FormItem>
							<FormItem label="Tel.">
								<InputWithIcon
									iconType="phone" placeholder="Enter user telephone number" type="tel" name="telephone"
									id="telephone" value = {values.telephone} onChange={handleChange} onBlur={handleBlur}
								/>
							</FormItem>
							<FormItem label="Department">
								<Select
									name="departments"
									id="departments"
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
							<FormItem label="Date of Birth">
								<DatePicker
									dropdownClassName = "dob"
									name="dob" id="dob"
									 onChange={this.handleDateChange}
								/>
							</FormItem>
							<FormItem>
								<Checkbox
									checked={this.state.adminChecked}
									onChange={this.handleCheckboxChange}
								>
									admin
								</Checkbox>
							</FormItem>
							<FormItem>
								<Button type="primary" htmlType="submit" className="login-form-button" disabled={isSubmitting} loading={isSubmitting}>
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
