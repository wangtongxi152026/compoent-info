import { Vue, Component, Prop } from 'vue-property-decorator';
import style from './ant-result.module.less';
const resultIcon = {
  fail: '//s2-cdn.oneitfarm.com/Fm8N9rgeyg2phZt6Zdak0Uuibxwb',
  success: '//s2-cdn.oneitfarm.com/Fl042e67gXOWCiYzWOu1fT5DfAZQ',
  info: '//s2-cdn.oneitfarm.com/Fg8LGZPYlsjksVPkDdGj4Aj0AFqd',
  waiting: '//s2-cdn.oneitfarm.com/Firgr_hggVJfWB3xHOlKY_Y6LI1S',
  warning: '//s2-cdn.oneitfarm.com/FurErwb78nBdHn2HA31MKFGJwY0E',
};
const hints = {
  fail: '无法完成操作',
  success: '操作成功',
  info: '信息提示',
  waiting: '等待处理',
  warning: '警告提示',
};
@Component({})
export default class AntResult extends Vue {
  @Prop({ default: 'fail' }) private type: 'fail' | 'success' | 'info' | 'waiting' | 'warning';
  @Prop({ default: '内容详情可折行，建议不超过两行建议不超过两行建议不超过两行' }) private text: boolean;

  private get hint() {
    return hints[this.type] || hints.warning;
  }

  private get icon() {
    return resultIcon[this.type] || resultIcon.warning;
  }

  public render() {
    const { hint, icon, text } = this;
    return (
      <div class={style['result-card']}>
        <img src={icon} alt='icon' />
        <div class={style.hint}>{hint}</div>
        <div class={style.text}>{text}</div>
      </div>
    );
  }
}
