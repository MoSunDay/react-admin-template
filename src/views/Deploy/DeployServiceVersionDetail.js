import React, { Component } from 'react'
import { Card, Button } from 'antd'
import { Input } from 'antd'
import { getServiceVersionDetail, setServiceVersionDetail } from '../../api'

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { offset: 0, span: 8 },
}

class DeployServiceVersionDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      serviceVersion: '',
    }
  }

  componentDidMount() {
    let { serviceVersion } = this.props.location.state
    const response = getServiceVersionDetail(serviceVersion)
    response
      .then((res) => {
        this.setState({
          content: res['content']['config']['deployment'],
          serviceVersion: serviceVersion,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  onChange = (event) => {
    this.setState({
      content: event.target.value,
    })
  }

  onSubmit = () => {
    const response = setServiceVersionDetail(
      this.state.serviceVersion,
      this.state.content,
      'deployment'
    )
    response
      .then((res) => {
        console.log('common submit')
        this.props.history.goBack()
      })
      .catch((err) => {
        console.log(err)
      })
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
        <Card title="版本详情" extra={this.goBack()}>
          <Input.TextArea
            {...layout}
            autoSize={true}
            value={this.state.content}
            onChange={this.onChange}
          />
          <Button
            type="primary"
            onClick={this.onSubmit}
            style={{ marginTop: '15px' }}
          >
            确认修改
          </Button>
        </Card>
      </div>
    )
  }
}

export default DeployServiceVersionDetail
