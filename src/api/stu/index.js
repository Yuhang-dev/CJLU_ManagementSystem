import request from '@/utils/request';


/**
 * 获取学生列表
 *
 * @param 
 */
export function getStuList () {
  return request({
    url: '/student/getstulist',
    method: 'get'
  });
}

/**
 * 具体学生查询
 *
 * @param 
 */
export function queryOneStu (param) {
  return request({
    url: '/student/queryOneStu',
    method: 'get'
  });
}