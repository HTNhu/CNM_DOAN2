import { Checkbox } from 'antd';
import  React from 'react'
import { Table } from 'antd';

const columns = [
  {
    title: 'TÊN CÔNG TY',
    dataIndex: 'ten',
    render: text => <a>{text}</a>,
  },
  {
    title: 'LOẠI',
    dataIndex: 'loai',
  },
  {
    title: 'ĐỊA CHỈ',
    dataIndex: 'diachi',
  },
];
const data = [
  {
    key: '1',
    ten: 'CÔNG TY ĐIỆN',
    loai: 'Điện',
    diachi: 'HCM',
  },
  {
    key: '2',
    ten: 'CÔNG TY ĐIỆN',
    loai: 'Điện',
    diachi: 'HCM',
  },
  {
    key: '3',
    ten: 'CÔNG TY ĐIỆN',
    loai: 'Điện',
    diachi: 'HCM',
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },

};
function Schedule(){
  return (
      <div>
         <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
  )
}
export default Schedule