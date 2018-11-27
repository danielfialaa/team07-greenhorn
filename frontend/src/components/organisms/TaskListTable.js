import React, { Component } from 'react';
import { Table, Button, Divider, Tag, Icon, Timeline, List, Row, Col } from 'antd';
import { Logo } from '../atoms/Logo';
import { Link } from 'react-router-dom';

import api from '../../api';

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

  deleteTaskHandler = (id) => {
    api.post('deleteUserTask', {'id':id})
    .then(({ response }) => {
      // new Notification(
      //   'success',
      //   'Task has been deleted',
      //   'Task has been succesfully deleted',
      // );
      console.log("Proslo to");
      this.forceUpdate();
    }).catch(error => {
      //   Notification(
      //   'error',
      //   'Error occured while deleting task',
      //   'Error occured while deleting task',
      // );
      console.log("Velký špatný");

    });
    console.log("id", id);
  }

  tagReturn(status) {
      switch (status) {
          case 'TO BE REVIEWED':
            return <Tag color='orange'>TO BE REVIEWED</Tag>;
          case 'DONE':
            return <Tag color='green'>DONE</Tag>;
          case 'TBD':
            return <Tag color='red'>TBD</Tag>;
        default: return null;
      }
    }

  render() {
    const { tasks } = this.props;
    const isAdmin = this.props.currentUser[0].isAdmin;
    console.log('this.props >>>>> ',this.props);
    var dateFormat = require('dateformat');

    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: dataIndex => (
          <span>
          {this.tagReturn(dataIndex)}
          </span>
        ),
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
        //    filterMultiple: false,
        onFilter: (value, record) => record.status === value,
        //    defaultSortOrder: 'ascend',
        //sorter: (a, b) => a.status.length - b.status.length,
        // sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
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
        render: (dataIndex) => (
          <span>
              <Button
                type="primary"
                icon="file-search"
                href={"/TaskDetail/"+dataIndex}
                >Detail
              </Button>
              <Divider type='vertical' style={isAdmin ? {} : {display: 'none'}}/>
              <Button
                type="danger"
                icon="delete"
                onClick={() => {this.deleteTaskHandler(dataIndex)}}
                style={isAdmin ? {} : {display: 'none'}}
                >Delete
              </Button>
          </span>
        ),
      } /*{
      title: 'Requestor',
      dataIndex: 'idRequestor',
      key: 'idRequestor',
      // sorter: (a, b) => a.idRequestor.length - b.idRequestor.length,
      // sortOrder: sortedInfo.columnKey === 'idRequestor' && sortedInfo.order,
    }  , {
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
    } */,
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
