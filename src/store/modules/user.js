import { login, logout, getInfo, getinfo2 } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import request from "../../utils/request.js";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    //results: [],
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  // SET_RESULTS: (state, results) => {
  //   state.results = results
  // },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {

      getInfo(state.token).then(response => {
        getinfo2(response.data.user_id).then(response=>{const { data } = response
          console.log(data,'response...')
          if (!data) {
            return reject('Verification failed, please Login again.')
          }
          const { username, avatar } = data
          commit('SET_NAME', username)
          commit('SET_AVATAR', avatar)
          //权限把控：角色处理
          let roles = []
          roles.push(data.identity)
          if(data.identity=="relation")
          {
            request({
              url:"/relation/relation/",
              method:"get",
              params:{
                "user_id":data.id
              }
            }).then((res)=>{
              if(res.data.results[0].patient_id==1)
              {
                return reject('请先让病人关联家属')
              }
              if(!roles || roles.lengty <= 0) {
                reject('获取role失败')
              }
              commit('SET_ROLES',roles)
              //commit('SET_RESULTS',data.results)
              resolve(data)
            })
          }
          else if(data.identity=="patient"){
            request({
              url:"/patient/patient/",
              method:"get",
              params:{
                "user_id":data.id
              }
            }).then((res)=>{
              if(res.data.results[0].doctor_id==1)
              {
                return reject('请先让医生绑定病人')
              }
              if(!roles || roles.lengty <= 0) {
                reject('获取role失败')
              }
              commit('SET_ROLES',roles)
              //commit('SET_RESULTS',data.results)
              resolve(data)
            })
          }
          else{
          // data.results[0].groups.forEach(item=>{
          //   roles.push(item.name)
          // })
          //console.log(roles,"roles...")
          if(!roles || roles.lengty <= 0) {
            reject('获取role失败')
          }
          commit('SET_ROLES',roles)
          //commit('SET_RESULTS',data.results)
          resolve(data)}})
        // const { data } = response
        // console.log(data,'response...')
        // if (!data) {
        //   return reject('Verification failed, please Login again.')
        // }
        // const { username, avatar } = data
        // commit('SET_NAME', username)
        // commit('SET_AVATAR', avatar)

        // //权限把控：角色处理
        // let roles = []
        // roles.push(data.identity)
        // // data.results[0].groups.forEach(item=>{
        // //   roles.push(item.name)
        // // })
        // console.log(roles,"roles...")
        // if(!roles || roles.lengty <= 0) {
        //   reject('获取role失败')
        // }
        // commit('SET_ROLES',roles)
        // //commit('SET_RESULTS',data.results)
        // resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      //logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

