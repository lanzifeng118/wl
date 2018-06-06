const dashboardUrl = '/doapi-v2/dashboard'
const appUrl = '/doapi-v2/appstore'

let queryFun = (url, method = 'query', pageData) => {
  let data = { method }
  if (pageData) {
    data.data = pageData
  }
  return {
    method: 'post',
    url: url,
    data
  }
}

let api = {
  dashboard: {
    list() {
      return queryFun(dashboardUrl, 'status.list', null)
    },
    start(name) {
      return queryFun(dashboardUrl, 'start', { app_name: name })
    },
    restart(name) {
      return queryFun(dashboardUrl, 'restart', { app_name: name }, 'restart')
    },
    stop(name) {
      return queryFun(dashboardUrl, 'stop', { app_name: name })
    }
  },
  appstore: {
    list() {
      return queryFun(appUrl, 'app.list')
    },
    install(name, auth_code) {
      return queryFun(appUrl, 'install', { name, auth_code })
    },
    uninstall(name) {
      return queryFun(appUrl, 'uninstall', { app_name: name })
    }
  }
}
export default api