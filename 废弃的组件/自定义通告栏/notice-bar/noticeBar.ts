import modalInfo from './notice-bar';
export default {
  tag: 'notice-bar',
  name: 'notice-bar',
  comp_classify: 'comp_classify_base',
  category: 'native',
  group: false,
  block: false,
  attrs: [
    {
      key: 'text',
      label: '数据',
      type: 'Object',
    },
    {
      key: 'scrollable',
      label: '数据',
      type: 'Object',
    },
    {
      key: 'option',
      label: '数据',
      type: 'Object',
    },
    {
      key: 'icon',
      label: '数据',
      type: 'Object',
    },
    {
      key: 'iconType',
      label: '数据',
      type: 'Object',
    },
    {
      key: 'rightIcon',
      label: '数据',
      type: 'Object',
    },
  ],
  events: [
    {
      key: '@change',
      label: '数据改变时触发',
    },
  ],
  default: {
    title: '全部选择',
  },
  editorRender: modalInfo,
};
