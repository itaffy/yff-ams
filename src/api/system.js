import request from '@/utils/request'


export function getOrderRecord (params) {
  return request({
    url: '/api/app/order-record',
    method: 'get',
    params: params
  })
}

export function getRoleList (params) {
  return request({
    url: '/Role/GetList',
    method: 'get',
    params: params
  })
}

export function getUserList(params) {
  return request({
    url: '/User/GetList',
    method: 'get',
    params: params
  })
}
export function getChargeTypeList(params) {
  return request({
    url: '/ChargeType/GetList',
    method: 'get',
    params: params
  })
}
export function getAreaPermissionList(params) {
  return request({
    url: '/AreaPermissions/GetList',
    method: 'get',
    params: params
  })
}