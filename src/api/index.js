import axios from 'axios'
import { message } from 'antd'
import { baseURL } from '../utils'

const service = axios.create({ baseURL })

service.interceptors.request.use((config) => {
  console.log('axios request: ', config)
  return config
})

service.interceptors.response.use((response) => {
  if (response.status === 200) {
    return response.data
  } else {
    message.error('系统繁忙, 请稍后再试...')
  }
})

const getTopics = (page = 1, limit = 5) => {
  const data = service.get(`/iam/ticket/all/list`)
  return data
}

const getTicket = (id) => {
  const data = service.get(`/iam/ticket/${id}`)
  return data
}

const getTicketApprove = () => {
  return service.get(`/iam/ticket/approve/list`)
}

const postTicketStatus = (id, post_data) => {
  let data = { status: post_data.status }
  return service.post(`/iam/ticket/modfiy/status/${id}`, data)
}

const getServiceList = () => {
  let response = service.get(`/api/v1/kube/service_summary`)
  return response
}

const getServiceDetails = (serviceName) => {
  let data = { content: { name: serviceName } }
  return service.post(`/api/v1/kube/service/detail`, data)
}

export {
  getTopics,
  getTicket,
  postTicketStatus,
  getTicketApprove,
  getServiceList,
  getServiceDetails,
}
