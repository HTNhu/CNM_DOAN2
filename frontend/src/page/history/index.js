import React from 'react'
// import { withRouter } from 'react-router-dom'
import NumberFormat from 'react-number-format'
import { Table, Tag, Icon, Input, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import gql from 'graphql-tag'
import { Client } from '../../tools/apollo'

class History extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchText: '',
            history: []
        };
    }
    GETHISTORY_BYCOMPANY = gql`
     query($company: String){
       getHistoryByCompany(company: $company){
        billId
        company
        username
        companyname
        total
        type
        paidAt
        name
       }
       }
         `
    GETHISTORY_BYMEMBER = gql`
        query($username: String){
        getHistoryByMember(username: $username){
        billId
        company
        username
        companyname
        total
        paidAt
        type
        name
    }
}
         `
    componentDidMount = async () => {
        // const { currentPage, inputSearch } = this.state
       
        await this.refetchData()
        // this.setupCount()
    }
    refetchData = async () => {
        localStorage.getItem('type') === 'company'
            ? await Client.query({
                query: this.GETHISTORY_BYCOMPANY,
                fetchPolicy: 'no-cache',
                variables: {
                    company: localStorage.getItem('userId')
                }
            })
                .then(async result => {
                    console.log("getHistory", result)
                    this.setState({
                        history: result.data.getHistoryByCompany 
                    })
                    console.log("sd", this.state.history)
                })
                .catch(() => { })
     :await Client.query({
        query: this.GETHISTORY_BYMEMBER,
        // fetchPolicy: 'no-cache',
        variables: {
            username: localStorage.getItem('username')
    }
    })
        .then(async result => {
            console.log("getHistory", result)
            this.setState({
                history: result.data.getHistoryByMember
            })
            console.log("sd", this.state.history)
        })
        .catch(() => { })
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
                // textToHighlight={text.toString()}
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

        const data = []
        this.state.history.map((item,idx) =>{
            data.push({
                key: (idx+1).toString(),
                // billId: (item.billId).toString(),
                name: item.name.toString(),
                type: item.type.toString(),
                total: <NumberFormat defaultValue ={item.total} thousandSeparator={true}  displayType='text'/>,
                paidAt: new Date(parseInt(item.paidAt)).toLocaleString(),
                username: item.username.toString(),
                companyname: item.companyname.toString()
            })

        })
        const columns = [
            // {
            //     title: 'ID',
            //     dataIndex: 'billId',
            //     key: 'billId',
            //     // ...this.getColumnSearchProps('billId')
            // },
            {
                title: 'TÊN KHÁCH HÀNG',
                dataIndex: 'name',
                key: 'name',
                ...this.getColumnSearchProps('name'),
            },
            {
                title: 'LOẠI HÓA ĐƠN',
                dataIndex: 'type',
                key: 'type',
                ...this.getColumnSearchProps('type'),
            },
            {
                title: 'TỔNG',
                dataIndex: 'total',
                key: 'total',
            },
            {
                title: 'NGÀY THANH TOÁN',
                dataIndex: 'paidAt',
                key: 'paidAt',
                ...this.getColumnSearchProps('paidAt'),
            },
            {
                title: 'NGƯỜI THANH TOÁN',
                dataIndex: 'username',
                key: 'username',
                ...this.getColumnSearchProps('username'),
            },
            {
                title: 'CÔNG TY',
                key: 'companyname',
                dataIndex: 'companyname',
                render: companyname => (
                    <span>
                     {
                                <Tag color='#4ABFA9'>
                                    {companyname.toUpperCase()}
                                </Tag>
                      
                    }
                    </span>
                ),
                ...this.getColumnSearchProps('company'),
            }
        ];
        return <Table columns={columns} dataSource={data} />;

    }
}


export default History