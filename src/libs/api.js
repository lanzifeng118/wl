const dashboardUrl = '/doapi-v2/dashboard'

let queryFun = (url, pageData, method = 'query') => {
  let data = {}
  if (pageData) {
    for (var key in pageData) {
      data[key] = pageData[key]
    }
  }
  return {
    method: 'post',
    url: url,
    data: {
      method: method,
      data: data
    }
  }
}

let api = {
  dashboard: {
    list() {
      return queryFun(dashboardUrl, null ,'status.list')
    },
    start(name) {
      return queryFun(dashboardUrl, { app_name: name }, 'start')
    },
    restart(name) {
      return queryFun(dashboardUrl, { app_name: name }, 'restart')
    },
    stop(name) {
      return queryFun(dashboardUrl, { app_name: name }, 'stop')
    }
  }
}
export default api