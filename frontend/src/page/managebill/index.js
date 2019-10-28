import React from 'react'
import { Table, Icon, Input, Button } from 'antd';
// import Modal_Internet from './modal_internet'
import Highlighter from 'react-highlight-words';
import Modal_Internet from './modal_electric';
import Modal_Electric from './modal_electric'
import Modal_Water from './modal_water'
import gql from 'graphql-tag'
import { Client } from '../../tools/apollo'

class ManageBill extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            searchText: '',
            visible: false,
            bills: []
        }
    }
    GET_BILL_BYCOMPANY = JSON.parse(localStorage.getItem('info')).service === "Điện"
    ? gql`query($companyId: String){
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
:
gql`query($companyId: String){
    getWaterBillsByCompany(companyId:$companyId){
        billId
        type
        name
        phone
        address
       total 
        description{
          LNTT
        }

  }
}`
componentDidMount = async () => {
    // const { currentPage, inputSearch } = this.state
    // console.log(JSON.parse(localStorage.getItem('info')).userId)
    await this.refetchData(JSON.parse(localStorage.getItem('info')).userId)
    // this.setupCount()
}

refetchData = async (companyId) => {
    await Client.query({
        query: this.GET_BILL_BYCOMPANY,
        fetchPolicy: 'no-cache',
        variables: {
            companyId
        }
    })
        .then(async result => {
            console.log("getBoll", result)
             this.setState({
                bills: JSON.parse(localStorage.getItem('info')).service === "Điện"
                ?  result.data.getElectricBillsByCompany
                : result.data.getWaterBillsByCompany
            })
            console.log("sd", this.state.bills)
        })
        .catch(() => { })
    // console.log('rowData', this.state.rowData)
}
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Tìm`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Tìm
          </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Đặt lại
          </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    render() {
        const info = JSON.parse(localStorage.getItem('info'))
        console.log("infoe", info, this.state.bills)
        const data = []
        this.state.bills && this.state.bills.map((item, idx) => {
            data.push({
            key: (idx+1).toString(),
            id: item.billId,
            type: item.type,
            TT: item.type === 'Điện' ? item.description.DNTT.toString() : item.description.LNTT.toString() ,
            name: item.name,
            phone: item.phone,
            address: item.address,
            total: item.total && item.total.toString()
            })
        } )
        console.log(data, "data nha")
        const columns = [
    {
        title: 'MÃ HÓA ĐƠN',
        dataIndex: 'id',
        key: 'id',
        ...this.getColumnSearchProps('id'),
    },
    {
        title: 'LOẠI HÓA ĐƠN',
        dataIndex: 'type',
        key: 'type',
    },
   this.state.bills && this.state.bills.type === 'Điện' 
   ? {
        title: 'Điện năng tiêu thụ',
        dataIndex: 'TT',
        key: 'TT',
    }
    :{
        title: 'Lượng nước tiêu thụ',
        dataIndex: 'TT',
        key: 'TT',
    },
    {
        title: 'TÊN KHÁCH HÀNG',
        dataIndex: 'name',
        key: 'name',
        ...this.getColumnSearchProps('name'),
    },

    {
        title: 'SỐ ĐIỆN THOẠI',
        dataIndex: 'phone',
        key: 'phone',
        ...this.getColumnSearchProps('phone'),
    },
    {
        title: 'ĐỊA CHỈ',
        dataIndex: 'address',
        key: 'address',
        ...this.getColumnSearchProps('address'),
    },
    {
        title: 'TỔNG TIỀN',
        dataIndex: 'total',
        key: 'total',
    },
    {
        title: 'CHỨC NĂNG',
        key: 'chucnang',
        dataIndex: '',
        render: () => <><Icon type="delete" />&nbsp;&nbsp;&nbsp;&nbsp;<Icon type="edit" /></>,
    },

];
const onCancel = ()=>{
    this.setState({ visible: false})
}
return (
    <>
 <Table columns={columns} dataSource={data} />
    <Button
    type="primary"
    onClick={() => {this.setState({ visible: true})}}
    size="small"
    style={{ width: 200, height: 50, marginRight: 8 }}
>
    Thêm hóa đơn
    
</Button>
{ info.service === 'Điện' ? 
<Modal_Electric 
history={this.props.history} visible= { this.state.visible} onCancel ={onCancel} companyId= {info.userId} companyname ={info.name} listCus = {info.lstCustomer}></Modal_Electric>
:  info.service === 'Nước' ?
<Modal_Water history={this.props.history} visible ={ this.state.visible} onCancel ={onCancel} companyId= {info.userId} companyname ={info.name} listCus = {info.lstCustomer}></Modal_Water>
:<Modal_Internet visible={this.state.visible} onCancel ={onCancel} companyId= {info.userId} companyname ={info.name} listCus = {info.lstCustomer}></Modal_Internet>
}
</>
)

      }
}
export default ManageBill