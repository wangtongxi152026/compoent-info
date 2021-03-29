import grid from './ant-result-page';
import { AtomComponentConfig } from '../../../../../interfaces';
const config: AtomComponentConfig = {
  tag: 'auto-result-page',
  name: 'auto-result-page',
  comp_classify: 'comp_classify_base',
  category: 'native',
  group: false,
  block: false,
  attrs: [
    {
      key: 'type',
      label: '数据',
      type: 'string',
    },
    {
      key: 'text',
      label: '数据',
      type: 'string',
    },
    {
      key: 'subAction',
      label: '数据',
      type: 'string',
    },
    {
      key: 'primaryAction',
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
  editorRender: grid,
};
export default config;
