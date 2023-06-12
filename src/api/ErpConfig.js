import { axios } from '@/utils/request'

export default {
  defaultObject: {},
  erpConfig: {
    id: '', //   类型String

    configName: '', //  配置名称 类型String

    configCode: '', //  配置code不要随意更改，与前端代码是搭配的 类型String

    configJson: '', //  具体的配置 类型String

    deptId: '', //  部门id 类型String

    remark: '', //  备注 类型String

    columns: '', //  用于前端table渲染 类型String
  },

  findByAll: function findAll(pageInfo) {
    return axios({
      url: '/erpConfig/findAll',
      method: 'post',
      data: pageInfo.condition,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },

  findByPage: function findByPage(pageInfo) {
    return axios({
      url: '/erpConfig/findPage/' + pageInfo.current + '/' + pageInfo.pageSize,
      method: 'post',
      data: pageInfo.condition,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },
  add: function add(erpConfig) {
    return axios({
      url: '/erpConfig/add',
      method: 'post',
      data: erpConfig,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },

  update: function update(erpConfig) {
    return axios({
      url: '/erpConfig/update',
      method: 'post',
      data: erpConfig,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },
  deleteById: function deleteById(id) {
    return axios({
      url: '/erpConfig/deleteById/' + id,
      method: 'delete',
    })
  },

  realDeleteById: function realDeleteById(id) {
    return axios({
      url: '/erpConfig/realDeleteById/' + id,
      method: 'delete',
    })
  },

  findById: function findById(id) {
    return axios({
      url: '/erpConfig/findById/' + id,
      method: 'get',
    })
  },
  findByCode: function findByCode(code) {
    return axios({
      url: '/erpConfig/findByCode/' + code,
      method: 'get',
    })
  },

  deleteByIds: function deleteByIds(ids) {
    return axios({
      url: '/erpConfig/deleteByIds',
      method: 'delete',
      data: ids,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },

  /**
   * 保存流程表单的更改信息，如创建，更新，发布等
   * 0-创建 1-更新 2-发布
   */
  editErpConfig: function editErpConfig(data) {
    return axios({
      url: '/erpConfig/editErpConfig',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },
  /**
   * 更新表单启用状态
   * true 开启，false 禁用
   * {
   *   “formDesignId”:"",
   *   "enable":true/false
   * }
   */
  editConfigStatus: function editConfigStatus(data) {
    return axios({
      url: '/erpConfig/editConfigStatus',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },
  /**
   * 获取流程表单配置列表,不分页
   */
  processFormList: function processFormList() {
    return axios({
      url: '/erpConfig/editFormList',
      method: 'get',
    })
  },
  processListByName: function processListByName(designName, data) {
    return axios({
      url: !designName ? '/erpConfig/applyFormList' : '/erpConfig/applyFormListByName/' + designName,
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },
  /**
   * 获取流程定义下对应的第一个节点对应的表单信息及表单值
   */
  findFirstDesignFormInfo: function findFirstDesignFormInfo(data) {
    return axios({
      url: '/erpConfig/findFirstDesignFormInfo',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },
  /**
   * 获取指定节点的表单信息
   */
  findSelectDesignFormInfo: function findSelectDesignFormInfo(data) {
    if (data.orderId) {
      data.businessId = data.orderId
    }
    if (data.erpOrderId) {
      data.businessId = data.erpOrderId
    }
    return axios({
      url: '/erpConfig/findSelectDesignFormInfo',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },
  /**
   * 获取指定节点的之前节点的表单信息
   */
  findPreNodeDesignFormInfo: function findPreNodeDesignFormInfo(data) {
    if (data.orderId) {
      data.businessId = data.orderId
    }
    if (data.erpOrderId) {
      data.businessId = data.erpOrderId
    }
    return axios({
      url: '/erpConfig/findPreNodeDesignFormInfo',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },

  /**
   * 获取指定最新节点的表单信息
   */
  findDesignFormInfoByBusinessId: function findDesignFormInfoByBusinessId(busId) {
    return axios({
      url: '/erpConfig/findDesignFormInfoByBusinessId/' + busId,
      method: 'get',
    })
  },

  realDeleteConfigById: function realDeleteConfigById(id) {
    return axios({
      url: '/erpConfig/realDeleteConfigById/' + id,
      method: 'delete',
    })
  },
  deleteConfigById: function deleteConfigById(id) {
    return axios({
      url: '/erpConfig/deleteConfigById/' + id,
      method: 'delete',
    })
  },

  deleteConfigByIds: function deleteConfigByIds(ids) {
    return axios({
      url: '/erpConfig/deleteConfigByIds',
      method: 'delete',
      data: ids,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },
  filedList: ['id', 'configName', 'configCode', 'configJson', 'deptId', 'remark', 'columns'],
}
