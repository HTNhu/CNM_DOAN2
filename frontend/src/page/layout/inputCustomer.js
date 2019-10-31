import { Form, Icon,  Button, Modal, message, Upload } from 'antd';
import React from 'react'
import {OutTable, ExcelRenderer} from 'react-excel-renderer';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import openNotificationWithIcon from '../../component/openNotification'
import * as compose from 'lodash.flowright'
class CusExel extends React.Component {
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
      e.preventDefault()
      if(this.state.listCustomer.length === 0){
        // console.log("Trước")
        openNotificationWithIcon('error','error', 'Fail','Danh sách khách hàng không hợp lệ')
      }else{
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                // const { password } = values
                this.props.updateListCustomer({
                    mutation: UPDATE_LISTCUSTOMER,
                    variables: {
                        username: localStorage.getItem('username'),
                        lstCustomer: this.state.listCustomer

                    }
                })
                    .then(async res => {
                        console.log(res, "update", this.props)
                        if (res.data.updateListCustomerCompany)
                        this.props.getCompanyByUsername.refetch({ variables: localStorage.getItem('username')})
                       openNotificationWithIcon('success', 'success', 'Update Success', 'Update Success')

                            this.props.onClose()

                    })
                    .catch(err1 => {
                        // console.log("sai rôi nha", err1)
                        // let mess = ''
                        // mess = 'Fail'

                        openNotificationWithIcon('error', 'create', 'update Failed', "Fail")
                    })
            }
        
    })
  }
}
render() {
  async function  convertToJSON(array) {
    // console.log("arrr row", array)
  var headers = ['id', 'phone', 'name', 'address']
   if (headers.length !== 4) {
     message.error("Dũ liệu không hợp lệ") 
     return []
   }
   var jsonData = [];
     for ( var i = 1, length = array.length -1; i < length; i++ )
   {
 
     var myRow = array[i].join();
     var row = myRow.split(',');
    
     if (row.length !== 4) {
       message.error("Dữ liệu không hợp lệ") 
       return []
     }
     var data = {};
   for ( var x = 0; x < row.length; x++ )
     {
       if(row[x] === '') {
        //  console.log("json", jsonData) 
         message.error("Dữ liệu không được rỗng") 
         return []
       }
       data[headers[x]]= row[x]
     }
     jsonData.push(data)
   }
  //  console.log("json", jsonData) 
   return jsonData;
 };
    const readExel = async(info) => {
        if (info.file.status !== 'uploading') {
          // console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
          await ExcelRenderer(info.file.originFileObj, async(err, resp) => {
            if(err){
              // console.log(err);            
            }
            else{
              this.setState({
                cols: resp.cols,
                rows: resp.rows,
                listCustomer: await convertToJSON(resp.rows)
              })
            }
            // console.log(this.state)
          })
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    const beforeUploadExel = (file) => {
        // console.log(file, "file before")
        const isJpgOrPng = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        if (!isJpgOrPng) {
          message.error('You can only upload exel file!');
        }
        // const isLt2M = file.size / 1024 / 1024 < 2;
        // if (!isLt2M) {
        //   message.error('Image must smaller than 2MB!');
        // }
        return isJpgOrPng ;
      }
      const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
          authorization: 'authorization-text',
        }
      }
    // const { getFieldDecorator } = this.props.form;
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
            <Form.Item label="Danh sách khách hàng" >
          <Upload 
          multiple= {false}
          onPreview ={() => this.setState({
            pre: true
          }) }
          accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          beforeUpload={beforeUploadExel}
          {...props} onChange={readExel}>
    <Button>
      <Icon type="upload" /> Click to Upload List Customer
    </Button>
  </Upload> 
  {this.state.pre && <OutTable data={this.state.rows} 
          columns={this.state.cols} 
          tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />}
          </Form.Item>
            </Form>
        </Modal>
    );
}
}
const UPDATE_LISTCUSTOMER = gql`
mutation($username: String, $lstCustomer: [CustomerInput]){
    updateListCustomerCompany(username: $username, lstCustomer: $lstCustomer)
  }
`
const GET_COMPANY_BYUSERNAME = gql`
query($username: String!){
   getCompanyByUsername(username:$username){
  userId
    name
    username
    logo
    address
    phone
    password
    createdAt
    updatedAt
    service
    lstCustomer{
     name
     phone
     address
   }
  }
  }`



export default compose(
    graphql(
    UPDATE_LISTCUSTOMER, {
    name: 'updateListCustomer',
    options: {}
}
),
graphql(
    GET_COMPANY_BYUSERNAME, {
    name: 'getCompanyByUsername',
    options: {
      fetchPolicy: 'no-cache',
        variables: {
            username: localStorage.getItem('username')
        }
    }
}
)
)(Form.create({ name: 'normal_update' })(CusExel))
