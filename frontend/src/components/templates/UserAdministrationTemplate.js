import React from 'react';
import { Row, Col, Layout } from 'antd';
import { SiderMenu } from '../organisms/SiderMenu';
import { Footer } from '../atoms/Footer';
import { UserAdministrationForm } from '../organisms/UserAdministrationForm';
import { AssignTaskForm } from '../organisms/AssignTaskForm';
import { TaskListTable } from '../organisms/TaskListTable';
import { Spin, Icon } from 'antd';
import { HeaderUser } from '../molecules/HeaderUser';

const { Header, Content } = Layout;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export const UserAdministrationTemplate = ({
  userInfo,
  taskList,
  tasks,
  userId,
  currentUserId,
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
        <h2>Assign New Task</h2>
        <Col>
          <AssignTaskForm
            taskList={taskList}
            requestorList={requestorList}
            userId={userId}
          />
        </Col>
      </Row>
      <Row>
        <h2>User Task History</h2>
        <Col>
          <TaskListTable tasks={tasks} currentUser={currentUser} />
        </Col>
      </Row>
    </div>
  );
};
