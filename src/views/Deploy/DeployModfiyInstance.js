import React, { Component } from 'react'
import { Card, Button } from 'antd'

import { Form, Slider, InputNumber, Row, Col } from 'antd'
import {
  getServiceVersionInstanceNumber,
  setServiceVersionInstanceNumber,
} from '../../api'

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { offset: 0, span: 8 },
}

class DeployModfiyInstance extends Component {
  constructor(props) {
    super(props)
    this.state = {
      serviceVersion: '',
      instanceNumber: -1,
    }
  }

  componentDidMount() {
    let { serviceVersion } = this.props.location.state
    this.setState({ serviceVersion: serviceVersion })
    const response = getServiceVersionInstanceNumber(serviceVersion)
    response
      .then((res) => {
        this.setState({ instanceNumber: res['content'] })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  onChange = (value) => {
    this.setState({ instanceNumber: value })
  }

  goBack = () => {
    return (
      <Button htmlType="button" onClick={this.props.history.goBack}>
        返回
      </Button>
    )
  }

  onFinish = (values) => {
    console.log('onFinish:', values)
  }

  onFinishFailed = (errorInfo) => {
    console.log('onFinishFailed:', errorInfo)
  }

  onMidfiy = () => {
    console.log(`onMidfiy ${this.state.weight}`)
    const response = setServiceVersionInstanceNumber(
      this.state.serviceVersion,
      this.state.instanceNumber
    )
    response
      .then((res) => {
        console.log('onMidfiy done')
      })
      .catch((err) => {
        console.log(err)
      })
    this.props.history.goBack()
  }

  render() {
    let { instanceNumber } = this.state
    return (
      <div>
        <Card title="实例个数" extra={this.goBack()}>
          <h4>{this.state.serviceVersion} 实例数:</h4>
          <Form
            name="instance"
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item {...layout}>
              <Row>
                <Col span={16}>
                  <Slider
                    min={1}
                    max={100}
                    onChange={this.onChange}
                    value={instanceNumber}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber
                    min={1}
                    max={100}
                    style={{ margin: '0 16px' }}
                    value={instanceNumber}
                  />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item {...layout}>
              <Button type="primary" htmlType="submit" onClick={this.onMidfiy}>
                提交修改
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}

export default DeployModfiyInstance
