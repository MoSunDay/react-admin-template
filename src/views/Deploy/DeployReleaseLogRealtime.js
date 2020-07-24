import React from 'react'
import { Card, Button, List } from 'antd'
import { useSize } from 'ahooks'
import webSocket from 'socket.io-client'
import { baseURL } from '../../utils'

const { useState, useEffect, useRef } = React

const DeployReleaseLogRealtime = (props) => {
  const [ws, setWs] = useState(null)
  const dom = document.querySelector('body')
  const size = useSize(dom)
  const [data, setData] = useState([])
  const scrollContainerRef = useRef()
  const anframeRef = useRef()
  const { service } = props.location.state

  useEffect(() => {
    if (ws) {
      console.log('success connect!')
      ws.on('response', (message) => {
        if (message.startsWith(service)) {
          let conent = message.split(' ').slice(1).join(' ')
          setData((data) => [...data, conent])
        }
      })
    } else {
      console.log('fail connect!')
    }
  }, [ws])

  useEffect(() => {
    setWs(webSocket(baseURL))
  }, [])

  useEffect(() => {
    anframeRef.current = window.requestAnimationFrame(() => {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight
    })
    return () => {
      cancelAnimationFrame(anframeRef.current)
    }
  }, [data])

  const renderBack = () => {
    return (
      <Button htmlType="button" onClick={props.history.goBack}>
        返回
      </Button>
    )
  }

  return (
    <Card title="实时日志" extra={renderBack()}>
      <div
        style={{ height: size.height - 280, overflowY: 'auto' }}
        ref={scrollContainerRef}
      >
        <List
          bordered
          dataSource={data}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </div>
    </Card>
  )
}

export default DeployReleaseLogRealtime
