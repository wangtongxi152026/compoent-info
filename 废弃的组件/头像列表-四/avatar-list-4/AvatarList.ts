import Tabs from './avatar-list';

export default {
  tag: 'avatar-list-3',
  name: 'avatar-list-3',
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
