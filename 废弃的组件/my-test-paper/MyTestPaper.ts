import modalInfo from './my-test-paper';
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
