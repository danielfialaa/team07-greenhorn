import React from 'react';
import { DashboardTasks } from '../organisms/DashboardTasks';
import { Spin, Icon } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export const DashboardTemplate = ({ isLoading, isError, tasks, allTasks, tbdTasks, doneTasks, currentUser, error }) => {
  if (isError || isLoading) {
    return <Spin indicator={antIcon} />;
  }

  if(!tbdTasks || !allTasks || !doneTasks) {
    return <Spin indicator={antIcon} />;
  }
  return (
    <div>
        <DashboardTasks allTasks={allTasks} isLoading={isLoading} tbdTasks={tbdTasks} doneTasks={doneTasks} tasks={tasks} currentUser={currentUser}/>
    </div>
  );
};
