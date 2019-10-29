
import  React from 'react'
import { Table, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },

};
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
          placeholder={`Search ${dataIndex}`}
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
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
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
        title: 'TÊN CÔNG TY',
        dataIndex: 'ten',
        render: text => <a>{text}</a>,
        ...this.getColumnSearchProps('ten'),
      },
      {
        title: 'LOẠI',
        dataIndex: 'loai',
        ...this.getColumnSearchProps('loai'),
      },
      {
        title: 'ĐỊA CHỈ',
        dataIndex: 'diachi',
        ...this.getColumnSearchProps('diachi'),
      },
    ];
    return <Table rowSelection={rowSelection} columns={columns} dataSource={data} />;
  }
}

const data = [
  {
    key: '1',
    ten: 'CÔNG TY ĐIỆN',
    loai: 'Điện',
    diachi: 'HCM',
  },
  {
    key: '2',
    ten: 'CÔNG TY WIFI',
    loai: 'Wifi',
    diachi: 'HN',
  },
  {
    key: '3',
    ten: 'CÔNG TY NƯỚC',
    loai: 'Nước',
    diachi: 'DN',
  },
];


function Schedule(){
  return (
      <div>
         <App></App>
      </div>
  )
}
export default Schedule