import selectGroup from './select-button-group';
export default {
  tag: 'select-button-group',
  name: 'select-button-group',
  comp_classify: 'comp_classify_base',
  category: 'native',
  group: false,
  block: false,
  attrs: [
    {
      key: 'title1',
      label: '数据',
      type: 'object',
    },
    {
      key: 'title2',
      label: '数据',
      type: 'object',
    },
    {
      key: 'title3',
      label: '数据',
      type: 'object',
    },
    {
      key: 'general',
      label: '数据',
      type: 'object',
    },
    {
      key: 'groupData',
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
