import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import style from './select-button-group.module.less';
import {
  SelectButtonGroupType,
  SelectItem,
  GroupItem,
} from '../../../../../interfaces/mobile-components/mobile-components';
import buttonGroup from '../base/button-group';
@Component({
  components: {
    'button-group': buttonGroup,
  },
})
export default class SelectButtonGroup extends Vue {
  @Prop({ default: '南京' }) private readonly title1: string;
  @Prop({ default: '综合' }) private readonly title2: string;
  @Prop({ default: '销量' }) private readonly title3: string;
  @Prop({
    default: () => [
      { label: '综合', value: '1' },
      { label: '评分降序', value: '2' },
      { label: '价格升序', value: '3' },
      { label: '价格降序', value: '4' },
    ],
  })
  private readonly general: SelectItem[];
  @Prop({
    default: () => [
      {
        name: '主题',
        description: '',
        value: '',
        group: [
          { label: '全部', value: '1' },
          { label: '设计logo', value: '2' },
          { label: '商标设计', value: '3' },
          { label: '标志设计', value: '4' },
          { label: '品牌设计', value: '5' },
          { label: '图形设计', value: '6' },
          { label: '标志logo', value: '7' },
          { label: '平面logo', value: '8' },
          { label: '卡通标志', value: '9' },
        ],
      },
      {
        name: '服务保障',
        description: '辅助文字',
        value: '',
        group: [
          { label: '全部', value: '1' },
          { label: '选项一', value: '2' },
          { label: '选项二', value: '3' },
          { label: '选项三', value: '4' },
          { label: '选项四', value: '5' },
          { label: '选项五', value: '6' },
          { label: '选项六', value: '7' },
          { label: '选项七', value: '8' },
          { label: '选项八', value: '9' },
        ],
      },
    ],
  })
  private readonly groupData: GroupItem[];
  private curSchema: SelectButtonGroupType;
  private selectValueAarry: string[] = [];
  private showSelect1: boolean = false;
  private showSelect2: boolean = false;
  private showSelect3: boolean = false;
  private RadioValue: string = '1';
  private min: number = 0;
  private max!: number;

  public data() {
    return {
      curSchema: this.schema,
    };
  }

  private get showMask() {
    return this.showSelect1 || this.showSelect2 || this.showSelect3;
  }

  private get schema() {
    return {
      groupData: this.groupData,
    };
  }

  public get rightIcon() {
    // const icon = this.showSelect2 ?  : './left-select-icon.svg';
    return require('./left-list-icon.svg');
  }

  @Watch('schema', { deep: true, immediate: true })
  public watch(schema: SelectButtonGroupType) {
    this.selectValueAarry =
      schema.groupData &&
      schema.groupData.map((item) => {
        return item.value;
      });
    this.curSchema = schema;
  }

  public render() {
    const { groupData } = this.curSchema;
    const { title1, title2, title3, general } = this;
    return (
      <div>
        <div v-show={this.showMask} on={{ touchend: this.closeMask, click: this.closeMask }} class={style.mask} />
        <div class={style.container}>
          <div class={style.title}>
            <span>
              <div>{title1}</div>
              {this.renderIcon(this.showSelect1)}
            </span>
            <span onClick={() => this.triggleSelectType(2)} class={{ [style.selectIconColor]: this.showSelect2 }}>
              <div>{title2}</div>
              {this.renderIcon(this.showSelect2)}
            </span>
            <span>
              <div>{title3}</div>
              {/* {this.renderIcon(this.showSelect3)} */}
            </span>
            <img class={style['right-icon']} src={this.rightIcon} alt='rightIcon' />
            <div class={style.divider} />
            <div onClick={() => this.triggleSelectType(3)}>
              <span class={{ [style.selectIconColor]: this.showSelect3 }}>筛选</span>
              <img src={require('./select.svg')} alt='select-icon' />
            </div>
          </div>

          <div class={style['select-wrapper']} v-show={this.showSelect2}>
            <unm-list>
              {general.length &&
                general.map((item) => {
                  return (
                    <unm-radio-item key={item.value} v-model={this.RadioValue} value={item.value} Title={item.label} />
                  );
                })}
            </unm-list>
          </div>
          <div class={style['select-wrapper']} v-show={this.showSelect3}>
            <div class={style['select-wrapper-button']}>
              {groupData.map((item, idx) => {
                return (
                  item.name && (
                    <button-group
                      on={{ selectButton: (ele: any) => this.selectButton(ele, idx) }}
                      v-model={this.selectValueAarry[idx]}
                      key={item.name}
                      groupItem={item}
                    />
                  )
                );
              })}
              {this.renderSelectPrice()}
            </div>
            <div class={style['select-action']}>
              <div onClick={this.reset}>重置</div>
              <div onClick={this.sure}>确定</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  public renderSelectPrice() {
    return (
      <div>
        <div class={style['group-title']}>
          <div class={style.name}>价格区间（元）</div>
        </div>
        <div class={style['price-range']}>
          <input v-model={this.min} min={0} placeholder={'最低价'} class={style['price-input']} type='number' />
          <div class={style['divider-x']} />
          <input v-model={this.max} min={0} placeholder={'最高价'} class={style['price-input']} type='number' />
        </div>
      </div>
    );
  }

  public changeSelect1() {
    this.showSelect1 = !this.showSelect1;
  }

  public changeSelect2() {
    this.showSelect2 = !this.showSelect2;
  }
  private closeMask() {
    this.showSelect1 = false;
    this.showSelect2 = false;
    this.showSelect3 = false;
  }

  private triggleSelectType(type: number) {
    switch (type) {
      case 1:
        break;
      case 2:
        this.showSelect2 = !this.showSelect2;
        this.showSelect3 = false;
        this.showSelect1 = false;
        break;
      case 3:
        this.showSelect3 = !this.showSelect3;
        this.showSelect2 = false;
        this.showSelect1 = false;
        break;
      default:
        break;
    }
  }

  private reset() {
    this.selectValueAarry = [];
  }

  private sure() {
    this.closeMask();
  }

  private selectButton(ele: any, idx: number) {
    this.selectValueAarry[idx] = ele.value;
  }

  private renderIcon(selectShow: boolean) {
    return (
      <span class={style.icon}>
        <unm-icon color={selectShow ? '#2D8CF0' : '#ccc'} type={selectShow ? 'up' : 'down'} size={'sm'} />
      </span>
    );
  }
}
