import React, { Component } from 'react'
import { Card, Button } from 'antd'
import { Form, Input, InputNumber } from 'antd'

const layout = {
    labelCol: { span: 0 },
    wrapperCol: { offset: 0, span: 8 },
}

class DeployServiceStatus extends Component {
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
                <Card title="服务状态" extra={this.goBack()}>
                    <Card title="部署信息">
                        <pre>em-feed-server-v1 7/7 7 7 13d</pre>
                    </Card>
                    <br />
                    <Card title="容器状态">
                        <pre>
                            em-feed-server-v1-fc995b99-79cs9 2/2 Running 0 4h32m
                        </pre>
                    </Card>
                    <br />
                    <Card title="伸缩策略">
                        <pre>
                            em-feed-server Deployment/em-feed-server-v1 40%/45%
                            2 100 7 47d
                        </pre>
                    </Card>
                </Card>
            </div>
        )
    }
}

export default DeployServiceStatus
