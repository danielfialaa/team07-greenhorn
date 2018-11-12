import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Input, Icon } from 'antd';
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
          <Col offset={8} span={8}>
            <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
            <span>
              {' '}
              {this.props.userInfo.firstName} {this.props.userInfo.lastName}{' '}
            </span>
          </Col>
        </Row>
        <Row>
        <Col offset={8} span={8}>
            <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
            <span> {this.props.userInfo.email}</span>
          </Col>
        </Row>
        <Row>
        <Col offset={8} span={8}>
            <Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />
            <span> {this.props.userInfo.telephone}</span>
          </Col>
        </Row>
        <Row>
        <Col offset={8} span={8}>
            <Icon type="calendar" style={{ color: 'rgba(0,0,0,.25)' }} />
            <span> {moment(this.props.userInfo.dob).format(dateFormat)}</span>
          </Col>
        </Row>
      </div>
    );
  }
}
