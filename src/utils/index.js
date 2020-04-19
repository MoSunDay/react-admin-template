const mapFiledToChinese = {
  id: '序号',
  title: '标题',
  approve: '审批状态',
  status: '工单状态',
  type: "工单类型",
  user: '发布人',
  create_time: '创建时间',
}

const isDev = process.env.NODE_ENV === 'development';
const baseURL = isDev ? 'http://127.0.0.1:5000' : 'http://127.0.0.1:5000';

export {
  mapFiledToChinese,
  baseURL
}
