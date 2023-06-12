export default {
  formDesignId: '',
  designKey: 'diagram_Process_1682298606424',
  designName: 'test',
  designDes: '',
  designIcon: 'datacollection',
  designColor: '#0089ff',
  designGroupName: 'test',
  formInfo:
    '{"list":[{"label":"CustomFields","type":"CustomFields","options":{"help":"","width":"100%","hidden":false,"disabled":false},"rules":[{"required":false,"message":"common.please_input"}],"key":"CustomFields_1682298608144","model":"CustomFields_1682298608144","exposeFields":[{"label":"userName","disabled":true,"hidden":true,"type":"userName","key":"userName"},{"label":"price","disabled":true,"hidden":true,"type":"price","key":"price"}]}],"config":{"layout":"horizontal","labelCol":{"xs":4,"sm":4,"md":4,"lg":4,"xl":4,"xxl":4},"labelWidth":100,"labelLayout":"flex","wrapperCol":{"xs":18,"sm":18,"md":18,"lg":18,"xl":18,"xxl":18},"hideRequiredMark":false,"customStyle":"","enablePrint":false,"expressions":""}}',
  procModelXml:
    '<?xml version="1.0" encoding="UTF-8"?>\n<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="diagram_Process_1682298606424" targetNamespace="http://activiti.org/bpmn">\n  <bpmn2:process id="Process_1682298606424" name="业务流程_1682298606424" isExecutable="true">\n    <bpmn2:startEvent id="Event_01yotba">\n      <bpmn2:outgoing>Flow_1f7ni4p</bpmn2:outgoing>\n    </bpmn2:startEvent>\n    <bpmn2:userTask id="Activity_0zi4zi2">\n      <bpmn2:incoming>Flow_1f7ni4p</bpmn2:incoming>\n      <bpmn2:outgoing>Flow_01qgjk0</bpmn2:outgoing>\n    </bpmn2:userTask>\n    <bpmn2:sequenceFlow id="Flow_1f7ni4p" sourceRef="Event_01yotba" targetRef="Activity_0zi4zi2" />\n    <bpmn2:userTask id="Activity_1e04m4t">\n      <bpmn2:incoming>Flow_01qgjk0</bpmn2:incoming>\n      <bpmn2:outgoing>Flow_03agly9</bpmn2:outgoing>\n    </bpmn2:userTask>\n    <bpmn2:sequenceFlow id="Flow_01qgjk0" sourceRef="Activity_0zi4zi2" targetRef="Activity_1e04m4t" />\n    <bpmn2:endEvent id="Event_0yc8494">\n      <bpmn2:incoming>Flow_03agly9</bpmn2:incoming>\n    </bpmn2:endEvent>\n    <bpmn2:sequenceFlow id="Flow_03agly9" sourceRef="Activity_1e04m4t" targetRef="Event_0yc8494" />\n  </bpmn2:process>\n  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1682298606424">\n      <bpmndi:BPMNEdge id="Flow_1f7ni4p_di" bpmnElement="Flow_1f7ni4p">\n        <di:waypoint x="368" y="160" />\n        <di:waypoint x="420" y="160" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id="Flow_01qgjk0_di" bpmnElement="Flow_01qgjk0">\n        <di:waypoint x="520" y="160" />\n        <di:waypoint x="580" y="160" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id="Flow_03agly9_di" bpmnElement="Flow_03agly9">\n        <di:waypoint x="680" y="160" />\n        <di:waypoint x="742" y="160" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNShape id="Event_01yotba_di" bpmnElement="Event_01yotba">\n        <dc:Bounds x="332" y="142" width="36" height="36" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id="Activity_0zi4zi2_di" bpmnElement="Activity_0zi4zi2">\n        <dc:Bounds x="420" y="120" width="100" height="80" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id="Activity_1e04m4t_di" bpmnElement="Activity_1e04m4t">\n        <dc:Bounds x="580" y="120" width="100" height="80" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id="Event_0yc8494_di" bpmnElement="Event_0yc8494">\n        <dc:Bounds x="742" y="142" width="36" height="36" />\n      </bpmndi:BPMNShape>\n    </bpmndi:BPMNPlane>\n  </bpmndi:BPMNDiagram>\n</bpmn2:definitions>\n',
  permissionConfig: {
    starterMembers: [],
    viewAllMembers: [],
  },
  nodeConfigs: [
    {
      nodeId: 'Activity_0zi4zi2',
      taskConfig: {
        columnConfigs: [
          {
            label: 'CustomFields',
            type: 'CustomFields',
            model: 'CustomFields_1682298608144',
            key: 'CustomFields_1682298608144',
            hidden: false,
            disabled: false,
            exposeFields: [
              {
                label: 'userName',
                disabled: false,
                hidden: false,
                type: 'userName',
                key: 'userName',
              },
              {
                label: 'price',
                disabled: true,
                hidden: false,
                type: 'price',
                key: 'price',
              },
            ],
          },
        ],
        members: [],
        applyerLeader: false,
        applyer: false,
      },
      copyConfig: {
        columnConfigs: [
          {
            label: 'CustomFields',
            type: 'CustomFields',
            model: 'CustomFields_1682298608144',
            key: 'CustomFields_1682298608144',
            hidden: false,
            disabled: false,
            exposeFields: [
              {
                label: 'userName',
                disabled: true,
                hidden: true,
                type: 'userName',
                key: 'userName',
              },
              {
                label: 'price',
                disabled: true,
                hidden: true,
                type: 'price',
                key: 'price',
              },
            ],
          },
        ],
        members: [],
        type: 'end',
      },
      viewConfig: {
        commonConfig: {
          newest: true,
          disabled: true,
          hidden: true,
        },
        userConfig: {
          columnConfigs: [
            {
              label: 'CustomFields',
              type: 'CustomFields',
              model: 'CustomFields_1682298608144',
              key: 'CustomFields_1682298608144',
              hidden: false,
              disabled: false,
              exposeFields: [
                {
                  label: 'userName',
                  disabled: true,
                  hidden: true,
                  type: 'userName',
                  key: 'userName',
                },
                {
                  label: 'price',
                  disabled: true,
                  hidden: true,
                  type: 'price',
                  key: 'price',
                },
              ],
            },
          ],
          members: [],
        },
      },
    },
    {
      nodeId: 'Activity_1e04m4t',
      taskConfig: {
        columnConfigs: [
          {
            label: 'CustomFields',
            type: 'CustomFields',
            model: 'CustomFields_1682298608144',
            key: 'CustomFields_1682298608144',
            hidden: false,
            disabled: false,
            exposeFields: [
              {
                label: 'userName',
                disabled: true,
                hidden: false,
                type: 'userName',
                key: 'userName',
              },
              {
                label: 'price',
                disabled: false,
                hidden: false,
                type: 'price',
                key: 'price',
              },
            ],
          },
        ],
        members: [],
        applyerLeader: false,
        applyer: false,
      },
      copyConfig: {
        columnConfigs: [
          {
            label: 'CustomFields',
            type: 'CustomFields',
            model: 'CustomFields_1682298608144',
            key: 'CustomFields_1682298608144',
            hidden: false,
            disabled: false,
            exposeFields: [
              {
                label: 'userName',
                disabled: true,
                hidden: true,
                type: 'userName',
                key: 'userName',
              },
              {
                label: 'price',
                disabled: true,
                hidden: true,
                type: 'price',
                key: 'price',
              },
            ],
          },
        ],
        members: [],
        type: 'end',
      },
      viewConfig: {
        commonConfig: {
          newest: true,
          disabled: true,
          hidden: true,
        },
        userConfig: {
          columnConfigs: [
            {
              label: 'CustomFields',
              type: 'CustomFields',
              model: 'CustomFields_1682298608144',
              key: 'CustomFields_1682298608144',
              hidden: false,
              disabled: false,
              exposeFields: [
                {
                  label: 'userName',
                  disabled: true,
                  hidden: true,
                  type: 'userName',
                  key: 'userName',
                },
                {
                  label: 'price',
                  disabled: true,
                  hidden: true,
                  type: 'price',
                  key: 'price',
                },
              ],
            },
          ],
          members: [],
        },
      },
    },
  ],
};
