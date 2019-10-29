import React from 'react'
import { Card, Avatar, Row, Col, Empty, Skeleton } from 'antd'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import { Client } from '../../tools/apollo'
class Paycompany extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            companies: [],
            loading: true
        }
    }

    GET_COMPANY_BYSERVICE = gql`
    query($service: String!){
        getCompanyByService(service: $service){
        userId
          name
          service
          logo
        }
      }
        `
    componentDidMount = async () => {
        this.refetchData(this.props.match.params.service)
        this.setState({ loading: false})
    }

    refetchData = async (service) => {
        await Client.query({
            query: this.GET_COMPANY_BYSERVICE,
            // fetchPolicy: 'no-cache',
            variables: {
                service
            }
        })
            .then(async result => {
                console.log("sds", result)
                await this.setState({
                    companies: result.data.getCompanyByService
                })
                console.log("sd", this.state.companies)
            })
            .catch(() => { })
    }
    render() {
        console.log(this.props)
        const { companies } = this.state

        const { history, match } = this.props
        const { service } = match.params

        return (
            this.state.loading ? 
            <Skeleton active /> 
            :
            <>
            <h1 style={{ textAlign: 'center' }}><b>CÔNG TY</b></h1>
            {companies.length === 0 && <Empty description={false}></Empty>}
            <div style={{ margin: '40px' }}>
                <Row type="flex" justify="center" align="top" >
                    {
                     companies.map((item) => {
                        return (
                            <Col span={6}
                                onClick={() => {
                                    history.push(`/payment/${service}/${item.userId}`)
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
