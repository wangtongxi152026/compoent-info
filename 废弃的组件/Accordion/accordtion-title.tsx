import { Vue, Component, Prop } from 'vue-property-decorator';
import arrow from './arrow.svg';
import style from './catalogue.module.less';
import lock from './lock.svg';

@Component({
  components: {},
})
export default class AccordtionTitle extends Vue {
  @Prop({
    default: {},
  })
  private readonly value: any;
  private isActive: boolean = false;
  public render() {
    const { value } = this;
    return (
      <div>
        <div onClick={this.toggle} class={style['catalogue-title']}>
          <div class={style.title}>{value.title}</div>
          <img class={[style.arrow, { [style.rotate]: this.isActive }]} src={arrow} alt='arrow' />
        </div>
        <div style={{ height: this.isActive ? `${(value.contents.length || 1) * 45}px` : 0 }} class={[style.item]}>
          {value.contents.map((ele: any) => {
            return (
              <div class={style['list-item']}>
                <div class={style.description}>{ele.text}</div>
                <img class={style.lock} src={lock} alt='lock' />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  public toggle() {
    this.isActive = !this.isActive;
    this.$emit('accordion');
  }

  public changeActive() {
    this.isActive = false;
  }
}
