import React, { Component } from 'react'
import { Button, Card, List, Avatar } from 'antd'
import { getTicketApprove } from '../../api'
import { baseURL } from '../../utils'

class Notify extends Component {
  state = {
    data: [],
  }

  componentDidMount() {
    getTicketApprove()
      .then((res) => {
        let rs = []

        for (let i = 0, length = res.message.length; i < length; i++) {
          rs.push({
            title: res.message[i]['title'],
            url:
              'http://127.0.0.1:3000/#/admin/ticket/detail/' +
              res.message[i]['id'],
          })
        }
        this.setState({ data: rs })
        console.log(this.state)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  getTicketApprove
  render() {
    return (
      <Card title="通知中心" extra={<Button>全部标记为已读</Button>}>
        <List
          itemLayout="horizontal"
          dataSource={this.state.data}
          renderItem={(item) => (
            <List.Item extra={<Button>查看</Button>}>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href={item.url}>{item.title}</a>}
                description="新的等待审批的工单"
              />
            </List.Item>
          )}
        />
      </Card>
    )
  }
}

export default Notify
