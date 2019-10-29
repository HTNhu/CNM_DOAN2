import { PayPalButton } from "react-paypal-button-v2";
import React, { Component } from 'react'
import gql from 'graphql-tag'
// import { compose} from 'react-apollo'
import * as compose from 'lodash.flowright'
import { graphql } from 'react-apollo'
class paypalButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      companies: []
    }
  }


  render() {
    // console.log(this.props, "props nè")
    const update = () => {
      this.props.updateStatusBill({
        mutation: UPDATE_STATUSBILL,
        variables: {
          billId: this.props.billId,
          companyId: this.props.companyId

        }
      })
        .then(res => {
          console.log(res, "update")

          // openNotificationWithIcon('success', 'success', 'Create Success', 'Create Success')
          // this.props.history.push('./managebill')
        })
        .catch(err1 => {
          console.log("sai rôi nha", err1)
          // let mess = ''
          // mess = 'Fail'

          // openNotificationWithIcon('error', 'create', 'Create Failed', mess)
        })
    }
    const createHis = () => {
      // console.log(localStorage.getItem, this.props.bill)
      this.props.createHistory({
        mutation: CREATE_HISTORY,
        variables: {
          hisInput:{
            billId: this.props.billId,
            company: this.props.companyId,
            name: this.props.bill.name,
            total: this.props.bill.total,
            username: localStorage.getItem('username'),
            type: this.props.bill.type,
            companyname: this.props.bill.companyname
          }
         
        }
      })
        .then(res => {
          console.log(res, "create")

          // openNotificationWithIcon('success', 'success', 'Create Success', 'Create Success')
          // this.props.history.push('./managebill')
        })
        .catch(err1 => {
          console.log("sai rôi nha", err1)
          // let mess = ''
          // mess = 'Fail'

          // openNotificationWithIcon('error', 'create', 'Create Failed', mess)
        })
    }
    return (
      <PayPalButton
        amount={this.props.amount}
        onSuccess={(details, data) => {
          alert("Transaction completed by " + details.payer.name.given_name);
          update()
          createHis()
          this.props.onCancel()
          // this.props.history.push('./payment')
          // OPTIONAL: Call your server to save the transaction
          return fetch("/paypal-transaction-complete", {
            method: "post",
            body: JSON.stringify({
              orderID: data.orderID
            })
          })

        }}
        options={{
          clientId: 'AWfTfuMgqwz3hT3a_mGiZ6ZrigaP5Ss1hfHfcgmfRDO8bgjMTOoXnp4-JEjyYgMEKbK6wKkVU3dAEq_B'
        }}
      />
    );
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
)(paypalButton)