import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { privateRoutes } from './routers'
import FrameOut from './components/FrameOut'

class App extends Component {
  render () {
    return (
      <FrameOut>
        <Switch>
          {
            privateRoutes.map(item => {
              return (
                <Route key={item.pathname} exact={item.exact} path={item.pathname} render={ (rootProps) => {
                  return <item.component {...rootProps}/>
                }} />
              );
            })
          }

          <Redirect from='/admin' to={privateRoutes[0].pathname} exact/>
          <Redirect to='/404' />
        </Switch>
      </FrameOut>
    );
  }
}

export default App;