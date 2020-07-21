import React, { Component } from 'react'
import { Card, Button } from 'antd'
import { Form, TreeSelect } from 'antd'

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { offset: 0, span: 8 },
}

class DeployReleaseLog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: ['2020-07-12 23:26:55 em-feed-server:1'],
    }
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
        <Card title="发布服务" extra={this.goBack()}>
          <Form {...layout} name="deploy-servcie">
            <Form.Item label="选择版本号">
              <TreeSelect
                treeData={[
                  {
                    title: 'em-feed-server:1',
                    value: 'em-feed-server:1',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                发布!
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}

export default DeployReleaseLog
