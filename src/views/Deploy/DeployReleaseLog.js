import React, { Component } from 'react'
import { Card, Button } from 'antd'
import { List } from 'antd'
import { getServiceReleaseLogList } from '../../api'

class DeployReleaseLog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logList: [],
      service: '',
    }
  }

  componentDidMount() {
    let { service } = this.props.location.state
    const response = getServiceReleaseLogList(service)
    response
      .then((res) => {
        this.setState({ logList: res['content'], service: service })
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

  selectVersion = (selectLog) => {
    this.props.history.push({
      pathname: `/admin/deploy/release-log/view`,
      state: { selectLog: selectLog, service: this.state.service },
    })
  }

  render() {
    return (
      <div>
        <Card title="发布列表" extra={this.goBack()}>
          <List
            bordered
            dataSource={this.state.logList}
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

export default DeployReleaseLog
