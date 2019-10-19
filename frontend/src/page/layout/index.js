import React, {Suspense, lazy}  from 'react'
import { Layout, Icon, Menu, Dropdown, Breadcrumb,  Avatar } from 'antd'
import bg from '../../assets/images/paybillLogo.PNG'
import {
     Switch, Redirect, Route
} from 'react-router-dom'
import Signup from '../signup'
import Login from '../login'
// import {routers} from '../../routes'
function LayoutPage(props) {
    const { menuKey } = props
    console.log("kr",menuKey)
    const dataTopMenuMem = [
        { title: 'THANH TOÁN', navigateTo: '/payment', name: 'payment' },
        { title: 'LỊCH SỬ GIAO DỊCH', navigateTo: '/history', name: 'history' }
    ]
    const dataTopMenuCompany = [
        { title: 'QUẢN LÝ HÓA ĐƠN', navigateTo: '/manageBill', name: 'managebill' },
        { title: 'LỊCH SỬ GIAO DỊCH', navigateTo: '/history', name: 'history' }
    ]
    // const dataTopMenuAdmin = [
    //     { title: 'THỐNG KÊ', navigateTo: '/statistic', name: 'statistic' },
    //     { title: 'XÓA CÔNG TY', navigateTo: '/managecompany', name: 'managecompany' }
    // ]
    const { Content, Header } = Layout

    const header =  localStorage.getItem('type') === 'member'
        ? dataTopMenuMem 
        : dataTopMenuCompany
    
    const onLogout = () => {
        localStorage.removeItem('username')
        props.history.push('/login')
    }
    const username =localStorage.getItem('username')
    const menu = (
        <Menu>
            <Menu.Item>
                <Icon type="info" />
                <span>{username}</span>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item onClick={onLogout}>
                <Icon type="logout" />
                <span>Log out</span>
            </Menu.Item>
        </Menu>
    )
    // const auth = () =>
     
    return (
        username === null ? 
        <Switch>
      <Route
        path='/login'
        render={() => {
          const Component = lazy(() => import(`../login`))
          return (
            <Login {...props}>
                <Suspense fallback={null}></Suspense>
              <Component {...props} />
            </Login>
          )
        }}
      /> 
       <Route
        path='/signup'
        render={() => {
          const Component = lazy(() => import(`../signup`))
          return (
            <Signup {...props}>
                <Suspense fallback={null}></Suspense>
              <Component {...props} />
            </Signup>
          )
        }}
      /> 
    <Redirect to='/login' /> 
    </Switch>
      :  
          <Layout>
              <Header className="header" style={{ display: 'flex', backgroundColor: 'white', height: '100px' }}
              >
                  <div className="logo" style={{
                      // backgroundImage: `url(${bg}`,
                      width: '120px',
                      height: '100px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      margin: '16px 24px 16px 0',
                      float: 'left'
                  }}><img alt='' src={bg} style={{
                      width: '200px',
                      height: '80px'
                  }} ></img>
                  </div>
                  {/* <div > */}
  
                  {/* <Col md={{ span: 18 }} lg={{ span: 20 }}>
                          <Row type='flex' justify='space-between' align='middle'> */}
                  <Menu
                      theme='light'
                      defaultSelectedKeys={[menuKey]}
                      mode='horizontal'
                      className='menu'
                      style={{ lineHeight: '24px', margin: '50px -100px 16px 500px' }}
                  >
                      {header.map(item => (
                          <Menu.Item
                              onClick={() => {
                                  props.history.push(item.navigateTo)
                              }}
                              key={item.name}
                              className='menu-item'
                          >
                              <p style={{ fontSize: '20px', fontWeight: "bold" }}>{item.title}</p>
                          </Menu.Item>
                      ))}
  
                  </Menu>
  
                  <Dropdown
  
                      key='0'
                      overlay={menu}
                      trigger={['click']}
                      placement='bottomRight'
                  >
                    <Avatar icon='user' size='large' 
                      style={{ color: '#000000', 
                      backgroundColor: '#ffffff', 
                      margin: '32px 0px 10px 250px'}} ></Avatar>
                  </Dropdown>
                  <span><p style={{marginTop: '22px' }}>{username}</p>  </span>
                
                  {/* <Button type='primary' onClick={() => history.push('/login')}>Đăng nhập</Button> */}
                  {/* </Row>
                      </Col> */}
  
                  {/* </div> */}
              </Header>
              <Content style={{ padding: '0 50px', marginTop: 64 }}>
                  <Breadcrumb style={{ margin: '16px 0' }}>
                      <Breadcrumb.Item>Home</Breadcrumb.Item>
                      <Breadcrumb.Item>List</Breadcrumb.Item>
                      <Breadcrumb.Item>App</Breadcrumb.Item>
                  </Breadcrumb>
                  <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
                      {props.children}
                  </div>
  
              </Content>
                  </Layout >  
    )
}
export default LayoutPage

