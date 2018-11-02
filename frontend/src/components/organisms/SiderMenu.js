import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Logo } from '../atoms/Logo.js';
import { Link } from 'react-router-dom';

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
    collapsed: false,
  };

	onCollapse = (collapsed) => {
     console.log(collapsed);
     this.setState({ collapsed });
   }

  render() {

    return (
			<Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => { console.log(broken); }}
      onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
    >
			<div className="logoMenu">
				<Logo/>
			</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={window.location.pathname.split('/')}>
				<MenuItem key="home" title="User List" icon="team" linkTo="/home"/>
        <MenuItem key="AddUser" title="Add User" icon="user-add" linkTo="/AddUser"/>
				<MenuItem key="AddTask" title="Add task" icon="form" linkTo="/AddTask" />
				<MenuItem key="Checklist" title="Checlist" icon="project" linkTo="/Checklist"/>
      </Menu>
    </Sider>
			);
		}
}
