export default (url, obj, method = 'post') => {
  let fetchUrl = `${url}${dataString(obj)}`
  let fetchInit = {
    method,
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }
  if (method === 'post') {
    fetchUrl = url
    fetchInit.body = (typeof obj === 'object') ? JSON.stringify(obj) : obj
  }

  return fetch(fetchUrl, fetchInit).then(res => res.json()).then((rs) => {
    if (rs.success) {
      return rs.result || rs.data || rs || {}
    } else {
      console.error('返回错误')
    }
  }).catch((e) => {
    return Promise.reject(e)
  })
}

const dataString = (data) => {
  const dt = data || {}
  let str = ''
  for (var i in dt) {
    if (str) str += '&'
    else str += '?'
    str += (i + '=' + dt[i])
  }
  return str
}
