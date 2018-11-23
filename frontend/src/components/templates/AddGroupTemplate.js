import React from 'react';
import { Layout } from 'antd';
import { SiderMenu } from '../organisms/SiderMenu';
import { Footer } from '../atoms/Footer';
import { AddGroupForm } from '../organisms/AddGroupForm';

const { Header, Content } = Layout;

export const AddGroupTemplate = ({ tasks }) => (
  <AddGroupForm tasks={tasks}/>
);
