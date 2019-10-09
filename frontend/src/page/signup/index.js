import React from 'react'
import { Radio  } from 'antd'
// import { withRouter } from 'react-router-dom'
function Signup(props){
    const RadioGroup = Radio.Group
    console.log('props signup',props)
    const radioStyle = {
        display: 'block',
        height: '50px',
        lineHeight: '50px',
    }
    const onChange = (e) => {
          console.log(e.target.value, props)
          props.history.push(e.target.value)
      }
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}> 
        <h1>Bạn muốn đăng ký tài khoản với tư cách</h1>
        <RadioGroup onChange={onChange} size='large'>
        <Radio style={radioStyle} value='member'><span style={{fontSize:'20px'}}>Khách hàng</span></Radio>
        <Radio style={radioStyle} value='company'><span style={{fontSize:'20px'}}>Công ty</span></Radio>
        </RadioGroup>
        </div>
    )
}
export default Signup