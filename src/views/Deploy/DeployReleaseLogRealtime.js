
import React, { useState, useEffect } from 'react'
import { Card, Button } from 'antd'
import PropTypes from 'prop-types'
import webSocket from 'socket.io-client'

const DeployReleaseLogRealtime = ({ history }) => {
    const [ws,setWs] = useState(null)

    useEffect(()=>{
        setWs(webSocket('http://localhost:3000'))
        if(ws){
            console.log('success connect!')
            initWebSocket()
        }
    },[ws])

    const initWebSocket = () => {
        ws.on('response', message => {
            console.log(message)
        })
    }
 
    const goBack = () => {
        return (
          <Button htmlType="button" onClick={history.goBack}>
            返回
          </Button>
        )
    }

    return(
        <Card title="实时日志" extra={goBack}>
        <div>
        </div>
        </Card>
    )
}

DeployReleaseLogRealtime.propTypes = {
    history: PropTypes.object,
}
  

export default DeployReleaseLogRealtime;