import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'antd';
import { Formik } from 'formik';
import { Notification } from '../atoms/Notification';
import { FormItemWithError } from '../molecules/FormItemWithError';
import { FormItemDatePicker } from '../molecules/FormItemDatePicker';
import { UserValidation } from '../atoms/schemas/UserValidation';
import moment from 'moment';

import api from '../../api';

const FormItem = Form.Item;
const dateFormat = 'YYYY/MM/DD';

export class UserSettingsForm extends Component {
  state = {
    dob: '',
  };

  handleDateChange = value => {
    if(!value){
      moment(this.props.userInfo.dob)
    }
    this.setState({ dob: moment(value).format('YYYY-MM-DD') }, function() {});
  };

  render() {
    const initialValues = {
      firstName: this.props.userInfo.firstName,
      lastName: this.props.userInfo.lastName,
      telephone: this.props.userInfo.telephone,
      dob: this.props.userInfo.dob,
    };

    var date = moment(this.props.userInfo.dob).format('YYYY-MM-DD');
    return (
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={UserValidation}
        onSubmit={(values, actions) => {
          values.dob = this.state.dob;
          if(!this.state.dob){
            values.dob = moment(this.props.userInfo.dob).format(
              'YYYY-MM-DD',
            );
          }
          api
            .post('updateUser', values)
            .then(({ data }) => {
              if (data.status) {
                Notification(
                  'success',
                  'User Updated',
                  'User information has been succesfully updated',
                );
                window.location.reload();
              } else {
                Notification('error', 'Error', 'Error while updating user!');
              }
              actions.setSubmitting(false);
            })
            .catch(err => Notification('error', 'Error', 'Error while updating user!'));
        }}
        render={({
          values,
          handleSubmit,
          isSubmitting,
        }) => (
          <Row
            type="flex"
            justify="space-around"
            align="middle"
            className="addUser-wrap"
          >
            <Col>
              <h1>Edit User Profile</h1>
              <Form className="editUser-form" onSubmit={handleSubmit}>
                <FormItemWithError
                  label="Change user first name"
                  iconType="user"
                  defaultValue={this.props.userInfo.firstName}
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={values.firstName}
                />
                <FormItemWithError
                  label="Change user last name"
                  iconType="user"
                  defaultValue={this.props.userInfo.lastName}
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={values.lastName}
                />
                <FormItemWithError
                  label="Change user telephone number"
                  iconType="phone"
                  defaultValue={this.props.userInfo.telephone}
                  type="tel"
                  name="telephone"
                  id="telephone"
                  value={values.telephone}
                />
                <FormItemDatePicker
                  label="Date of Birth"
                  dropdownClassName="dob"
                  name="dob"
                  id="dob"
                  onChange={this.handleDateChange}
                  defaultValue={moment(date, dateFormat)}
                />
                <FormItem>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="submit-changes-button"
                    loading={isSubmitting}
                  >
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
