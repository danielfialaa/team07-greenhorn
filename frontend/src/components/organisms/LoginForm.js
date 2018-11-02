import React, { Component } from 'react';
import { Row,Col, Form, Button, notification } from 'antd';
import { Logo } from '../atoms/Logo';
import { InputWithIcon } from '../molecules/Login/InputWithIcon';
import { Formik } from 'formik';
import { Notification } from '../atoms/Notification';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';



import api from '../../api';

const FormItem = Form.Item;



export class LoginForm extends Component {
	state = {
		loggedIn: false,
	}

	render() {
	    const initialValues = { email: '', password: ''};
			const isLoggedIn = false;
			if(this.state.loggedIn === true){
				return <Redirect to="/home"/>;
			}


	    return (
	      <Formik
	        initialValues={initialValues}
	        onSubmit={(values, actions) => {
						console.log(values)
	          api.post('auth', values)
	            .then(({ data }) => {
								// sdiufhsdf
								console.log(data);
	              actions.setSubmitting(false);
								if (data.status) {
									localStorage.setItem('token', data.token);
									console.log(localStorage.getItem('token'));
									api.defaults.headers.common['Authorization'] = data.token;
									Notification('success', 'Log-in success', 'You have been successfully logged in!');
									this.setState(() => ({
										loggedIn: true
									}))
								}else{
									Notification('error', 'Log-in error', 'Wrong username and password combination!');
								}
	            })
	        }}
	        render={({
	          values,
	          handleBlur,
	          handleChange,
	          handleSubmit,
	          isSubmitting,
						loggedIn,
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
								<Link to="/ResetPassword">
									Forgot Password
								</Link>
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
