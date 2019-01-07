import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Header4WithIcon } from '../molecules/Header4WithIcon';
import moment from 'moment';


const dateFormat = 'YYYY/MM/DD';

export class UserAdministrationForm extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={12}>
            <Header4WithIcon
              iconType="user"
              values={
                this.props.userInfo.firstName +
                ' ' +
                this.props.userInfo.lastName
              }
            />
          </Col>
          <Col span={12}>
            <Header4WithIcon
              iconType="calendar"
              values={moment(this.props.userInfo.dob).format(dateFormat)}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Header4WithIcon
              iconType="mail"
              values={this.props.userInfo.email}
            />
          </Col>
          <Col span={12}>
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
