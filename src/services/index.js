import request from 'utils/request'

import api from './api'

const apiPrefix = '/api';

const Prefix = process.env.NODE_ENV === 'development' ? '' : '';


const gen = params => {
  // let url = apiPrefix + params
  let url = params
  let method = 'GET'

  const paramsArray = params.split(' ')
  // console.log("现在请求地址是：",url)

  if (paramsArray.length === 2) {
    method = paramsArray[0]
    url = paramsArray[1]
  }

  return function(data) {
    return request({
      url,
      data,
      method,
    })
  }
}

const APIFunction = {}
for (const key in api) {
  APIFunction[key] = gen(api[key])
}

module.exports = APIFunction
