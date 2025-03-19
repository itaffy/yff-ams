import storage from 'store'
import expirePlugin from 'store/plugins/expire'
import { login, getInfo, getCurrentUserNav, logout } from '@/api/login'
import { ACCESS_TOKEN,USER_INFO } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

storage.addPlugin(expirePlugin)
const user = {
  state: {
    token: storage.get(ACCESS_TOKEN) || '',
    name: '',
    welcome: '',
    roles: [],
    userInfo: storage.get(USER_INFO) || {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      storage.set(ACCESS_TOKEN, token, new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
      storage.set(USER_INFO, userInfo, new Date().getTime() + 7 * 24 * 60 * 60 * 1000)

    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const result = response.data
          commit('SET_TOKEN', result.Token)
          commit('SET_USER_INFO', result)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        // 请求后端获取用户信息 /api/user/info
        getInfo().then(response => {
          const { result } = response
          if (result.role && result.role.permissions.length > 0) {
            const role = { ...result.role }
            role.permissions = result.role.permissions.map(permission => {
              const per = {
                ...permission,
                actionList: (permission.actionEntitySet || {}).map(item => item.action)
               }
              return per
            })
            role.permissionList = role.permissions.map(permission => { return permission.permissionId })
            // 覆盖响应体的 role, 供下游使用
            result.role = role

            commit('SET_ROLES', role)
            commit('SET_INFO', result)
            commit('SET_NAME', { name: result.name, welcome: welcome() })
            commit('SET_AVATAR', result.avatar)
            // 下游
            resolve(result)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetMenus () {
      return new Promise((resolve, reject) => {
        // 0 web网页登录 1手机wap登录 2 PCV4
        getCurrentUserNav({client:0})
          .then(res => {
            // console.log(res)
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_USER_INFO', {})
          storage.remove(ACCESS_TOKEN)
          storage.remove(USER_INFO)
          resolve()
        }).catch((err) => {
          console.log('logout fail:', err)
          resolve()
        }).finally(() => {
        })
      })
    }

  }
}

export default user
