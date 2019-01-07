import React from 'react';
import { UserSettingsForm } from '../organisms/UserSettingsForm';
import { ChangePasswordForm } from '../organisms/ChangePasswordForm';
import { Spin, Icon } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export const UserSettingsTemplate = ({ userInfo, isLoading }) => {
  if (isLoading) {
    return <Spin indicator={antIcon} />;
  }

  return (
    <div>
      <UserSettingsForm userInfo={userInfo} />
      <ChangePasswordForm />
    </div>
  );
};
