import React from 'react'
import { Modal, Button, Empty } from 'antd';
import { Table, Input } from 'antd';
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import * as compose from 'lodash.flowright'
import { Item } from 'rc-menu';
// import PayButton  from './payByCompany'
import NumberFormat from 'react-number-format'
import openNotificationWithIcon from '../../component/openNotification';
class PayModal extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            searchText: '',
            // visible: false,
            bills: {},
            isEmpty: false
        }
    }
    update = () => {
        this.props.updateStatusBill({
          mutation: UPDATE_STATUSBILL,
          variables: {
            billId: this.props.bills.id,
            companyId: localStorage.getItem('userId')
  
          }
        })
          .then(res => {
            console.log(res, "update")
            openNotificationWithIcon('success', 'success', 'Pay bills', 'pay Success')
          })
          .catch(err1 => {
            console.log("sai rôi nha", err1)
          })
      }
     createHis = () => {
      //   console.log(localStorage.getItem, this.props.bills)
        this.props.createHistory({
          mutation: CREATE_HISTORY,
          variables: {
            hisInput:{
              billId: this.props.bills.id,
              company: localStorage.getItem('userId'),
              name: this.props.bills.name,
              total: parseInt(this.props.bills.total),
              username: localStorage.getItem('username'),
              type: localStorage.getItem('service'),
              companyname: localStorage.getItem('name')
            }
           
          }
        })
          .then(res => {
            console.log(res, "create")
          //   openNotificationWithIcon('success', 'success', 'Create Success', 'Create Success')
            // this.props.history.push('./managebills')
          })
          .catch(err1 => {
            console.log("sai rôi nha", err1)
            // let mess = ''
            // mess = 'Fail'
  
            // openNotificationWithIcon('error', 'create', 'Create Failed', mess)
          })
      }
      handleOk = async() =>{
           this.update()
           this.createHis()
          this.props.handleCancel()
      }
    render() {
        const columns = [
            {
                title: 'CÔNG TY',
                dataIndex: 'company',
            },
            // {
            //     title: 'DNTT',
            //     dataIndex: 'DNTT',
            // },
            {
                title: 'Total',
                dataIndex: 'total',
            }
        ];
    
    
     const data =   [
            {
                key: '1',
                company: localStorage.getItem('name'),
                // DNTT: dntt,
                total: <NumberFormat defaultValue ={this.props.bills.total} thousandSeparator={true}  displayType='text'/>,
            }
        ];
        
        console.log("empty", this.state.isEmpty)
        const { Search } = Input
        return (
                <Modal
                    title="HÓA ĐƠN THANH TOÁN"
                    visible={this.props.visible}
                    onOk={this.handleOk}
                    okText= 'Thanh toán'
        //   onClick= {onClickHandel} 
          
                    onCancel={this.props.handleCancel}
                >
                    <div>
                        <h4>Tên: {this.props.bills.name}</h4>
                        <h4>Địa chỉ: {this.props.bills.address}</h4>
                        <h4>Số điện thoại:  {this.props.bills.phone}</h4>
                        {this.props.bills !== {} &&<Table columns={columns} dataSource={data} size="small" />}
                                            
                        
                    </div>
                </Modal>
               
        )
    }
}
const UPDATE_STATUSBILL = gql`
     mutation($billId: String!, $companyId: String!){
       updateStatusBill(billId: $billId, companyId: $companyId)
       }
         `
const CREATE_HISTORY = gql`
     mutation($hisInput: HistoryInput){
       createHistory(hisInput: $hisInput)
       }
         `

export default compose(
    graphql(UPDATE_STATUSBILL, {
      name: 'updateStatusBill',
      options: {}
    }),
    graphql(CREATE_HISTORY, {
      name: 'createHistory',
      options: {}
    })
  )(PayModal)