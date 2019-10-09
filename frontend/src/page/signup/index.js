import React from 'react'
import { Radio  } from 'antd'
// import { withRouter } from 'react-router-dom'
function Signup(props){
    const RadioGroup = Radio.Group
    console.log('props signup',props)
    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    }
    const onChange = (e) => {
          console.log(e.target.value, props)
          props.history.push(e.target.value)
      }
    return (
        <div style={{margin :'0 auto'}}> 
        <RadioGroup onChange={onChange} style={{}} >
        <Radio style={radioStyle} value='company'>Khách hàng</Radio>
        <Radio style={radioStyle} value='member'>Công ty</Radio>
        </RadioGroup>
        </div>
    )
}
export default Signup