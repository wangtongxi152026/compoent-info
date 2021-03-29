import scrollImg from './scroll-img';
import { AtomComponentConfig } from '../../../../../interfaces';
const config: AtomComponentConfig = {
  tag: 'scroll-img',
  name: 'scroll-img',
  comp_classify: 'comp_classify_base',
  category: 'native',
  group: false,
  block: false,
  attrs: [
    {
      key: 'themeColor',
      label: '激活颜色',
      type: 'string',
    },
    {
      key: 'text',
      label: '数据',
      type: 'object',
    },
    {
      key: 'size',
      label: '数据',
      type: 'object',
    },
    {
      key: 'type',
      label: '数据',
      type: 'object',
    },
    {
      key: 'height',
      label: '数据',
      type: 'number',
    },
    {
      key: 'width',
      label: '数据',
      type: 'number',
    },
    {
      key: 'scrollImgs',
      label: '数据',
      type: 'array',
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
  editorRender: scrollImg,
};
export default config;
