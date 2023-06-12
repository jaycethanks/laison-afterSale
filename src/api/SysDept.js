import { axios } from '@/utils/request'

export default {
  sysDept: {
    id: '', //  部门id 类型String

    parentId: '', //  直接父id 类型String

    paths: '', //  路径 类型String

    name: '', //  部门名字 类型String

    level: '', //  层级 类型Integer

    sort: '', //  部门在父部门的排序 类型Integer

    regionCode: '', //  区域id 类型String

    type: '', //  类型  1-公司 2-子公司  营业厅=3 维修部=4 类型Integer

    state: '', //  状态 类型Integer

    delFlag: '', //  删除状态(0-正常,1-已删除) 类型Boolean

    address: '', //  部门所在地址 类型String

    remarks: '', //  备注 类型String

    hasChild: '', //   类型Boolean

    updateTime: '', //   类型Date
    children: [],
  },

  selectNodeFromList: function selectNodeFromList(list, id) {
    //console.log('我要删选节点了')
    for (let i in list) {
      if (list[i].id == id) {
        return list[i]
      }
      if (list[i].children && list[i].children.length > 0) {
        let node = selectNodeFromList(list[i].children, id)
        if (node != null) {
          return node
        }
      }
    }

    return null
  },

  selectNodeFromNode: function selectNodeFromNode(treeNode, id) {
    if (treeNode.id === id) {
      return treeNode
    }
    if (treeNode.children && treeNode.children.length > 0) {
      //console.log(this)
      return this.selectNodeFromList(treeNode.children, id)
    }
    return null
  },

  findByAll: function findByAll(pageInfo) {
    return axios({
      url: '/sysDept/findByAll',
      method: 'post',
      data: pageInfo.condition,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },

  findByPage: function findByPage(pageInfo) {
    return axios({
      url: '/sysDept/findPage/' + pageInfo.current + '/' + pageInfo.pageSize,
      method: 'post',
      data: pageInfo.condition,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },
  getChildListBatch: function getChildListBatch(pids) {
    return axios({
      url: '/sysDept/getChildListBatch',
      method: 'post',
      data: pids,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },
  add: function add(sysDept) {
    return axios({
      url: '/sysDept/add',
      method: 'post',
      data: sysDept,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },

  changeDeptConfig: function changeDeptConfig(conifg) {
    return axios({
      url: '/sysDept/changeDeptConfig',
      method: 'post',
      data: conifg,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },
  update: function update(sysDept) {
    return axios({
      url: '/sysDept/update',
      method: 'post',
      data: sysDept,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },
  deptnameExist: function deptnameExist(sysDept) {
    return axios({
      url: '/sysDept/deptnameExist',
      method: 'post',
      data: sysDept,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },
  deleteById: function deleteById(id) {
    return axios({
      url: '/sysDept/deleteById/' + id,
      method: 'delete',
    })
  },

  findById: function findById(id) {
    return axios({
      url: '/sysDept/findById/' + id,
      method: 'get',
    })
  },

  deleteByIds: function deleteByIds(ids) {
    return axios({
      url: '/sysDept/deleteByIds',
      method: 'delete',
      data: ids,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },

  getDeptList: function getDeptList() {
    return axios({
      url: '/sysDept/list_dept',
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },

  getDeptListByType: function getDeptList(data) {
    return axios({
      url: '/sysDept/list_dept_type',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  },
}
