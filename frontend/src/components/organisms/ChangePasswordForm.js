import React, { Component } from 'react';
import { Row,Col, Form, Button, notification, Select, DatePicker } from 'antd';
import { InputWithIcon } from '../molecules/Login/InputWithIcon';
import { FormItemWithError } from '../molecules/FormItemWithError';
import { Formik, Field } from 'formik';
import { Notification } from '../atoms/Notification';
import { PasswordValidation } from '../atoms/schemas/PasswordValidation';
import moment from 'moment';
import * as Yup from 'yup';

import api from '../../api'

const FormItem = Form.Item;
const Option = Select.Option;

export class ChangePasswordForm extends Component {
  state = {
		success: false,
	}

	render() {
	    const initialValues = {
        password_current: '',
        password_new: '',
        password: ''
			};
	    return (
	      <Formik
	        initialValues={initialValues}
          validationSchema={PasswordValidation}
          onSubmit={(values, actions) => {
            api.post('changePass', values)
              .then(({ data }) => {
                if(data.status){
                  Notification('success', 'Password changed', 'Your password have been successfully changed!');
                }else{
                  Notification('error', 'Password not changed', 'Try to enter another password!');
                }
	              actions.setSubmitting(false);
              })
            console.log(values)
          }}
	        render={({
	          values,
            errors,
	          handleBlur,
	          handleChange,
	          handleSubmit,
	          isSubmitting,
    isValid,
	        }) => (
					<Row type="flex" justify="space-around" align="middle" className="addUser-wrap">
						<Col>
							<h1>Change Password</h1>
						<Form className="changePassword-form" onSubmit={handleSubmit}>
              <FormItemWithError
                label="Enter current password"
                iconType="lock"
                placeholder=""
                type="password"
                name="password_current"
                id="password_current"
                value={values.password_current}/>
              <FormItemWithError
                label="Enter new password"
                iconType="lock"
                placeholder=""
                type="password"
                name="password_new"
                id="password_new"
                value={values.password_new}/>
              <FormItemWithError
                label="Confirm new password"
                iconType="lock"
                placeholder=""
                type="password"
                name="password"
                id="password"
                value = {values.password}/>
							<FormItem>
								<Button type="primary" htmlType="submit" className="change-password-button"
                disabled={!isValid || isSubmitting}
                loading={isSubmitting}>
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
