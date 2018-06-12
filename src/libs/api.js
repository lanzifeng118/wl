const dashboardUrl = '/doapi-v2/dashboard'
const appUrl = '/doapi-v2/appstore'
const settingUrl = '/doapi-v2/appsetting'
const taskUrl = '/doapi-v2/schedule'
const signinUrl = '/doapi-v2/signin'
const signoutUrl = '/doapi-v2/signout'
const personalUrl = '/doapi-v2/personal'

let queryFun = (url, method, pageData) => {
  let data = {}
  if (pageData) {
    data.data = pageData
  }
  if (method) {
    data.method = method
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
    startJob(name) {
      return queryFun(taskUrl, 'job.enable', { name })
    },
    stopJob(name) {
      return queryFun(taskUrl, 'job.disable', { name })
    },
    editJob(data) {
      return queryFun(taskUrl, 'job.change', data)
    },
    startScheduel() {
      return queryFun(taskUrl, 'schedule.start')
    },
    stopScheduel() {
      return queryFun(taskUrl, 'schedule.stop')
    }
  },
  signin(data) {
    return {
      method: 'post',
      url: signinUrl,
      data
    }
  },
  signout() {
    return {
      method: 'get',
      url: signoutUrl
    }
  },
  personal: {
    changePasswd(data) {
      return queryFun(personalUrl, 'user.passwd.change', data)
    },
    smsList(data) {
      return queryFun(personalUrl, 'sms.list', data)
    },
    smsDelete(ids) {
      return queryFun(personalUrl, 'sms.delete', { ids })
    },
    smsMark(ids) {
      return queryFun(personalUrl, 'sms.mark', { ids })
    }
  }
}
export default api