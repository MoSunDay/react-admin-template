import React, { Component } from 'react'
import { Card, Button } from 'antd'
import { getServiceVersionStatus } from '../../api'

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { offset: 0, span: 8 },
}

class DeployServiceStatus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      serviceVersion: "",
      status: {}
    }
  }

  componentDidMount() {
    let { serviceVersion } = this.props.location.state;
    const response = getServiceVersionStatus(serviceVersion);
    response
      .then((res) => {
        console.log(`!@132321 ${res["content"]} `)
        this.setState({serviceVersion: serviceVersion, status: res["content"]});
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

  render() {
    const {status} = this.state;
    return (
      <div>
        <Card title="服务状态" extra={this.goBack()}>
            {
                Object.keys(status).map(key => {
                return <div>
                        <Card title={key}>
                        <pre>{status[key]}</pre>
                        </Card>
                        <br/>
                    </div>
                })
            }
        </Card>
      </div>
    )
  }
}

export default DeployServiceStatus
