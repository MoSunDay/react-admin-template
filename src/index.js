import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import { commonRoutes } from './routers'
import './css/index.less'

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Router>
      <Switch>
        <Route
          path="/admin"
          render={(rootProps) => {
            return <App {...rootProps} />
          }}
        ></Route>
        {commonRoutes.map((item, index) => {
          return (
            <Route
              key={item.pathname}
              path={item.pathname}
              component={item.component}
            />
          )
        })}
        {/* <Redirect from="/admin" to={privateRoutes[0].pathname} exact/>
                <Redirect from="/404"/> */}

        <Redirect from="/" to="/admin" exact />
        <Redirect to="404" />
      </Switch>
    </Router>
  </ConfigProvider>,
  document.getElementById('root')
)
