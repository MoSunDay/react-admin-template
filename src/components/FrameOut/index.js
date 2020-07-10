import React, { Component } from 'react'
import { Layout, Menu, Row, Col, Dropdown, Avatar, Badge } from 'antd';
import { privateRoutes } from '../../routers';
import { withRouter } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { DesktopOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

const { Header, Content, Sider } = Layout;

const showMenus = privateRoutes


@withRouter
class FrameOut extends Component {

  constructor(props) {
    super(props)
    this.state = {
        family: ["ticket"]
    }
}


  menusHandler = ({ item, key, keyPath, domEvent }) => {
    console.log(this.props)
    this.props.history.push(key);
  };


  menus = () => {
    return (
      <Menu onClick={this.menusHandler}>
        <Menu.Item key="/admin/notify">
          <Badge dot>通知中心</Badge>
        </Menu.Item>
      </Menu>
    );
  }

  render() {
    return (
      <Layout style={{minHeight: '100%'}}>
        <Header className="header">
          <div className="logo" />
          <Row>
            <Col span={8}>
              <h2 style={{color: '#fff'}}>Platform Portal</h2>
            </Col>
            <Col span={3} offset={13}>
              <div style={{color: '#fff'}}>
                <Dropdown overlay={this.menus}>
                      <div style={{color: '#fff'}}>
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />欢迎您, xxx! <DownOutlined />
                      </div>
                </Dropdown>
              </div>
            </Col>
          </Row>
        </Header>
        <Layout>
          <Sider width={200} style={{color: "#fff"}}>
            <Menu
              onClick={this.menusHandler}
              mode="inline"
              selectedKeys={[this.props.location.pathname]}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu
                title={
                  <span>
                    <SettingOutlined />
                    <span>系统管理</span>
                  </span>
                }
              >
                {
                  showMenus.filter(item => {
                    return item.family === "system" && item.isTop
                  }).map(item => {
                    const Icon = item.icon
                    return (
                      <Menu.Item key={item.pathname}><Icon/>{item.title}</Menu.Item>
                    )
                  })
                }
              </SubMenu>

              <SubMenu
                title={
                  <span>
                    <DesktopOutlined />
                    <span>EKS 发布系统</span>
                  </span>
                }
              >
                {
                  showMenus.filter(item => {
                    return item.family === "deploy" && item.isTop === true
                  }).map(item => {
                    const Icon = item.icon
                    return (
                      <Menu.Item key={item.pathname}><Icon/>{item.title}</Menu.Item>
                    )
                  })
                }
              </SubMenu>

              <SubMenu
                title={
                  <span>
                    <MailOutlined />
                    <span>工单系统</span>
                  </span>
                }
              >
                {
                  showMenus.filter(item => {
                    return item.family === "ticket" && item.isTop === true
                  }).map(item => {
                    const Icon = item.icon
                    return (
                      <Menu.Item key={item.pathname}><Icon/>{item.title}</Menu.Item>
                    )
                  })
                }
              </SubMenu>

            </Menu>
          </Sider>
          <Layout style={{ padding: '24px' }}>
            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default FrameOut;