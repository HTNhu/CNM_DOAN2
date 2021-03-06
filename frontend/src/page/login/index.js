import React  from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Row, Col, Form, Icon, Input, Button } from 'antd'
import openNotificationWithIcon from '../../component/openNotification'
// import bgBill from '../../assets/images/bgBill.jpg' 
function Login(props) {
    // console.log('prop login', props)
    const { form, history } = props
    const { getFieldDecorator } = form
   
    
    function handleSubmit(e) {
        e.preventDefault()
        // setLoading(true)
        props.form.validateFields((err, values) => {
           
            if (!err) {
                
                // console.log('Received values of form: ', values)
                const { username, password } = values
                if(username === 'admin') { //dnhap đỡ cho admin nha
                    localStorage.setItem('username', username)
                    localStorage.setItem('type', 'admin')
                    localStorage.setItem('name', "admin")
                    props.history.push('/manageCompany')
                    return
                } 
                props.login({
                    mutation: USER_LOGIN,
                    variables: {
                        username,
                        password
                    }
                })
                    .then(res => {
                        // console.log(res.data.login)
                        const { userId, type, token } = res.data.login
                        if (type && userId) {
                            localStorage.setItem('token', token)
                            localStorage.setItem('username', username)
                            localStorage.setItem('type', type)
                            localStorage.setItem('userId', userId)
                            openNotificationWithIcon('success', 'login', 'Login Success', 'Login Success')
                            const header = localStorage.getItem('type') === 'member'
                                ? '/payment'
                                : localStorage.getItem('type') === 'admin'
                                    ? '/manageCompany'
                                    : '/managebill'
                            props.history.push(header)
                        }
                    })
                    .catch(err1 => {
                       
                        let mess = ''
                        mess = 'Username or Password is not correct'

                        openNotificationWithIcon('error', 'login', 'Login Failed', mess)
                    })
            }
        })
    }
    return (
        // <div style={{backgroundImage: `url(${bgBill})`, width: '100%', height: '100%'}}>
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <Row id="layout-login">
                <Col
                    span={8} push={8}
                >
                    <div id="components-form-demo-normal-login"  style={{ margin: '0 auto' }}>
                        <Form
                            style={{
                                // opacity: 1.9,
                                padding: '24px',
                                background: '#fbfbfb',
                                border: '2px solid #89d1be',
                                borderRadius: '6px'
                            }}
                            className="login-form">
                            
                            <div className="login-form-header">
                            <img alt="logo PayBill" src="https://doancnm.s3.amazonaws.com/paybillLogo1.PNG" style={{
                                display: 'block',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                paddingBottom:'20px',
                                width: '70%'
                            }} />
                                <h4>Hello :)</h4>
                            </div>
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    valuePropName: 'defaultValue',
                                    initialValue: 'mem33',
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
                                        Đăng ký
                                </Button>
                                </p>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    onClick={handleSubmit}
                                >
                                    <Icon type="login" />
                                    Đăng nhập
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
        token
    }
  }
`
export default graphql(
    USER_LOGIN, {
    name: 'login',
    options: {}
}
)(Form.create({ name: 'normal_login' })(Login))