import React, {Component} from 'react';
import { Form, Input, Button, Checkbox, Card, Row, Col } from 'antd';

import './index.less';

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 8,
    },
};


class Login extends Component {
    onFinish = (values) => {
        console.log('Success:', values);
    };
    
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        return (
            <Row>
                <Col span={8} offset={8}>
                    <Card className="my-login-form" title="登录入口" extra={ <Button type="danger" onClick={this.props.history.goBack}>主页</Button> }>
                        <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    
                        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                            Submit
                            </Button>
                        </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
          );
    };
}

export default Login;