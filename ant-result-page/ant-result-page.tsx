import { Vue, Component, Prop } from 'vue-property-decorator';
import AntResult from '../ant-result/ant-result';
import style from './ant-result-page.module.less';

@Component({
  components: { AntResult },
})
export default class AntResultPage extends Vue {
  @Prop({ default: 'success' }) private type: 'fail' | 'success' | 'info' | 'waiting' | 'warning';
  @Prop({ default: '内容详情可折行，建议不超过两行建议不超过两行建议不超过两行' }) private text: boolean;
  @Prop({ default: '主要操作 Normal' }) private primaryAction: boolean;
  @Prop({ default: '辅助操作 Normal' }) private subAction: boolean;

  public render() {
    const { primaryAction, type, text, subAction } = this;
    return (
      <div class={style['result-page']}>
        <Ant-Result class={style['result-background']} text={text} type={type} />
        <div class={style.action}>
          {primaryAction && (
            <unm-button class={style['primary-action']} type='primary'>
              {primaryAction}
            </unm-button>
          )}
          {subAction && <unm-button>{subAction}</unm-button>}
        </div>
      </div>
    );
  }
}
