import React, { Component } from "react";
import { Table, Button, Popconfirm, Row, Col, Icon, Upload, Alert } from "antd";
import { ExcelRenderer } from "react-excel-renderer";
import { EditableFormRow, EditableCell } from "../../utils/editTable";
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import openNotificationWithIcon from '../../component/openNotification'
import { Client } from '../../tools/apollo'
import * as compose from 'lodash.flowright'
import { get } from "http";
class ExelBill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: [],
      rows: [],
      index: -1,
      // service: JSON.parse(localStorage.getItem('info')).service, // thay service
      errorMessage: null,
      columns: [
        {
          title: "ID",
          dataIndex: "billId",
          editable: false
        },
        {
          title: "Số điện thoại",
          dataIndex: "phone",
          editable: false,
        },
        {
          title:
            localStorage.getItem('service') === 'Điện' ? "Điện năng tiêu thụ" : "Lượng nước tiêu thụ",
          dataIndex: localStorage.getItem('service') === 'Điện' ? `description.DNTT` : `description.LNTT`,
          editable: false
        },
        {
          title: "Đơn giá",
          dataIndex: "description.unitPrice",
          editable: false
        },
        {
          title: "Tổng tiền",
          dataIndex: "total",
          editable: false
        },
        {
          title: "Ngày lập",
          dataIndex: "createdAt",
          editable: false
        },
        {
          title: "",
          dataIndex: "action",
          render: (text, record) =>
            this.state.rows.length >= 1 ? (
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.handleDelete(record.billId)}
              >
                <Icon
                  type="delete"
                  theme="filled"
                  style={{ color: "red", fontSize: "20px" }}
                />
              </Popconfirm>
            ) : null
        }
      ]
    };
  }
  getCustomer = (phone) => {
    const list = this.props.getCompanyByUsername && this.props.getCompanyByUsername.getCompanyByUsername.lstCustomer
    console.log(this.props.getCompanyByUsername.getCompanyByUsername.lstCustomer)
    return list.findIndex(item => item.phone === phone) < 0 ? null : list.find(item => item.phone === phone)

  }
  handleSave = row => {
    const newData = [...this.state.rows];
    const index = newData.findIndex(item => row.billId === item.billId);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({ rows: newData });
  };

  checkFile(file) {
    let errorMessage = '';
    if (!file || !file[0]) {
      return;
    }
    const isExcel =
      file[0].type === "application/vnd.ms-excel" ||
      file[0].type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    if (!isExcel) {
      errorMessage = "You can only upload Excel file!";
    }
    console.log("file", file[0].type);
    const isLt2M = file[0].size / 1024 / 1024 < 2;
    if (!isLt2M) {
      errorMessage = "File must be smaller than 2MB!";
    }
    console.log("errorMessage", errorMessage);
    return errorMessage;
  }

  fileHandler = fileList => {
    console.log("fileList", fileList);
    let fileObj = fileList;
    if (!fileObj) {
      this.setState({
        errorMessage: "No file uploaded!"
      });
      return false;
    }
    console.log("fileObj.type:", fileObj.type);
    if (
      !(
        fileObj.type === "application/vnd.ms-excel" ||
        fileObj.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
    ) {
      this.setState({
        errorMessage: "Unknown file format. Only Excel files are uploaded!"
      });
      return false;
    }
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        let newRows = [];
        resp.rows.slice(1).map((row, index) => {
          const i = index
          console.log("row length", row, resp.rows, i)
          // if(row[0] === undefined ) return newRows
         
          // console.log("customer", cus)
          if (index < resp.rows.length - 1) {
            if (row && row !== undefined) {
              const cus = this.getCustomer(row[1])
              if (cus === null) {
                this.setState({
                  errorMessage: `Không tồn tại khách hàng SDT ${row[1]}. Cập nhật danh sách khách hàng`,
                  index
                })
                openNotificationWithIcon("error", 'error', "Sai", this.state.errorMessage)
                return false
              } else {
                newRows.push({
                  billId: row[0],
                  phone: row[1],
                  description: localStorage.getItem('service') === 'Điện' ?
                    {
                      DNTT: row[2],
                      unitPrice: row[3]
                    } : {
                      LNTT: row[2],
                      unitPrice: row[3]
                    },
                  total: row[4],
                  companyId: localStorage.getItem('userId'),
                  companyname: localStorage.getItem('name'), // thay name
                  name: cus.name,
                  address: cus.address,
                  createdAt: new Date((row[5] - (25567 + 1)) * 86400 * 1000).toLocaleDateString()
                });
              }

            }
          }
        });
        if (newRows.length === 0) {
          this.setState({
            errorMessage: "No data found in file!"
          });
          return false;
        } else {
          this.setState({
            cols: resp.cols,
            rows: newRows,
            errorMessage: null
          });
        }
      }
    });
    return false;
  };
  createElectric = async (row) => await this.props.createElectricBill({
    mutation: CREATE_ELECTRICBILL,
    variables: {
      electricbillInput: row
    }
  })
    .then(res => {
      console.log(res)
      if (res.data.createElectricBill) {
        openNotificationWithIcon('success', 'success', 'Create Success', 'Create Success')
      }

    })

    .catch(err1 => {
      let mess = ''
      mess = 'Fail'

      //   openNotificationWithIcon('error', 'create', 'Create Failed', mess)
    })
  createWater = async (row) => await this.props.createWaterBill({
    mutation: CREATE_WATERBILL,
    variables: {
      waterbillInput: row
    }
  })
    .then(res => {
      console.log(res)
      if (res.data.createWaterBill) {
        openNotificationWithIcon('success', 'success', 'Create Success', 'Create Success')
      }

    }).catch(err1 => {
      let mess = ''
      mess = 'Fail'

      //   openNotificationWithIcon('error', 'create', 'Create Failed', mess)
    })
  handleSubmit = async () => {

    // e.preventDefault()
    this.state.rows.map(async row =>
      localStorage.getItem('service') === "Điện" ? this.createElectric(row) : this.createWater(row)
    )
    await this.props.getBillByCompany.refetch()
    openNotificationWithIcon('success', 'success', 'Create Success', 'Create Success')
    this.setState({ rows: [] })
  }
  handleDelete = billId => {
    const rows = [...this.state.rows];
    this.setState({ rows: rows.filter(item => item.billId !== billId) });
  };
  // handleAdd = () => {
  //   const { count, rows } = this.state;
  //   const newData = {
  //     billId: count,
  //     name: "User's name",
  //     age: "22",
  //     gender: "Female"
  //   };
  //   this.setState({
  //     rows: [newData, ...rows],
  //     count: count + 1
  //   });
  // };

  render() {
    // this.getCustomer("0355983234")
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };
    const columns = this.state.columns.map(col => {
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
          handleSave: this.handleSave
        })
      };
    });
    return (
      <>
        <h1>Importing Excel Component</h1>
        <Row gutter={16}>
          <Col
            span={8}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "5%"
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="page-title">Upload Farmer Data</div>
            </div>
          </Col>
          <Col
            span={8}
            align="right"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              onClick={() => this.props.history.push('./managebill')}
              size="large"
              type="danger"
              style={{ marginBottom: 16 }}
            >
              <Icon type="exit" />
              Thoát
                </Button>
            {this.state.rows.length > 0 && (
              <>
                <Button
                  onClick={this.handleSubmit}
                  size="large"
                  type="primary"
                  style={{ marginBottom: 16, marginLeft: 10 }}
                >
                  Submit Data
                </Button>
              </>
            )}
          </Col>
        </Row>
        <div>
          <Upload
            name="file"
            beforeUpload={this.fileHandler}
            onRemove={() => this.setState({ rows: [] })}
            multiple={false}
          >
            <Button>
              <Icon type="upload" /> Click to Upload Excel File
            </Button>
          </Upload>
        </div>
        <div style={{ marginTop: 20 }}>
          <Table
            components={components}
            rowClassName={() => "editable-row"}
            dataSource={this.state.rows}
            columns={columns}
          />
        </div>
      </>
    );
  }
}
const CREATE_ELECTRICBILL = gql`
mutation ($electricbillInput: ElectricBillInput!){
  createElectricBill(electricbillInput: $electricbillInput)
  }
`
const CREATE_WATERBILL = gql`
mutation ($waterbillInput: WaterBillInput!){
  createWaterBill(waterbillInput: $waterbillInput)
  }
`
const GET_BILL_BYCOMPANY = localStorage.getItem('service') === 'Điện' ?
  gql`query($companyId: String){
  getElectricBillsByCompany(companyId:$companyId){
      billId
      type
      name
      phone
      address
     total 
      description{
        DNTT
      }

}
}
`
  : gql`query($companyId: String){
  getWaterBillsByCompany(companyId:$companyId){
      billId
      type
      name
      phone
      address
     total 
      description{
        LNTT
      }

}
}
`
const GET_COMPANY_BYUSERNAME = gql`
query($username: String!){
   getCompanyByUsername(username:$username){
    lstCustomer{
     name
     phone
     address
   }
  }
  }`
export default compose(
  graphql(
    GET_COMPANY_BYUSERNAME, {
    name: 'getCompanyByUsername',
    options: {
      variables: {
        username: localStorage.getItem('username')
      }
    }
  }),
  graphql(
    CREATE_ELECTRICBILL, {
    name: 'createElectricBill',
    options: {}
  }),
  graphql(
    CREATE_WATERBILL, {
    name: 'createWaterBill',
    options: {}
  }),
  graphql(
    GET_BILL_BYCOMPANY, {
    name: 'getBillByCompany',
    options: {
      variables: {
        companyId: localStorage.getItem('userId')
      }
    }
  }),
)(ExelBill)