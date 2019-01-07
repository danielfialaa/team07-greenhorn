import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'antd';
import { Logo } from '../atoms/Logo';
import { InputWithIcon } from '../molecules/Login/InputWithIcon';
import { Formik } from 'formik';
import { Notification } from '../atoms/Notification';
import { Redirect } from 'react-router';

import api from '../../api';

const FormItem = Form.Item;

export class NewPasswordForm extends Component {
  state = {
    success: false,
  };
  render() {
    const initialValues = { password: '', userLink: this.props.link };
    if (this.state.success === true) {
      return <Redirect to="/" />;
    }
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          api.post('newPass', values).then(({ data }) => {
            actions.setSubmitting(false);
            if (data.result[0]) {
              Notification(
                'success',
                'Password changed',
                'Your password have been successfully changed! You can log-in now!',
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
                <h3>Hello! Please setup your new password!</h3>
                <FormItem>
                  <InputWithIcon
                    iconType="lock"
                    placeholder="Enter your new passowrd"
                    type="password"
                    name="password"
                    id="password"
                    value={values.password}
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
