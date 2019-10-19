import React  from 'react'
// import {
//     Switch, Route
//     , Redirect
// } from 'react-router-dom'

import gql from 'graphql-tag'
// import { inject, observer } from 'mobx-react'
import { graphql } from 'react-apollo'
import { Row, Col, Form, Icon, Input, Button, Typography } from 'antd'
// import bg from '../../assets/images/paybillLogo.PNG'
// import { routers } from '../../routes'
import openNotificationWithIcon from '../../component/openNotification'
// import { from } from 'zen-observable'
// import LayoutPage from '../layout'
function Login(props) {
    console.log('prop login', props)
    const { Title } = Typography
    const { form, history } = props
    const { getFieldDecorator } = form
    // const { Link } = Anchor
    function handleSubmit(e) {
        e.preventDefault()
        // setLoading(true)
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                const { username, password } = values
                props.login({
                    mutation: USER_LOGIN,
                    variables: {
                        username,
                        password
                    }
                })
                    .then(res => {
                        console.log(res.data.login)
                        const { userId, type } = res.data.login
                        if (type && userId) {
                            localStorage.setItem('username', username)
                            localStorage.setItem('type', type)
                            openNotificationWithIcon('success', 'login', 'Login Success', 'Login Success')
                            console.log("sadsadsad")
                            props.history.push('/managebill')
                        }
                    })
                    .catch(err1 => {
                        // console.log(err1)
                        // const errors = err1.graphQLErrors.map(error => error.extensions.code)
                        let mess = ''
                        // if (errors[0] === '401') {
                        mess = 'Username or Password is not correct'
                        // }

                        // if (errors[0] === '404') {
                        // mess = 'Your account is not exist'
                        // }

                        // setLoading(false)

                        openNotificationWithIcon('error', 'login', 'Login Failed', mess)
                    })
            }
        })
    }
    return (
        // <div style={{backgroundColor: '#89d1be', height:'100%', width:'100%'}} >
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <Row id="layout-login">
                <Col
                    span={8} push={8}
                >
                    <div id="components-form-demo-normal-login" style={{ margin: '0 auto' }}>
                        <Form
                            style={{
                                padding: '24px',
                                background: '#fbfbfb',
                                border: '2px solid #89d1be',
                                borderRadius: '6px'
                            }}
                            className="login-form">
                            <div className="login-form-header">
                                <Title level={1}>Hello</Title>
                            </div>
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    valuePropName: 'defaultValue',
                                    initialValue: 'admin',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your username!'
                                        }
                                    ]
                                })(
                                    <Input
                                        prefix={
                                            <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                                        }
                                        placeholder="username"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    valuePropName: 'defaultValue',
                                    initialValue: '12345678',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your Password!'
                                        },
                                        {
                                            min: 1,
                                            message: 'Your password must be between 1 and 8 characters'
                                        },
                                        {
                                            max: 8,
                                            message: 'Your password must be between 1 and 8 characters'
                                        }
                                    ]
                                })(
                                    <Input
                                        prefix={
                                            <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                                        }
                                        type="password"
                                        placeholder="Password"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                <p>Bạn chưa có tài khoản?
                                <Button
                                        id='btnLogin'
                                        name='btn-show-register'
                                        type='link'
                                        size='large'
                                        onClick={() => {
                                            history.push('./signup')
                                        }}
                                    >
                                        Đăng kí
                                </Button>
                                </p>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    onClick={handleSubmit}
                                >
                                    <Icon type="login" />
                                    Log in
                            </Button>
                            </Form.Item>
                        </Form>

                    </div>
                </Col>
            </Row>
        </div>
        // </div>
    )
}
const USER_LOGIN = gql`
mutation ($username: String!, $password: String!){
    login(username: $username, password: $password ){
        userId
        type
    }
  }
`
export default graphql(
    USER_LOGIN, {
    name: 'login',
    options: {}
}
)(Form.create({ name: 'normal_login' })(Login))