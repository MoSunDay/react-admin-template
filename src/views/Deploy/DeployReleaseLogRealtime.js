
import React, { useState, useEffect } from 'react'
import webSocket from 'socket.io-client'

const DeployReleaseLogRealtime = (props) => {
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
 
    goBack = () => {
        return (
          <Button htmlType="button" onClick={this.props.history.goBack}>
            返回
          </Button>
        )
    }

    return(
        <Card title="实时日志" extra={this.goBack()}>
        <div>
        </div>
        </Card>
    )
}

export default DeployReleaseLogRealtime;