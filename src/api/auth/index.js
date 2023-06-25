import request from '../../utils/request';

/**
 * 登录API
 *
 * @param data {LoginData}
 * @returns
 */
export function loginApi (data) {
  return request({
    url: '/user/login',
    method: 'post',
    data: data
  });
}

/**
 * 注销API
 */
export function logoutApi () {
  return request({
    url: '/user/logout',
    method: 'delete'
  });
}