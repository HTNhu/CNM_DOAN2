import React from 'react'
import {  Layout, Avatar, Breadcrumb, Menu } from 'antd'
// import logo from '../../assets/images/logo.png'
import bg from '../../assets/images/bg.jpg'
function LayoutApp() {
  const { Content, Header} = Layout
  return (
<Layout className="layout" style={{ backgroundImage: `url(${bg})`}}>
    <Header>
      <div className="logo" />
      <div style={{display:'flex', justifyContent:'space-between'}}>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
      <Avatar size={50} shape="circle" style={{ backgroundImage: `url(${bg})`, float:'right' }} icon="user" />
      </div>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
    </Content>
  </Layout>

  )
}
export default LayoutApp