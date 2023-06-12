import { axios } from '@/utils/request';

/**
 * 创建流程表单
 * 必传字段 publishId,formData,
 */
export const create = (condition) =>
  axios({
    url: 'businessOpenAPI/create',
    method: 'post',
    data: {
      publishId: condition.publishId,
      formData: condition.formData,
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      uniTenantId: condition.uniTenantId,
      bizToken: condition.bizToken,
    },
  });

/**
 * 编辑流程表单
 * 必有字段：businessId formData
 */
export const edit = (condition) =>
  axios({
    url: 'businessOpenAPI/edit',
    method: 'post',
    data: {
      businessId: condition.businessId, //业务ID
      formData: condition.formData,
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      uniTenantId: condition.uniTenantId,
      bizToken: condition.bizToken,
    },
  });

// submit
/**
 * 提交流程表单,
 * 如果是直接提交：formData , publishId必传
 * 如果是草稿状态提交，businessId必传，formData非必传，但是如果是审批的时候提交需要必传，因为formData可能改变
 */
export const submit = (condition) =>
  axios({
    url: 'businessOpenAPI/submit',
    method: 'post',
    data: {
      publishId: condition.publishId,
      businessId: condition.businessId, // 业务ID，从草稿提交时需要携带
      formData: condition.formData,
      submitInfo: condition.submitInfo,
      curTaskId: condition.curTaskId, // 审批时需要携带
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      uniTenantId: condition.uniTenantId,
      bizToken: condition.bizToken,
    },
  });

/**
 * 删除业务
 */
export const deleteById = (condition) =>
  axios({
    url: 'businessOpenAPI/deleteById',
    method: 'post',
    data: {
      businessId: condition.businessId, // 业务ID，从草稿提交时需要携带
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      uniTenantId: condition.uniTenantId,
      bizToken: condition.bizToken,
    },
  });
