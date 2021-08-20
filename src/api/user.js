import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login/', //baseURL+url
    method: 'post',
    data
  })
}
export function getInfo(token) {
  var temp =  new FormData();
  var id
  temp.append("JWT", token);
  return request({
    url: '/jwt2id/',
    method: "post",
    data: temp
  })
  // }).then((res)=>{
  //   localStorage.setItem("id",res.data.user_id)
  //   request({
  //     url: "users/user/" + res.data.user_id + "/",
  //     method: "get",
  //     //params: res.data.user_id,
  //   }).then((res)=>{
  //     return res.data
  //   })
  // })
  // var id=localStorage.getItem("id")
  // console.log(id,"id-now")
  // return request({
  //   url: "users/user/" + id + "/",
  //   method: "get",
  //   //params: res.data.user_id,
  // })
  // return request({
  //   url: '/users/user/',
  //   method: 'get',
  //   //根据token获取用户信息token在借口中是从header的authorization获取
  //   params: { token }
  // })
}
export function getinfo2(res){
  return request({
    url: "users/user/" + res + "/",
    method: "get",
    //params: res.data.user_id,
  })
}
export function logout() {
  // this.$router.push({ path: '/' });
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
