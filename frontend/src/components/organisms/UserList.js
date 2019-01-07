import React, { Component } from 'react';
import { Row, Col, Form, Button, notification } from 'antd';
import { Formik } from 'formik';

import api from '../../api';

const FormItem = Form.Item;

export class UserList extends Component {
  state = {
    loggedIn: false,
  };

  render() {
    return (
      <Formik
        onSubmit={(values, actions) => {
          api.get('userList', values).then(({ data }) => {
            actions.setSubmitting(false);
          });
        }}
        render={({
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
              <Form className="login-form" onSubmit={handleSubmit}>
                <FormItem>
                  <Button
                    type="submit"
                    htmlType="submit"
                    className="login-form-button"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                  >
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
