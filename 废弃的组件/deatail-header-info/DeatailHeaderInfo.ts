import dataPicker from './deatail-header-info';
export default {
  tag: 'detail-header-info',
  name: 'detail-header-info',
  comp_classify: 'comp_classify_base',
  category: 'native',
  group: false,
  block: false,
  attrs: [
    {
      key: 'cardData',
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
  editorRender: dataPicker,
};
