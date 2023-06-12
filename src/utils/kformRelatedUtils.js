/**
 * 解析结点配置，并返回洗过的 formInfo
 * @param {*} mock
 * @returns
 */
function walkNodes(list, callback) {
  // 递归遍历控件树
  const traverse = (array) => {
    array.forEach((element) => {
      callback(element);
      // this.$set(element.options, optionName, value);

      if (element.type === 'grid' || element.type === 'tabs') {
        // 栅格布局 and 标签页
        element.columns.forEach((item) => {
          traverse(item.list);
        });
      } else if (element.type === 'card' || element.type === 'batch') {
        // 卡片布局 and  动态表格
        traverse(element.list);
      } else if (element.type === 'table') {
        // 表格布局
        element.trs.forEach((item) => {
          item.tds.forEach((val) => {
            traverse(val.list);
          });
        });
      }
    });
  };
  traverse(list);
}

export const parseFormWithNodeConfig = function (formWithNodeConfig, currentLang = 'zh') {
  try {
    const { formInfo, formConfigs } = formWithNodeConfig;
    const jsonFormInfo = typeof formInfo === 'string' ? JSON.parse(formInfo) : formInfo;
    if (!jsonFormInfo) {
      return null;
    }
    // 取出配置， set到对应的语言 list
    const list = jsonFormInfo.predefinedLists[currentLang];
    // 如果 formConfigs 不为 undefined, 那么去解析配置
    formConfigs &&
      walkNodes(list, (element) => {
        const findConfig = formConfigs.find((config) => config.key === element.key);
        if (findConfig != undefined) {
          const { disabled, hidden } = findConfig;
          element.options['hidden'] = hidden;
          element.options['disabled'] = disabled;
          if (typeof findConfig.exposeFields !== 'undefined') {
            // 如果这个字段是自定义组件， 就会可能会存在 exposeFields 这个字段 (取决与自定义组件中 是否有按照规定实现)
            // 将exposeFields 写入到 formInfo 在组件解析阶段去控制自定义组件中的对应字段
            element._exposeFields = findConfig.exposeFields;
          }
        }
      });

    // 将当前表单 list 设定为已配置的目标语言 list
    jsonFormInfo.list = list;
    return jsonFormInfo;
  } catch (e) {
    console.error('表单解析异常:\n', e);
    return null;
  }

  // 渲染一个表单， 需要 当前结点配置的类型： 审批/抄送/查看 + 当前结点的 id
  // mock.currentNodeType = 'taskConfig'; // 后端返回的时候，需要标记当前结点的类型
  // mock.currentNodeId = 'Activity_12sck8q';
  // const { formInfo, currentNodeType, currentNodeId, nodeConfigs } = mock;

  // const _formInfo = JSON.parse(formInfo);
  // const _config = nodeConfigs.find((config) => config.nodeId === currentNodeId)[currentNodeType]['columnConfigs'];
  // // 将结点配置的字段控制信息取出，并set到formInfo
  // console.log('[_config]: ', _config);
  // _formInfo.list.forEach((formItem) => {
  //   const { key } = formItem;
  //   console.log('[formItem]: ', formItem);
  //   _config.forEach((configItem) => {
  //     const { key: _key, hidden, disabled } = configItem;
  //     if (key === _key) {
  //       formItem.options.hidden = hidden;
  //       formItem.options.disabled = disabled;
  //     }
  //     if (typeof configItem.exposeFields !== 'undefined') {
  //       // 如果这个字段是自定义组件， 就会可能会存在 exposeFields 这个字段 (取决与自定义组件中 是否有按照规定实现)
  //       // 将exposeFields 写入到 formInfo 在组件解析阶段去控制自定义组件中的对应字段
  //       formItem._exposeFields = configItem.exposeFields;
  //       console.log('[configItem.exposeFields]: ', configItem.exposeFields);
  //     }
  //   });
  // });
  return _formInfo;
};
