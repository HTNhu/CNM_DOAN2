import React from 'react'
import { Input } from 'antd';
import { Modal, Button } from 'antd';
import { Table } from 'antd';
import { withRouter } from 'react-router-dom'
const columns = [
    {
        title: 'CÔNG TY',
        dataIndex: 'congty',
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];
const data = [
    {
        key: '1',
        congty: 'Công Ty ABC',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        congty: 'Công Ty ABC',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
       congty: 'Công Ty ABC',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
];


class App extends React.Component {
    state = { visible: false };

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
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Input placeholder="Nhập mã khách hàng, số điện thoại...."
                    style={{ width: 500, margin: 20 }} />
                <Button type="primary" style={{ margin: 20 }} onClick={this.showModal}>
                    Tiếp tục</Button>
                <Modal
                    title="HÓA ĐƠN THANH TOÁN"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div>
                        <h4>Tên: Phan Hữu Quý</h4>
                        <h4>Địa chỉ: HCM</h4>
                        <h4>Số điện thoại: 0933323622</h4>
                        <Table columns={columns} dataSource={data} size="small" />
                    </div>
                </Modal>
            </div>
        );
    }
}

function Paybill(props) {
    console.log('prop history', props)
    return (
        <>
            <h1 style={{ textAlign: 'center' }}><b>HÓA ĐƠN</b></h1>
            <App />
        </>

    )
}
export default withRouter(Paybill)