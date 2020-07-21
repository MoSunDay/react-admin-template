import { Modal, Button } from 'antd'
import React, { Component } from 'react'

class DeployRemoveAlertWindows extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ModalText: `确认要删除 ${props.service} 吗？`,
      visible: false,
      confirmLoading: false,
      service: props.service,
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleOk = () => {
    this.setState({
      ModalText: '正在提交删除',
      confirmLoading: true,
    })
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      })
    }, 2000)
  }

  handleCancel = () => {
    console.log('Clicked cancel button')
    this.setState({
      visible: false,
    })
  }

  render() {
    const { visible, confirmLoading, ModalText } = this.state
    return (
      <>
        <Button type="primary" size="small" onClick={this.showModal}>
          删除
        </Button>
        <Modal
          title="删除确认"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>{ModalText}</p>
        </Modal>
      </>
    )
  }
}

export default DeployRemoveAlertWindows
