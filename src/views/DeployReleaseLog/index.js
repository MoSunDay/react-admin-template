import React from 'react'
import { Card, Button, List, Typography } from 'antd'
import { useSize } from 'ahooks'

const { useState, useEffect, useRef } = React

const DeployReleaseLog = (props) => {
  const dom = document.querySelector('body')
  const size = useSize(dom)
  const [data, setData] = useState(['2020-07-12 23:26:55 em-feed-server:1'])
  const scrollContainerRef = useRef()
  const count = useRef(0)
  const anframeRef = useRef()
  const timer = useRef()

  useEffect(() => {
    // 模拟异步获取数据, 可以考虑加节流控制频率
    timer.current = setInterval(() => {
      if (count.current === 50) {
        clearInterval(timer.current)
      } else {
        setData((data) => [...data, `${+new Date()}'em-feed-server:1'`])
        count.current++
      }
      return () => {
        clearInterval(timer.current)
      }
    }, 400)
  }, [])

  useEffect(() => {
    // 尝试让滑动顺滑点
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
    <div>
      <Card title="发布日志" extra={renderBack()}>
        <div
          style={{ height: size.height - 280, overflowY: 'auto' }}
          ref={scrollContainerRef}
        >
          <List
            bordered
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Typography.Text mark>[Log]</Typography.Text> {item}
              </List.Item>
            )}
          />
        </div>
      </Card>
    </div>
  )
}

export default DeployReleaseLog
