import dayjs from 'dayjs'

const mapFiledToChinese = {
  id: '序号',
  title: '标题',
  approve: '审批状态',
  status: '工单状态',
  type: '工单类型',
  user: '发布人',
  create_time: '创建时间',
}

const isDev = process.env.NODE_ENV === 'development'
const baseURL = isDev ? 'http://127.0.0.1:5000' : 'http://127.0.0.1:5000'

const getQueryVariable = (variable) => {
  let query = window.location.search.substring(1)
  let vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (pair[0] == variable) {
      return pair[1]
    }
  }
  return false
}

const formatter = (data, type, column) => {
  switch (type) {
    case 'date':
      return data ? dayjs(data).format('yyyy-MM-dd') : undefined
    default:
      return data
  }
}

export const columnProcessor = (columns, extraRenderPropsMap) => {
  return columns.map((column) => {
    return {
      ...column,
      render: column.render
        ? (text, row) =>
            column.render(text, row, extraRenderPropsMap[column.key])
        : column.type
        ? (text) => formatter(text, column.type, column)
        : undefined,
    }
  })
}

export { mapFiledToChinese, baseURL, getQueryVariable }
