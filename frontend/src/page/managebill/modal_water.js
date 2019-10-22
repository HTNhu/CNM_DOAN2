import React from 'react'
import { Button, Modal, Form, Input } from 'antd';

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;

      return (
        <Modal
          visible={visible}
          title="CHI TIẾT HÓA ĐƠN NƯỚC"
          okText="Xác nhận"
          cancelText="Hủy"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Tên khách hàng">
              {getFieldDecorator('ten', {
                rules: [{ required: true, message: 'Nhập tên!' }],
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Số điện thoại">
              {getFieldDecorator('sdt', {
                rules: [{ required: true, message: 'Nhập số điện thoại!' }],
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Địa chỉ">
              {getFieldDecorator('daichi', {
                rules: [{ required: true, message: 'Nhập địa chỉ!' }],
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Số Khối">
              {getFieldDecorator('sokhoi', {
                rules: [{ required: true, message: 'Không để trống!' }],
              })(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

class CollectionsPage extends React.Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          THÊM HÓA ĐƠN
        </Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

function Modal_Internet() {
  return (
    <>
      <CollectionsPage />
    </>
  )
}
export default Modal_Internet