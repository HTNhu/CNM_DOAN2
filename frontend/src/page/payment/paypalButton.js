import { PayPalButton } from "react-paypal-button-v2";
 import React, {Component} from 'react'
export default class paypalButton extends Component {
  render() {
    return (
      <PayPalButton
        amount= {this.props.amount /20000}
        onSuccess={(details, data) => {
          alert("Transaction completed by " + details.payer.name.given_name);
 
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