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