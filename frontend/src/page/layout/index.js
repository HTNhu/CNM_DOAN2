import React from 'react'
import { Layout, Icon, Menu, Dropdown, Avatar , Breadcrumb} from 'antd'
// import bg from '../../assets/images/paybillLogo1.PNG'
import {
     Link
} from 'react-router-dom'
import Breadcrumbs from '../../component/breadcrumb'
function LayoutPage(props) {
    const { menuKey } = props
    console.log("kr", menuKey)
    const dataTopMenuMem = [
        { title: 'THANH TOÁN', navigateTo: '/payment', name: 'payment' },
        { title: 'LỊCH SỬ GIAO DỊCH', navigateTo: '/history', name: 'history' }
    ]
    const dataTopMenuCompany = [
        { title: 'QUẢN LÝ HÓA ĐƠN', navigateTo: '/manageBill', name: 'managebill' },
        { title: 'LỊCH SỬ GIAO DỊCH', navigateTo: '/history', name: 'history' }
    ]
    const dataTopMenuAdmin = [
        { title: 'THỐNG KÊ', navigateTo: '/statistic', name: 'statistic' },
        { title: 'XÓA CÔNG TY', navigateTo: '/managecompany', name: 'managecompany' }
    ]
    const { Content, Header, Footer } = Layout

    const header = localStorage.getItem('type') === 'member'
        ? dataTopMenuMem 
        : localStorage.getItem('type') === 'admin'
        ? dataTopMenuAdmin
        : dataTopMenuCompany

    const onLogout = () => {
        localStorage.removeItem('username')
        props.history.push('/login')
    }
    const username = localStorage.getItem('username')
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
        <Layout style={{background: '#f6f8f6'}}>
            <Header className="header" style={{ display: 'flex', backgroundColor: 'white', position: 'fixed', zIndex: 1, width: '100%' }}
            >
                    <img alt='' src="https://doancnm.s3.amazonaws.com/paybillLogo1.PNG" style={{
                    // marginLeft: '24px',
                    float: 'left',
                    width: '200px',
                    height: '60px'
                }} ></img>
                <Menu
                    theme='light'
                    defaultSelectedKeys={header[0].name}
                    mode='horizontal'
                    className='menu'
                    style={{ marginLeft: '300px'}}
                >
                    {header.map(item => (
                        <Menu.Item
                            onClick={() => {
                                props.history.push(item.navigateTo)
                            }}
                            key={item.name}
                            className='menu-item'
                        >
                            <p style={{ fontSize: '16px', fontWeight: "bold" }}>{item.title}</p>
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
                        style={{
                            color: '#000000',
                            backgroundColor: '#ffffff',
                            marginLeft: '60px'
                        }} />
                </Dropdown>
                <span><p >{username}</p>  </span>
            </Header>
            <Content style={{ padding: '0 50px', marginTop: 64 }}>
                <div style={{ margin: '16px 0' }}>
                <Breadcrumbs >
                    {header.map(({title, navigateTo }) => (
                        <Link key={navigateTo} to={navigateTo}>
                            <Breadcrumb.Item> {title}</Breadcrumb.Item>
                        </Link>
                        
                    ))}
                </Breadcrumbs>
                </div>
                <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
                    {props.children}
                </div>

            </Content>
            <Footer style={{ textAlign: 'center',background: '#f6f8f6'}} >PayBill ©2019 Created by Team25</Footer>
        </Layout >
    )
}
export default LayoutPage

