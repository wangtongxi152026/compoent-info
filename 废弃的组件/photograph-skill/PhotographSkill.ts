import popoverBar from './photograph-skill';

export default {
  tag: 'photograph-skill',
  name: 'photograph-skill',
  comp_classify: 'comp_classify_base',
  category: 'native',
  group: false,
  block: false,
  attrs: [

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
