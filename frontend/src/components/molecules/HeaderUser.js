import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { Link } from 'react-router-dom'

import api from '../../api';


const menu = (
  <Menu>
    <Menu.Item
            key="Logout"
            linkTo="/"
            onClick={() => {
              localStorage.removeItem('token');
            }}
          ><Link to="/">Logout</Link></Menu.Item>
  </Menu>
)

export class HeaderUser extends Component {
  state = {
    firstName: '',
    lastName: ''
  }
  componentDidMount() {
    api.get('currentUser').then(({ data }) => {
      this.setState(({
        firstName: data.response[0].firstName,
        lastName: data.response[0].lastName
      }));
    })
  }
  render(){
    return(
          <div>
            <Dropdown.Button icon="user" overlay={menu} style={{float: 'right'}}>
            <Icon type="user" />
              {this.state.firstName + ' ' + this.state.lastName}
            </Dropdown.Button>
          </div>
  )};
}
