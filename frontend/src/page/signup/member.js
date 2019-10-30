import React from 'react'
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Button,
  Col,
  Row,
} from 'antd';
import gql from 'graphql-tag'

import { graphql } from 'react-apollo'

import openNotificationWithIcon from '../../component/openNotification'
// const AutoCompleteOption = AutoComplete.Option;



class Member extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
    }
}
  handleSubmit =  e => {
    e.preventDefault()
    // setLoading(true)
    this.props.form.validateFields(async(err, values) => {
      // console.log(err, "err")
      if (!err) {
        // console.log('Received values of form: ', values)
        const { phone, name, address, username, password } = values
        await this.props.createMember({
          mutation: CREATE_MEMBER,
          variables: {
            memInput: {
              phone,
              name,
              address,
              username,
              password
            }
          }
        })
          .then(res => {
            // console.log("ểtrterte", res)
            if(res.data.createMember === true){
              openNotificationWithIcon('success', 'success', 'Đăng ký thành viên', 'Đăng ký thành viên thành công')

              this.props.history.push('./login')
            }
            else openNotificationWithIcon('error', 'error', 'Signup Failed', 'Member existed')
          })
          .catch(err1 => {
            console.log("sai rồi na")
            openNotificationWithIcon('error', 'error', 'Signup Failed', 'Member existed')
            // // console.log(err1)
            // // const errors = err1.graphQLErrors.map(error => error.extensions.code)
            // let mess = ''
            // // if (errors[0] === '401') {
            // mess = 'Member existed'
            // // }

            // // if (errors[0] === '404') {
            // // mess = 'Your account is not exist'
            // // }

            // // setLoading(false)

            // openNotificationWithIcon('error', 'error', 'Signup Failed', mess)
          })
    }})
  }
handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
      };

    compareToFirstPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    };

    validateToNextPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    };

    handleWebsiteChange = value => {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
      }
      this.setState({ autoCompleteResult });
    }

    render() {
      const { getFieldDecorator } = this.props.form;
      // const { autoCompleteResult } = this.state;
console.log("props", this.props)
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
      return (
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <Row id="layout-login" >
            <Col
                span={12} push={6}
            >
                <div id="components-form-demo-normal-login" style={{ margin: '0 auto' }}>
          <Form   style={{
                                marginBottom:'20px',
                                padding: '24px',
                                paddingBottom: '5px',
                                background: '#fbfbfb',
                                border: '2px solid #89d1be',
                                borderRadius: '6px',
                                height: 'auto',
                                width: '100%'
                            }}
           {...formItemLayout} onSubmit={this.handleSubmit}>
              <div className="login-form-header">
                            <img alt="logo PayBill" src="https://doancnm.s3.amazonaws.com/paybillLogo1.PNG" style={{
                                display: 'block',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                paddingBottom:'20px',
                                width: '50%'
                            }} />
                              <h2><center>ĐĂNG KÝ THÀNH VIÊN</center></h2>
                            </div>
            
            <Form.Item label="Số điện thoại">
              {getFieldDecorator('phone', {
                rules: [
                  { required: true, message: 'Bạn cần nhập số điện thoại!' },
                  {
                    pattern: new RegExp(/^0+\d{9}$/g),
                    message: "Không đúng định dạng!" 
                  }
                  
                ],
              })(<Input  style={{ width: '50%' }} />)}
            </Form.Item>
            <Form.Item
              label={
                <span>
                  Họ và Tên&nbsp;
              </span>
              }
            >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Bạn cần nhập họ và tên!', whitespace: true },
                  {
                    max: 40,
                    message: "Vượt quá số kí tự" 
                  },
                  {
                    pattern: new RegExp(/^[a-zA-Z]+$/gi),
                    message: "Không đúng định dạng!" 
                  }
                ]
              })(<Input style={{ width: '50%' }} />)}
            </Form.Item>

            <Form.Item
              label={
                <span>
                  Địa chỉ&nbsp;
    
              </span>
              }
            >
              {getFieldDecorator('address', {
                rules: [
                  { required: true, message: 'Bạn cần nhập Địa chỉ!', whitespace: true },
                  {
                    max: 40,
                    message: "Vượt quá số kí tự" 
                  }
                ],
              })(<Input style={{ width: '50%' }} />)}
            </Form.Item>
            <Form.Item
              label={
                <span>
                  Usename&nbsp;
                <Tooltip title="Bạn muốn người khác gọi bạn là gì?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Bạn cần nhập Usename!', whitespace: true }],
              })(<Input style={{ width: '50%' }} />)}
            </Form.Item>
            <Form.Item label="Password" hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Bạn cần nhập password!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password style={{ width: '50%' }} />)}
            </Form.Item>
            <Form.Item label="Confirm Password" hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Bạn cần nhập lại password!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input.Password onBlur={this.handleConfirmBlur} style={{ width: '50%' }} />)}
            </Form.Item>
           
            <Form.Item {...tailFormItemLayout} >
              <Button type="primary" htmlType="submit">
                Đăng ký
            </Button>
              <Button type="primary" htmlType="button" style={{ margin: 20 }}>
                <a href="http://ec2-user@ec2-3-85-86-20.compute-1.amazonaws.com:3006/login">Trở về</a>
              </Button>


            </Form.Item>
          </Form>
          </div>
          </Col>
          </Row>
        </div>
      );
    }
  }
  const CREATE_MEMBER = gql`
mutation ($memInput: MemberInput!){
    createMember(memInput: $memInput)
  }
`
  export default graphql(
    CREATE_MEMBER, {
      name: 'createMember',
      options: { }
    }
  )(Form.create({ name: 'register' })(Member))
