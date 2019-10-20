import React from 'react'
import { Card, Avatar, Row, Col, Empty } from 'antd'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import { Client } from '../../tools/apollo'
class Paycompany extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            companies: []
        }
    }

    GET_COMPANY_BYSERVICE = gql`
    query($serviceId: String!){
        getCompanyByServiceId(serviceId: $serviceId){
        userId
          name
          serviceId
          logo
        }
      }
        `
    componentDidMount = async () => {
        // const { currentPage, inputSearch } = this.state
        this.refetchData(this.props.match.params.serviceId)
        // this.setupCount()
    }

    refetchData = async (serviceId) => {
        await Client.query({
            query: this.GET_COMPANY_BYSERVICE,
            // fetchPolicy: 'no-cache',
            variables: {
                serviceId
            }
        })
            .then(async result => {
                console.log("sds", result)
                await this.setState({
                    companies: result.data.getCompanyByServiceId
                })
                console.log("sd", this.state.companies)
            })
            .catch(() => { })
        // console.log('rowData', this.state.rowData)
    }
    render() {
        console.log(this.props)
        const { companies } = this.state

        const { history, match } = this.props
        const { serviceId } = match.params
        return (
            <>
            <h1 style={{ textAlign: 'center' }}><b>CÔNG TY</b></h1>
            {companies.length == 0 && <Empty description={false}></Empty>}
            <div style={{ margin: '40px' }}>
                <Row type="flex" justify="center" align="top" >
                    {
                     companies.map((item) => {
                        return (
                            <Col span={6}
                                onClick={() => {
                                    history.push(`/payment/${serviceId}/${item.userId}`)
                                }}
                            >
                                <Card style={{ width: '300px' }}>
                                    <Card.Meta
                                        avatar={<Avatar src={item.logo} />}
                                        title={<p>{item.name}</p>}

                                    />
                                </Card>
                            </Col>)
                    })
                    
                    }</Row>
            </div>
          </>
        )
    }
}

export default withRouter(Paycompany)
