import { Checkbox, Select } from 'antd';
import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'


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
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['CÔNG TY ĐIỆN A', 'CÔNG TY ĐIỆN B', 'CÔNG TY ĐIỆN C'];
class Schedule extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checkedList: !this.props.getAllCompany.loading ? this.props.getAllCompany.getAllCompany : [],
      indeterminate: true,
      checkAll: false,
    };
  }

  onChange = checkedList => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length,
    });
  };

  onCheckAllChange = e => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  render() {
    console.log(this.state.checkedList)


    return (
      <div>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Chọn loại hóa đơn"
          optionFilterProp="children"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="dien">ĐIỆN</Option>
          <Option value="wifi">WIFI</Option>
          <Option value="nuoc">NƯỚC</Option>
        </Select>
        <br></br>
        <br></br>
        <div style={{ borderBottom: '1px solid #E9E9E9' }}>
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
          >
            Check all
          </Checkbox>
        </div>
        <br />
        <CheckboxGroup
          options={plainOptions}
          value={this.state.checkedList}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
// const CREATE_ELECTRICBILL = gql`
// mutation ($electricbillInput: ElectricBillInput!){
//   createElectricBill(electricbillInput: $electricbillInput)
//   }
// `
const GET_ALL_COMPANY = gql`query{
    getAllCompany{
        userId
        name
        logo
      }
}
`
export default graphql(
  GET_ALL_COMPANY, {
  name: 'getAllCompany',
  options: {}
})(Schedule)