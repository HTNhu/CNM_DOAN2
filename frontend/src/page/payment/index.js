import React from 'react'
import { Card, Avatar, Row, Col } from 'antd'
// import { withRouter, } from 'react-router-dom'
// import PayCompany from './paycompany'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
// import openNotificationWithIcon from '../../component/openNotification'
function Payment(props) {
    // console.log('props payment company', props)
    const { history } = props
    // let { path, url } = useRouteMatch();
    // const onClickCardService = (id)=>{

    // }
    const serviceIds = !props.getServices.loading ? props.getServices.getAllService : []
    // console.log("ddd",serviceIds)
    return (
        <>
            <h1 style={{ textAlign: 'center' }}><b>THANH TOÁN HÓA ĐƠN</b></h1>
            <div style={{ margin: '50px 50px' }}>

                <Row type="flex" justify="center" align="top">
                   {serviceIds.map(service => <Col span={6} onClick={() => {

                        history.push(`/payment/${service.name}`)
                    }}>
                        <Card style={{ width: '200px' }}>
                            <Card.Meta
                                avatar={<Avatar src={service.logo} />}
                                title={<p>{service.name}</p>}
                            />
                        </Card>
                    </Col>)
                    }
                   
                </Row>
                {/* <PayCompany></PayCompany> */}
            </div>
        </>
    )
}
const GET_ALL_SERVICE = gql`
query{
    getAllService{
    id
    name
    logo
  }
}
`
export default graphql(
    GET_ALL_SERVICE, {
    name: 'getServices',
    options: {}
}
)(Payment)