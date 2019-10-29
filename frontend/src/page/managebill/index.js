import React from 'react'
import { Table, Icon, Input, Button, Skeleton, message, Card} from 'antd'
import { OutTable, ExcelRenderer } from 'react-excel-renderer';
// import Modal_Internet from './modal_internet'
import Highlighter from 'react-highlight-words';

import gql from 'graphql-tag'
import { Client } from '../../tools/apollo'
import ExelBill from './exelBill';
import PayModal from './payModal';

class ManageBill extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      visible: false,
      visibleModal: false,
      bills: [],
      import: false,
      listCustomer: [],
      loading: true
    }
  }
  GET_BILL_BYCOMPANY = localStorage.getItem('service')=== "Điện"
    ? gql`query($companyId: String){
        getElectricBillsByCompany(companyId:$companyId){
            billId
            type
            name
            phone
            address
            createdAt
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
        createdAt
       total 
        description{
          LNTT
        }

  }
}`
  componentDidMount = async () => {
    await this.refetchData(localStorage.getItem('userId'))
    this.setState({ loading: false})
  }
  componentWillMount = async () => {
    await this.refetchData(localStorage.getItem('userId'))
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
          bills: localStorage.getItem('service') === "Điện"
            ? result.data.getElectricBillsByCompany
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
    // const info = JSON.parse(localStorage.getItem('info'))
    console.log("infoe",  this.state.bills)
    const data = []
    this.state.bills && this.state.bills.map((item, idx) => {
      data.push({
        key: (idx + 1).toString(),
        id: item.billId,
        createdAt: item.createdAt,
        TT: item.type === 'Điện' ? item.description.DNTT.toString() : item.description.LNTT.toString(),
        name: item.name,
        phone: item.phone,
        address: item.address,
        total: item.total && item.total.toString()
      })
    })
    console.log(data, "data nha")
    const columns = [
      {
        title: 'MÃ HÓA ĐƠN',
        dataIndex: 'id',
        key: 'id',
        ...this.getColumnSearchProps('id'),
      },
      {
        title: 'NGÀY LẬP',
        dataIndex: 'createdAt',
        key: 'createdAt',
      },
      this.state.bills && this.state.bills.type === 'Điện'
        ? {
          title: 'ĐIỆN NĂNG TIÊU THỤ',
          dataIndex: 'TT',
          key: 'TT',
          
        }
        : {
          title: 'LƯỢNG NƯỚC TIÊU THỤ',
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
      // {
      //   title: 'CHỨC NĂNG',
      //   key: 'chucnang',
      //   dataIndex: '',
      //   render: () => <><Icon type="delete" />
      //   &nbsp;&nbsp;&nbsp;&nbsp;
      //   <Icon type="edit"
      //   /></>,
      // },

    ];
    const onCancel = async() => {
      this.setState({ visibleModal: false })
      await this.refetchData(localStorage.getItem('userId'))
    }
    // const handleDelete = key => {
    //   const dataSource = [...this.state.dataSource];
    //   this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    // };
    const onClickRow = (record) => {
      return {
        onClick: () => {
          this.setState({
            row: record,
            visibleModal: true
          });

        },
      };
    }

    const props = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-text',
      }
    }
console.log("row select", this.state.row)
    return (
      this.state.loading ? 
            <Skeleton active /> 
            :
        <>
     {this.state.import 
    ?  <ExelBill history ={this.props.history}></ExelBill>
  : <>
  <Table columns={columns} dataSource={data} onRow={onClickRow} pagination={{ pageSize: 30 }} scroll={{ y: 240 }}/>
  <Button
      type="primary"
      onClick={() => { this.setState({ import: true }) }}
      size="small"
      style={{ width: 200, height: 50, marginRight: 8 }}
    >
      Import Bill

</Button>
{this.state.row !== undefined &&
  <PayModal visible= {this.state.visibleModal} 
  handleCancel={onCancel} 
  bills={this.state.row}></PayModal>}
</>
  } 
 
  {/* {localStorage.getItem('service') === 'Điện' ?
    <Modal_Electric
      history={this.props.history} visible={this.state.visible} onCancel={onCancel} companyId={info.userId} companyname={info.name} listCus={info.lstCustomer}></Modal_Electric>
    : info.service === 'Nước' ?
      <Modal_Water history={this.props.history} visible={this.state.visible} onCancel={onCancel} companyId={info.userId} companyname={info.name} listCus={info.lstCustomer}></Modal_Water>
      : <Modal_Internet visible={this.state.visible} onCancel={onCancel} companyId={info.userId} companyname={info.name} listCus={info.lstCustomer}></Modal_Internet>
  } */}
      </>
      )
        }
      }
export default ManageBill