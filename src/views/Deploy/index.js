import React, { Component } from 'react';
import { Table, Space, Divider } from 'antd';
import { Form, Button, TreeSelect, Card } from 'antd';


const { TreeNode } = TreeSelect;

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { offset: 0, span: 8 },
};


class Deploy extends Component {

    constructor(props) {
        super(props)
        this.state = {
            serviceDTcolumns: [
                {
                    title: '关联域名',
                    dataIndex: 'host',
                    key: 'host',
                },
                {
                    title: '修改与查看',
                    key: 'modfiy',
                    render: () => (
                      <Space>
                          <Button type="primary" size="small" onClick={this.viewHandler.bind(this, "service-status")}>服务状态</Button>
                          <Button type="primary" size="small" onClick={this.viewHandler.bind(this, "release-log")}>发布记录</Button>
                          <Button type="primary" size="small" onClick={this.viewHandler.bind(this, "service-weight")}>权重</Button>
                          <Button type="primary" size="small" onClick={this.viewHandler.bind(this, "common-conf")}>公共配置</Button>
                      </Space>
                    ),
                },
            ],
            serviceDVcolumns: [
                {
                  title: '服务描述版本',
                  dataIndex: 'service_describle_version',
                  key: 'service_describle_version',
                },
                {
                  title: '权重',
                  dataIndex: 'weight',
                  key: 'weight',
                },
                {
                  title: '状态',
                  dataIndex: 'status',
                  key: 'status',
                },
                {
                  title: '修改与查看',
                  key: 'modfiy',
                  render: () => (
                    <Space>
                        <Button type="primary" size="small" onClick={this.viewHandler.bind(this, "release")}>发布服务</Button>
                        <Button type="primary" size="small" onClick={this.viewHandler.bind(this, "modfiy-instance")}>实例数</Button>
                        <Button type="primary" size="small" onClick={this.viewHandler.bind(this, "deploy-config")}>部署配置</Button>
                    </Space>
                  ),
                },
            ],
            serviceData: [
                {
                    service_describle_version: "em-feed-server:1",
                    weight: 100,
                    status: 'running',
                    host: 'sre.mobiu.space',
                    create_time: '2020-02-02'
                },
            ]
        }
    }

    getServiceDataSource = (service) => {
        if (service === undefined || service === "") {
            return [];
        }
        this.state.serviceData[0]["service_describle_version"] = "em-feed-server:2";
        return this.state.serviceData
    }

    viewHandler = (resource) => {
        this.props.history.push(`/admin/deploy/${resource}`);
    }

    onSelectChange = (value) => {
        var storage = window.localStorage;
        storage["serviceName"] = value;
        console.log(`onSelectChange: ${value}`)
    }

    render() {
        var storage = window.localStorage;
        let treeSelect = null;
        if (storage["serviceName"]) {
            console.log("in cache")
            treeSelect = <TreeSelect
                showSearch
                style={{ width: '100%' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Please select"
                defaultValue="em-feed-server"
                onChange={this.onSelectChange}
                allowClear
                treeDefaultExpandAll
                >
                    <TreeNode value="em-feed-server" key="em-feed-server" title={<b style={{ color: '#08c' }}>em-feed-server</b>}></TreeNode>
                </TreeSelect>
        } else {
            treeSelect = <TreeSelect
                showSearch
                style={{ width: '100%' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Please select"
                onChange={this.onSelectChange}
                defaultValue="em-feed-server"
                allowClear
                treeDefaultExpandAll
                >
                    <TreeNode value="em-feed-server" title={<b style={{ color: '#08c' }}>em-feed-server</b>}></TreeNode>
                </TreeSelect>
        }

        return (
            <div>
              <Card title="服务控制台">
              <Form {...layout} name="control-hooks">
                <Form.Item name="serviceName" label="选择服务" rules={[{ required: true }]}>
                    {treeSelect}
                </Form.Item>
                <Divider />
                <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) => prevValues.serviceName !== currentValues.serviceName}
                >
                {({ getFieldValue }) => {
                        let serviceName = getFieldValue('serviceName');
                        return (
                            <div>
                                <Table columns={this.state.serviceDTcolumns} dataSource={this.getServiceDataSource(serviceName)} title={() => '公共配置详情'} pagination={false}/>
                                <Divider />
                                <Table columns={this.state.serviceDVcolumns} dataSource={this.getServiceDataSource(serviceName)} title={() => '服务部署信息'} pagination={false}/>
                            </div>
                        );
                    }
                }
                </Form.Item>
                </Form>
              </Card>
            </div>
        );
    }
}

export default Deploy;