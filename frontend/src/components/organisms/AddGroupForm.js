import React, { Component } from 'react';
import {
  Row,
  Col,
  Form,
  Button,
	Transfer,
} from 'antd';
import { InputWithIcon } from '../molecules/Login/InputWithIcon';
import { Formik } from 'formik';
import { Notification } from '../atoms/Notification';

import api from '../../api';

const FormItem = Form.Item;



export class AddGroupForm extends Component {
  state = {
		mockData: [],
		targetKeys: [],
  };
	componentDidMount() {
		this.getMockData();
	}

	getMock = () => {
	    const targetKeys = [];
	    const mockData = [];
	    for (let i = 0; i < 20; i++) {
	      const data = {
	        key: i.toString(),
	        title: `content${i + 1}`,
	        description: `description of content${i + 1}`,
	        chosen: Math.random() * 2 > 1,
	      };
	      if (data.chosen) {
	        targetKeys.push(data.key);
	      }
	      mockData.push(data);
	    }
	    this.setState({ mockData, targetKeys });
	  }

	filterOption = (inputValue, option) => {
		return option.description.indexOf(inputValue) > -1;
	}

	handleChange = (targetKeys) => {
		this.setState({ targetKeys });
	}

	getMockData = () => {
		const mockData = [];
		api.get('tasks').then(({ data }) => {
			data.response.map(function(task){
				const data = {
					key: task.id.toString(),
					title: task.name,
					description: task.name,
					chosen: false,
				}
			return mockData.push(data)
			});
			this.setState({ mockData: mockData});
		});
	}

  render() {
    const initialValues = {
      groupName: '',
			selectedTasks: '',
    };

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
					values.selectedTasks = this.state.targetKeys;
          api.post('addGroup', values)
						.then(({ data }) => {
              if (data.status) {
                Notification(
                  'success',
                  'Group Created',
                  'Group has been created.',
                );
              } else {
                Notification('error', 'Error', 'Error while creating group!');
              }
              actions.setSubmitting(false);
            })
            .catch(err => {
              actions.setSubmitting(false);
              Notification('error', 'Error', 'Error while creating group!');
            });
        }}
        render={({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <Row
            type="flex"
            justify="space-around"
            align="middle"
            className="addUser-wrap"
          >
            <Col>
              <h1>Create New Group</h1>
              <Form className="addGroup-form" onSubmit={handleSubmit}>
							<FormItem label="Group Name">
                  <InputWithIcon
                    iconType="user"
                    placeholder="Enter user group name"
                    type="text"
                    name="groupName"
                    id="groupName"
                    value={values.groupName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
									</FormItem>
										<FormItem label="Select Tasks for Your Group">
											<Transfer
												dataSource={this.state.mockData}
												showSearch
												filterOption={this.filterOption}
												targetKeys={this.state.targetKeys}
												onChange={this.handleChange}
												render={item => item.title}
											/>
										</FormItem>

									<FormItem>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                  >
                    Create
                  </Button>
                </FormItem>
              </Form>
            </Col>
          </Row>
        )}
      />
    );
  }
}
