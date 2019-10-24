import React from 'react'
import { Table, Icon, Input } from 'antd';
import Modal_Internet from './modal_internet'


const { Search } = Input;

const columns = [
    {
        title: 'MÃ HÓA ĐƠN',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'LOẠI HÓA ĐƠN',
        dataIndex: 'loaihd',
        key: 'loaihd',

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
    },

    {
        title: 'SỐ ĐIỆN THOẠI',
        dataIndex: 'sdt',
        key: 'sdt',
    },
    {
        title: 'ĐỊA CHỈ',
        dataIndex: 'diachi',
        key: 'diachi',
    },
    {
        title: 'CHỨC NĂNG',
        key: 'chucnang',
        dataIndex: '',
        render: () => <><Icon type="delete" />&nbsp;&nbsp;&nbsp;&nbsp;<Icon type="edit" /></>,
    },
];

const data = [
    {
        key: '1',
        id: 'HD001',
        loaihd: 'Wifi',
        cuocphi: '300000vnđ',
        tenkh: 'Phan Hữu Quý',
        sdt: '0933323622',
        diachi: 'HCM',

    },
    {
        key: '2',
        id: 'HD002',
        loaihd: 'Wifi',
        cuocphi: '300000vnđ',
        tenkh: 'Hồ Trần Như',
        sdt: '0933323622',
        diachi: 'HCM',

    },
    {
        key: '3',
        id: 'HD003',
        loaihd: 'Wifi',
        cuocphi: '300000vnđ',
        tenkh: 'Trần Quang Phúc',
        sdt: '0933323622',
        diachi: 'HCM',
    },
];

function ManageBill(props) {
    const {isShowing, toggle} = Modal_Internet();
    return (
        <>
            <Search style={{ width: 500 }} placeholder="Nhâp dữ liệu tìm kiếm" onSearch={value => console.log(value)} enterButton />
            <br></br>
            <br></br>
            <Table columns={columns} dataSource={data} />
            <br></br>
            <Modal_Internet>

            </Modal_Internet>

        </>

    )
}
export default ManageBill