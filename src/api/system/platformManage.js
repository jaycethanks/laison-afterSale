import { axios } from '@/utils/request';

export const findPage = (pageInfo) =>
  axios({
    url: `/platformInfo/findPage/${pageInfo.pagination.current}/${pageInfo.pagination.pageSize}`,
    method: 'post',
    data: pageInfo.condition,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });

export const saveOrUpdate = (data) =>
  axios({
    url: '/platformInfo/saveOrUpdate',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
