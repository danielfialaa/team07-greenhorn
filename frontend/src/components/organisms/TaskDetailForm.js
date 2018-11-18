import React, { Component } from 'react';
import { Table, Button, Divider, Tag, Icon, Timeline, List, Row, Col } from 'antd';
import { Logo } from '../atoms/Logo';
import { Layout } from 'antd';
import api from '../../api';
const { Content, Sider, Header } = Layout;

export class TaskDetailForm extends Component {
  state = {
    sortedInfo: null,
  };

  modifyTaskHandler = (id, dofc, status) => {
    api.post('modifyUserTask', {
      'id':id,
      'dateOfCompletion': dofc,
      'status': status
    })
    .then(({ response }) => {
      console.log("Response >>>>>> ",response);
      window.location.reload();
      }).catch(error => {
        console.log('chyba');
    });
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


  render(){
    const { taskDetailed } = this.props;
    console.log("taskDetailed>>>>> ", taskDetailed);
    var dateFormat = require('dateformat');


    const data = {
      assignee: 'Fero Makač',
      requestor: 'Jano Ajťák',
      reporter: 'Milada Hrhová'
    }

    return (
      <div>
      <Header style={{ background: '#F3F3F3' }}><h1>Task detail</h1></Header>
        <Layout style={{ background: '#fff' }}>
          <Content style={{ margin: '16px 36px 24px 16px' }}>
            <Divider type='horizontal' orientation='left'><h2>{taskDetailed.task.name}</h2></Divider>
            <Row>
              <span>{taskDetailed.task.description}</span>
            </Row>
            <Divider type='horizontal' orientation='left'><h3>Attachments</h3></Divider>
            <Row>
            <span> Download link: </span>
            <a href={taskDetailed.task.attachment.path} download>{taskDetailed.task.attachment.path}</a>
            </Row>
          </Content>
          <Sider
          style={{ background: '#fff', margin: '50px 16px 24px 16px'}}>
            <Row>
              <Timeline>
                <Timeline.Item>
                {<b>Date of assignment: </b>}
                {dateFormat(taskDetailed.dateOfAssignment, 'dddd, mmmm dS, yyyy')}
                </Timeline.Item>
                <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="green">
                {dateFormat(Date.now(), 'dddd, mmmm dS, yyyy')}
                </Timeline.Item>
                <Timeline.Item color='red'>
                {<b>Date of deadline: </b>}
                {dateFormat(taskDetailed.dateOfDeadline, 'dddd, mmmm dS, yyyy')}
                </Timeline.Item>
              </Timeline>
            </Row>
            <Row>
              <Divider type='horizontal' />
              <b>Status: </b>{this.tagReturn(taskDetailed.status)}
            </Row>
            <Row>
              <span><b>Assignee: </b>{data.assignee}</span>
            </Row>
            <Row>
              <span><b>Reporter: </b>{data.reporter}</span>
            </Row>
            <Row>
              <span><b>Requestor: </b>{data.requestor}</span>
            </Row>
            <Row>
              <Divider type='horizontal' />
              <span>
                <Button
                disabled={taskDetailed.dateOfCompletion !== null}
                onClick={() => this.modifyTaskHandler(taskDetailed.id,
                  dateFormat(Date.now(),'isoUtcDateTime'), 'TO BE REVIEWED')}>Close</Button>
                <Button disabled={taskDetailed.dateOfCompletion === null}
                onClick={() => this.modifyTaskHandler(taskDetailed.id,
                null, 'TBD')}>Reopen</Button>
                <Divider type='horizontal' />
                <Button disabled={taskDetailed.dateOfCompletion === null}>Approve</Button>
              </span>
            </Row>
          </Sider>
        </Layout>
      </div>
    );
  }

}
