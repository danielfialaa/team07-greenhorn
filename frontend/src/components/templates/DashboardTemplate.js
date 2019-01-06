import React from 'react';
import { Layout } from 'antd';
import { DashboardTasks } from '../organisms/DashboardTasks';
import { Spin, Icon } from 'antd';

const { Header, Content } = Layout;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export const DashboardTemplate = ({ isLoading, isError, tasks, allTasks, tbdTasks, doneTasks, currentUser, error }) => {
  if (isError || isLoading) {
    // return <ErrorMessage error={error} />;
    // return <div> Error </div>
    console.log(isError);
    return <Spin indicator={antIcon} />;
  }
  return (
    <div>
        <DashboardTasks allTasks={allTasks} isLoading={isLoading} tbdTasks={tbdTasks} doneTasks={doneTasks} tasks={tasks} currentUser={currentUser}/>
    </div>
  );
};
