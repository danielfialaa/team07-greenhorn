import React, { Component } from 'react';
import { Table, Button, Divider } from 'antd';
import { Logo } from '../atoms/Logo';

import api from '../../api';

const data = [
  {
    status: 'Done',
    name: 'Ukrojit hadici',
    description: 'hwl',
    idRequestor: 11,
  },
  {
    status: 'Done',
    name: 'BB',
    description: 'SDF',
    idRequestor: 12,
  },
  {
    status: 'Not Done',
    name: 'CC',
    description: 'dfsafn',
    idRequestor: 13,
  },
  {
    status: 'Not Done',
    name: 'DD',
    description: 'sfdaf',
    idRequestor: 14,
  },
];

export class TaskListTable extends Component {
  state = {
    sortedInfo: null,
  };

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  /*setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  }*/

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    const columns = [
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        filters: [
          {
            text: 'Done',
            value: 'Done',
          },
          {
            text: 'Not Done',
            value: 'Not Done',
          },
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.status === value,
        defaultSortOrder: 'ascend',
        //sorter: (a, b) => a.status.length - b.status.length,
        // sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        // sorter: (a, b) => a.name.length - b.name.length,
        // sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        // sorter: (a, b) => a.localeCompare(b),
        // sortOrder: sortedInfo.columnKey === 'description' && sortedInfo.order,
      },
      {
        title: 'Department',
        dataIndex: 'department',
        key: 'department',
      },
      {
        title: 'Date of Assigment',
        dataIndex: 'dateOfAssignment',
        key: 'dateOfAssignment',
      },
      {
        title: 'Requestor',
        dataIndex: 'idRequestor',
        key: 'idRequestor',
        // sorter: (a, b) => a.idRequestor.length - b.idRequestor.length,
        // sortOrder: sortedInfo.columnKey === 'idRequestor' && sortedInfo.order,
      } /* , {
      title: 'Completor',
      dataIndex: 'idCompletor',
      key: 'idCompletor',
      sorter: (a, b) => a.idCompletor.length - b.idCompletor.length,
      sortOrder: sortedInfo.columnKey === 'idCompletor' && sortedInfo.order,
    }, {
      title: 'User',
      dataIndex: 'idUser',
      key: 'idUser',
      sorter: (a, b) => a.idUser.length - b.idUser.length,
      sortOrder: sortedInfo.columnKey === 'idUser' && sortedInfo.order,
    }*/,
    ];

    return (
      <div>
        <Table
          columns={columns}
          dataSource={data}
          onChange={this.handleChange}
          rowKey="id"
        />
      </div>
    );
  }
}
