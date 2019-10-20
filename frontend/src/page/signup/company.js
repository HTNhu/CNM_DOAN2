import React from 'react'
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;



class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

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
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

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
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Số điện thoại">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Bạn cần nhập số điện thoại!' }],
          })(<Input addonBefore={prefixSelector} style={{ width: '50%' }} />)}
        </Form.Item>
        
        <Form.Item
          label={
            <span>
              Họ và Tên&nbsp;
              
            </span>
          }
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Bạn cần nhập họ và tên!', whitespace: true }],
          })(<Input style={{ width: '50%' }} />)}
        </Form.Item>
        
        <Form.Item
          label={
            <span>
              Địa chỉ&nbsp;
              
            </span>
          }
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Bạn cần nhập Địa chỉ!', whitespace: true }],
          })(<Input style={{ width: '50%' }} />)}
        </Form.Item>
        
        
        <Form.Item
          label={
            <span>
              Logo&nbsp;
              
            </span>
          }
        >
          {getFieldDecorator('Logo', {
            rules: [{ required: true, message: 'Bạn cần nhập Logo!', whitespace: true }],
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
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: 'Bạn cần nhập Usename!', whitespace: true }],
          })(<Input  style={{ width: '50%' }}/>)}
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
          })(<Input.Password onBlur={this.handleConfirmBlur} style={{ width: '50%' }}  />)}
        </Form.Item>
        
        

        
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
          <Button type="primary" htmlType="button" style={{ margin: 20 }}>
          <a href= "http://localhost:3000/signup">Trở về</a>
            </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);


function Company(){
  return(
    <>
    <center><h1>Company Singup</h1></center>
    <WrappedRegistrationForm />
    </>
  )
    
}
export default Company