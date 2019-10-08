import React from 'react'
import { Card, Avatar, Row, Col } from 'antd'
function payment() {
    return (
        <>
            <h1 style={{ textAlign: 'center' }}><b>THANH TOÁN HÓA ĐƠN</b></h1>
            <div style={{ margin: '50px 50px' }}>

                <Row type="flex" justify="center" align="top">
                    <Col span={6} >
                        <Card style={{ width: '200px' }}>
                            <Card.Meta
                                avatar={<Avatar src="data:image/png;base64,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" />}
                                title={<p>NƯỚC</p>}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card style={{ width: '200px' }}>
                            <Card.Meta
                                avatar={<Avatar src="https://cdn3.iconfinder.com/data/icons/computers-programming/512/Electronics-512.png" />}
                                title={<p>ĐIỆN</p>}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card style={{ width: '200px' }}>
                            <Card.Meta
                                avatar={<Avatar src="https://cdn1.vectorstock.com/i/1000x1000/47/25/blue-wifi-icon-wireless-symbol-on-isolated-vector-14074725.jpg" />}
                                title={<p>INTERNET</p>}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default payment