import request from '@/utils/request';

/**
 * 学生模糊查询
 *
 * @param data
 */
export function fuzzyQuery (data) {
  return request({
    url: '/student/fuzzyquery/',
    method: 'post',
    data: data,
  });
}
/**
 * 学生信息删除
 *
 * @param id
 */
export function deleteStudent (id) {
  return request({
    url: '/student/deleteStudent/' + id,
    method: 'delete',
  });
}

/**
 * 学生信息更新
 *
 * @param
 */
export function updateStudent (data) {
  return request({
    url: '/student/updateStudent',
    method: 'post',
    data: data,
  });
}

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
 * 学生添加
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
