import React, {Component} from 'react';
import { Card, Button } from 'antd';

import { Slider, InputNumber, Row, Col } from 'antd';


class DeployWeight extends Component {
    state = {
        inputValue: 100,
    };
    
    onChange = value => {
        this.setState({
          inputValue: value,
        });
    };
    
    goBack = () => {
        return  (
            <Button htmlType="button" onClick={this.props.history.goBack}>返回</Button>
        );
    }

    render() {
        const { inputValue } = this.state;

        return (
            <div>
                <Card title="权重" extra={ this.goBack()}>
                    <h4>em-feed-server:1</h4>
                    <Row>
                        <Col span={12}>
                        <Slider
                            min={1}
                            max={100}
                            onChange={this.onChange}
                            value={typeof inputValue === 'number' ? inputValue : 0}
                        />
                        </Col>
                        <Col span={4}>
                        <InputNumber
                            min={1}
                            max={100}
                            style={{ margin: '0 16px' }}
                            value={inputValue}
                            onChange={this.onChange}
                        />
                        </Col>
                    </Row>
                    <Button type="primary" htmlType="提交">
                        提交
                    </Button>
                </Card>
            </div>
        );
    }
}

export default DeployWeight;