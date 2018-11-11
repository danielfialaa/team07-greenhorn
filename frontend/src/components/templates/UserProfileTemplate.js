import React from 'react';
import { Layout } from 'antd';
import { SiderMenu } from '../organisms/SiderMenu';
import { Footer } from '../atoms/Footer';
import { UserProfileForm } from '../organisms/UserProfileForm';

const { Header, Content } = Layout;


export const UserProfileTemplate = ({ userId }) => (
          <UserProfileForm userId = {userId}/>
);
