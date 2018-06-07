const dashboardUrl = '/doapi-v2/dashboard'
const appUrl = '/doapi-v2/appstore'
const settingUrl = '/doapi-v2/appsetting'
const taskUrl = '/doapi-v2/schedule'

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
      return queryFun(dashboardUrl, 'start', { name })
    },
    restart(name) {
      return queryFun(dashboardUrl, 'restart', { name }, 'restart')
    },
    stop(name) {
      return queryFun(dashboardUrl, 'stop', { name })
    }
  },
  appstore: {
    list() {
      return queryFun(appUrl, 'app.list')
    },
    detail(name) {
      return queryFun(appUrl, 'app.detail', { name })
    },
    install(name, auth_code) {
      return queryFun(appUrl, 'install', { name, auth_code })
    },
    uninstall(name) {
      return queryFun(appUrl, 'uninstall', { name })
    }
  },
  setting: {
    list() {
      return queryFun(settingUrl, 'setting.list')
    },
    detail(name) {
      return queryFun(settingUrl, 'setting.app.list', { name })
    },
    add(data) {
      return queryFun(settingUrl, 'setting.app.add', data)
    },
    edit(data) {
      return queryFun(settingUrl, 'setting.app.change', data)
    },
    delete(data) {
      return queryFun(settingUrl, 'setting.app.delete', data)
    }
  },
  task: {
    list() {
      return queryFun(taskUrl, 'job.list')
    },
  }
}
export default api