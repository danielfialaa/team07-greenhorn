import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import { authLogin, startLogin } from '../../services/Auth/actions';
import { getIsAdmin, getToken } from '../../services/Auth/reducer';
import { Logo } from '../atoms/Logo.js';
import api from '../../api';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItem = ({ title, icon, linkTo, ...rest }) => (
  <Link to={linkTo}>
    <Menu.Item {...rest}>
      <Icon type={icon} theme="outlined" />
      {title}
    </Menu.Item>
  </Link>
);

export class SiderMenuBase extends Component {
  state = {
    isAdmin: false,
  };

  onLoginFormSubmit = values => {
    const { username, password } = values;
    const { startLogin } = this.props;

    startLogin({ username, password });
  };

  componentDidMount() {
    this.setState.authorized = true;
    if (localStorage.getItem('token')) {
      api.defaults.headers.common['Authorization'] = localStorage.getItem(
        'token',
      );
      api
        .get('/')
        .then(({ data }) => {
          console.log('login check arrived');
          this.setState(() => ({
            authorized: true,
            isAdmin: localStorage.isAdmin,
          }));
        })
        .catch(e => {
          console.log(e);
          this.setState(() => ({
            authorized: false,
          }));
        });
    } else {
      console.log('nemas token vole');
      this.setState(() => ({
        authorized: false,
      }));
    }
  }
  state = {
    collapsed: false,
    authorized: true,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    if (!this.state.authorized) {
      return <Redirect to="/" />;
    }
    if (this.state.isAdmin === 'true') {
      console.log('jsi admin pico');
    } else {
      console.log('nejsi admin');
    }
    console.log(this.state.isAdmin);

    return (
      <Sider
        className="main-menu"
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logoMenu">
          <Logo />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname.split('/')}
        >
          <SubMenu
            key="user"
            title={
              <span>
                <Icon type="user" />
                <span>Users</span>
              </span>
            }
          >
            {this.state.isAdmin === 'true' && (
              <MenuItem
                key="AddUser"
                title="Add User"
                icon="user-add"
                linkTo="/AddUser"
                style={this.state.isAdmin ? {} : { display: 'none' }}
              />
            )}
            <MenuItem key="home" title="User List" icon="team" linkTo="/home" />
          </SubMenu>
          <SubMenu
            key="tasks"
            title={
              <span>
                <Icon type="file-done" />
                <span>Tasks</span>
              </span>
            }
          >
            {this.state.isAdmin === 'true' && (
              <MenuItem
                key="AddTask"
                title="Add task"
                icon="form"
                linkTo="/AddTask"
                style={this.state.isAdmin ? {} : { display: 'none' }}
              />
            )}
            <MenuItem
              key="My Tasks"
              title="My Tasks"
              icon="project"
              linkTo="/UserTasks"
            />
          </SubMenu>
          <SubMenu
            key="groups"
            title={
              <span>
                <Icon type="team" />
                <span>Groups</span>
              </span>
            }
          >
            {this.state.isAdmin === 'true' && (
              <MenuItem
                key="AddGroup"
                title="Add Group"
                icon="form"
                linkTo="/AddGroup"
              />
            )}
            <MenuItem
              key="GroupList"
              title="Groups list"
              icon="form"
              linkTo="/GroupList"
            />
          </SubMenu>
          <MenuItem
            key="Settings"
            title="Settings"
            icon="setting"
            linkTo="/Settings"
          />
          <MenuItem
            key="Logout"
            title="Logout"
            icon="logout"
            linkTo="/"
            onClick={() => {
              localStorage.removeItem('token');
            }}
          />
        </Menu>
      </Sider>
    );
  }
}

const mapStateToProps = storeState => {
  const { auth } = storeState;
  return {
    isAdmin: getIsAdmin(auth),
    token: getToken(auth),
  };
};

const mapDispatchToProps = {
  authLogin,
  startLogin,
};

export const SiderMenu = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SiderMenuBase);
