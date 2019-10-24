import React from 'react'
// import { withRouter } from 'react-router-dom'

import { Table, Tag, Icon, Input, Button } from 'antd';
import Highlighter from 'react-highlight-words';

const data = [
    {
        key: '1',
        id: 'HD001',
        tenkh: 'Phan Hữu Quý',
        loaihd: 'Wifi',
        tong: '300000vnđ',
        ngay: '12-11-2020',
        congty: ['Công ty DCF'],
        ngaytra: '12-11-2020',
    },
    {
        key: '2',
        id: 'HD002',
        tenkh: 'Hồ Trần Như',
        loaihd: 'Wifi',
        tong: '300000vnđ',
        ngay: '12-11-2020',
        congty: ['Công ty DUR'],
        ngaytra: '12-11-2020',
    },
    {
        key: '3',
        id: 'HD003',
        tenkh: 'Nguyễn Anh Tuấn',
        loaihd: 'Wifi',
        tong: '300000vnđ',
        ngay: '12-11-2020',
        congty: ['Công ty FHG'],
        ngaytra: '12-11-2020',
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
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                ...this.getColumnSearchProps('id'),
            },
            {
                title: 'TÊN KHÁCH HÀNG',
                dataIndex: 'tenkh',
                key: 'tenkh',
                ...this.getColumnSearchProps('tenkh'),
            },
            {
                title: 'LOẠI HÓA ĐƠN',
                dataIndex: 'loaihd',
                key: 'loaihd',
                ...this.getColumnSearchProps('loaihd'),
            },
            {
                title: 'TỔNG',
                dataIndex: 'tong',
                key: 'tong',
            },
            {
                title: 'NGÀY',
                dataIndex: 'ngay',
                key: 'ngay',
                ...this.getColumnSearchProps('ngay'),
            },
            {
                title: 'CÔNG TY',
                key: 'congty',
                dataIndex: 'congty',
                render: congty => (
                    <span>
                        {congty.map(tag => {
                            let color = tag.length > 5 ? 'geekblue' : 'green';
                            if (tag === 'loser') {
                                color = 'volcano';
                            }
                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            );
                        })}
                    </span>
                ),
                ...this.getColumnSearchProps('congty'),
            },
            {
                title: 'NGÀY TRẢ',
                dataIndex: 'ngaytra',
                key: 'ngaytra',
                ...this.getColumnSearchProps('ngaytra'),
            },
        ];
        return <Table columns={columns} dataSource={data} />;

    }
}


function History(props) {
    console.log('prop history', props)
    return (
        <>
            <br></br>
            <App />
        </>

    )
}
export default History