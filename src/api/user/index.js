import request from '@/utils/request';

/**
 * 登录成功后获取用户信息（昵称、头像、权限集合和角色集合）
 */
export function getUserInfo () {
  return request({
    url: '/user/getloginInfo',
    method: 'get'
  });
}


/**
 * 添加用户
 *
 * @param data
 */
export function addOneUserApi (data) {
  return request({
    url: '/user/addOneUser',
    method: 'post',
    data: data
  });
}

/**
 * 修改用户
 *
 * @param id
 * @param data
 */
export function updateUser (id, data) {
  return request({
    url: '/api/v1/users/' + id,
    method: 'put',
    data: data
  });
}

/**
 * 修改用户密码
 *
 * @param id
 * @param password
 */
export function updateUserPassword (id, password) {
  return request({
    url: '/api/v1/users/' + id + '/password',
    method: 'patch',
    params: { password: password }
  });
}

/**
 * 删除用户
 *
 * @param ids
 */
export function deleteUsers (uid) {
  return request({
    url: '/user/' + uid,
    method: 'delete'
  });
}

/**
 * 获取用户列表
 *
 * @param 
 */
export function getUserList () {
  return request({
    url: '/user/getuserlist',
    method: 'get'
  });
}

