import React from 'react'
import { Table, Icon, Input, Button } from 'antd';
import Modal_Internet from './modal_internet'
import Highlighter from 'react-highlight-words';


const data = [
    {
        key: '1',
        id: 'HD001',
        loaihd: 'Wifi',
        cuocphi: '300000vnđ',
        tenkh: 'Phan Hữu Quý',
        sdt: '0933323622',
        diachi: 'HCM',
        tongtien: '200000vnd',

    },
    {
        key: '2',
        id: 'HD002',
        loaihd: 'Wifi',
        cuocphi: '300000vnđ',
        tenkh: 'Hồ Trần Như',
        sdt: '0933323622',
        diachi: 'HCM',
        tongtien: '200000vnd',

    },
    {
        key: '3',
        id: 'HD003',
        loaihd: 'Wifi',
        cuocphi: '300000vnđ',
        tenkh: 'Trần Quang Phúc',
        sdt: '0933323622',
        diachi: 'HCM',
        tongtien: '200000vnd',
    },
];
class App extends React.Component {
    state = {
        searchText: '',
    };

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
        const columns = [
    {
        title: 'MÃ HÓA ĐƠN',
        dataIndex: 'id',
        key: 'id',
        ...this.getColumnSearchProps('id'),
    },
    {
        title: 'LOẠI HÓA ĐƠN',
        dataIndex: 'loaihd',
        key: 'loaihd',
        ...this.getColumnSearchProps('loaihd'),
    },
    {
        title: 'CƯỚC PHÍ',
        dataIndex: 'cuocphi',
        key: 'cuocphi',
    },
    {
        title: 'TÊN KHÁCH HÀNG',
        dataIndex: 'tenkh',
        key: 'tenkh',
        ...this.getColumnSearchProps('tenkh'),
    },

    {
        title: 'SỐ ĐIỆN THOẠI',
        dataIndex: 'sdt',
        key: 'sdt',
        ...this.getColumnSearchProps('sdt'),
    },
    {
        title: 'ĐỊA CHỈ',
        dataIndex: 'diachi',
        key: 'diachi',
        ...this.getColumnSearchProps('diachi'),
    },
    {
        title: 'TỔNG TIỀN',
        dataIndex: 'tongtien',
        key: 'tongtien',
    },
    {
        title: 'CHỨC NĂNG',
        key: 'chucnang',
        dataIndex: '',
        render: () => <><Icon type="delete" />&nbsp;&nbsp;&nbsp;&nbsp;<Icon type="edit" /></>,
    },

];
return <Table columns={columns} dataSource={data} />;

      }
}

function ManageBill(props) {
    const { isShowing, toggle } = Modal_Internet();
    return (
        <>

            <br></br>
            <App/>
            <Modal_Internet>

            </Modal_Internet>

        </>

    )
}
export default ManageBill