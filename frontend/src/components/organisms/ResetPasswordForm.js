import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'antd';
import { Logo } from '../atoms/Logo';
import { InputWithIcon } from '../molecules/Login/InputWithIcon';
import { Formik } from 'formik';
import { Notification } from '../atoms/Notification';
import { Redirect } from 'react-router';

import api from '../../api';

const FormItem = Form.Item;

export class ResetPasswordForm extends Component {
  state = {
    success: false,
  };
  render() {
    const initialValues = { email: '' };
    if (this.state.success === true) {
      return <Redirect to="/" />;
    }
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          api.post('resetPass', values).then(({ data }) => {
            actions.setSubmitting(false);
            if (data.result[0]) {
              Notification(
                'success',
                'Password reset',
                'Your password have been successfully reset! Check your email inbox, and click the link in the email you received to reset your password.',
              );
              this.setState(() => ({
                success: true,
              }));
            } else {
              Notification(
                'error',
                'Password not changed',
                'Your link seems to be expired!',
              );
            }
          });
        }}
        render={({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <Row
            type="flex"
            justify="space-around"
            align="middle"
            className="login-wrap"
          >
            <Col>
              <Logo />
              <Form className="login-form" onSubmit={handleSubmit}>
                <h3>Enter the email address used to create your account</h3>
                <FormItem>
                  <InputWithIcon
                    iconType="user"
                    placeholder="Enter your email"
                    type="email"
                    name="email"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormItem>
                <FormItem>
                  <Button
                    type="submit"
                    htmlType="submit"
                    className="login-form-button"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                  >
                    Submit
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
