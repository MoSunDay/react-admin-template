import React, { Component } from 'react'
import { Layout, Menu, Row, Col, Dropdown, Avatar, Badge } from 'antd';
import { privateRoutes } from '../../routers';
import { withRouter } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

const topMenus = privateRoutes.filter(item => {
  return item.isTop === true;
});


@withRouter
class FrameOut extends Component {

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
        <Menu.Item key="/admin/setting">
          个人设置
        </Menu.Item>
        <Menu.Item key="/login">
          退出
        </Menu.Item>
      </Menu>
    );
  }

  render() {
    return (
      <Layout style={{minHeight: '100%'}}>
        <Header className="header">
          <div className="logo" />
          {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu> */}
          <Row>
            <Col span={8}>
              <h2 style={{color: '#fff'}}>Platform Portal</h2>
            </Col>
            <Col span={3} offset={13}>
              <div style={{color: '#fff'}}>
                <Dropdown overlay={this.menus}>
                    <Badge count={10}>
                      <div style={{color: '#fff'}}>
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />欢迎您, xxx! <DownOutlined />
                      </div>
                    </Badge>
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
              {/* <SubMenu
                key="sub1"
                title={
                  <span>
                    <UserOutlined />
                    subnav 1
                  </span>
                }
              >
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <LaptopOutlined />
                    subnav 2
                  </span>
                }
              >
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <NotificationOutlined />
                    subnav 3
                  </span>
                }
              >
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu> */}
                {/* <Menu.Item key="1"><Icon type="home" />系统设置</Menu.Item> */}
                {/* <Menu.Item key="2"><SettingFilled />文章管理</Menu.Item> */}
                {
                  topMenus.map(item => {
                    const Icon = item.icon
                    return (
                      <Menu.Item key={item.pathname}><Icon/>{item.title}</Menu.Item>
                    )
                  })
                }
            </Menu>
          </Sider>
          <Layout style={{ padding: '24px' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb> */}
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