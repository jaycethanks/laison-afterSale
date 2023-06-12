import { axios } from '@/utils/request'

export default {
  sysRole: {
    id: '', //  编号 类型String

    name: '', //  角色名称 类型String

    type: '', //  如果有特殊角色硬编码用的这个字段，慢慢加 类型Integer

    state: '', //  状态 0不启用 1启用 类型Integer

    createBy: '', //  创建者 类型String

    createDate: '', //  创建时间 类型Date

    remarks: '', //  备注信息 类型String

    deptId: '', //  部门id 类型String
  },

  findByAll: function findAll(pageInfo) {
    return axios({
      url: '/sysRole/findAll',
      method: 'post',
      data: pageInfo.condition,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },

  findByPage: function findByPage(pageInfo) {
    return axios({
      url: '/sysRole/findPage/' + pageInfo.current + '/' + pageInfo.pageSize,
      method: 'post',
      data: pageInfo.condition,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },

  add: function add(sysRole) {
    return axios({
      url: '/sysRole/add',
      method: 'post',
      data: sysRole,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },

  update: function update(sysRole) {
    return axios({
      url: '/sysRole/update',
      method: 'post',
      data: sysRole,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },
  deleteById: function deleteById(id) {
    return axios({
      url: '/sysRole/deleteById/' + id,
      method: 'delete',
    })
  },

  findById: function findById(id) {
    return axios({
      url: '/sysRole/findById/' + id,
      method: 'get',
    })
  },

  deleteByIds: function deleteByIds(ids) {
    return axios({
      url: '/sysRole/deleteByIds',
      method: 'delete',
      data: ids,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },
  getRoleList: function getRoleList() {
    return axios({
      url: 'sysRole/list_role',
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },
}
