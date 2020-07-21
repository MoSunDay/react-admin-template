import React from 'react'
import { Form, Button, TreeSelect, Card, Table, Space, Divider } from 'antd'
import PropTypes from 'prop-types'
import { columnProcessor } from '../../utils'
import { getServiceList, getServiceDetails } from '../../api'

const { useState, useEffect } = React

const { TreeNode } = TreeSelect

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { offset: 0, span: 8 },
}

const serviceDTcolumns = [
  {
    title: '关联域名',
    dataIndex: 'host',
    key: 'host',
  },
  {
    title: '查询状态',
    key: 'modify',
    render: (text, row, extra) => (
      <Space>
        <Button
          type="primary"
          size="small"
          onClick={extra.viewHandler('service-status')}
        >
          运行状态
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={extra.viewHandler('service-status')}
        >
          服务描述
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={extra.viewHandler('release-log')}
        >
          发布记录
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={extra.viewHandler('service-weight')}
        ></Button>
      </Space>
    ),
  },
  {
    title: '服务操作',
    key: 'modify',
    render: (text, row, extra) => (
      <Space>
        <Button
          type="primary"
          size="small"
          onClick={extra.viewHandler('service-status')}
        >
          修改权重
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={extra.viewHandler('release-log')}
        >
          伸缩策略
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={extra.viewHandler('common-conf')}
        >
          其他配置
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={extra.viewHandler('release-log')}
        ></Button>
        <Button
          type="primary"
          size="small"
          onClick={extra.viewHandler('release')}
        >
          增添部署
        </Button>
      </Space>
    ),
  },
]

const serviceDVcolumns = [
  {
    title: '服务描述版本',
    dataIndex: 'name',
    key: 'name',
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
    title: '内容详情',
    key: 'modify',
    dataIndex: 'modify',
    render: (text, row, extra) => (
      <Space>
        <Button
          type="primary"
          size="small"
          onClick={extra.viewHandler('modfiy-instance')}
        >
          配置
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={extra.viewHandler('modfiy-instance')}
        >
          发布
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={extra.viewHandler('service-status')}
        >
          实例
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={extra.viewHandler('modfiy-instance')}
        >
          删除
        </Button>
      </Space>
    ),
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    key: 'create_time',
  },
]

const Deploy = ({ history }) => {
  const [form] = Form.useForm()
  const [serviceList, setServiceList] = useState([])
  const [serviceData, setServiceData] = useState({
    // service: [{
    //   host: "sre.mobiu.space",
    //   name: "prod-em-feed-server"
    // }],
    // versions: [
    //   {
    //     name: "em-feed-server:1",
    //     weight: 50,
    //     status: "running",
    //     create_time: "2020-02-02 20:20:20",
    //   },
    //   {
    //     name: "em-feed-server:2",
    //     weight: 50,
    //     status: "running",
    //     create_time: "2020-02-02 20:20:20",
    //   },
    // ],
  })

  useEffect(() => {
    const response = getServiceList()
    response
      .then((res) => {
        setServiceList(res['content'])
      })
      .catch((err) => {
        console.log(err)
      })

    const storage = window.localStorage
    if (storage['serviceName']) {
      form.setFields([
        {
          value: storage['serviceName'],
          name: 'serviceName',
        },
      ])
      const response = getServiceDetails(storage['serviceName'])
      response
        .then((res) => {
          setServiceData(res['content'])
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

  const getServiceData = () => {
    return serviceData['service']
  }

  const getServiceDescData = () => {
    return serviceData['versions']
  }

  const handleValueChange = (changedValue) => {
    const serviceName = changedValue.serviceName
    if (serviceName) {
      const storage = window.localStorage
      storage['serviceName'] = serviceName

      const response = getServiceDetails(serviceName)
      response
        .then((res) => {
          setServiceData(res['content'])
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const viewHandler = (resource) => () => {
    history.push(`/admin/deploy/${resource}`)
  }

  return (
    <Card title="服务控制台">
      <Form
        {...layout}
        name="control-hooks"
        onValuesChange={handleValueChange}
        form={form}
      >
        <Form.Item
          name="serviceName"
          label="选择服务"
          rules={[{ required: true }]}
        >
          <TreeSelect
            showSearch
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Please select"
            allowClear
            treeDefaultExpandAll
          >
            {serviceList.map((item, index) => {
              return (
                <TreeNode
                  value={item}
                  key={item}
                  title={<b style={{ color: '#08c' }}>{item}</b>}
                ></TreeNode>
              )
            })}
          </TreeSelect>
        </Form.Item>
        <Divider />
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.serviceName !== currentValues.serviceName
          }
        >
          {({ getFieldValue }) => {
            let serviceName = getFieldValue('serviceName')
            return (
              <div>
                <Table
                  columns={columnProcessor(serviceDTcolumns, {
                    modify: {
                      viewHandler,
                    },
                  })}
                  dataSource={getServiceData()}
                  title={() => '公共配置详情'}
                  pagination={false}
                />
                <Divider />
                <Table
                  columns={columnProcessor(serviceDVcolumns, {
                    modify: {
                      viewHandler,
                    },
                  })}
                  dataSource={getServiceDescData()}
                  title={() => '服务部署信息'}
                  pagination={false}
                />
              </div>
            )
          }}
        </Form.Item>
      </Form>
    </Card>
  )
}

Deploy.propTypes = {
  history: PropTypes.object,
}

export default Deploy
