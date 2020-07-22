import React, { Component } from 'react'
import { Card, Button } from 'antd'
import { Select } from 'antd'
import { getServiceVersionList } from '../../api'

const { Option } = Select;

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { offset: 0, span: 8 },
}

class DeployRelease extends Component {
  constructor(props) {
    super(props)
    this.state = {
      serviceVersionList: [],
      serviceVersion: "",
      selectVersion: "",
    }
  }

  componentDidMount() {
    let { serviceVersion } = this.props.location.state
    let service = serviceVersion.split(":")[0]
    const response = getServiceVersionList(service)
    response
      .then((res) => {
        this.setState({serviceVersion: serviceVersion, serviceVersionList: res["content"]});
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
    this.setState({selectVersion: value});
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
    // const response = addServiceDeployment(this.state.serviceName, this.state.serviceVersion)
    // response
    //   .then((res) => {
    //     this.props.history.goBack();
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   });
  }

  render() {
    return (
      <div>
        <Card title="发布服务" extra={this.goBack()}>
          <h3>已选中: {this.state.serviceVersion}</h3>
          <Select
              showSearch
              {...layout}
              style={{ width: 300 }}
              placeholder="请选择替换新的版本号模板"
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
              发布!
            </Button>
        </Card>
      </div>
    )
  }
}

export default DeployRelease
