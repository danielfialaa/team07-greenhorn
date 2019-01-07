import React, { Component } from 'react';
import {
  Table,
  Button,
  Divider,
  Tag,
  message
} from 'antd';

import api from '../../api';

export class TaskListTable extends Component {
  state = {
    sortedInfo: null,
  };

  handleChange = (pagination, filters, sorter) => {
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

  deleteTaskHandler = id => {
    api
      .post('deleteUserTask', { id: id })
      .then(({ response }) => {
        message.success(`Task has been succesfully deleted'`);
        window.location.reload();
      })
      .catch(error => {
        message.error(`Error occured while deleting task`);
      });
  };

  tagReturn(status) {
    switch (status) {
      case 'TO BE REVIEWED':
        return <Tag color="orange">TO BE REVIEWED</Tag>;
      case 'DONE':
        return <Tag color="green">DONE</Tag>;
      case 'TBD':
        return <Tag color="red">TBD</Tag>;
      default:
        return null;
    }
  }

  render() {
    const currentUser = this.props.currentUser[0]
      ? this.props.currentUser[0]
      : false;
    var dateFormat = require('dateformat');

    const columns = [
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: dataIndex => <span>{this.tagReturn(dataIndex)}</span>,
        filters: [
          {
            text: 'To be done',
            value: 'TBD',
          },
          {
            text: 'Done',
            value: 'DONE',
          },
          {
            text: 'To be reviewed',
            value: 'TO REVIEW',
          },
        ],
        onFilter: (value, record) => record.status === value,
      },
      {
        title: 'Name',
        dataIndex: 'task.name',
        key: 'task.name',
      },
      {
        title: 'Department',
        dataIndex: 'task.department.departmentName',
        key: 'task.department.departmentName',
      },
      {
        title: 'Deadline',
        dataIndex: 'dateOfDeadline',
        key: 'dateOfDeadline',
        render: dataIndex => (
          <span>{dateFormat(dataIndex, 'dddd, mmmm dS, yyyy')}</span>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        dataIndex: 'id',
        render: dataIndex => (
          <span>
            <Button
              type="primary"
              icon="file-search"
              href={'/TaskDetail/' + dataIndex}
            >
              Detail
            </Button>
            <Divider
              type="vertical"
              style={currentUser.isAdmin ? {} : { display: 'none' }}
            />
            <Button
              type="danger"
              icon="delete"
              onClick={() => {
                this.deleteTaskHandler(dataIndex);
              }}
              style={currentUser.isAdmin ? {} : { display: 'none' }}
            >
              Delete
            </Button>
          </span>
        ),
      },
    ];

    return (
      <div>
        <Table
          columns={columns}
          dataSource={this.props.tasks}
          onChange={this.handleChange}
          rowKey="id"
        />
      </div>
    );
  }
}
