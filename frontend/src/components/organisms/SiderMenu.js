import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Logo } from '../atoms/Logo.js';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

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

export class SiderMenu extends Component {
  state = {
    isAdmin: false,
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
          this.setState(() => ({
            authorized: true,
            isAdmin: localStorage.isAdmin,
          }));
        })
        .catch(e => {
          this.setState(() => ({
            authorized: false,
          }));
        });
    } else {
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
    this.setState({ collapsed });
  };

  render() {
    if (!this.state.authorized) {
      return <Redirect to="/" />;
    }



    return (
      <Sider
        className="main-menu"
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
        }}
        onCollapse={(collapsed, type) => {
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
        <MenuItem
            key="Dashboard"
            title="Dashboard"
            icon="dashboard"
            linkTo="/Dashboard"
          />
        {this.state.isAdmin === "true" &&
				<SubMenu key="user" title={<span><Icon type="user" /><span>Users</span></span>}>
          <MenuItem
            key="AddUser"
            title="Add User"
            icon="user-add"
            linkTo="/AddUser"
          />
          <MenuItem key="home" title="User List" icon="team" linkTo="/home" />
				</SubMenu>}
        {this.state.isAdmin === "true" &&
				<SubMenu key="tasks" title={<span><Icon type="file-done" /><span>Tasks</span></span>}>
          <MenuItem
            key="AddTask"
            title="Add task"
            icon="form"
            linkTo="/AddTask"
          />
          <MenuItem
            key="My Tasks"
            title="My Tasks"
            icon="project"
            linkTo="/UserTasks"
          />
					</SubMenu>
          }
          {this.state.isAdmin === "false" &&
          <MenuItem
            key="My Tasks"
            title="My Tasks"
            icon="project"
            linkTo="/UserTasks"
          />}
          {this.state.isAdmin === "true" &&
						<MenuItem
							key="AddGroup"
							title="Add Group"
							icon="form"
							linkTo="/AddGroup"
						/>
          }
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
