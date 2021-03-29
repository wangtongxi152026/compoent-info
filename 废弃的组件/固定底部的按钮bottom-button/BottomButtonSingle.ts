import { AtomComponentConfig } from '../../../../../interfaces';
import bottomBar from './bottom-button-single';

const config: AtomComponentConfig = {
  // 渲染实例数据输入交互和可用类型
  tag: 'bottom-bar-single', // 唯一身份标识  --> string
  name: 'bottom-bar-single', // 中文名称   --> string
  comp_classify: 'comp_classify_base',
  category: 'native',
  group: false,
  block: false,
  attrs: [
    {
      key: 'operation',
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
  editorRender: bottomBar,
};
export default config;
