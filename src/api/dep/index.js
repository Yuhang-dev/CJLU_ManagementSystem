import request from '@/utils/request';


/**
 * 获取院系列表
 *
 * @param 
 */
export function getDepListApi () {
  return request({
    url: '/department/getDepList',
    method: 'get',
  });
}