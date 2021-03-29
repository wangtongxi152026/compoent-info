import { Vue, Component, Prop } from 'vue-property-decorator';
import style from './select.module.less';
import { SelectGroupType } from '../../../../../interfaces/mobile-components/mobile-components';
@Component({})
export default class SelectGroup extends Vue {
  @Prop({
    type: Object,
    default: () => ({
      selectGroup: {
        title1: '综合排序',
        title2: '速度',
        title3: '全部筛选',
        data: [
          { label: '30分钟内', value: '1' },
          { label: '40分钟内', value: '2' },
          { label: '1h内', value: '3' },
          { label: '选项4', value: '4' },
          { label: '选项2', value: '5' },
        ],
      },
    }),
  })
  private readonly schema: SelectGroupType;
  private showSelect1: boolean = true;
  private showSelect2: boolean = false;
  private showSelect3: boolean = false;

  private value: string = '-1';

  public render() {
    const { title1, title2, title3, data } = this.schema.selectGroup;
    return (
      <div class={style.container}>
        <div class={[style.title, style.border]}>
          <span onClick={this.changeSelect1}>
            {title1}
            {this.renderIcon(this.showSelect1)}
          </span>
          <span onClick={this.changeSelect2}>
            {title2}
            {this.renderIcon(this.showSelect2)}
          </span>
          <span onClick={this.changeSelect3}>
            {title3}
            {this.renderIcon(this.showSelect3)}
          </span>
        </div>
        <div class={style['select-wrapper-button']} v-show={this.showSelect2}>
          <div class={style['button-group']}>
            {data.map((item) => {
              return (
                <div
                  class={[style['button-item'], { [style.selected]: this.selected(item.value) }]}
                  key={item.value}
                  onClick={() => this.selectButton(item.value)}
                  value={item.value}
                >
                  <span>{item.label} </span>
                  <em class={style['select-icon']} v-show={this.selected(item.value)}>
                    <unm-icon class={style.check} color='#fff' type={'check'} size={'xxs'} />
                  </em>
                </div>
              );
            })}
          </div>
          <div class={style['select-action']}>
            <unm-button ononClick={this.reset}>重置</unm-button>
            <unm-button type='primary'>确定</unm-button>
          </div>
        </div>
      </div>
    );
  }

  private reset() {
    this.value = '-1';
  }

  private selected(value: string) {
    return this.value === value;
  }

  private changeSelect1() {
    this.showSelect1 = !this.showSelect1;
  }

  private selectButton(value: string) {
    this.value = value;
  }

  private changeSelect2() {
    this.showSelect2 = !this.showSelect2;
  }

  private changeSelect3() {
    //
  }

  private renderIcon(selectShow: boolean) {
    const type = selectShow ? 'up' : 'down';
    return <unm-icon color='#ccc' type={type} size={'sm'} />;
  }
}
