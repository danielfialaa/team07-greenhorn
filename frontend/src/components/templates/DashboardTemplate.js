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

  if(!tbdTasks || !allTasks || !doneTasks) {
    console.log("SPIIIN");
    console.log(tbdTasks);
    console.log(allTasks);
    console.log(doneTasks);
    console.log(currentUser);
    console.log(tasks);
    return <Spin indicator={antIcon} />;
  }

  console.log(tbdTasks);
  console.log(allTasks);
  console.log(doneTasks);
  console.log(currentUser);
  console.log(tasks);
  return (
    <div>
        <DashboardTasks allTasks={allTasks} isLoading={isLoading} tbdTasks={tbdTasks} doneTasks={doneTasks} tasks={tasks} currentUser={currentUser}/>
    </div>
  );
};
