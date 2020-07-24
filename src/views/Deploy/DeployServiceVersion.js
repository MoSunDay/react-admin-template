import React, { Component } from 'react'
import { Card, Button } from 'antd'
import { List } from 'antd'
import { getServiceVersionList } from '../../api'

class DeployServiceVersion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      serviceVersionList: [],
    }
  }

  componentDidMount() {
    let { service } = this.props.location.state
    const response = getServiceVersionList(service)
    response
      .then((res) => {
        this.setState({ serviceVersionList: res['content'] })
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

  selectVersion = (serviceVersion) => {
    this.props.history.push({
      pathname: `/admin/deploy/service-version/detail`,
      state: { serviceVersion: serviceVersion },
    })
  }

  render() {
    return (
      <div>
        <Card title="版本信息" extra={this.goBack()}>
          <List
            bordered
            dataSource={this.state.serviceVersionList}
            renderItem={(item) => (
              <List.Item onClick={() => this.selectVersion(item)}>
                <List.Item.Meta
                  title={<a href="javascript:void(0);">{item}</a>}
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    )
  }
}

export default DeployServiceVersion
