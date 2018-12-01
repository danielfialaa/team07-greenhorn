import React, { Component } from 'react';
import { Table, Button, Divider, Tag, Icon, Timeline, List, Row, Col } from 'antd';
import { Logo } from '../atoms/Logo';
import { Layout } from 'antd';
import api from '../../api';
import { UploadFile } from '../molecules/UploadFile';

const { Content, Sider, Header } = Layout;

const emptyAttachments = [
	{
		path: '',
	},
];

const uploadRoute = {
  name: 'file',
  multiple: false,
  action: '/api/uploadTaskFile',
  headers: {
    Authorization: localStorage.getItem('token'),
  }
}

export class TaskDetailForm extends Component {
  state = {
    filePath: [],
    success: false,
    sortedInfo: null,
  };


  updateFileData = (filePath) => {
		console.log('Data from child: ',filePath);
		this.setState(prevState => ({
  		filePath: [...prevState.filePath, filePath]
		}))
	}

  modifyTaskHandler = (id, dofc, status) => {
		console.log('modifyTaskHandler: status >>>>>>>>>> ',status);
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
		const currentUser = this.props.currentUser[0];
		console.log('this.props>>>> ',this.props);
		console.log('this.props.currentUser>>>> ',this.props.currentUser);

    var dateFormat = require('dateformat');
    var isAssignedToSelf = this.props.isAssignedToSelf;
    let attachmentsList = this.props.attachments[1] || emptyAttachments;
		let attachmentsByUserList = this.props.attachments[0] || emptyAttachments;

		console.log('od usera>',attachmentsByUserList);


    const data = {
      assignee: this.props.relatedUsers[0],
      reporter: this.props.relatedUsers[1],
      requestor: this.props.relatedUsers[2],
    }

    return (
      <div>
      <Header style={{ background: '#ffffff', float: 'centre'}}><h1>TASK DETAIL</h1></Header>
        <Layout style={{ background: '#fff' }}>
          <Content style={{ margin: '16px 36px 24px 16px' }}>
            <Divider type='horizontal' orientation='left'><h2>{taskDetailed.task.name}</h2></Divider>
            <Row>
              <span>{taskDetailed.task.description}</span>
            </Row>
            <Divider type='horizontal' orientation='left'><h3>Attachments</h3></Divider>


						{attachmentsList.map(function(attachment) {
							return (
								<Row key={attachment.path}>
								<Icon type="file-text"/>
								<a href={"../" + attachment.path} download>{attachment.path.replace("uploads/","")}</a>
								</Row>
							);
            })}

						<Divider type='horizontal' orientation='left'><h3>Uploads</h3></Divider>
						{attachmentsByUserList.map(function(attachment) {
							return (
								<Row key={attachment.path}>
								<Icon type="file-text"/>
								<a href={"../" + attachment.path} download>{attachment.path.replace("uploads/","")}</a>
								</Row>
							);
						})}
						{
              isAssignedToSelf
              &&
              taskDetailed.dateOfCompletion === null
              &&
              <div>
                <Row>
                  <UploadFile
                  label="Submit files"
                  {...uploadRoute}
                  triggerParentUpdate={this.updateFileData.bind(this)} />
                </Row>
              </div>

            }
						<Divider type='horizontal' orientation='left' />
						<Row>
							<span>
							<Button
								type="primary"
								style={{ margin:'1px 3px 5px 3px' }}
								disabled={taskDetailed.dateOfCompletion !== null}
								onClick={() => {

									const values = {
										id: taskDetailed.id,
										filePath: this.state.filePath,
									}

									console.log(values);

									this.modifyTaskHandler(taskDetailed.id,
										dateFormat(Date.now(),'isoUtcDateTime'), 'TO BE REVIEWED');

										api.post('taskDetail/'+taskDetailed.id+'/update', values)
										.then(({ data }) => {
											if (data.status) {
												Notification('success', 'Task Created', 'Task has been created.');

									this.setState(() => ({
										success: true
									}))

									}else{
									Notification('error', 'Error', 'Error while creating task!')
									}
									})
									.catch(err => console.log('There was an error:' + err))

								}}>Submit task</Button>
							<Divider type='vertical' />
							<Button
							type="primary"
							style={{ margin:'1px 3px 5px 3px' }}
							disabled={taskDetailed.dateOfCompletion === null}
							onClick={	() => this.modifyTaskHandler(taskDetailed.id, null, 'TBD')}
							>Reopen
							</Button>
							<Divider
								type='vertical'
								style={currentUser.isAdmin ? {} : { display: 'none' }}
							/>
							<Button
								type="primary"
								style={{ margin:'1px 3px 5px 3px' }}
								disabled={taskDetailed.dateOfCompletion === null || taskDetailed.status=='DONE'}
								onClick={() => this.modifyTaskHandler(taskDetailed.id,null,'DONE')}
								style={currentUser.isAdmin ? {} : { display: 'none' }}
							>Approve
							</Button>
							</span>
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
              <Divider type='horizontal' />
              <span><b>Assignee: </b>{data.assignee.firstName} {data.assignee.lastName}</span>
            </Row>
						<Row>
              <span><b>Reporter: </b>{data.reporter.firstName} {data.reporter.lastName}</span>
            </Row>
            <Row>
              <span><b>Requestor: </b>{data.requestor.firstName} {data.requestor.lastName}</span>
            </Row>
						<Divider type='horizontal' />
          </Sider>
        </Layout>
      </div>
    );
  }

}
