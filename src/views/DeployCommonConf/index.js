import React, { Component } from 'react'
import { Card, Button } from 'antd'
import { Form, Input, InputNumber } from 'antd'

const layout = {
    labelCol: { span: 0 },
    wrapperCol: { offset: 0, span: 8 },
}

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not validate email!',
        number: '${label} is not a validate number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
}

class DeployCommonConf extends Component {
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
                <Card title="公共配置" extra={this.goBack()}>
                    <Form
                        name="nest-messages"
                        validateMessages={validateMessages}
                        {...layout}
                    >
                        <Form.Item name={'content'}>
                            <Input.TextArea defaultValue="test" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default DeployCommonConf
