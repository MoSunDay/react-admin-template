import axios from 'axios'
import { message } from 'antd'
import { baseURL } from '../utils'

const service = axios.create({ baseURL })

service.interceptors.request.use((config) => {
  console.log('axios request: ', config)
  return config
})

service.interceptors.response.use((response) => {
  if (response.status === 200 || response.status === 201) {
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
  return service.get(`/api/v1/kube/service/detail/${serviceName}`)
}

const getServiceWeight = (serviceName) => {
  return service.get(`/api/v1/kube/service_summary/weight/${serviceName}`)
}

const setServiceWeight = (serviceName, weight) => {
  let data = { content: { weight: weight } }
  return service.post(`/api/v1/kube/service_summary/weight/${serviceName}`, data)
}

const getServiceHpa = (serviceName) => {
  return service.get(`/api/v1/kube/service_summary/hpa/${serviceName}`)
}

const setServiceHpa = (serviceName, content) => {
  let data = { content: { hpa: content } }
  return service.post(`/api/v1/kube/service_summary/hpa/${serviceName}`, data)
}

const getServiceCommonConfig = (serviceName) => {
  return service.get(`/api/v1/kube/service_summary/common/${serviceName}`)
}

const setServiceCommonConfig = (serviceName, content) => {
  let data = { content: { common: content } }
  return service.post(`/api/v1/kube/service_summary/common/${serviceName}`, data)
}

const getServiceVersionList = (serviceName) => {
  return service.get(`/api/v1/kube/service_deployment_set/${serviceName}/history`)
}

const addServiceDeployment = (serviceName, serviceVersion) => {
  return service.post(`/api/v1/kube/service_summary/${serviceName}/deploymentset/${serviceVersion}`)
}

const getServiceVersionDetail = (serviceVersion) => {
  return service.get(`/api/v1/kube/service_deployment_set/${serviceVersion}/detail`)
}

const setServiceVersionDetail = (serviceVersion, content, resource) => {
  let data = { content: content }
  return service.post(`/api/v1/kube/service_deployment_set/${serviceVersion}/${resource}`, data)
}

const getServiceVersionInstanceNumber = (serviceVersion) => {
  return service.get(`/api/v1/kube/instance/${serviceVersion}`)
}

const setServiceVersionInstanceNumber = (serviceVersion, instanceNumber) => {
  let data = { content: instanceNumber }
  return service.post(`/api/v1/kube/instance/${serviceVersion}`, data)
}

const delServiceDeployment = (serviceName, serviceVersion) => {
  return service.delete(`/api/v1/kube/service_summary/${serviceName}/deploymentset/${serviceVersion}`)
}

export {
  getTopics,
  getTicket,
  postTicketStatus,
  getTicketApprove,
  getServiceList,
  getServiceDetails,
  getServiceWeight,
  setServiceWeight,
  getServiceHpa,
  setServiceHpa,
  getServiceCommonConfig,
  setServiceCommonConfig,
  getServiceVersionList,
  addServiceDeployment,
  getServiceVersionDetail,
  setServiceVersionDetail,
  getServiceVersionInstanceNumber,
  setServiceVersionInstanceNumber,
  delServiceDeployment
}
