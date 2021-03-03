import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import style from './sorting-order.module.less';
import ascendingOrder from './ascendingOrder.svg';
import descendingOrder from './descendingOrder.svg';
@Component({
  components: {},
})
export default class TitleDesc extends Vue {
  @Prop({
    default: () => [
      {
        label: '综合',
        isSwitchSort: false,
      },
      {
        label: '价格',
        isSwitchSort: true,
      },
      {
        label: '上新',
        isSwitchSort: false,
      },
    ],
  })
  public readonly sortData: any;
  public sortOrder: any;

  private currentSelectIdx: number = 1; // 选中的学科

  public created() {
    this.sortOrder = this.getData(this.sortData);
  }

  @Watch('sortOrder', { deep: true, immediate: true })
  public watchsortOrder(val: any) {
    this.sortOrder = this.getData(val);
  }

  public getData(val: any) {
    return val.map((item: any) => {
      const { label, isSwitchSort } = item;
      return {
        label,
        isSwitchSort,
        isAscendingOrder: true,
      };
    });
  }
  public render() {
    return (
      <div class={style.container}>
        {this.sortOrder.map((item: any, index: number) => {
          return (
            <div key={item.label + index} class={style['select-item']} onClick={() => this.clickhandle(item, index)}>
              <div class={[style['select-text'], { [style.selected]: index === this.currentSelectIdx }]}>
                {item.label}
              </div>
              {item.isSwitchSort ? (
                <img class={style['select-icon']} src={this.sortIcon(item.isAscendingOrder)} alt='selecIcon' />
              ) : (
                <div />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  public sortIcon(flag: boolean) {
    return flag ? ascendingOrder : descendingOrder;
  }

  public clickhandle(item: any, index: number) {
    const temp = this.sortOrder;
    temp.forEach((element: any) => {
      if (element.label === item.label) {
        item.isAscendingOrder = !item.isAscendingOrder;
      }
    });
    this.sortOrder = temp;
    this.currentSelectIdx = index;
    this.$emit('clickhandle', item, index);
  }
}
