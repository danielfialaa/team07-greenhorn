import React, { Component } from 'react';
import { Button, Divider, Tag, Icon, Timeline, Row, Form, message } from 'antd';
import { Layout } from 'antd';
import api from '../../api';
import { UploadFile } from '../molecules/UploadFile';
import { Formik } from 'formik';

const { Content, Sider, Header } = Layout;
const FormItem = Form.Item;

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
		this.setState(prevState => ({
  		filePath: [...prevState.filePath, filePath]
		}))
	}

  modifyTaskHandler = (id, dofc, status) => {
    api.post('modifyUserTask', {
      'id':id,
      'dateOfCompletion': dofc,
      'status': status
    })
    .then(({ response }) => {
      window.location.reload();
      }).catch(error => {
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

    var dateFormat = require('dateformat');
    var isAssignedToSelf = this.props.isAssignedToSelf;
    let attachmentsList = this.props.attachments[1] || emptyAttachments;
		let attachmentsByUserList = this.props.attachments[0] || emptyAttachments;



    const data = {
      assignee: this.props.relatedUsers[0],
      reporter: this.props.relatedUsers[1],
      requestor: this.props.relatedUsers[2],
    }

    return (
      <div>
      <Header style={{ background: '#ffffff', float: 'centre'}}><h1>Task Detail</h1></Header>
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
                  
                <Formik
                  initialValues={{filePath: ''}}
                  onSubmit={(values, actions, resetForm) => {
                   values.filePath = this.state.filePath;
                   values.assignedTaskId = taskDetailed.id;
                   api
                   .post('assignUserUploads', values)
                   .then(({data}) => {
                      if (data.status) {
                        message.success(`Files assigned successfully.`);
                      } else {
                        message.error(`File assign failed.`);
                      }
                      actions.setSubmitting(false);
                   }).catch((e) => {
                    message.error(`File assign failed.`);
                    actions.setSubmitting(false);
                   });
                    
                  }}
                  render={({
                    handleSubmit,
                    isSubmitting,
                  }) => (
                  <Row>
                    <Form className="addTask-form" onSubmit={handleSubmit}>
                      <UploadFile
                      label="Submit files"
                      {...uploadRoute}
                      triggerParentUpdate={this.updateFileData.bind(this)} />
                      <FormItem>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="login-form-button"
                          loading={isSubmitting}
                        >
                          Confirm upload
                        </Button>
                      </FormItem>
                    </Form>
                  </Row>
                  )}
                  />
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
									Notification('error', 'Error', 'Error while creating task!');
									}
									})
									.catch(err => Notification('error', 'Error', 'Error while creating task!'))

								}}>Submit task</Button>
							<Divider type='vertical' />
							<Button
							type="primary"
							style={{ margin:'1px 3px 5px 3px' }}
							disabled={taskDetailed.dateOfCompletion === null}
							onClick={	() => this.modifyTaskHandler(taskDetailed.id, null, 'TBD')}
							>Reopen
							</Button>
              {currentUser.isAdmin
              && 
              <Divider
              type='vertical'
              />
              }
              {currentUser.isAdmin
              && 
              <Button
              type="primary"
              style={{ margin:'1px 3px 5px 3px' }}
              disabled={taskDetailed.dateOfCompletion === null || taskDetailed.status === 'DONE'}
              onClick={() => this.modifyTaskHandler(taskDetailed.id,null,'DONE')}
            >Approve
            </Button>
              }
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
