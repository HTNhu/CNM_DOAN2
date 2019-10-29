import { Table, Input, Button, Icon, Popconfirm, Form } from 'antd';
import Highlighter from 'react-highlight-words';
import React from 'react'
// ----
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    state = {
        editing: false,
    };
    renderCell = form => {
        this.form = form;
        const { children, dataIndex, record, title } = this.props;
        const { editing } = this.state;
        return editing ? (
            <Form.Item style={{ margin: 0 }}>
                {form.getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ],
                    initialValue: record[dataIndex],
                })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
            </Form.Item>
        ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{ paddingRight: 24 }}
                    onClick={this.toggleEdit}
                >
                    {children}
                </div>
            );
    };

    render() {
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
                ) : (
                        children
                    )}
            </td>
        );
    }
}

class EditableTable extends React.Component {
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
                    placeholder={`Tìm ${dataIndex}`}
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
    constructor(props) {

        super(props);
        this.columns = [
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
            {
                title: '',
                dataIndex: 'xoa',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm okText="Đồng ý" cancelText="Không" title="Bạn có muốn xóa công ty này?" onConfirm={() => this.handleDelete(record.key)}>
                            <Icon
                                type="delete"
                                theme="filled"
                                style={{ color: "red", fontSize: "20px" }}
                            />
                        </Popconfirm>
                    ) : null,
            },
        ];

        this.state = {
            dataSource: [
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
            ],
            count: 3,
        };
    }

    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    };


    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSource: newData });
    };

    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <Table
                pagination={{ pageSize: 30 }} scroll={{ y: 240 }}
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>
        );
    }
}
function ManageCompany() {
    return (
        // <h1>ManageCompany</h1>
        <div>
            <EditableTable />
        </div>
    )
}

export default ManageCompany