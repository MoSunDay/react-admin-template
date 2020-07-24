import React, { Component } from 'react'
import { Card, Button } from 'antd'
import { getServiceReleaseLogDetail } from '../../api'

class DeployReleaseLogView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
    }
  }

  componentDidMount() {
    let { service, selectLog } = this.props.location.state
    console.log(selectLog)
    let selectLogArray = selectLog.split(' ')
    let logID = selectLogArray.slice(2)[0]
    const response = getServiceReleaseLogDetail(service, logID)
    response
      .then((res) => {
        this.setState({ content: res['content'] })
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
        <Card title="日志内容" extra={this.goBack()}>
          <div>
            <pre>{this.state.content}</pre>
          </div>
        </Card>
      </div>
    )
  }
}

export default DeployReleaseLogView
