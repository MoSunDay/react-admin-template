import React, { Component } from 'react';
import { Card, Button, Table, Tooltip, Tag, Select } from 'antd';
import ButtonGroup from "antd/es/button/button-group";
import { getTopics }  from '../../api';
import { mapFiledToChinese }  from '../../utils';

import { Form, Input } from 'antd';

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 8 },
};

const tailLayout = {
  wrapperCol: { offset: 0, span: 8 },
};

const onFinish = values => {
    console.log('Success:', values);
  };

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};


const { Option } = Select;

class Deploy extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            columns: [],
            total: 100,
            isLoading: true,
            page: 1,
            pageSize: 10,
        }
    }

    detailHandler = (record) => {
        this.props.history.push(`/admin/ticket/detail/${record.id}`);
    }

    getAticleTopics = (page, pageSize) => {
        getTopics(page, pageSize).then(res => {
            var rs = [];
            for (let i = 0, length = res.message.length; i < length; i++ ) {
                var temp = {
                    id: res.message[i]['id'],
                    title: res.message[i]['title'],
                    type: res.message[i]['type'],
                    approve: res.message[i]['approve'].toString(),
                    status: res.message[i]["status"],
                    user: res.message[i]['user'],
                    create_time: res.message[i]['create_time'],
                }
                rs.push(temp);
            }

            var first = rs[0];
            var keys = Object.keys(first);
            var columns = keys.map(item => {
                if (item === 'status') {
                    return {
                        title: mapFiledToChinese[item],
                        dataIndex: item,
                        key: item,
                        render: (text, record, index) => {
                            return (
                                <Tooltip title={record.status === "沉睡中" ? '要加油了呢' : '这个状态还可以'}>
                                    <Tag color={record.status === "沉睡中" ? 'red' : 'green' }>{record.status}</Tag>
                                </Tooltip>
                            );
                        }
                    };
                }
                if (item === "approve") {
                    return {
                        title: mapFiledToChinese[item],
                        dataIndex: item,
                        key: item,
                        render: (text, record, index) => {
                            return (
                                <Tooltip title={record.approve === "false" ? '等待审批中' : '审批已通过'}>
                                    <Tag color={record.approve === "false" ? 'red' : 'green' }>{record.approve}</Tag>
                                </Tooltip>
                            );
                        }
                    };
                } else {
                    return {
                        title: mapFiledToChinese[item],
                        dataIndex: item,
                        key: item,
                    };
                }
            });

            columns.push({
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                render: (text, record, index) => {
                    return (
                        <ButtonGroup>
                            <Button size='small' type='primary' onClick={this.detailHandler.bind(this, record)}>查看</Button>
                        </ButtonGroup>
                    )
                }
            });

            this.setState({ dataSource: rs, columns: columns })
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            this.setState({isLoading: false})
        });
    }

    changeHandler = (page, pageSize) => {
        this.setState({page, pageSize})
        this.getAticleTopics(page, pageSize);
    }

    componentDidMount() {
        this.getAticleTopics(1, 10);
    }

    serviceOnChange = (value) => {
        console.log(`selected ${value}`)
    }

    render() {
        return (
            <Card title="服务列表">
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="inline"
                >      
                <Form.Item
                    label="服务名"
                    name="服务名"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="选择服务"
                        optionFilterProp="children"
                        onChange={this.serviceOnChange}
                        filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
                    </Select>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>
              </Form>
   
                <Table
                    loading={this.state.isLoading}
                    rowKey={record => record.id}
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                    pagination={{ current: this.state.page, total: this.state.total, onChange: this.changeHandler }}
                />
            </Card>
        );
    }
}

export default Deploy;