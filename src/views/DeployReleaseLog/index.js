import React, { Component } from 'react'
import { Card, Button } from 'antd'
import { List, Typography, Divider } from 'antd'

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
                <Card title="发布日志" extra={this.goBack()}>
                    <List
                        bordered
                        dataSource={this.state.data}
                        renderItem={(item) => (
                            <List.Item>
                                <Typography.Text mark>[Log]</Typography.Text>{' '}
                                {item}
                            </List.Item>
                        )}
                    />
                </Card>
            </div>
        )
    }
}

export default DeployReleaseLog
