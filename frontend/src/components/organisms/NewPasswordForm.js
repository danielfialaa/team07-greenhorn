import React, { Component } from 'react';
import { Row,Col, Form, Button, notification } from 'antd';
import { Logo } from '../atoms/Logo';
import { InputWithIcon } from '../molecules/Login/InputWithIcon';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';

const FormItem = Form.Item;


export class NewPasswordForm extends Component {

	render() {
	    const initialValues = { password: ''};
	    return (
	      <Formik
	        initialValues={initialValues}
	        onSubmit={(values, actions) => {
	          // api.put('newPass', values)
	          //   .then(({ data }) => {
	          //     actions.setSubmitting(false);
	          //   })
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
							<h3>Hello! Please setup your new password!</h3>
							<FormItem>
								<InputWithIcon
									iconType="lock" placeholder="Enter your new passowrd" type="password" name="password"
									id="password" value = {values.password} onChange={handleChange} onBlur={handleBlur}
								/>
							</FormItem>
							<FormItem>
								<Button type="submit" htmlType="submit" className="login-form-button" disabled={isSubmitting} >
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
