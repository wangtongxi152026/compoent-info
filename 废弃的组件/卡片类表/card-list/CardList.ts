import Tabs from './card-list';

export default {
  tag: 'card-list',
  name: 'card-list',
  comp_classify: 'comp_classify_base',
  category: 'native',
  group: false,
  block: false,
  attrs: [
    {
      key: 'listData',
      label: '数据',
      type: 'string',
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
  editorRender: Tabs,
};
