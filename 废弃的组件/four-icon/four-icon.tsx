import { Vue, Component, Prop } from 'vue-property-decorator';
import style from './four-icon.module.less';
import { DoubleIconItem } from '../../../../../interfaces/mobile-components/mobile-components';
@Component({})
export default class FoureIcon extends Vue {
  @Prop({
    default: () => [
      {
        icon: '//s2-cdn.oneitfarm.com/FvlmKn9dKCL1odPe_7EqH4yAkkGo',
        text: 'logo设计',
      },
      {
        icon: '//s2-cdn.oneitfarm.com/FgqDoUHpX1B3x4W_ep3Epzz_MU71',
        text: 'App开发',
      },
      {
        icon: '//s2-cdn.oneitfarm.com/FiHSARlWQBGtwodfbTiUmtlXXTAV',
        text: '小程序开发',
      },
      {
        icon: '//s2-cdn.oneitfarm.com/FuTY_eAXiH5l9U8bV37iYWZKLirs',
        text: '图形设计',
      },
    ],
  })
  private readonly iconData: DoubleIconItem[];
  @Prop({ default: true }) private readonly isMdICon: boolean;
  public render() {
    const { iconData, imgSize } = this;
    return (
      <div class={style['icon-list']} style={{ height: this.height }}>
        {iconData.length &&
          iconData.slice(0, 4).map((item) => {
            return (
              <div key={item.icon} onClick={() => this.handleClick(item)} class={style['icon-item']}>
                <img width={imgSize} height={imgSize} src={item.icon} />
                <div class={style['icon-text']}>
                  <div class={style.title}>{item.text}</div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }

  private handleClick(item: DoubleIconItem) {
    this.$emit('clickIcon', item);
  }

  private get imgSize() {
    return this.isMdICon ? 28 : 44;
  }

  private get height() {
    return this.isMdICon ? '78px' : '94px';
  }
}
