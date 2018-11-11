import React from 'react';
import { TaskListTable } from '../organisms/TaskListTable';
import { SiderMenu } from '../organisms/SiderMenu';
import { Footer } from '../atoms/Footer';
import { Spin, Icon } from 'antd';
import { Layout } from 'antd';

const { Header, Content } = Layout;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export const UserTasksTemplate = ({
  isLoading,
  isError,
  tasks,
  error,
}) => {
  console.log(isLoading);
  console.log(tasks);
  if (isError && !isLoading) {
    // return <ErrorMessage error={error} />;
    // return <div> Error </div>
    console.log(isError);
    return <Spin indicator={antIcon} />
  }

  if (isLoading) {
    return <Spin indicator={antIcon} />
  }

  return (
    <TaskListTable tasks={tasks}/>
  );
};
