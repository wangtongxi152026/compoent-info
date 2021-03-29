import { Vue, Component, Prop } from 'vue-property-decorator';
import style from './bottom-button.module.less';
@Component({})
export default class BottomButton extends Vue {
  @Prop({
    default: () => [
      {
        text: '确定',
        background: '#fff',
        color: '#333',
      },
      {
        text: '取消',
        background: '#2d8cf0',
        color: '#fff',
      },
    ],
  })
  private operation: any;

  public render() {
    const { operation } = this;
    return (
      <div class={style.action}>
        <div
          style={{
            background: operation[0].background,
            color: operation[0].color,
          }}
          class={style['first-button']}
          onClick={this.cancel}
        >
          <span>{operation[0].text}</span>
        </div>
        <div
          style={{
            background: operation[1].background,
            color: operation[1].color,
          }}
          class={style['last-button']}
          onClick={this.submit}
        >
          <span>{operation[1].text}</span>
        </div>
      </div>
    );
  }

  private cancel() {
    this.$emit('cancel');
  }

  private submit() {
    this.$emit('submit');
  }
}
