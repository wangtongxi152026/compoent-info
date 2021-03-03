import popoverBar from './AntPopover';

export default {
  tag: 'popover',
  name: 'popover',
  comp_classify: 'comp_classify_base',
  category: 'native',
  group: false,
  block: false,
  attrs: [
    {
      key: 'actions',
      label: '数据',
      type: 'Object',
    },
    {
      key: 'showPopover',
      label: '数据',
      type: 'Object',
    },
    {
      key: 'overlay',
      label: '数据',
      type: 'Object',
    },
    {
      key: 'theme',
      label: '数据',
      type: 'Object',
    },
    {
      key: 'placement',
      label: '数据',
      type: 'Object',
    },
    {
      key: 'hasIcon',
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
  editorRender: popoverBar,
};
