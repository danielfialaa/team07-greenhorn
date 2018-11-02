import React, { Component } from 'react';
import { Row,Col, Form, Button, notification, Select, DatePicker } from 'antd';
import { InputWithIcon } from '../molecules/Login/InputWithIcon';
import { Formik } from 'formik';
import { Notification } from '../atoms/Notification';
import moment from 'moment';

import api from '../../api';

const FormItem = Form.Item;
const Option = Select.Option

export class ChangePasswordForm extends Component {
  state = {
		success: false,
	}

	render() {
	    const initialValues = {
				password_current: '',
        password_new: '',
        password_new_confirm: ''
			};
	    return (
	      <Formik
	        initialValues={initialValues}
          onSubmit={(values, actions) => {
            api.post('newPass', values)
              .then(({ data }) => {
                actions.setSubmitting(false);
                console.log(data.result[0]);
                if(data.result[0]){
                  Notification('success', 'Password changed', 'Your password have been successfully changed!');
                  this.setState(() => ({
                    success: true
                  }))
                }else{
                  Notification('error', 'Password not changed', 'Try to enter another password!');
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
					<Row type="flex" justify="space-around" align="middle" className="addUser-wrap">
						<Col>
							<h1>Change Password</h1>
						<Form className="changePassword-form" onSubmit={handleSubmit}>
							<FormItem label="Enter current password">
								<InputWithIcon
									iconType="lock" placeholder="" type="password" name="password_current"
									id="password_current" value={values.password_current} onChange={handleChange} onBlur={handleBlur}
								/>
							</FormItem>
							<FormItem label="Enter new password">
								<InputWithIcon
									iconType="lock" placeholder="" type="password" name="password_new"
									id="password_new" value={values.password_new} onChange={handleChange} onBlur={handleBlur}
								/>
							</FormItem>
							<FormItem label="Confirm new password">
								<InputWithIcon
									iconType="lock" placeholder="" type="password" name="password_new_confirm"
									id="password_new_confirm" value = {values.password_new_confirm} onChange={handleChange} onBlur={handleBlur}
								/>
							</FormItem>
							<FormItem>
								<Button type="primary" htmlType="submit" className="change-password-button" disabled={isSubmitting} loading={isSubmitting}>
									Change password
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
