import React from 'react';
import { Spin, Icon } from 'antd';
import { TaskDetailForm } from '../organisms/TaskDetailForm';


const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export const TaskDetailTemplate = ({
  taskDetailed,
	attachments,
  relatedUsers,
  isAssignedToSelf,
  currentUser,
}) => {
    if(currentUser.length === 0 || taskDetailed.length === 0) {
      return <Spin indicator={antIcon} />;
    }

  return (
    <div>
      <TaskDetailForm taskDetailed={taskDetailed} attachments={attachments} relatedUsers={relatedUsers} isAssignedToSelf={isAssignedToSelf} currentUser={currentUser}/>
    </div>
  );
};
