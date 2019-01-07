import React from 'react';
import { UserListTable } from '../organisms/UserListTable';

import { Spin, Icon } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export const HomeTemplate = ({ isLoading, isError, users, currentUser, error }) => {
  if (isError && !isLoading) {
    return <Spin indicator={antIcon} />;
  }

  if (isLoading) {
    return <Spin indicator={antIcon} />;
  }
  return (
    <div>
    <UserListTable users={users} />
    </div>
  );
};
