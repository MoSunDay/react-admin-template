import React, { Component } from 'react'
import { Card, Button } from 'antd'
import { Form, Input } from 'antd'
import { getServiceCommonConfig, setServiceCommonConfig } from '../../api'

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { offset: 0, span: 8 },
}


class DeployCommonConf extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: "",
      serviceName: "",
    }
  }

  componentDidMount() {
    let { service } = this.props.location.state
    const response = getServiceCommonConfig(service)
    response
      .then((res) => {
        this.setState({content: res["content"], serviceName: service});
      })
      .catch((err) => {
        console.log(err)
      });
  }

  onChange = (event) => {
    this.setState({
      content: event.target.value
    })
  }

  onSubmit = () => {
    const response = setServiceCommonConfig(this.state.serviceName, this.state.content)
    response
      .then((res) => {
        console.log("common submit")
        this.props.history.goBack();
      })
      .catch((err) => {
        console.log(err)
      });
  }

  goBack = () => {
    return (
      <Button htmlType="button" onClick={this.props.history.goBack}>
        返回
      </Button>
    )
  }

  render() {
    return (
      <div>
        <Card title="公共配置" extra={this.goBack()}>
            <Input.TextArea {...layout} autoSize={true} value={this.state.content} onChange={this.onChange} />
            <Button type="primary" onClick={this.onSubmit} style={{ marginTop: '15px'}}>
              提交
            </Button>
        </Card>
      </div>
    )
  }
}

export default DeployCommonConf
