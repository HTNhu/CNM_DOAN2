import { Form,  Input, Button, Modal } from 'antd';
import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import openNotificationWithIcon from '../../component/openNotification'
class Modal_ChangePassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }
    //   handleSubmit = e => {
    //     e.preventDefault();
    //     this.props.form.validateFields((err, values) => {
    //       if (!err) {
    //         console.log('Received values of form: ', values);
    //       }
    //     });

    //   };
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
    handleOk = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const { password } = values
                this.props.updateAccount({
                    mutation: UPDATE_ACCOUNT,
                    variables: {
                        type: localStorage.getItem('type'),
                        username: localStorage.getItem('username'),
                        password

                    }
                })
                    .then(res => {
                        console.log(res, "update")
                        if (res.data.updateAccount)
                            openNotificationWithIcon('success', 'success', 'Update Success', 'Update Success')
                        this.props.onClose()
                    })
                    .catch(err1 => {
                        console.log("sai rôi nha", err1)
                        // let mess = ''
                        // mess = 'Fail'

                        openNotificationWithIcon('error', 'create', 'update Failed', "Fail")
                    })
            }
        
    })
}
render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <Modal
            visible={this.props.visible}
            title="Đổi mật khẩu"
            onOk={this.handleOk}
            onCancel={this.props.onClose}
            footer={[
                <Button key="back" onClick={this.props.onClose}>
                    Return
            </Button>,
                <Button key="submit" type="primary" onClick={this.handleOk}>
                    Submit
            </Button>,
            ]}
        >
            <Form onSubmit={this.handleSubmit} className="login-form">
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
            </Form>
        </Modal>
    );
}
}
const UPDATE_ACCOUNT = gql`
mutation($type: String, $username: String, $password: String){
    updateAccount(type: $type, username: $username, password: $password)
  }
`
export default graphql(
    UPDATE_ACCOUNT, {
    name: 'updateAccount',
    options: {}
}
)(Form.create({ name: 'normal_login' })(Modal_ChangePassword))
