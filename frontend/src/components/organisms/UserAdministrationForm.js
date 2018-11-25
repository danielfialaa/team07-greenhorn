import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Icon } from 'antd';
import { Header4WithIcon } from '../molecules/Header4WithIcon';
import moment from 'moment';

import api from '../../api';

const dateFormat = 'YYYY/MM/DD';

export class UserAdministrationForm extends Component {
  render() {
    const initialValues = {
      firstName: this.props.userInfo.firstName,
      lastName: this.props.userInfo.lastName,
      telephone: this.props.userInfo.telephone,
      dob: this.props.userInfo.dob,
    };

    return (
      <div>
        <Row>
          <Col span={8}>
            <Header4WithIcon
              iconType="user"
              values={
                this.props.userInfo.firstName +
                ' ' +
                this.props.userInfo.lastName
              }
            />
          </Col>
          <Col span={6}>
            <Header4WithIcon
              iconType="mail"
              values={this.props.userInfo.email}
            />
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Header4WithIcon
              iconType="calendar"
              values={moment(this.props.userInfo.dob).format(dateFormat)}
            />
          </Col>
          <Col span={6}>
            <Header4WithIcon
              iconType="phone"
              values={this.props.userInfo.telephone}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
