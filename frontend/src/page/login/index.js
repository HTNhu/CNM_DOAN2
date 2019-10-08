import React from 'react'
// import {  Route } from 'react-router-dom'
// import signup from '../signup'
// import { withApollo } from 'react-apollo'
// import gql from 'graphql-tag'
// import { inject, observer } from 'mobx-react'
import { Row, Col, Form, Icon, Input, Button, Typography } from 'antd'

function Login(props) {
    console.log(props)
    const { Title } = Typography
    const { form, history } = props
    const { getFieldDecorator } = form
    // const { Link } = Anchor
    return (
        <div>
            <Row id="layout-login">
                <Col
                    span={8} push={6}
                >
                    <div id="components-form-demo-normal-login" style={{ margin: '0 auto' }}>
                        <Form
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
    )
}
export default (Form.create({ name: 'normal_login' })(Login))