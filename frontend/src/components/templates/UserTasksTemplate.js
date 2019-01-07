import React from 'react';
import { TaskListTable } from '../organisms/TaskListTable';
import { Spin, Icon } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export const UserTasksTemplate = ({
  isLoading,
  isError,
  tasks,
  currentUser,
}) => {
  if (isError && !isLoading) {
    return <Spin indicator={antIcon} />
  }

  if (isLoading) {
    return <Spin indicator={antIcon} />
  }

  return (
    <div>
    <div style={{float:'left'}}><h1>User Tasks</h1></div>
    <TaskListTable tasks={tasks} currentUser={currentUser} />
    </div>
  );
};
