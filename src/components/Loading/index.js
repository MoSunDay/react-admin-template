import React, { Component } from 'react'
import { Spin, Alert } from 'antd'

class Loading extends Component {
  render() {
    return (
      <div>
        <Spin tip="Loading...">
          <Alert
            message="飞速加载中..."
            description="我觉得吧, 再薛微等一下就好了... 实在不行就泡杯咖啡..."
            type="info"
          />
        </Spin>
      </div>
    )
  }
}

export default Loading
