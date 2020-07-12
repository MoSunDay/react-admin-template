import React, { Component } from 'react';
import { Form, Input, InputNumber, Button, TreeSelect, Card, Row, Col } from 'antd';
import ButtonGroup from "antd/es/button/button-group";

const { TreeNode } = TreeSelect;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 12 },
};
  
function onChange(value) {
    console.log(value);
  };

const Demo = () => {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log(values);
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item name="tikectType" label="工单类型" rules={[{ required: true }]}>
        <TreeSelect
            showSearch
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Please select"
            allowClear
            treeDefaultExpandAll
            onChange={onChange}
        >
          <TreeNode value="sre" disabled={ true } title={<b style={{ color: '#08c' }}>sre</b>}>
              <TreeNode value="sre-infrastructure" disabled={ true } title={<b style={{ color: '#08c' }}>基础设施</b>}>
                <TreeNode value="sre-infrastructure-aws-resource" title="AWS 资源申请"></TreeNode>   
              </TreeNode>
              <TreeNode value="sre-network" disabled={ true } title={<b style={{ color: '#08c' }}>办公网</b>}>
                <TreeNode value="sre-network-wifi" title="WIFI 认证失败"></TreeNode>
                <TreeNode value="sre-network-vpn" title="密码重置"></TreeNode>
                <TreeNode value="sre-network-office" title="办公网网络不稳定"></TreeNode>      
              </TreeNode>
          </TreeNode>
          <TreeNode value="bigdata" disabled={ true } title={<b style={{ color: '#08c' }}>bigdata</b>}>
              <TreeNode value="unkown" title="unkown"></TreeNode>
          </TreeNode>
      </TreeSelect>
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.tikectType !== currentValues.tikectType}
      >
        {({ getFieldValue }) => {
          switch (getFieldValue('tikectType')) {
            case 'sre-infrastructure-aws-resource':
              return (
                <div>
                  <Form.Item name='resourceName' label="资源名称" rules={[{ required: true }]}>
                    <Input placeholder="请以 env-name 命名, 例如: prod-common"/>
                  </Form.Item>
  
                  <Form.Item name='AWSResourceType' label="资源类型" rules={[{ required: true }]}>
                    <Input placeholder="请以 env-name 命名, 例如: t2.small"/>
                  </Form.Item>
              
                  <Form.Item name='describe' label="用途描述" rules={[{ required: true }]}>
                    <Input.TextArea placeholder="资源用做啥咧?"/>
                  </Form.Item>

                  <Form.Item name='reference' label="参考资源" rules={[{ required: true }]}>
                    <Input.TextArea placeholder="节约彼此时间, 给一个参考的资源配置. 参考的咋配置, 新的就咋配."/>
                  </Form.Item>
  
                  <Form.Item name='ownerTeam' label="资源属组" rules={[{ required: true }]}>
                    <Input placeholder="Owner:team Zapee"/>
                  </Form.Item>

                  <Form.Item name='ownerName' label="资源负责人" rules={[{ required: true }]}>
                    <Input placeholder="Owner:name: yemingfeng"/>
                  </Form.Item>
  
                  <Form.Item name='additional' label="其他补充说明">
                    <Input.TextArea />
                  </Form.Item>
  
                  <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                      提交工单
                    </Button>
                  </Form.Item>
                </div>
              );
              case 'sre-network-wifi':
                return (
                  <div>
                    <Form.Item name='describe' label="描述">
                      <Input.TextArea placeholder="这里有个自助文档 http://xxxxxxxxxxxxxxxxxx"/>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                      <Button type="primary" htmlType="submit">
                        提交工单
                      </Button>
                    </Form.Item>
                  </div>
                );
              case "sre-network-vpn":
                return (
                  <div>
                    <Form.Item name='describe' label="描述">
                      <Input.TextArea placeholder="没啥说的, 就是请牢记密码"/>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                      <Button type="primary" htmlType="submit">
                        提交工单
                      </Button>
                    </Form.Item>
                  </div>
                );      
              case "sre-network-office":
                return (
                  <div>
                    <Form.Item name='describe' label="描述">
                      <Input.TextArea placeholder="请描述下现象可以先在终端 ping 8.8.8.8 -c 100 -i 0.2 (Uinx)贴下结果"/>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                      <Button type="primary" htmlType="submit">
                        提交工单
                      </Button>
                    </Form.Item>
                  </div>
                );                 
              default:
                break;
          }
        }
      }
      </Form.Item>
    </Form>
  );
};



class TicketCreate extends Component {

  TicketButtonGroup = () => {
    return (
        <ButtonGroup>
            <Button htmlType="button" onClick={this.props.history.goBack}>返回</Button>
        </ButtonGroup>
    );
}
    render() {
        return (
            <div>
              <Card title="创建工单" extra={ this.TicketButtonGroup() }>
                {/* <Col span={16} offset={4}> */}
                    <Demo/>
                {/* </Col> */}
              </Card>
            </div>
        );
    }
}

export default TicketCreate;