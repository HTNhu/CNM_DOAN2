import React, { useState } from 'react'
import { Radio } from 'antd'
import Member from './member'
import Company from './company'
// import { withRouter } from 'react-router-dom'
function Signup(props) {
    const [type, setType] = useState('');
    // const RadioGroup = Radio.Group
    console.log('props signup', props)
    // const radioStyle = {
    //     display: 'block',
    //     height: '50px',
    //     lineHeight: '50px',
    // }
    const onChange = (e) => {
        console.log("ưedwef", e.target.value, props)
        setType(e.target.value)
        //   props.history.push(`signup/${e.target.value})
    }
    return (
        <>
            <div >
                <h3>Bạn muốn đăng ký tài khoản </h3>
                <Radio.Group onChange={onChange} size='small' defaultValue='member'  >
                    <Radio value='member' ><span style={{ fontSize: '13px' }}>Khách hàng</span></Radio>
                    <Radio value='company'><span style={{ fontSize: '13px' }}>Công ty</span></Radio>
                </Radio.Group>
          
            {type === 'member' && <Member history ={props.history}></Member>}
            {type === 'company' && <Company history = {props.history}></Company>}
            </div>
        </>

    )

}
export default Signup