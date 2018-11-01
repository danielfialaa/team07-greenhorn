import React, { Component } from 'react';
import { Row,Col, Form, Button, notification } from 'antd';
import { Logo } from '../atoms/Logo';
import { InputWithIcon } from '../molecules/Login/InputWithIcon';
import { Formik } from 'formik';

import api from '../../api';

const FormItem = Form.Item;



export class UserList extends Component {
	state = {
		loggedIn: false,
	}

	render() {
	    return (
	      <Formik
	        onSubmit={(values, actions) => {
						console.log("req sended")
	          api.get('userList', values)
	            .then(({ data }) => {
								console.log(data);
	              actions.setSubmitting(false);
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
						<Form className="login-form" onSubmit={handleSubmit}>
							<FormItem>
								<Button type="submit" htmlType="submit" className="login-form-button" disabled={isSubmitting} loading={isSubmitting} >
									Load
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
