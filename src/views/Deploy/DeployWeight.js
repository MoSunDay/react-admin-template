import React, { Component } from 'react'
import { Card, Button } from 'antd'

import { Form, Slider, InputNumber, Row, Col } from 'antd'
import { getServiceWeight, setServiceWeight } from '../../api'

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { offset: 0, span: 8 },
}

class DeployWeight extends Component {
  constructor(props) {
    super(props)
    this.state = {
      serviceName: '',
      weight: {},
    }
  }

  componentDidMount() {
    let { service } = this.props.location.state
    const response = getServiceWeight(service)
    response
      .then((res) => {
        this.setState({ weight: res['content'], serviceName: service })
        console.log(res['content'])
      })
      .catch((err) => {
        console.log(err)
      })
  }

  onChange = (value, serviceVersion) => {
    let { weight } = this.state
    let weightKeysArray = Object.keys(weight)
    if (weightKeysArray.length == 2) {
      for (let i = 0; i < weightKeysArray.length; i++) {
        if (weightKeysArray[i] == serviceVersion) {
          weight[serviceVersion] = value
          let otherVersion = weightKeysArray[1 - i]
          weight[otherVersion] = 100 - value
        }
      }
    } else {
      weight[serviceVersion] = value
    }
    this.setState({ weight: weight })
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
    const response = setServiceWeight(this.state.serviceName, this.state.weight)
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
    let { weight } = this.state
    return (
      <div>
        <Card title="权重" extra={this.goBack()}>
          <Form
            name="weight"
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            {Object.keys(weight).map((key) => {
              return (
                <Form.Item {...layout} label={key}>
                  <Row>
                    <Col span={16}>
                      <Slider
                        min={1}
                        max={100}
                        onChange={(event) => {
                          this.onChange(event, key)
                        }}
                        value={weight[key]}
                      />
                    </Col>
                    <Col span={4}>
                      <InputNumber
                        min={1}
                        max={100}
                        style={{ margin: '0 16px' }}
                        value={weight[key]}
                      />
                    </Col>
                  </Row>
                </Form.Item>
              )
            })}
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

export default DeployWeight
