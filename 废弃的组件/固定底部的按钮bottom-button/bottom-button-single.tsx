import { Vue, Component, Prop } from 'vue-property-decorator';
import style from './bottom-button.module.less';
@Component({})
export default class BottomButtonSingle extends Vue {
  @Prop({
    default: () => [
      {
        text: '确定',
        background: '#2d8cf0',
        color: '#fff',
      },
    ],
  })
  private operation: any;

  public render() {
    return (
      <div class={[style.action, style.single]}>
        {this.operation.map((item: any) => {
          return (
            <div
              style={{
                background: item.background,
                color: item.color,
              }}
              class={style['first-button']}
              onClick={this.submit}
            >
              <span>{item.text}</span>
            </div>
          );
        })}
      </div>
    );
  }

  private submit() {
    this.$emit('submit');
  }
}
