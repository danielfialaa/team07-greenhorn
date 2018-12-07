import React from 'react';
import { Layout } from 'antd';
import { SiderMenu } from '../organisms/SiderMenu';
import { Footer } from '../atoms/Footer';
import { HeaderUser } from '../molecules/HeaderUser';

const { Header, Content } = Layout;

export const PageWrapper = ({ children }) => (
  <Layout className="container">
    <SiderMenu />
    <Layout>
			<Header style={{ background: '#3D6A52' }}>
        <HeaderUser title={''}></HeaderUser>
			</Header>
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="content-wrapper" style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          {children}
        </div>
      </Content>
      <Footer />
    </Layout>
  </Layout>
);
