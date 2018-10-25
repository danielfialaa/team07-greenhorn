import React, { Component } from 'react';
import { Table, Button } from 'antd';
import { Logo } from '../atoms/Logo';


import api from '../../api';

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  name: 'Jim Red',
  age: 32,
  address: 'London No. 2 Lake Park',
}];



export class UserListTable extends Component {
	state = {
	 sortedInfo: null,
 };
 handleChange = (pagination, filters, sorter) => {
     console.log('Various parameters', pagination, filters, sorter);
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

		const {users} = this.props;
		console.log(this.props.users.response);


		let { sortedInfo, filteredInfo } = this.state;
sortedInfo = sortedInfo || {};
filteredInfo = filteredInfo || {};
const columns = [{
	title: 'Firstname',
	dataIndex: 'firstname',
	key: 'firstname',
	filteredValue: filteredInfo.firstname || null,
	onFilter: (value, record) => record.firstname.includes(value),
	sorter: (a, b) => a.firstname.length - b.firstname.length,
	sortOrder: sortedInfo.columnKey === 'firstname' && sortedInfo.order,
}, {
	title: 'Lastname',
	dataIndex: 'lastname',
	key: 'lastname',
	filteredValue: filteredInfo.lastname || null,
	onFilter: (value, record) => record.lastname.includes(value),
	sorter: (a, b) => a.lastname.length - b.lastname.length,
	sortOrder: sortedInfo.columnKey === 'lastname' && sortedInfo.order,
}, {
	title: 'Email',
	dataIndex: 'email',
	key: 'email',
	filteredValue: filteredInfo.email || null,
	onFilter: (value, record) => record.email.includes(value),
	sorter: (a, b) => a.email.length - b.email.length,
	sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
}];
	    return (
				<div>
        <div className="table-operations">
          <Button onClick={this.clearAll}>Clear filters and sorters</Button>
        </div>
        <Table columns={columns} dataSource={this.props.users.response} onChange={this.handleChange} rowKey="id" />
      </div>
	    );
	  }
}
