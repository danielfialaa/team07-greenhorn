import React from 'react';
import { Layout } from 'antd';
import { SiderMenu } from '../organisms/SiderMenu';
import { Footer } from '../atoms/Footer';
import { UserSettingsForm } from '../organisms/UserSettingsForm';
import { ChangePasswordForm } from '../organisms/ChangePasswordForm';
import { Spin, Icon } from 'antd';
import { HeaderUser } from '../molecules/HeaderUser';

const { Header, Content } = Layout;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export const UserSettingsTemplate = ({ userInfo, isLoading }) => {
  if (isLoading) {
    return <Spin indicator={antIcon} />;
  }

const currenUser = [{...userInfo}];
console.log('userInfo >>>>> ', userInfo);
  return (
    <div>
      <HeaderUser currentUser={currenUser} title={''} />
      <UserSettingsForm userInfo={userInfo} />
      <ChangePasswordForm />
    </div>
  );
};
