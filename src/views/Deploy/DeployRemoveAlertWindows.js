import { Modal, Button } from 'antd'
import React, { Component } from 'react'
import { delServiceDeployment } from '../../api'

class DeployRemoveAlertWindows extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ModalText: `确认要删除吗？`,
      visible: false,
      confirmLoading: false,
      serviceVersion: props.serviceVersion,
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
        ModalText: '确认要删除吗？',
        visible: false,
        confirmLoading: false,
      })
      let { serviceVersion } = this.state
      let serviceName = serviceVersion.split(':')[0]
      const response = delServiceDeployment(serviceName, serviceVersion)
      response
        .then((res) => {
          this.setState({
            content: res['content']['config']['hpa'],
            serviceVersion: serviceVersion,
          })
        })
        .catch((err) => {
          console.log(err)
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
