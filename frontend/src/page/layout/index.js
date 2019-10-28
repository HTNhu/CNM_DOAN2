import React, { useState } from 'react'
import { Layout, Icon, Menu, Dropdown, Avatar, Breadcrumb, Badge } from 'antd'
// import bg from '../../assets/images/paybillLogo1.PNG'
import {
    Link
} from 'react-router-dom'
import Breadcrumbs from '../../component/breadcrumb'
import UserInfo from './userInfo'
import ModalChangePassword from './changePassword'
import CusExel from './inputCustomer'
// import Schedule from './schedule'
function LayoutPage(props) {

    const { menuKey } = props
    console.log("kr", menuKey)
    const dataTopMenuMem = [
        { title: 'THANH TOÁN', navigateTo: '/payment', name: 'payment' },
        { title: 'LỊCH SỬ GIAO DỊCH', navigateTo: '/history', name: 'history' },
        { title: 'ĐẶT LỊCH', navigateTo: '/schedule', name: 'schedule' }
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
        localStorage.clear()
        props.history.push('/login')
    }
    const username = localStorage.getItem('username')
    const [visible, setVisible] = useState(false)
    const [visibleModal, setVisibleModal] = useState(false)
    const [visibleModalUpdate, setvisibleModalUpdate] = useState(false)
    const showDrawer = () => {
        setVisible(true)
    };
    const showModal = () => {
        setVisibleModal(true)
    };
    const onClose = () => {
        setVisible(false)
        setVisibleModal(false)
        setvisibleModalUpdate(false)
    };
    const menu = (
        <Menu>
            <Menu.Item onClick={showDrawer}>
                <Icon type="info" onClick={showDrawer} />
                <span onClick={showDrawer}>{username}</span>
            </Menu.Item>
            {localStorage.getItem('type') === 'company'
                ?<Menu.Item onClick={() => setvisibleModalUpdate(true)}>
                    <Icon type="import"  />
                    <span >Cập nhật danh sách khách hàng</span>
                </Menu.Item>
                :<Menu.Item onClick={() => props.history.push('./schedule')}>
                     <Icon type="import" onClick={() => props.history.push('./schedule')} />
                    <span onClick={() => props.history.push('./schedule')}>Đặt nhắc nhở</span>

                </Menu.Item>
            }
            <Menu.Divider />
            <Menu.Item onClick={showModal}>
                <Icon type="setting" onClick={showModal} />
                <span>Đổi mật khẩu</span>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item onClick={onLogout}>
                <Icon type="logout" />
                <span>Log out</span>
            </Menu.Item>
        </Menu>
    )

    return (
        <Layout style={{ background: '#f6f8f6' }}>
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
                    style={{ marginLeft: '300px' }}
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
                {localStorage.getItem('type') === 'member' && <Badge count={1} style={{ marginTop: '10px' }}>
                    <Avatar icon='bell' size='large'
                        style={{
                            color: '#000000',
                            backgroundColor: '#ffffff',
                            marginLeft: '60px'
                        }} />
                </Badge>}

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
                        {header.map(({ title, navigateTo }) => (
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
            <Footer style={{ textAlign: 'center', background: '#f6f8f6' }} >PayBill ©2019 Created by Team25</Footer>
            <ModalChangePassword visible={visibleModal} onClose={onClose}></ModalChangePassword>
            <UserInfo visible={visible} onClose={onClose} ></UserInfo>

            <CusExel visible={visibleModalUpdate} onClose={onClose}></CusExel>

        </Layout >

    )
}
export default LayoutPage

