import selectGroup from './sorting-order';
export default {
  tag: 'sorting-order',
  name: 'sorting-order',
  comp_classify: 'comp_classify_base',
  category: 'native',
  group: false,
  block: false,
  attrs: [
    {
      key: 'sortData',
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
