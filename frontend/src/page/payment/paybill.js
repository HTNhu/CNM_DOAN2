import React from 'react'
import { Modal, Button } from 'antd';
import { Table, Input } from 'antd';
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


class Paybill extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            value: ''
        }
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
        console.log("value", this.state.phone)
        const { Search} = Input
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Search 
                style={{ width: 500, margin: 20 }}
                placeholder="Nhập mã khách hàng, số điện thoại...." 
                onSearch={value => this.setState({
                    phone: value
                })} enterButton />
                
            {/* </div> */}
         {/* <Input placeholder= */}
        {/* //     style={{ width: 500, margin: 20 }}
        //     onChange={(value) => { console.log(value) }} />
        //     <Button type="primary" style={{ margin: 20 }} onClick={this.showModal}>
        //         Tiếp tục</Button> */}
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
            </div >
        );
    }
}

export default withRouter(Paybill)