import axios from 'axios'
import { message } from 'antd';


const isDev = process.env.NODE_ENV === 'development';

const service = axios.create(
  {
    baseURL: isDev ? 'https://cnodejs.org/api/v1' : 'https://cnodejs.org/api.v1',

  }
)

service.interceptors.request.use((config) => {
  console.log("axios request: ", config);
  return config
});

service.interceptors.response.use((response) => {
  // console.log("axios response: ", response);
  if (response.status === 200) {
    return response.data;
  } else {
    message.error("系统繁忙, 请稍后再试...");
  }
});


const getTopics = (page = 1, limit = 5) => {
  return service.get(`/topics?page=${page}&limit=${limit}`);
}

export {
  getTopics
}