import { axios } from '@/utils/request';

/**
 * 我的申请,从数据库查询我的申请有哪些，注：关联的是发起表，只会用到用户id
 */
export const myApply = (pageInfo) =>
  axios({
    url: `processOpenAPI/myApply/${pageInfo.pagination.current}/${pageInfo.pagination.pageSize}`,
    method: 'post',
    data: pageInfo.condition,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      uniTenantId: pageInfo.uniTenantId,
      bizToken: pageInfo.bizToken,
    },
  });

/**
 * 我的待办
 */
export const myTodo = (pageInfo) =>
  axios({
    url: `processOpenAPI/myTodo/${pageInfo.pagination.current}/${pageInfo.pagination.pageSize}`,
    method: 'post',
    data: pageInfo.condition,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      uniTenantId: pageInfo.uniTenantId,
      bizToken: pageInfo.bizToken,
    },
  });
/**
 * 我的已办
 */
export const myDone = (pageInfo) =>
  axios({
    url: `processOpenAPI/myDone/${pageInfo.pagination.current}/${pageInfo.pagination.pageSize}`,
    method: 'post',
    data: pageInfo.condition,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      uniTenantId: pageInfo.uniTenantId,
      bizToken: pageInfo.bizToken,
    },
  });
/**
 * 我的抄送
 */
export const myCopy = (pageInfo) =>
  axios({
    url: `processOpenAPI/myCopy/${pageInfo.pagination.current}/${pageInfo.pagination.pageSize}`,
    method: 'post',
    data: pageInfo.condition,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      uniTenantId: pageInfo.uniTenantId,
      bizToken: pageInfo.bizToken,
    },
  });

export const myApplyList = (condition) =>
  axios({
    url: 'processOpenAPI/myApplyList',
    method: 'post',
    data: {},
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      uniTenantId: condition.uniTenantId,
      bizToken: condition.bizToken,
    },
  });

export const backTask = (condition) =>
  axios({
    url: 'processOpenAPI/backTask',
    method: 'post',
    data: {
      businessId: condition.businessId,
      curTaskId: condition.curTaskId,
      submitInfo: condition.submitInfo,
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      uniTenantId: condition.uniTenantId,
      bizToken: condition.bizToken,
    },
  });

export const delegateTask = (condition) =>
  axios({
    url: 'processOpenAPI/delegateTask',
    method: 'post',
    data: {
      businessId: condition.businessId,
      curTaskId: condition.curTaskId,
      submitInfo: condition.submitInfo,
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      uniTenantId: condition.uniTenantId,
      bizToken: condition.bizToken,
    },
  });
