import React from 'react'
import { Drawer, List, Avatar, Divider, Col, Row } from 'antd'
import { Client } from '../../tools/apollo'
import gql from 'graphql-tag'

 class UserInfo extends React.Component {
     constructor(props){
         super(props)
         this.state = {
            info: []
        }
     }
     GET_MEMBER_BYUSERNAME = gql`
     query($username: String!){
        getMemberByUsername(username:$username){
       userId
         name
         phone
         address
         username
         password
         createdAt
         updatedAt
       }
       }
         `
         GET_COMPANY_BYUSERNAME = gql`
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
     componentDidMount = async () => {
         this.refetchData(localStorage.getItem('username'))
         // this.setupCount()
     }
 
     refetchData = async (username) => {
         localStorage.getItem('type') === 'member' 
         ? await Client.query({
             query: this.GET_MEMBER_BYUSERNAME,
             // fetchPolicy: 'no-cache',
             variables: {
                 username
             }
         })
             .then(async result => {
                 console.log("sds", result)
                 this.setState({
                    info: result.data.getMemberByUsername
                 })
                
             })
             .catch(() => { })
             :
             await Client.query({
                query: this.GET_COMPANY_BYUSERNAME,
                // fetchPolicy: 'no-cache',
                variables: {
                    username
                }
            })
                .then(async result => {
                    console.log("ìnocompan", result)
                    this.setState({
                        info: result.data.getCompanyByUsername
                    })
                  
                })
                .catch(() => { })
                // console.log("info ", this.state.info)
           localStorage.setItem('info', JSON.stringify(this.state.info))
     }
  render() {
    const pStyle = {
        fontSize: 16,
        color: 'rgba(0,0,0,0.85)',
        lineHeight: '24px',
        display: 'block',
        marginBottom: 16,
      };
      
      const DescriptionItem = ({ title, content }) => (
        <div
          style={{
            fontSize: 14,
            lineHeight: '22px',
            marginBottom: 7,
            color: 'rgba(0,0,0,0.65)',
          }}
        >
          <p
            style={{
              marginRight: 8,
              display: 'inline-block',
              color: 'rgba(0,0,0,0.85)',
            }}
          >
            {title}:
          </p>
          {content}
        </div>
      );
      const { info } = this.state
    return (
      <div>
        
        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={this.props.onClose}
          visible={this.props.visible}
        >
          <p style={{ ...pStyle, marginBottom: 24 }}>User Profile</p>
          <p style={pStyle}>Personal</p>
          <Row>
           <Col span={12}>
              <DescriptionItem title="Full Name" content={info.name} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Account" content={info.username} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Address" content={info.address}/>
            </Col>
            <Col span={12}>
              <DescriptionItem title="Phone" content={info.phone} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="CreatedAt" content={Date(info.createdAt)} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="UpdatedAt" content={Date(info.updatedAt)} />
            </Col>
          </Row>
          
        </Drawer>
      </div>
    );
  }
}
export default UserInfo