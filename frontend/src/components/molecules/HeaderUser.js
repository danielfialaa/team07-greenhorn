import React, { Component } from 'react';
import { Layout, Row, Col, Avatar, Divider } from 'antd';

export class HeaderUser extends Component {
  render(){
    console.log('this.props >>>>> ', this.props);
    const currentUser = this.props.currentUser[0];
    const title = this.props.title;
    return(
          <div>
            <h1 style={{ float: 'left' }}>{title}</h1>
            <div style={{ float: 'right'}}>
              <Col>
                <Avatar size={45} icon="user" shape='square' style={{ float: 'right', verticalAlign: 'middle', margin: '1px 20px 1px 1px'}}/>
              </Col>
              <Col>
                <h5 style={{ margin: '1px 10px 1px 1px', float: 'right' }}>Signed in as</h5>
                <h3 style={{ margin: '1px 5px 1px 1px', float: 'right' }}>{currentUser.firstName} {currentUser.lastName}</h3>
              </Col>
            </div>
          </div>
  )};
}
