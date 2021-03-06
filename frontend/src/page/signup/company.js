import React from 'react'
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Select,
  Upload,
  message,
  Button,
  Col,
  Row,
} from 'antd'

import {OutTable, ExcelRenderer} from 'react-excel-renderer';

import gql from 'graphql-tag'
import { Client } from '../../tools/apollo'
import { graphql } from 'react-apollo'
// import readXlsxFile from 'read-excel-file'
import openNotificationWithIcon from '../../component/openNotification'
const { Option } = Select;
// const AutoCompleteOption = AutoComplete.Option;

class Company extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pre: false,
      services: [],
      confirmDirty: false,
      autoCompleteResult: [],
      _spread : {},
      rows: [],
      cols: [],
      // listCustomer: []
    }
  }
  GET_ALL_SERVICE = gql`
query{
    getAllService{
    id
    name
  }
}
`
  componentWillMount =  async() => {
    console.log("vo")
    // const { currentPage, inputSearch } = this.state
      await this.refetchData()
    // this.setupCount()
  }
  refetchData = async () => {
     await Client.query({
      query: this.GET_ALL_SERVICE,
    })
      .then(result => {
        console.log("sds", result)
        this.setState({
          services: result.data.getAllService
        })
        
      })
      .catch((e) => { console.log(e)})
    // console.log('rowData', this.state.rowData)
  }
  handleSubmit = e => {
    e.preventDefault()
    if(this.state.listCustomer.length === 0){
      // console.log("Trước")
      openNotificationWithIcon('error','error', 'Fail','Danh sách khách hàng không hợp lệ')
    }else{
     
      // setLoading(true)
      this.props.form.validateFields(async (err, values) => {
        // console.log(err, "err")
        // console.log('Received values of form: errrr ', values,this.state.listCustomer )
        if (!err) {
         
          const { phone, name, address, username, password, service  } = values
          const logo =  this.state.imageUrl 
          // console.log('Received values of form: ', values,logo)
          await this.props.createCompany({
            mutation: CREATE_COMPANY,
            variables: {
              compInput: {
                phone,
                name,
                address,
                username,
                password,
                service,
                logo: logo === undefined ? "http://cdn.onlinewebfonts.com/svg/img_276187.png" : logo,
                lstCustomer:  this.state.listCustomer
              }
            }
          })
            .then(res => {
  
              if (res.data.createCompany === true) {
                openNotificationWithIcon('success', 'success', 'Đăng ký Công ty', 'Đăng ký công ty thành công')
  
                this.props.history.push('./login')
              }
              else openNotificationWithIcon('error', 'error', 'Signup Failed', 'Company existed')
            })
            .catch(err1 => {
              // console.log("sai rồi na")
              openNotificationWithIcon('error', 'error', 'Signup Failed', 'Company existed')
  
            })
        }
      })
    }
    
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
  };
  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  render() {
    const { getFieldDecorator } = this.props.form;

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
    
    const getBase64 = (img, callback) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    }
    
    const beforeUpload = (file) => {
      console.log(file, "file before")
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    }
    const beforeUploadExel = (file) => {
      console.log(file, "file before")
      const isJpgOrPng = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      if (!isJpgOrPng) {
        message.error('You can only upload exel file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng ;
    }
 
    const handleChange = async(info, e) => {
      console.log("change", info, e)
      if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
      }
      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, imageUrl =>
          this.setState({
            imageUrl,
            loading: false,
          }),
        );
      }
    };
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state
console.log("state" , this.state)
const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  }
}
 async function  convertToJSON(array) {
   console.log("arrr row", array)
 var headers = ['id', 'phone', 'name', 'address']
  if (headers.length !== 4) {
    message.error("Dũ liệu không hợp lệ") 
    return []
  }
  var jsonData = [];
    for ( var i = 1, length = array.length-1; i < length; i++ )
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
        console.log("json", jsonData) 
        message.error("Dữ liệu không được rỗng") 
        return []
      }
      data[headers[x]]= row[x]
    }
    jsonData.push(data)
  }
  console.log("json", jsonData) 
  return jsonData;
};
  const readExel = async(info) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      await ExcelRenderer(info.file.originFileObj, async(err, resp) => {
        if(err){
          console.log(err);            
        }
        else{
          this.setState({
            cols: resp.cols,
            rows: resp.rows,
            listCustomer: await convertToJSON(resp.rows)
          })
        }
        console.log(this.state)
      })
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
  console.log(this.state.services,"serrr")
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
                            <h2><center>ĐĂNG KÝ CÔNG TY</center></h2>
                          </div>
                          <Form.Item
            label={
              <span>
                Logo&nbsp;
  
            </span>
            }
          >
            {getFieldDecorator('logo', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
              // rules: [{ required: true, message: 'Bạn cần nhập Logo!', whitespace: true }],
            })( 
            <Upload
              style={{ width: '50%' }}
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>)}
          </Form.Item>

          <Form.Item label="Dịch vụ">
            {getFieldDecorator('service', {
              rules: [{ required: true, message: 'Bạn cần chọn dịch vụ bạn cung cấp!' }],
            })(<Select
              style={{ width: '50%' }}
            >
              {/* {this.state.services.map(item =>  */}
              <Option value="Điện">Điện</Option>
              <Option value="Nước">Nước</Option>
              <Option value="Internet">Internet</Option>
            </Select>)}
          </Form.Item>
          <Form.Item label="Số điện thoại">
            {getFieldDecorator('phone', {
              rules: [
                { required: true, message: 'Bạn cần nhập số điện thoại!' },
                {
                  pattern: new RegExp(/^0+\d{9}$/g),
                  message: "Không đúng định dạng!" 
                },
              ],
            })(<Input style={{ width: '50%' }} />)}
          </Form.Item>

          <Form.Item
            label={
              <span>
                Tên Công Ty&nbsp;
  
            </span>
            }
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Bạn cần nhập họ và tên!', whitespace: true },
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
                Địa chỉ&nbsp;
  
            </span>
            }
          >
            {getFieldDecorator('address', {
              rules: [{ required: true, message: 'Bạn cần nhập Địa chỉ!', whitespace: true },
              {
                max: 40,
                message: "Vượt quá số kí tự" 
              }],
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
              rules: [
                { required: true, message: 'Bạn cần nhập Usename!', whitespace: true },
                {
                  max: 40,
                  message: "Vượt quá số kí tự" 
                }
              ],
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
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Đăng ký
          </Button>
            <Button type="primary" htmlType="button" style={{ margin: 20 }}>
              <a href="base64">Trở về</a>
            </Button>
          </Form.Item>
          {/* <input type='file' onChange={readExel}>aaaaaaa</input> */}
        </Form>
        </div>
        </Col>
        </Row>
        
      </div>
    );
  }
}

const CREATE_COMPANY = gql`
mutation ($compInput: CompanyInput){
    createCompany(compInput: $compInput)
  }
`
export default graphql(CREATE_COMPANY, {
  name: 'createCompany',
  options: {}
}
)(Form.create({ name: 'register' })(Company))
