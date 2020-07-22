import React, { Component } from 'react'
import { Card, Button } from 'antd'
import { Select } from 'antd'
import { getServiceVersionList, addServiceDeployment } from '../../api'

const { Option } = Select;

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { offset: 0, span: 8 },
}

class DeployGray extends Component {
  constructor(props) {
    super(props)
    this.state = {
      serviceName: "",
      serviceVersionList: [],
      serviceVersion: "",
    }
  }

  componentDidMount() {
    let { service } = this.props.location.state
    const response = getServiceVersionList(service)
    response
      .then((res) => {
        this.setState({serviceName: service, serviceVersionList: res["content"]});
        console.log(this.state.serviceVersionList);
      })
      .catch((err) => {
        console.log(err)
      });
  }
 

  goBack = () => {
    return (
      <Button htmlType="button" onClick={this.props.history.goBack}>
        返回
      </Button>
    )
  }

  onChange = (value) => {
    console.log(`selected ${value}`);
    this.setState({serviceVersion: value});
  }

  onBlur = () => {
    console.log('blur');
  }

  onFocus = () => {
    console.log('focus');
  }

  onSearch = (val) => {
    console.log('search:', val);
  }

  onSubmit = () => {
    const response = addServiceDeployment(this.state.serviceName, this.state.serviceVersion)
    response
      .then((res) => {
        this.props.history.goBack();
      })
      .catch((err) => {
        console.log(err)
      });
  }

  render() {
    return (
      <div>
        <Card title="添加部署" extra={this.goBack()}>
          <Select
            showSearch
            {...layout}
            style={{ width: 300 }}
            placeholder="选择版本号"
            optionFilterProp="children"
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onSearch={this.onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {this.state.serviceVersionList.map(item => {
              return <Option value={item}>{item}</Option>
            })}

          </Select>
          <Button type="primary" onClick={this.onSubmit} style={{ marginLeft: '15px'}}>
            添加
          </Button>
        </Card>
      </div>
    )
  }
}

export default DeployGray
