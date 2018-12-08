import React from 'react';
import { Row, Col, Layout } from 'antd';
import { Footer } from '../atoms/Footer';
import { Spin, Icon } from 'antd';
import { TaskDetailForm } from '../organisms/TaskDetailForm';


const { Header, Content } = Layout;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export const TaskDetailTemplate = ({
  isLoading,
  isError,
  taskDetailed,
	attachments,
  DoneAttachments,
  relatedUsers,
  isAssignedToSelf,
}) => {
  if (isLoading) {
    return <Spin indicator={antIcon} />;
  }

  return (
    <div>
        <TaskDetailForm taskDetailed={taskDetailed} attachments={attachments} DoneAttachments={DoneAttachments} relatedUsers={relatedUsers} isAssignedToSelf={isAssignedToSelf}/>
    </div>
  );
};
