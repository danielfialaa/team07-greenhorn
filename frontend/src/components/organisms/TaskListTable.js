import React, { Component } from 'react';
<<<<<<< HEAD
import { Table, Button, Divider, Tag } from 'antd';
=======
import { Table, Button, Divider, Tag, Icon, Timeline, List, Row, Col, Layout } from 'antd';
>>>>>>> dev_pepa
import { Logo } from '../atoms/Logo';
import { Link } from 'react-router-dom';

import api from '../../api';

const { Header, Content } = Layout;

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
    const currentUser = this.props.currentUser[0];
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
<<<<<<< HEAD
        title: 'Date of Assigment',
        dataIndex: 'dateOfAssignment',
        key: 'dateOfAssignment',
        render: dataIndex => (
          <span>{dateFormat(dataIndex, 'dddd, mmmm dS, yyyy')}</span>
        ),
      },
      {
=======
>>>>>>> dev_pepa
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
              <Divider type='vertical' style={currentUser.isAdmin ? {} : {display: 'none'}}/>
              <Button
                type="danger"
                icon="delete"
                onClick={() => {this.deleteTaskHandler(dataIndex)}}
                style={currentUser.isAdmin ? {} : {display: 'none'}}
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


    // <div style={{ margin: '1px 1px 1px 1px', textAlign: 'left'}} ><h2>Tasks to do</h2></div>
    // <div style={{ margin: '1px 1px 1px 1px', textAlign: 'right'}} ><h2>You are signed in as {currentUser.firstName} {currentUser.lastName}</h2></div>
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


// <Layout>
// <Header
//   style={{ background: '#fff', padding: 0, textAlign: 'center' }}
// >{}
// </Header>
// <Content>



// </Content>
// </Layout>
