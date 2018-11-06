import React from 'react';
import { Layout } from 'antd';
import { SiderMenu } from '../organisms/SiderMenu';
import { Footer } from '../atoms/Footer';
import { UserSettingsForm } from '../organisms/UserSettingsForm';
import { ChangePasswordForm } from '../organisms/ChangePasswordForm';

const { Header, Content } = Layout;

export const UserSettingsTemplate = ({ userInfo }) => (
  <div>
  <div>DATA: {userInfo}</div>
    <UserSettingsForm userInfo={userInfo}/>
    <ChangePasswordForm/>
  </div>
);
