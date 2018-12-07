import React from 'react';
import { Layout } from 'antd';
import { SiderMenu } from '../organisms/SiderMenu';
import { Footer } from '../atoms/Footer';
import { UserList } from '../organisms/UserList';
import { UserListTable } from '../organisms/UserListTable';
import { HeaderUser } from '../molecules/HeaderUser';

import { Spin, Icon } from 'antd';

const { Header, Content } = Layout;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export const HomeTemplate = ({ isLoading, isError, users, currentUser, error }) => {
  if (isError && !isLoading) {
    // return <ErrorMessage error={error} />;
    // return <div> Error </div>
    console.log(isError);
    return <Spin indicator={antIcon} />;
  }

  if (isLoading) {
    return <Spin indicator={antIcon} />;
  }
  return (
    <div>
    <HeaderUser currentUser={currentUser} title={'USER LIST'} />
    <UserListTable users={users} />
    </div>
  );
};
