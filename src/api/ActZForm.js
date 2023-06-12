import { axios } from '@/utils/request'

export default {
	defaultObject:{
			},
	actZForm :	{
		
		 id:'',//  form表单id 类型String
		
		
		 name:'',//  form表单名称 类型String
		
		
		 type:'',//  form类型，0-自定义，1-已有的 类型Integer
		
		
		 jsonForm:'',//  表单，只有内容没有数值 类型String
		
		
		 deptId:'',//  部门id 类型String
		
		
		 createBy:'',//  创建人 类型String
		
		
		 createTime:'',//   类型Date
		
	},
	
	findByAll:function findAll(pageInfo) {
	  return axios({
	    url: '/actZForm/findAll',
	    method: 'post',
	    data: pageInfo.condition,
	    headers: {
	      'Content-Type': 'application/json;charset=UTF-8'
	    }
	  })
	},
	
	findByPage:function findByPage(pageInfo) {
	  return axios({
	    url: '/actZForm/findPage/'+pageInfo.current+'/'+pageInfo.pageSize,
	    method: 'post',
	    data: pageInfo.condition,
	    headers: {
	      'Content-Type': 'application/json;charset=UTF-8'
	    }
	  })
	},
	add:function add(actZForm) {
	  return axios({
	    url: '/actZForm/add',
	    method: 'post',
	    data: actZForm,
	    headers: {
	      'Content-Type': 'application/json;charset=UTF-8'
	    }
	  })
	},
	
	update:function update(actZForm) {
	  return axios({
	    url: '/actZForm/update',
	    method: 'post',
	    data: actZForm,
	    headers: {
	      'Content-Type': 'application/json;charset=UTF-8'
	    }
	  })
	},
	deleteById:function deleteById(id) {
	  return axios({
	    url: '/actZForm/deleteById/'+id,
	    method: 'delete'
	 
	  })
	},
	
	realDeleteById:function realDeleteById(id) {
	  return axios({
	    url: '/actZForm/realDeleteById/'+id,
	    method: 'delete'
	 
	  })
	},
	
	findById:function findById(id) {
	  return axios({
	    url: '/actZForm/findById/'+id,
	    method: 'get'
	 
	  })
	},
	
	deleteByIds:function deleteByIds(ids) {
	  return axios({
	    url: '/actZForm/deleteByIds',
	    method: 'delete',
	 	data: ids,
	    headers: {
	      'Content-Type': 'application/json;charset=UTF-8'
	    }
	  })
	},
	filedList:[
		        "id",
		        "name",
		        "type",
		        "jsonForm",
		        "deptId",
		        "createBy",
		        "createTime"
	]
}