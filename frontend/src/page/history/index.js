import React from 'react'
// import { withRouter } from 'react-router-dom'

import { Table, Divider, Tag } from 'antd';

import { Select } from 'antd';

const { Option } = Select;

function onChange(value) {
    console.log(`selected ${value}`);
}

function onBlur() {
    console.log('blur');
}

function onFocus() {
    console.log('focus');
}

function onSearch(val) {
    console.log('search:', val);
}

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'LOẠI HÓA ĐƠN',
        dataIndex: 'loaihd',
        key: 'loaihd',
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
    },
    {
        title: 'NGÀY TRẢ',
        dataIndex: 'ngaytra',
        key: 'ngaytra',
    },
];

const data = [
    {
        key: '1',
        id: 'HD001',
        loaihd: 'Wifi',
        tong: '300000vnđ',
        ngay: '12-11-2020',
        congty: ['Công ty DCF'],
        ngaytra: '12-11-2020',
    },
    {
        key: '2',
        id: 'HD002',
        loaihd: 'Wifi',
        tong: '300000vnđ',
        ngay: '12-11-2020',
        congty: ['Công ty DUR'],
        ngaytra: '12-11-2020',
    },
    {
        key: '3',
        id: 'HD003',
        loaihd: 'Wifi',
        tong: '300000vnđ',
        ngay: '12-11-2020',
        congty: ['Công ty FHG'],
        ngaytra: '12-11-2020',
    },
];

function History(props) {
    console.log('prop history', props)
    return (
        <div>
            <Select
                showSearch
                style={{ width: 200, margin: 30 }}
                placeholder="Chọn loại hóa đơn"
                optionFilterProp="loaihd"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                    option.props.loaihd.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Option value="1">Wifi</Option>
                <Option value="2">Điện</Option>
                <Option value="3">Nước</Option>
            </Select>
            <Table columns={columns} dataSource={data} />
        </div>

    )
}
export default History