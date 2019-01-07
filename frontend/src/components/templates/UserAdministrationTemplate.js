import React from 'react';
import { Row, Col } from 'antd';
import { UserAdministrationForm } from '../organisms/UserAdministrationForm';
import { AssignTaskForm } from '../organisms/AssignTaskForm';
import { TaskListTable } from '../organisms/TaskListTable';
import { Spin, Icon } from 'antd';
import { GroupForm } from '../organisms/AssignUserToGroupForm';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export const UserAdministrationTemplate = ({
  userInfo,
  taskList,
  tasks,
  userId,
  isLoading,
  requestorList,
  currentUser,
}) => {
  if (isLoading) {
    return <Spin indicator={antIcon} />;
  }

  return (
    <div>
      <h1>User Administration Profile</h1>
      <Row>
        <Col>
          <UserAdministrationForm userInfo={userInfo} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Assign new task</h2>
          <AssignTaskForm
            taskList={taskList}
            requestorList={requestorList}
            userId={userId}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Assign user to a group</h2>
          <GroupForm userId={userId} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>User task history</h2>
          <TaskListTable tasks={tasks} currentUser={currentUser} />
        </Col>
      </Row>
    </div>
  );
};
