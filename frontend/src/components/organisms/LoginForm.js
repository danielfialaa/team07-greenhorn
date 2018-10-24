import React, { Component } from 'react';
import { Row,Col, Form, Button, notification } from 'antd';
import { Logo } from '../atoms/Logo';
import { InputWithIcon } from '../molecules/Login/InputWithIcon';
import { Formik } from 'formik';
import { Notification } from '../atoms/Notification';

import api from '../../api';

const FormItem = Form.Item;

export class LoginForm extends Component {

	render() {
	    const initialValues = { email: '', password: ''};
	    return (
	      <Formik
	        initialValues={initialValues}
	        onSubmit={(values, actions) => {
	          api.post('auth', values)
	            .then(({ data }) => {
								console.log(data);
	              actions.setSubmitting(false);
								if (data.status) {
									Notification('success', 'Log-in success', 'You have been successfully logged in!');
								}else{
									Notification('error', 'Log-in error', 'Wrong username and password combination!');
								}
	            })
						console.log(values)
	        }}
	        render={({
	          values,
	          handleBlur,
	          handleChange,
	          handleSubmit,
	          isSubmitting,
	        }) => (
					<Row type="flex" justify="space-around" align="middle" className="login-wrap">
						<Col>
						<Logo/>
						<Form className="login-form" onSubmit={handleSubmit}>
							<FormItem>
								<InputWithIcon
									iconType="user" placeholder="Enter your email" type="email" name="email"
									id="email" value = {values.email} onChange={handleChange} onBlur={handleBlur}
								/>
							</FormItem>
							<FormItem>
								<InputWithIcon
									iconType="lock" placeholder="Enter your passowrd" type="password" name="password"
									id="password" value = {values.password} onChange={handleChange} onBlur={handleBlur}
								/>
							</FormItem>
							<FormItem>
								<a className="login-form-forgot" href="#">Forgot password</a>
							</FormItem>
							<FormItem>
								<Button type="submit" htmlType="submit" className="login-form-button" disabled={isSubmitting} loading={isSubmitting} >
									Log-in
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
