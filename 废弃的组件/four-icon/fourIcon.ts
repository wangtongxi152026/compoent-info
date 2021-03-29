import MuCard from './four-icon';
export default {
  tag: 'four-icon',
  name: 'four-icon',
  comp_classify: 'comp_classify_base',
  category: 'native',
  group: false,
  block: false,
  attrs: [
    {
      key: 'iconData',
      label: '数据',
      type: 'object',
    },
    {
      key: 'isMdICon',
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
  editorRender: MuCard,
};
