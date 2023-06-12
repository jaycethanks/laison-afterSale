export default {
  "list": [
		{
			"type": "table",
			"label": "表格布局",
			"trs": [
				{
					"tds": [
						{
							"colspan": 1,
							"rowspan": 1,
							"list": [
								{
									"type": "input",
									"label": "姓名",
									"icon": "icon-write",
									"options": {
										"type": "text",
										"width": "100%",
										"defaultValue": "",
										"placeholder": "",
										"clearable": false,
										"maxLength": null,
										"addonBefore": "",
										"addonAfter": "",
										"hidden": false,
										"disabled": false
									},
									"model": "name",
									"key": "input_1683527062121",
									"help": "",
									"rules": [
										{
											"required": false,
											"message": "common.please_input"
										}
									]
								}
							]
						},
						{
							"colspan": 1,
							"rowspan": 1,
							"list": [
								{
									"type": "select",
									"label": "部门",
									"icon": "icon-xiala",
									"options": {
										"width": "100%",
										"multiple": false,
										"disabled": false,
										"clearable": false,
										"hidden": false,
										"placeholder": "请选择",
										"dynamicKey": "",
										"dynamic": false,
										"options": [
											{
												"value": "1",
												"label": "下拉框1"
											},
											{
												"value": "2",
												"label": "下拉框2"
											}
										],
										"showSearch": false
									},
									"model": "department",
									"key": "select_1683527078268",
									"help": "",
									"rules": [
										{
											"required": false,
											"message": "common.please_input"
										}
									]
								}
							]
						},
						{
							"colspan": 1,
							"rowspan": 1,
							"list": [
								{
									"type": "time",
									"label": "填写时间",
									"icon": "icon-time",
									"options": {
										"width": "100%",
										"defaultValue": "",
										"disabled": false,
										"hidden": false,
										"clearable": false,
										"placeholder": "请选择",
										"format": "HH:mm:ss"
									},
									"model": "time",
									"key": "time_1683527096749",
									"help": "",
									"rules": [
										{
											"required": false,
											"message": "common.please_input"
										}
									]
								}
							]
						}
					]
				},
				{
					"tds": [
						{
							"colspan": 1,
							"rowspan": 1,
							"list": [
								{
									"type": "select",
									"label": "下拉选择器",
									"icon": "icon-xiala",
									"options": {
										"width": "100%",
										"multiple": false,
										"disabled": false,
										"clearable": false,
										"hidden": false,
										"placeholder": "请选择",
										"dynamicKey": "",
										"dynamic": false,
										"options": [
											{
												"value": "1",
												"label": "下拉框1"
											},
											{
												"value": "2",
												"label": "下拉框2"
											}
										],
										"showSearch": false
									},
									"model": "select_1683527122470",
									"key": "select_1683527122470",
									"help": "",
									"rules": [
										{
											"required": false,
											"message": "common.please_input"
										}
									]
								}
							]
						},
						{
							"colspan": 1,
							"rowspan": 1,
							"list": [
								{
									"type": "select",
									"label": "下拉选择器",
									"icon": "icon-xiala",
									"options": {
										"width": "100%",
										"multiple": false,
										"disabled": false,
										"clearable": false,
										"hidden": false,
										"placeholder": "请选择",
										"dynamicKey": "",
										"dynamic": false,
										"options": [
											{
												"value": "1",
												"label": "下拉框1"
											},
											{
												"value": "2",
												"label": "下拉框2"
											}
										],
										"showSearch": false
									},
									"model": "select_1683527149705",
									"key": "select_1683527149705",
									"help": "",
									"rules": [
										{
											"required": false,
											"message": "common.please_input"
										}
									]
								}
							]
						},
						{
							"colspan": 1,
							"rowspan": 1,
							"list": []
						}
					]
				},
				{
					"tds": [
						{
							"colspan": 1,
							"rowspan": 1,
							"list": [
								{
									"type": "radio",
									"label": "请加类别",
									"icon": "icon-danxuan-cuxiantiao",
									"options": {
										"disabled": false,
										"hidden": false,
										"defaultValue": "",
										"dynamicKey": "",
										"dynamic": false,
										"options": [
											{
												"value": "1",
												"label": "事家"
											},
											{
												"value": "2",
												"label": "病假"
											},
											{
												"value": "3",
												"label": "婚假"
											}
										]
									},
									"model": "radio_1683527205128",
									"key": "radio_1683527205128",
									"help": "",
									"rules": [
										{
											"required": false,
											"message": "common.please_input"
										}
									]
								}
							]
						},
						{
							"colspan": 1,
							"rowspan": 1,
							"list": []
						},
						{
							"colspan": 1,
							"rowspan": 1,
							"list": []
						}
					]
				},
				{
					"tds": [
						{
							"colspan": 3,
							"rowspan": 1,
							"list": [
								{
									"type": "textarea",
									"label": "请假原因",
									"icon": "icon-edit",
									"options": {
										"width": "100%",
										"minRows": 4,
										"maxRows": 6,
										"maxLength": null,
										"defaultValue": "",
										"clearable": false,
										"hidden": false,
										"disabled": false,
										"placeholder": ""
									},
									"model": "reason",
									"key": "textarea_1683527252882",
									"help": "",
									"rules": [
										{
											"required": false,
											"message": "common.please_input"
										}
									]
								}
							]
						},
						{
							"colspan": 0,
							"rowspan": 1,
							"list": []
						},
						{
							"colspan": 0,
							"rowspan": 1,
							"list": []
						}
					]
				},
				{
					"tds": [
						{
							"colspan": 1,
							"rowspan": 1,
							"list": [
								{
									"type": "date",
									"label": "请假开始时间",
									"icon": "icon-calendar",
									"options": {
										"width": "100%",
										"defaultValue": "",
										"rangeDefaultValue": [],
										"range": false,
										"showTime": false,
										"disabled": false,
										"hidden": false,
										"clearable": false,
										"placeholder": "请选择",
										"rangePlaceholder": [
											"开始时间",
											"结束时间"
										],
										"format": "YYYY-MM-DD"
									},
									"model": "start_time",
									"key": "date_1683527274518",
									"help": "",
									"rules": [
										{
											"required": false,
											"message": "common.please_input"
										}
									]
								}
							]
						},
						{
							"colspan": 1,
							"rowspan": 1,
							"list": [
								{
									"type": "date",
									"label": "请假结束时间",
									"icon": "icon-calendar",
									"options": {
										"width": "100%",
										"defaultValue": "",
										"rangeDefaultValue": [],
										"range": false,
										"showTime": false,
										"disabled": false,
										"hidden": false,
										"clearable": false,
										"placeholder": "请选择",
										"rangePlaceholder": [
											"开始时间",
											"结束时间"
										],
										"format": "YYYY-MM-DD"
									},
									"model": "end_time",
									"key": "date_1683527311896",
									"help": "",
									"rules": [
										{
											"required": false,
											"message": "common.please_input"
										}
									]
								}
							]
						},
						{
							"colspan": 1,
							"rowspan": 1,
							"list": []
						}
					]
				},
				{
					"tds": [
						{
							"colspan": 1,
							"rowspan": 1,
							"list": [
								{
									"type": "textarea",
									"label": "部门经理签字",
									"icon": "icon-edit",
									"options": {
										"width": "100%",
										"minRows": 4,
										"maxRows": 6,
										"maxLength": null,
										"defaultValue": "",
										"clearable": false,
										"hidden": false,
										"disabled": false,
										"placeholder": ""
									},
									"model": "manager_sign",
									"key": "textarea_1683527354727",
									"help": "",
									"rules": [
										{
											"required": false,
											"message": "common.please_input"
										}
									]
								}
							]
						},
						{
							"colspan": 1,
							"rowspan": 1,
							"list": [
								{
									"type": "textarea",
									"label": "分管领导签字",
									"icon": "icon-edit",
									"options": {
										"width": "100%",
										"minRows": 4,
										"maxRows": 6,
										"maxLength": null,
										"defaultValue": "",
										"clearable": false,
										"hidden": false,
										"disabled": false,
										"placeholder": ""
									},
									"model": "leadership",
									"key": "textarea_1683527370492",
									"help": "",
									"rules": [
										{
											"required": false,
											"message": "common.please_input"
										}
									]
								}
							]
						},
						{
							"colspan": 1,
							"rowspan": 1,
							"list": [
								{
									"type": "textarea",
									"label": "总经理签字",
									"icon": "icon-edit",
									"options": {
										"width": "100%",
										"minRows": 4,
										"maxRows": 6,
										"maxLength": null,
										"defaultValue": "",
										"clearable": false,
										"hidden": false,
										"disabled": false,
										"placeholder": ""
									},
									"model": "boss",
									"key": "textarea_1683527373226",
									"help": "",
									"rules": [
										{
											"required": false,
											"message": "common.please_input"
										}
									]
								}
							]
						}
					]
				}
			],
			"options": {
				"width": "100%",
				"bordered": true,
				"bright": false,
				"small": true,
				"customStyle": ""
			},
			"key": "table_1683527046834"
		}
	],
	"config": {
		"layout": "horizontal",
		"labelCol": {
			"xs": 4,
			"sm": 4,
			"md": 4,
			"lg": 4,
			"xl": 4,
			"xxl": 4
		},
		"labelWidth": 100,
		"labelLayout": "flex",
		"wrapperCol": {
			"xs": 18,
			"sm": 18,
			"md": 18,
			"lg": 18,
			"xl": 18,
			"xxl": 18
		},
		"hideRequiredMark": false,
		"customStyle": "",
		"enablePrint": false,
		"expressions": ""
	}
}