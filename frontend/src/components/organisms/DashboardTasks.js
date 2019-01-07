import React, { Component } from 'react';
import { Tag, Table, Progress, Alert, Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom';

export class DashboardTasks extends Component {

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

    dateReturn(date) {
        var dateFormat = require('dateformat');
        var today = new Date();
        var myDate_string = today.toISOString().slice(0,10);
        if(date.slice(0,10) < myDate_string) {
            
            return <span><Alert message={dateFormat(date, 'dddd, mmmm dS, yyyy')} type="error" /></span>
        } else {
            return <span><Alert message={dateFormat(date, 'dddd, mmmm dS, yyyy')} type="warning" /></span>
        }
    }
    
    render() {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'task',
                key: 'task.id',
                render: dataIndex => (
                    <Link to={'taskDetail/' + dataIndex.id}>{dataIndex.name}</Link>
                ),
            },
            {
                title: 'Assignee',
                dataIndex: 'user',
                key: 'user.id',
                render: dataIndex => (
                    <Link to={'userAdministration/' + dataIndex.id}>{dataIndex.firstName + ' ' + dataIndex.lastName}</Link>
                ),
            },
            {
                title: 'Deadline',
                dataIndex: 'dateOfDeadline',
                render: dataIndex => (
                    <span>{this.dateReturn(dataIndex)}</span>
                ),
                key: 'dateOfDeadline',
            }, 
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: dataIndex => <span>{this.tagReturn(dataIndex)}</span>,
            }
        ];

        return (
            <div>
                <h1>Dashboard</h1>
                <h2>My task completion stats</h2>
                <Row gutter={16} style={{textAlign: "center"}}>
                    <Col span={8}>
                        <Card style={{ background: '#ffcdd2' }} title="Tasks overdue" bordered={true} hoverable={false}>
                            <Progress type="dashboard" status="exception" format={overdueTasks => `${overdueTasks} overdue`} percent={this.props.tbdTasks.response} strokeColor={"#ef5350"}  showInfo={true} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card style={{ background: '#B2EBF2' }} title="Tasks to complete" bordered={true} hoverable={false}>
                            <Progress type="dashboard" strokeColor={"#29B6F6"} format={unfinishedTasks => `${unfinishedTasks} to do`} percent={this.props.allTasks.response} showInfo={true} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card style={{ background: '#DCEDC8' }} title="Tasks finished" bordered={true} hoverable={false}>
                            <Progress type="dashboard" strokeColor={"#7CB342"} format={finishedTasks => `${finishedTasks} done`} percent={this.props.doneTasks.response} showInfo={true} />
                        </Card>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <h2>Incomplete assigned tasks</h2>
                    <Table columns={columns} dataSource={this.props.tasks.response} rowKey="id" size="small" pageSize="6"/>
                </Row>
            </div>
            
        )
    }

}