import SearchQuestionResult from './search-question-result';
import { AtomComponentConfig } from '../../../../../interfaces';
const config: AtomComponentConfig = {
  tag: 'search-question-result',
  name: 'search-question-result',
  comp_classify: 'comp_classify_base',
  category: 'native',
  group: false,
  block: false,
  attrs: [
    {
      key: 'schema',
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
  editorRender: SearchQuestionResult,
};
export default config;
