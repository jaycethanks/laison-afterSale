import { axios } from '@/utils/request'

export default {
  defaultObject: {
    sex: true,
  },
  sysUser: {
    id: '', //  主键id 类型String

    username: '', //  登录账号 类型String

    realname: '', //  真实姓名 类型String

    password: '', //  密码 类型String

    avatar: '', //  头像 类型String

    birthday: '', //  生日 类型Date

    sex: '', //  性别(0-默认未知,1-男,2-女) 类型Boolean

    email: '', //  电子邮件 类型String

    phone: '', //  电话 类型String

    status: '', //  状态(0-正常,1-99其他) 类型Boolean

    delFlag: '', //  删除状态(0-正常,1-已删除) 类型Boolean

    activitiSync: '', //  同步工作流引擎(1-同步,0-不同步) 类型Boolean

    workNo: '', //  工号，唯一键 类型String

    telephone: '', //  座机号 类型String

    createBy: '', //  创建人 类型String

    createTime: '', //  创建时间 类型Date

    updateBy: '', //  更新人 类型String

    updateTime: '', //  更新时间 类型Date

    manageFlag: '', //  是否是部门负责人 类型Boolean

    deptId: '', //  所属部门 类型String
  },

  findByAll: function findByAll(pageInfo) {
    return axios({
      url: '/sysUser/findByAll',
      method: 'post',
      data: pageInfo.condition,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },

  findByPage: function findByPage(pageInfo) {
    return axios({
      url: '/sysUser/findPage/' + pageInfo.current + '/' + pageInfo.pageSize,
      method: 'post',
      data: pageInfo.condition,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },
  findBriefPage: function findBriefPage(pageInfo) {
    return axios({
      url: '/sysUser/findBriefPage/' + pageInfo.current + '/' + pageInfo.pageSize,
      method: 'post',
      data: pageInfo.condition,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },
  findSimplePage: function findSimplePage(pageInfo) {
    return axios({
      url: '/sysUser/findSimplePage/' + pageInfo.current + '/' + pageInfo.pageSize,
      method: 'post',
      data: pageInfo.condition,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },

  add: function add(sysUser) {
    return axios({
      url: '/sysUser/add',
      method: 'post',
      data: sysUser,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },

  update: function update(sysUser) {
    return axios({
      url: '/sysUser/update',
      method: 'post',
      data: sysUser,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },

  changeStatus: function changeStatus(sysUser) {
    return axios({
      url: '/sysUser/changeStatus',
      method: 'post',
      data: sysUser,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },
  deleteById: function deleteById(id) {
    return axios({
      url: '/sysUser/deleteById/' + id,
      method: 'delete',
    })
  },
  realDeleteById: function realDeleteById(id) {
    return axios({
      url: '/sysUser/realDeleteById/' + id,
      method: 'delete',
    })
  },

  findById: function findById(id) {
    return axios({
      url: '/sysUser/findById/' + id,
      method: 'get',
    })
  },

  usernameExist: function usernameExist(username) {
    return axios({
      url: '/sysUser/usernameExist/' + username,
      method: 'get',
    })
  },
  findUserNameById: function findUserNameById(id) {
    return axios({
      url: '/sysUser/findUserNameById/' + id,
      method: 'get',
    })
  },
  findUserNameByIds: function findUserNameByIds(id) {
    //console.log(id)
    axios({
      url: '/sysUser/findUserNameById/' + id,
      method: 'get',
    }).then((res) => {
      return res
    })
  },
  deleteByIds: function deleteByIds(ids) {
    return axios({
      url: '/sysUser/deleteByIds',
      method: 'delete',
      data: ids,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },
  resetPassword: function resetPassword(id) {
    return axios({
      url: '/sysUser/resetPassword/' + id + '/0000',
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },
  // resetPassword:["name",""],
  checkStrucById: function checkStrucById(id) {
    return axios({
      url: '/sysDept/structure/' + id,
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },
  getUserList: function getUserList() {
    return axios({
      url: '/sysUser/list_member',
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },
  getUserListByDeptId: function getUserListByDeptId(deptId) {
    return axios({
      url: '/sysUser/list_member_dept/' + deptId,
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },
}
