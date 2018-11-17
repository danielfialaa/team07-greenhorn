import React, { Component } from 'react';
import { Table, Button, Divider, Tag } from 'antd';
import { Logo } from '../atoms/Logo';

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

  /*setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  }*/

  render() {
    const  tasks  = this.props.tasks.response;
    const  attachmentPath  = [{attachmentPath: this.props.attachmentPath}];
    const dataSource = [...tasks, ...attachmentPath];
    
    console.log('dataSource: ', dataSource);

    var dateFormat = require('dateformat');

    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    const columns = [
      {
        title: 'Status',
        dataIndex: 'dateOfCompletion',
        key: 'dateOfCompletion',
        render: dataIndex => (
          <span>
            <Tag color="red" visible={dataIndex === null}>
              TBD
            </Tag>
            <Tag color="green" visible={dataIndex !== null}>
              DONE
            </Tag>
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
        // sorter: (a, b) => a.name.length - b.name.length,
        // sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      },
      {
        title: 'Description',
        dataIndex: 'task.description',
        key: 'task.description',
        // sorter: (a, b) => a.localeCompare(b),
        // sortOrder: sortedInfo.columnKey === 'description' && sortedInfo.order,
      },
      {
        title: 'Department',
        dataIndex: 'task.department.departmentName',
        key: 'task.department.departmentName',
      },
      {
        title: 'Date of Assigment',
        dataIndex: 'dateOfAssignment',
        key: 'dateOfAssignment',
        render: dataIndex => (
          <span>{dateFormat(dataIndex, 'dddd, mmmm dS, yyyy')}</span>
        ),
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
            <Button type="danger" icon="delete" onClick={() => {this.deleteTaskHandler(dataIndex)}} >Delete</Button>
          </span>
        ),
      }/*,
      {
        title: 'Download attachment',
        key: 'attachmentPath',
        dataIndex: 'attachmentPath',
        render: dataIndex => (
          <a href={'../../backend/'+this.props.attachmentPath} download>{this.props.attachmentPath}</a>
        )


      }*//*{
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
          dataSource={dataSource}
          onChange={this.handleChange}
          rowKey="id"
        />
      </div>
    );
  }
}
