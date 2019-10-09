import React from 'react'
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom'
import { Layout, Avatar, Menu } from 'antd'
import login from './login'
import signup from './signup'
import signupCom from './signup/company'
import signupMem from './signup/member'
import payment from './payment'
import bg from '../assets/images/bg.jpg'
import history from './history'
import managecompany from './manageCompany'
import managebill from './managebill'
function Root(props) {
    console.log("prop", props)
    const { Content, Header } = Layout
    const routes = [
        {
            path: '/payment',
            component: 'payment',
            breadcrumbName: 'Thanh Toán',
            exact: true
        },
        {
            path: '/history',
            component: 'history',
            breadcrumbName: 'Lịch sử giao dịch',
            exact: true
        },
        {
            path: '/managebill',
            component: 'managebill',
            breadcrumbName: 'Quản lý hóa đơn',
            exact: true
        },
        {
            path: '/managecompany',
            component: 'managecompany',
            breadcrumbName: 'Quản lý công ty',
            exact: true
        }
    ]
    const menuOnclick = ({ item, key, keyPath }) => {
        // props.history.push('./'+key)
        console.log(item)
    }
    return (
        <div style={{ backgroundImage: `url(${bg})`, height: '750px' }}>

            <BrowserRouter>
                <Layout className="layout" style={{ backgroundImage: `url(${bg})` }}>
                    <Header>
                        <div className="logo" />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            {/* <Router> */}
                            <Menu
                                // defaultSelectedKeys={}
                                theme="dark"
                                mode="horizontal"
                                style={{ lineHeight: '64px' }}
                                onClick={menuOnclick}
                            >
                                {routes.map((route, idx) =>
                                    (<Menu.Item key={route.component}>
                                        <NavLink to={route.path}>{route.breadcrumbName}</NavLink>
                                    </Menu.Item>))}
                            </Menu>
                            {/* </Router> */}
                            <Avatar size={50} shape="circle" style={{ backgroundImage: `url(${bg})`, float: 'right' }} icon="user" />
                        </div>
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
                    </Content>
                </Layout>

                <Switch>
                    <Route exact path="/" component={login} />
                    <Route
                        path='/signup'
                        component={signup} />
                    <Route
                        path='/company'
                        component={signupCom} />
                    <Route
                        path='/member'
                        component={signupMem} />
                    <Route
                        path='/payment'
                        component={payment} />
                    <Route
                        path='/history'
                        component={history} />
                    <Route
                        path='/managecompany'
                        component={managecompany} />
                    <Route
                        path='/managebill'
                        component={managebill} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}
export default Root