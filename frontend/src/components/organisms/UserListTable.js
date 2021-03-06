import React, { Component } from 'react';
import { Table, Button, Divider, Tag } from 'antd';





export class UserListTable extends Component {
	state = {
	 sortedInfo: null,
 };
 handleChange = (pagination, filters, sorter) => {
     this.setState({
       filteredInfo: filters,
       sortedInfo: sorter,
     });
   }


   clearAll = () => {
     this.setState({
       filteredInfo: null,
       sortedInfo: null,
     });
   }


	render() {

		let { sortedInfo, filteredInfo } = this.state;
		sortedInfo = sortedInfo || {};
		filteredInfo = filteredInfo || {};

const columns = [{
	title: 'Firstname',
	dataIndex: 'firstName',
	key: 'firstName',
	filteredValue: filteredInfo.firstName || null,
	onFilter: (value, record) => record.firstName.includes(value),
	sorter: (a, b) => a.firstName.length - b.firstName.length,
	sortOrder: sortedInfo.columnKey === 'firstName' && sortedInfo.order,
}, {
	title: 'Lastname',
	dataIndex: 'lastName',
	key: 'lastName',
	filteredValue: filteredInfo.lastName || null,
	onFilter: (value, record) => record.lastName.includes(value),
	sorter: (a, b) => a.lastName.length - b.lastName.length,
	sortOrder: sortedInfo.columnKey === 'lastName' && sortedInfo.order,
}, {
	title: 'isAdmin',
	dataIndex: 'isAdmin',
	className: 'hide',
}, {
	title: 'Department',
	dataIndex: 'department.departmentName',
	key: 'department.departmentName',
	align: 'center',
	render: (dataIndex, row) => (
		<span>
			{dataIndex}
			<Divider type="vertical" className={row.isAdmin ? '' : 'hide'} />
			<Tag color="red" visible={row.isAdmin} >Admin</Tag>
		</span>
	)
},{
	title: 'Email',
	dataIndex: 'email',
	key: 'email',
	filteredValue: filteredInfo.email || null,
	onFilter: (value, record) => record.email.includes(value),
	sorter: (a, b) => a.email.length - b.email.length,
	sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
}, {
	title: 'Telephone',
	dataIndex: 'telephone',
	key: 'telephone',
}, {
  title: 'Action',
	dataIndex: 'id',
  key: 'action',
  render: (dataIndex) => (
    <span>
      <Button type="primary" icon="user" href={"UserAdministration/"+dataIndex}>Profile</Button>
      <Divider type="vertical"/>
			<Button type="primary" icon="project" href={"UserTasks/"+dataIndex}>Tasks</Button>
    </span>
  ),
}];
	    return (
				<div>
        <div className="table-operations">
	      <h1 style={{float:'left'}}>User List</h1>
          <Button onClick={this.clearAll} style={{margin: '5px 5px 5px 50px '}}>Clear filters and sorters</Button>
        </div>
        <Table columns={columns} dataSource={this.props.users.response} onChange={this.handleChange} rowKey="id" />
      </div>
	    );
	  }
}
