import request from '@/utils/request'

/**
 * 区域管理
 * @param {*} params 
 * @returns 
 */
export function getAreaList (params) {
  return request({
    url: '/Area/GetAreaList',
    method: 'get',
    params: params
  })
}
export function addArea(params) {
  return request({
    url: '/Area/Add',
    method: 'post',
    data: params,
    params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
export function updateArea(params) {
  return request({
    url: '/Area/UpdateNew',
    method: 'post',
    data: params,
    params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
export function deleteArea(params) {
  return request({
    url: '/Area/Delete',
    method: 'post',
    params,
  })
}

/**
 * 收费方案
 */
export function getChargeSchemeList(params) {
  return request.get('/ChargingScheme/GetList',  {params})
}


/**
 * 预警方案
 */
// 费用预警
export function getAlarmSchemeList(params) {
  return request.get('/AlarmScheme/GetList', {params})
}
// 用量预警
export function getUseValueAlarmList(params) {
  return request.get('/AlarmScheme/GetUseValueAlarmList', {params})
}
// 水表换表提醒
export function getWaterRemindList(params) {
  return request.get('/AlarmScheme/GetWaterMeterChangeNoticeList', {params})
}
// 短信余额提醒
export function getSmsBalanceWarn(params) {
  return request.get('/SmsRecord/GetSmsBalanceWarn', {params})
}
// 余量预警
export function getReserveAlarmList(params) {
  return request.get('/AlarmScheme/GetReserveAlarmList', {params})
}