import selectGroup from './select-button';
export default {
  tag: 'select-button',
  name: 'select-button',
  comp_classify: 'comp_classify_base',
  category: 'native',
  group: false,
  block: false,
  attrs: [
    {
      key: 'schema',
      label: '数据',
      type: 'object',
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
  editorRender: selectGroup,
};
