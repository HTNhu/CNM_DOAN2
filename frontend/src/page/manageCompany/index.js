import NumberFormat from 'react-number-format'
import { Table, Tag, Icon, Input, Button, Skeleton, Avatar } from 'antd';
import Highlighter from 'react-highlight-words';
import gql from 'graphql-tag'
import { Client } from '../../tools/apollo'
import  React  from 'react'

class ManageCompany extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchText: '',
            companies: [],
            loading: true
        };
    }
    GET_ALL_COMPANY = gql`
     query{
       getAllCompany{
        userId
        name
        service
        logo
       }
       }
         `

    componentDidMount = async () => {
        await this.refetchData()
        this.setState({ loading: false })
    }
    refetchData = async () => {

        await Client.query({
            query: this.GET_ALL_COMPANY,
            // fetchPolicy: 'no-cache',

        })
            .then(async result => {
                // console.log("getCOmpany", result)
                this.setState({
                    companies: result.data.getAllCompany
                })
                // console.log("sd", this.state.history)

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
            textToHighlight={text.toString()}
          />
        ),
      });
    
    render() {
        const data = []
        this.state.companies.map((item, idx) => {
            data.push({
                key: item.userId,
                logo: item.logo,
                name: item.name,
                service: item.service,

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
                title: 'LOGO',
                dataIndex: 'logo',
                key: 'logo',
                render: logo => (
                    <Avatar src={logo}></Avatar>
                ),
            },
            {
                title: 'DỊCH VỤ',
                dataIndex: 'service',
                key: 'service',
                ...this.getColumnSearchProps('service'),
            },
            {
                title: 'CÔNG TY',
                key: 'name',
                dataIndex: 'name',
                render: companyname => (
                    <span>
                     {
                                <Tag color='#4ABFA9'>
                                    {companyname.toUpperCase()}
                                </Tag>

                    }
                    </span>
                ),
                ...this.getColumnSearchProps('name'),
            }]
                return(
                    this.state.loading ?
                        <Skeleton active />
                        :
                        <Table columns={columns} dataSource={data} pagination={{ pageSize: 30 }} scroll={{ y: 240 }} />
                )
    }
}
export default ManageCompany