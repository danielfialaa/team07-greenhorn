import React from 'react';
import { TaskListTable } from '../organisms/TaskListTable';
import { Spin, Icon } from 'antd';
import { Layout } from 'antd';

const { Header, Content } = Layout;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export const UserTasksTemplate = ({
  isLoading,
  isError,
  tasks,
  currentUser,
  error,
}) => {
  console.log('isLoading: ',isLoading);
  if (isError && !isLoading) {
    // return <ErrorMessage error={error} />;
    // return <div> Error </div>
    console.log(isError);
    return <Spin indicator={antIcon} />
  }

  if (isLoading) {
    return <Spin indicator={antIcon} />
  }


  //<HeaderUserHomePage currentUser={currentUser} />
  return (
    <div>
    
    <TaskListTable tasks={tasks} currentUser={currentUser} />
    </div>
  );
};
