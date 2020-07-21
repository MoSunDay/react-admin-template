import React, { Component } from 'react'
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  Modal,
  Comment,
  List,
  Avatar,
  Select,
  Typography,
  Checkbox,
} from 'antd'
import moment from 'moment'
import ButtonGroup from 'antd/es/button/button-group'
import { getTicket, postTicketStatus } from '../../api'
import { withRouter } from 'react-router-dom'
import { mapFiledToChinese } from '../../utils'

const { Option } = Select
const { TextArea } = Input

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
)

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </div>
)

@withRouter
class TicketEdit extends Component {
  state = {
    comments: [],
    submitting: false,
    value: '',
    ticket: [],
  }

  componentDidMount() {
    const urlArray = this.props.location.pathname.split('/')
    this.getTicketInfo(urlArray[urlArray.length - 1])
  }

  handleSubmit = () => {
    if (!this.state.value) {
      return
    }

    this.setState({
      submitting: true,
    })

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
        comments: [
          {
            author: 'Han Solo',
            avatar:
              'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
          },
          ...this.state.comments,
        ],
      })
    }, 1000)
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  }

  delHandler = (record) => {
    Modal.confirm({
      title: '标题',
      content: `删除 [${record.title}]？`,
      onCancel: () => {
        console.log('用户取消了')
      },
      onOk: () => {
        console.log('用户确认了')
      },
    })
  }

  onFinish = (values) => {
    console.log('Success:', values)
    const urlArray = this.props.location.pathname.split('/')
    postTicketStatus(urlArray[urlArray.length - 1], values)
  }

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  TicketButtonGroup = () => {
    return (
      <ButtonGroup>
        <Button htmlType="button" onClick={this.props.history.goBack}>
          返回
        </Button>
        <Button type="danger" onClick={this.delHandler}>
          删除
        </Button>
      </ButtonGroup>
    )
  }

  getTicketInfo = (id) => {
    getTicket(id)
      .then((res) => {
        var temp = []
        temp.push(`${mapFiledToChinese['title']}: ${res.message['title']}`)
        temp.push(`${mapFiledToChinese['type']}: ${res.message['type']}`)
        temp.push(`${mapFiledToChinese['status']}: ${res.message['status']}`)
        temp.push(`内容描述: ${res.message['describe']}`)
        // temp.push(`${mapFiledToChinese['describe']}: ${res.message['describe']}`)
        temp.push(`${mapFiledToChinese['user']}: ${res.message['user']}`)
        temp.push(
          `${mapFiledToChinese['create_time']}: ${res.message['create_time']}`
        )

        this.setState({ ticket: temp })
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        this.setState({ isLoading: false })
      })
  }

  render() {
    const { comments, submitting, value } = this.state
    return (
      <div>
        <Card title="工单详情" extra={this.TicketButtonGroup()}>
          <Col span={16} offset={4}>
            <Form
              name="basic"
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
              initialValues={{ status: 'idle' }}
              layout="inline"
            >
              <Form.Item
                name="status"
                label={<b style={{ color: '#08c' }}>工单状态</b>}
              >
                <Select
                  defaultValue={<b style={{ color: 'red' }}>沉睡中</b>}
                  style={{ width: 120 }}
                  bordered={false}
                >
                  <Option value="done" style={{ color: 'green' }}>
                    <b style={{ color: 'green' }}>已完成</b>
                  </Option>
                  <Option value="in-progress" style={{ color: '#08c' }}>
                    <b style={{ color: '#08c' }}>进行中</b>
                  </Option>
                  <Option value="idle" style={{ color: 'red' }}>
                    <b style={{ color: 'red' }}>沉睡中</b>
                  </Option>
                </Select>
              </Form.Item>
              <Button type="primary" htmlType="submit">
                改变状态
              </Button>
            </Form>
            <br />
            <List
              dataSource={this.state.ticket}
              bordered
              renderItem={(item) => (
                <List.Item>
                  <Typography.Text mark></Typography.Text> {item}
                </List.Item>
              )}
            />

            {comments.length > 0 && <CommentList comments={comments} />}
            <Comment
              avatar={
                <Avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="Han Solo"
                />
              }
              content={
                <Editor
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                  submitting={submitting}
                  value={value}
                />
              }
            />
          </Col>
        </Card>
      </div>
    )
  }
}

export default TicketEdit
