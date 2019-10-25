import React from 'react'
import { Modal, Button, Empty } from 'antd';
import { Table, Input } from 'antd';
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import { Client } from '../../tools/apollo'
import { Item } from 'rc-menu';
import PaypalButton  from './paypalButton'
import NumberFormat from 'react-number-format'
class Paybill extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            searchText: '',
            visible: false,
            bills: {},
            isEmpty: false
        }
    }
    GET_BILL_BYCOMPANYPHONE = gql`
    query($companyId: String, $phone: String){
        getElectricBillsByCompanyPhone(companyId:$companyId, phone: $phone){
            billId
            type
            phone
            address
            name
            companyId
            companyname
           total 
            description{
              DNTT
            }
       
      }
    }
`
// componentDidMount = async () => {
//     // const { currentPage, inputSearch } = this.state
//     // console.log(JSON.parse(localStorage.getItem('info')).userId)
//     await this.refetchData(this.props.match.companyId,'0' )
//     // this.setupCount()
// }

    refetchData = async (companyId,phone) => {
        await Client.query({
            query: this.GET_BILL_BYCOMPANYPHONE,
            // fetchPolicy: 'no-cache',
            variables: {
                companyId,
                phone
            }
        })
            .then(result => {
                console.log("getBoll", result)
                this.setState({
                    bills: result.data.getElectricBillsByCompanyPhone ?result.data.getElectricBillsByCompanyPhone : {}
                })
                console.log("sd", this.state.bills)
                result.data.getElectricBillsByCompanyPhone !== null
                ? this.setState({
                        visible: true,
                        isEmpty: false
                    })
                : this.setState({
                    isEmpty: true
                })
                
               
            })
            .catch(() => { })
        // console.log('rowData', this.state.rowData)
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };


    render() {
        const columns = [
            {
                title: 'CÔNG TY',
                dataIndex: 'company',
            },
            {
                title: 'DNTT',
                dataIndex: 'DNTT',
            },
            {
                title: 'Total',
                dataIndex: 'total',
            }
        ];
       const dntt = this.state.bills.description === undefined ? '' : this.state.bills.description.DNTT
    
     const data =   [
            {
                key: '1',
                company: this.state.bills.companyname,
                DNTT: dntt,
                total: <NumberFormat defaultValue ={this.state.bills.total} thousandSeparator={true}  displayType='text'/>,
            }
        ];
        
        console.log("empty", this.state.isEmpty)
        const { Search } = Input
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Search
                    style={{ width: 500, margin: 20 }}
                    placeholder="Nhập mã khách hàng, số điện thoại...."
                    onSearch={value => {
                        this.refetchData(this.props.match.params.companyId, value)
                      
                    }} 
                    enterButton />
                    <br></br>

                <Modal
                    title="HÓA ĐƠN THANH TOÁN"
                    visible={this.state.visible}
                    // onOk={this.handleOk}
                    // okText= ''
                    onCancel={this.handleCancel}
                >
                    <div>
                        <h4>Tên: {this.state.bills.name}</h4>
                        <h4>Địa chỉ: {this.state.bills.address}</h4>
                        <h4>Số điện thoại:  {this.state.bills.phone}</h4>
                        {this.state.bills !== {} &&<Table columns={columns} dataSource={data} size="small" />}
                        <PaypalButton 
                            bill ={this.state.bills}
                            companyId= {this.state.bills.companyId} 
                            billId ={this.state.bills.billId}
                            amount = {this.state.bills.total}>Thanh toán</PaypalButton >
                    </div>
                </Modal>
                {this.state.isEmpty && <Empty></Empty>}
            </div >
        )
    }
}

export default withRouter(Paybill)