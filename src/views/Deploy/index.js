import React from "react";
import { Form, Button, TreeSelect, Card, Table, Space, Divider } from "antd";
import PropTypes from "prop-types";
import { columnProcessor } from "../../utils";

const { useState, useEffect } = React;

const { TreeNode } = TreeSelect;

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { offset: 0, span: 8 },
};

const serviceDTcolumns = [
  {
    title: "关联域名",
    dataIndex: "host",
    key: "host",
  },
  {
    title: "修改与查看",
    key: "modify",
    render: (text, row, extra) => (
      <Space>
        <Button
          type="primary"
          size="small"
          onClick={extra.viewHandler("service-status")}
        >
          服务状态
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={extra.viewHandler("release-log")}
        >
          发布记录
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={extra.viewHandler("service-weight")}
        >
          权重
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={extra.viewHandler("common-conf")}
        >
          公共配置
        </Button>
      </Space>
    ),
  },
];

const serviceDVcolumns = [
  {
    title: "服务描述版本",
    dataIndex: "service_describle_version",
    key: "service_describle_version",
  },
  {
    title: "权重",
    dataIndex: "weight",
    key: "weight",
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "修改与查看",
    key: "modify",
    dataIndex: "modify",
    render: (text, row, extra) => (
      <Space>
        <Button
          type="primary"
          size="small"
          onClick={extra.viewHandler("release")}
        >
          发布服务
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={extra.viewHandler("modfiy-instance")}
        >
          实例数
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={extra.viewHandler("deploy-config")}
        >
          部署配置
        </Button>
      </Space>
    ),
  },
];

const Deploy = ({ history }) => {
  const [form] = Form.useForm();
  // 你可以通过 setServiceData 直接改变你 mook 的数据
  const [serviceData, setServiceData] = useState([
    {
      service_describle_version: "em-feed-server:1",
      weight: 100,
      status: "running",
      host: "sre.mobiu.space",
      create_time: "2020-02-02",
    },
  ]);

  useEffect(() => {
    const storage = window.localStorage;
    if (storage["serviceName"]) {
      form.setFields([
        {
          value: storage["serviceName"],
          name: "serviceName",
        },
      ]);
    }
  }, []);

  const getServiceDataSource = (service) => {
    if (service === undefined || service === "") {
      return [];
    }
    //没看懂, 注释了
    // serviceData[0]["service_describle_version"] = "em-feed-server:2";
    return serviceData;
  };

  const handleValueChange = (changedValue) => {
    if (changedValue.serviceName) {
      const storage = window.localStorage;
      storage["serviceName"] = changedValue.serviceName;
      console.log(`onSelectChange: ${changedValue.serviceName}`);
    }
  };

  const viewHandler = (resource) => () => {
    history.push(`/admin/deploy/${resource}`);
  };

  return (
    <Card title="服务控制台">
      <Form {...layout} name="control-hooks" onValueChange={handleValueChange} form={form}>
        <Form.Item
          name="serviceName"
          label="选择服务"
          rules={[{ required: true }]}
        >
          <TreeSelect
            showSearch
            style={{ width: "100%" }}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            placeholder="Please select"
            defaultValue="em-feed-server"
            allowClear
            treeDefaultExpandAll
          >
            <TreeNode
              value="em-feed-server"
              key="em-feed-server"
              title={<b style={{ color: "#08c" }}>em-feed-server</b>}
            ></TreeNode>
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
            let serviceName = getFieldValue("serviceName");
            return (
              <div>
                <Table
                  columns={columnProcessor(serviceDTcolumns, {
                    modify: {
                      viewHandler,
                    },
                  })}
                  dataSource={getServiceDataSource(serviceName)}
                  title={() => "公共配置详情"}
                  pagination={false}
                />
                <Divider />
                <Table
                  columns={columnProcessor(serviceDVcolumns, {
                    modify: {
                      viewHandler,
                    },
                  })}
                  dataSource={getServiceDataSource(serviceName)}
                  title={() => "服务部署信息"}
                  pagination={false}
                />
              </div>
            );
          }}
        </Form.Item>
      </Form>
    </Card>
  );
};

Deploy.propTypes = {
    history: PropTypes.object
}

export default Deploy;
