import React, { Component } from 'react'
import { Card, Button, Col } from 'antd'
import { Select, Form, Divider, Input } from 'antd'
import { submitDeploy, getServiceVersionList } from '../../api'

const { Option } = Select

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { offset: 0, span: 8 },
}

class DeployRelease extends Component {
  constructor(props) {
    super(props)
    this.state = {
      serviceVersionList: [],
      compilerList: ['java8', 'java11', 'python'],
      deployTypeList: ['slow_start', 'normal'],
      skipList: ['是', '否'],
      serviceName: '',
      serviceVersion: '',
      skip: '否',
      compiler: 'java11',
      deployType: 'slow_start',
      branch: 'master',
    }
  }

  componentDidMount() {
    let { serviceVersion } = this.props.location.state
    let service = serviceVersion.split(':')[0]
    const response = getServiceVersionList(service)
    this.setState({})

    response
      .then((res) => {
        this.setState({
          source: serviceVersion,
          serviceVersionList: res['content'],
          serviceName: service,
          serviceVersion: res['content'][0],
        })
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

  selectVersionChange = (value) => {
    console.log(`selected ${value}`)
    this.setState({ target: value })
  }

  onSubmit = () => {
    const response = submitDeploy(
      this.state.serviceName,
      this.state.source,
      this.state.target
    )
    response
      .then((res) => {
        this.props.history.goBack()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    const defaultVersion = this.state.serviceVersionList[0]
    return (
      <div>
        <Card title="发布服务" extra={this.goBack()}>
          <h4>已选中: {this.state.source}</h4>
          <Divider></Divider>
          <Form {...layout} name="deploy">
            <Form.Item name="版本信息" label="版本信息">
              <Select
                showSearch
                {...layout}
                style={{ width: 300 }}
                placeholder={defaultVersion}
                optionFilterProp="children"
                onChange={this.selectVersionChange}
                defaultValue={defaultVersion}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {this.state.serviceVersionList.map((item) => {
                  return <Option value={item}>{item}</Option>
                })}
              </Select>
            </Form.Item>

            <Form.Item name="发布类型" label="发布类型">
              <Select
                showSearch
                {...layout}
                style={{ width: 300 }}
                placeholder="发布类型"
                optionFilterProp="children"
                onChange={this.selectVersionChange}
                placeholder={this.state.deployType}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {this.state.deployTypeList.map((item) => {
                  return <Option value={item}>{item}</Option>
                })}
              </Select>
            </Form.Item>

            <Form.Item name="构建类型" label="构建类型">
              <Select
                showSearch
                {...layout}
                style={{ width: 300 }}
                placeholder="构建类型"
                optionFilterProp="children"
                onChange={this.selectVersionChange}
                placeholder={this.state.compiler}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {this.state.compilerList.map((item) => {
                  return <Option value={item}>{item}</Option>
                })}
              </Select>
            </Form.Item>

            <Form.Item name="跳过编译" label="跳过编译">
              <Select
                showSearch
                {...layout}
                style={{ width: 300 }}
                placeholder="跳过编译"
                optionFilterProp="children"
                onChange={this.selectVersionChange}
                placeholder={this.state.skip}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {this.state.skipList.map((item) => {
                  return <Option value={item}>{item}</Option>
                })}
              </Select>
            </Form.Item>

            <Form.Item name="代码分支" label="代码分支">
              <Col span={8}>
                <Input
                  size="middle"
                  placeholder={this.state.branch}
                  maxLength="100"
                />
              </Col>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                onClick={this.onSubmit}
                style={{ marginLeft: '15px' }}
              >
                发布!
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}

export default DeployRelease
