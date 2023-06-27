import request from '@/utils/request';

/**
 * 学生记录总数查询
 *
 * @param
 */
export function queryCountApi () {
  return request({
    url: '/student/queryCount',
    method: 'get'
  });
}


/**
 * 获取学生列表(根据数据库分页)
 *
 * @param page
 */
export function getStuList (page) {
  return request({
    url: '/student/getstudentlist',
    method: 'get',
    params: { page, page },
  });
}

/**
 * 具体学生查询
 *
 * @param 
 */
export function addOneStu (data) {
  return request({
    url: '/student/addOneStu',
    method: 'post',
    data: data,
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