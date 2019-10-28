import { AutoComplete, Row, Col, Button } from 'antd';
import React, { useState } from 'react'
import gql from 'graphql-tag'
import { Client } from '../../tools/apollo'

class Schedule extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSourceDien: [],
      dataSourceNuoc: [],
      dataSourceInternet: [],
      data: []
    }
  }
  GET_COMPANY_BYSERVICE = gql`
    query($service: String!){
        getCompanyByService(service: $service){
          userId
          name
          service
        }
      }
        `
  componentDidMount = async () => {
    await this.refetchData()
  }

  refetchData = async () => {
    await Client.query({
      query: this.GET_COMPANY_BYSERVICE,
      fetchPolicy: 'no-cache',
      variables: {
        service: 'Điện'
      }
    })
      .then(result => {
        this.setState({
          dataSourceDien: result.data.getCompanyByService
        })
      })
      .catch(() => { })
    await Client.query({
      query: this.GET_COMPANY_BYSERVICE,
      fetchPolicy: 'no-cache',
      variables: {
        service: 'Nước'
      }
    })
      .then(result => {
        this.setState({
          dataSourceNuoc: result.data.getCompanyByService
        })
      })
      .catch(() => { })
    await Client.query({
      query: this.GET_COMPANY_BYSERVICE,
      fetchPolicy: 'no-cache',
      variables: {
        service: 'Internet'
      }
    })
      .then(result => {
        this.setState({
          dataSourceInternet: result.data.getCompanyByService
        })
      })
      .catch(() => { })
  }
  render() {
    console.log(this.state)
    const getname = (data) => (data.map(item => item.name))
    return (
      <>
        <Row>
          <Col span={8}>
            ĐIỆN <AutoComplete
              style={{ width: 200 }}
              dataSource={getname(this.state.dataSourceDien)}
              placeholder="Nhập tên công ty..."
              filterOption={(inputValue, option) =>
                option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
              }
            />
          </Col>
          <Col span={8} >
            NƯỚC <AutoComplete
              style={{ width: 200 }}
              dataSource={getname(this.state.dataSourceNuoc)}
              placeholder="Nhập tên công ty..."
              filterOption={(inputValue, option) =>
                option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
              }
            />
          </Col>
          <Col span={8} >
            INTERNET <AutoComplete
              style={{ width: 200 }}
              dataSource={getname(this.state.dataSourceInternet)}
              placeholder="Nhập tên công ty..."
              filterOption={(inputValue, option) =>
                option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
              }
            />
          </Col>
        </Row>
        
    <Row>
      <Col span={12} offset={6}>
      <Button style={{ marginTop: '150px' }} type="primary" icon="notification">
            Đặt lịch
          </Button>
      </Col>
    </Row>
        {/* <div style={{ marginTop: '0 auto'}}>
         
          </div> */}



      </>
    );
  }
}

export default Schedule
