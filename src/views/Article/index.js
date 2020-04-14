import React, { Component } from 'react';
import { Card, Button, Table, Tooltip, Tag, Modal } from 'antd';
import ButtonGroup from "antd/es/button/button-group";
import { getTopics }  from '../../api';

const mapFiledToChinese = {
    id: '序号',
    title: '标题',
    visit_count: '阅读量',
    create_at: '发布时间',
    author: '作者'
}

class Article extends Component {

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

    editHandler = (record) => {
        this.props.history.push(`/admin/article/edit/${record.id}`);
    }

    delHandler = (record) => {
        Modal.confirm({
            title: '标题',
            content: `删除 [${record.title}]？`,
            onCancel: () => {
                console.log('用户取消了');
            },
            onOk: () => {
                console.log('用户确认了');
            }
        });
    }

    getAticleTopics = (page, pageSize) => {
        getTopics(page, pageSize).then(res => {
            // console.log("topiscs response", res);

            var rs = [];
            for (let i = 0, length = res.data.length; i < length; i++ ) {

                var temp = {
                    id: res.data[i]['id'],
                    title: res.data[i]['title'],
                    visit_count: res.data[i]['visit_count'],
                    create_at: res.data[i]['create_at'],
                    author: res.data[i]['author']['loginname'],
                }

                rs.push(temp);
            }
            var first = rs[0];
            var keys = Object.keys(first);
            var columns = keys.map(item => {
                if (item === 'visit_count') {
                    return {
                        title: mapFiledToChinese[item],
                        dataIndex: item,
                        key: item,
                        render: (text, record, index) => {
                            return (
                                <Tooltip title={record.visit_count >= 1000 ? '阅读数超过一千' : '阅读数少于一千'}>
                                    <Tag color={record.visit_count >= 1000 ? 'red' : 'green' }>{record.visit_count}</Tag>
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
                            <Button size='small' type='primary' onClick={this.editHandler.bind(this, record)}>修改</Button>
                            <Button size='small' type='danger' onClick={this.delHandler.bind(this, record)}>删除</Button>
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

    render() {
        return (
            <Card title="文章列表" extra={ <Button type="dashed">导出Excel</Button> }>
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

export default Article;