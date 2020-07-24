import React from 'react'
import { Form, Button, TreeSelect, Card, Table, Space, Divider } from 'antd'
import PropTypes from 'prop-types'
import { columnProcessor } from '../../utils'
import { getServiceList, getServiceDetails } from '../../api'
import { DeployRemoveAlertWindows } from '../'

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
    title: '服务操作',
    key: 'modify',
    render: (text, row, extra) => (
      <Space>
        <Button
          type="primary"
          size="small"
          onClick={extra.serviceViewHandler('service-weight', row)}
        >
          修改权重
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={extra.serviceViewHandler('common-conf', row)}
        >
          服务配置
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={extra.serviceViewHandler('add-gray', row)}
        >
          增添部署
        </Button>
      </Space>
    ),
  },
  {
    title: '查询状态',
    key: 'modify',
    render: (text, row, extra) => (
      <Space>
        <Button
          type="primary"
          size="small"
          onClick={extra.serviceViewHandler('service-version', row)}
        >
          版本列表
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={extra.serviceViewHandler('release-log', row)}
        >
          发布记录
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={extra.serviceViewHandler('realtime-log', row)}
        >
          实时日志
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
          onClick={extra.serviceDescribeViewHandler(
            'service-version/detail',
            row
          )}
        >
          配置
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={extra.serviceDescribeViewHandler('release', row)}
        >
          发布
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={extra.serviceDescribeViewHandler('modfiy-instance', row)}
        >
          实例
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={extra.serviceDescribeViewHandler('hpa', row)}
        >
          伸缩
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={extra.serviceDescribeViewHandler('service-status', row)}
        >
          状态
        </Button>
        <DeployRemoveAlertWindows serviceVersion={row.name} />
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

  const [loading, setLoading] = useState(false)

  const fetServiceList = async () => {
    const res = await getServiceList()
    setServiceList(res.content)
  }

  const fetchServiceDetails = async () => {
    const storage = window.localStorage
    if (storage['serviceName']) {
      form.setFields([
        {
          value: storage['serviceName'],
          name: 'serviceName',
        },
      ])
      const res = await getServiceDetails(storage['serviceName'])
      setServiceData(res['content'])
    }
  }

  const init = async () => {
    try {
      setLoading(true)
      await fetServiceList()
      await fetchServiceDetails()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    init()
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

  const serviceViewHandler = (resource, row) => () => {
    history.push({
      pathname: `/admin/deploy/${resource}`,
      state: { service: row.name },
    })
  }

  const serviceDescribeViewHandler = (resource, row) => () => {
    history.push({
      pathname: `/admin/deploy/${resource}`,
      state: { serviceVersion: row.name },
    })
  }

  const reflushButton = () => {
    return (
      <Button htmlType="button" onClick={init} loading={loading}>
        刷新
      </Button>
    )
  }

  return (
    <Card title="服务控制台" extra={reflushButton()}>
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
            return (
              <div>
                <Table
                  rowKey={(record)=> record.host}
                  columns={columnProcessor(serviceDTcolumns, {
                    modify: {
                      serviceViewHandler,
                    },
                  })}
                  dataSource={getServiceData()}
                  title={() => '公共配置详情'}
                  pagination={false}
                />
                <Divider />
                <Table
                  rowKey={(record)=> record.name}
                  columns={columnProcessor(serviceDVcolumns, {
                    modify: {
                      serviceDescribeViewHandler,
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
