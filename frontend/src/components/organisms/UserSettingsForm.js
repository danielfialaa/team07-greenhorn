import React, { Component } from 'react';
import { Row,Col, Form, Button, notification, Select, DatePicker } from 'antd';
import { InputWithIcon } from '../molecules/Login/InputWithIcon';
import { Formik } from 'formik';
import { Notification } from '../atoms/Notification';
import { FormItemWithError } from '../molecules/FormItemWithError';
import { UserValidation } from '../atoms/schemas/UserValidation';
import moment from 'moment';
import * as Yup from 'yup';

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
          validationSchema={UserValidation}
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
            isValid,
	        }) => (
					<Row type="flex" justify="space-around" align="middle" className="addUser-wrap">
						<Col>
							<h1>Edit User Profile</h1>
						<Form className="editUser-form" onSubmit={handleSubmit}>
            <FormItemWithError
              label="Change user first name"
              iconType="user"
              placeholder=""
              type="text"
              name="firstName"
              id="firstName"
              value={values.firstName}/>
              <FormItemWithError
                label="Change user last name"
                iconType="user"
                placeholder=""
                type="text"
                name="lastName"
                id="lastName"
                value={values.lastName}/>
              <FormItemWithError
                label="Change user telephone number"
                iconType="phone"
                placeholder=""
                type="tel"
                name="telephone"
                id="telephone"
                value={values.telephone}/>
              <FormItem label="Date of Birth">
                <DatePicker
                  dropdownClassName = "dob"
                  name="dob" id="dob"
                   onChange={this.handleDateChange}
                />
              </FormItem>
							<FormItem>
								<Button type="primary" htmlType="submit" className="submit-changes-button"
                disabled={!isValid || isSubmitting}
                loading={isSubmitting}>
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
