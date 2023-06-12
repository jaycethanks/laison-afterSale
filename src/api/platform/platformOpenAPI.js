import { axios } from '@/utils/request';

export const listAllTemplate = () =>
  axios({
    url: 'platformOpenAPI/listAllTemplate',
    method: 'post',
    data: {},
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });

export const queryTemplate = ({ id }) =>
  axios({
    url: 'platformOpenAPI/queryTemplate',
    method: 'post',
    data: { id },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });

export const listTemplateAndPublish = (condition) =>
  axios({
    url: 'platformOpenAPI/listTemplateAndPublish',
    method: 'post',
    data: {},
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      uniTenantId: condition.uniTenantId,
    },
  });

export const addTemplate = (condition) =>
  axios({
    url: 'platformOpenAPI/addTemplate',
    method: 'post',
    data: { id: condition.id },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      uniTenantId: condition.uniTenantId,
    },
  });
/**
 * 发布流程表单，即部署
 */
export const publishProcessForm = (condition) =>
  axios({
    url: 'platformOpenAPI/publishProcessForm',
    method: 'post',
    data: condition.data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      uniTenantId: condition.uniTenantId,
    },
  });

/**
 * 更新流程表单，即重新部署
 */
export const updateProcessForm = (condition) =>
  axios({
    url: 'platformOpenAPI/updateProcessForm',
    method: 'post',
    data: condition.data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      uniTenantId: condition.uniTenantId,
    },
  });

/**
 * 查询已发布的流程表单的详情
 */
export const queryProcessForm = ({ id }) =>
  axios({
    url: 'platformOpenAPI/queryProcessForm',
    method: 'post',
    data: { id },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });

/**
 * 获取三方平台的组织架构
 */
export const organizationStructure = (condition) =>
  axios({
    url: 'platformOpenAPI/organizationStructure',
    method: 'post',
    data: {},
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      uniTenantId: condition.uniTenantId,
      bizToken: condition.bizToken,
    },
  });

export const listDesignGroup = (condition) =>
  axios({
    url: 'platformOpenAPI/listDesignGroup',
    method: 'post',
    data: {},
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      uniTenantId: condition.uniTenantId,
    },
  });

/**
 * 关闭或者删除已发布流程
 */

export const operateProcessForm = (condition, uniTenantId) =>
  axios({
    url: 'platformOpenAPI/operateProcessForm',
    method: 'post',
    data: condition,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      uniTenantId: uniTenantId,
    },
  });

/**
 * 删除选择的模板
 */
export const deleteTemplate = (condition, uniTenantId) =>
  axios({
    url: 'platformOpenAPI/deleteTemplate',
    method: 'post',
    data: condition,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      uniTenantId: uniTenantId,
    },
  });

/**
 * 查询流程表单节点的详情
 */
export const queryProcessNodeForm = function (condition) {
  // nodeId 审批和已完成需携带
  // nodeType 审批和已完成需携带
  const { publishId, procDefId, nodeType, nodeId = '', businessId = '' } = condition;
  return axios({
    url: 'platformOpenAPI/queryProcessNodeForm',
    method: 'post',
    data: { publishId, procDefId, nodeType, nodeId, businessId },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      uniTenantId: condition.uniTenantId,
      bizToken: condition.bizToken,
    },
  });
};
