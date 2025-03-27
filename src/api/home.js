import request from '@/utils/request'

// 获取收费类型信息
export function getChargeType(params) {
  return request.get('/Home/GetChargeType', {params})
}
// 左侧区域房间树
export function getAreaRoomTree(params) {
  return request.get('/Home/GetAreaRoomList', {params})

}