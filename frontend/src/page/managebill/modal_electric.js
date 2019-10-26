import React from 'react'
import { Button, Modal, Form, Input, InputNumber, AutoComplete } from 'antd';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import openNotificationWithIcon from '../../component/openNotification'
import { Client } from '../../tools/apollo'
import * as compose from 'lodash.flowright'
// const { Option } = Select
// eslint-disable-next-line
class Modal_Electric extends React.Component {
  constructor(props) {
    super(props)
  }
  
  onCreate = async(e) => {
    e.preventDefault()
    // setLoading(true)
    this.props.form.validateFields(async(err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        const { phone, name, address, DNTT } = values
        await this.props.createElectricBill({
          mutation: CREATE_ELECTRICBILL,
          variables: {
            electricbillInput: {
              name,
              phone,
              address,
              companyId: this.props.companyId,
              companyname: this.props.companyname,
              description: {
                DNTT,
                unitPrice: 3000
              }
            }
          }
        })
          .then( async res => {
            console.log(res)
            if(res.data.createElectricBill){
              await this.props.getBillByCompany.refetch()
              this.props.onCancel()
             
              // window.location.reload()
              openNotificationWithIcon('success', 'success', 'Create Success', 'Create Success')
            }
           
          })

          .catch(err1 => {
            let mess = ''
            mess = 'Fail'

            openNotificationWithIcon('error', 'create', 'Create Failed', mess)
          })
      }
    })
  }
  handelSelect = (e) => {

    this.props.listCus.map(item => {
      if (item.phone === e) {
        this.props.form.setFieldsValue({
          name: item.name,
          address: item.address
        })
      }
    })
  }
  handelChange = (e) => {
    this.props.listCus.map(item => {
      if (item.phone === e) {
        this.props.form.setFieldsValue({
          name: item.name,
          address: item.address
        })
      } else {
        this.props.form.setFieldsValue({
          name: "",
          address: ""
        })
      }
    })
  }
  render() {

    console.log("props bill", this.props)
    const datasource = this.props.listCus ? this.props.listCus.map(item => item.phone) : []
    const { getFieldDecorator } = this.props.form
    return (
      <Modal
        visible={this.props.visible}
        title="CHI TIẾT HÓA ĐƠN ĐIỆN"
        okText="Xác nhận"
        cancelText="Hủy"
        onCancel={this.props.onCancel}
        onOk={this.onCreate}
        width='60%'
      >
        <Form layout="inline" style={{}}>
          <h3>Thông tin khách hàng</h3>
          <br></br>
          <Form.Item label="Số điện thoại">
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Nhập số điện thoại!' }],
            })(
              // <Input></Input>
              <AutoComplete
                style={{ width: '200px' }}
                dataSource={datasource}
                onSelect={this.handelSelect}
                onChange={this.handelChange}
                filterOption={(inputValue, option) =>
                  option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
              />
            )
            }
          </Form.Item>
          <Form.Item label="Tên khách hàng">
            {getFieldDecorator('name', {
              // rules: [{ required: true, message: 'Nhập tên!' }],
            })(<Input
              style={{ width: '200px' }}
              // onChange={onChange}
              // placeholder="this is readOnly Mention"
              // suggestions={users}
              readOnly
            />)}
          </Form.Item>
          <Form.Item label="Địa chỉ">
            {getFieldDecorator('address', {
              // rules: [{ required: true, message: 'Nhập địa chỉ!' }],
            })(<Input
              style={{ width: '200px' }}
              // onChange={onChange}
              // placeholder="this is readOnly Mention"
              // suggestions={users}
              readOnly
            />)}
          </Form.Item>
          <br></br>
          <br></br>
          <h3>Thông tin hóa đơn</h3>
          <br></br>
          <Form.Item label="Điện năng tiêu thụ">
            {getFieldDecorator('DNTT', {
              rules: [{ required: true, message: 'Không để trống!' }],
            })(<InputNumber />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
const CREATE_ELECTRICBILL = gql`
mutation ($electricbillInput: ElectricBillInput!){
  createElectricBill(electricbillInput: $electricbillInput)
  }
`
const GET_BILL_BYCOMPANY = gql`query($companyId: String){
  getElectricBillsByCompany(companyId:$companyId){
      billId
      type
      name
      phone
      address
     total 
      description{
        DNTT
      }

}
}
`
export default compose(
  graphql(
  CREATE_ELECTRICBILL, {
  name: 'createElectricBill',
  options: {}
}),
graphql(
  GET_BILL_BYCOMPANY, {
  name: 'getBillByCompany',
  options: {}
}),
)(Form.create({ name: 'form_in_modal' })(Modal_Electric))
// export default Form.create({ name: 'form_in_modal' })(Modal_Electric)