import { Vue, Component, Prop } from 'vue-property-decorator';
import style from './scroll-img.module.less';
import { ScrollItem } from '../../../../../interfaces/mobile-components/mobile-components';
@Component({
  components: {},
})
export default class ScrollImg extends Vue {
  @Prop({ default: 156 }) public readonly height: number;
  @Prop({ default: 104 }) public readonly width: number;
  @Prop({ default: '橘黄' }) public readonly themeColor: number;
  @Prop({ default: 'light' }) public readonly type: string;
  @Prop({ default: 'medium' }) public readonly size: string;
  @Prop({ default: 'vip' }) public readonly text: string;
  @Prop({
    default: () => [
      {
        id: '1',
        img: '//s2-cdn.oneitfarm.com/Fm9xrAq-YLuIkZyUvko4H2mKxQTz',
        isVip: true,
      },
      {
        id: '2',
        img: '//s2-cdn.oneitfarm.com/FrXJV78Ay-3iYeKrvZ8vVHfhJs3G',
        isVip: false,
      },
      {
        id: '3',
        img: '//s2-cdn.oneitfarm.com/FuknX7i6nWJ51EKUZKmEXyZfRr-G',
        isVip: false,
      },
      {
        id: '4',
        img: '//s2-cdn.oneitfarm.com/FuR8yIloJ6CZnoANiIn4eybG5Vxz',
        isVip: false,
      },
    ],
  })
  public readonly scrollImgs: ScrollItem[];

  @Prop({ default: false }) public readonly isShowDefault: boolean;
  public currentIdx: number | string = -1;
  public render() {
    const { scrollImgs, height, width } = this;
    return (
      <div class={style['works-edit-box']}>
        <div class={style['works-edit-box-in']}>
          {this.isShowDefault && this.renderDefaultTheme()}
          {scrollImgs.length
            ? scrollImgs.map((item) => (
                <div
                  key={item.id}
                  on={{
                    click: () => this.selectHandle(item),
                    touchend: () => this.selectHandle(item),
                  }}
                  class={this.selected(item)}
                >
                  <img style={{ height: height + 'px', width: width + 'px' }} class={style.img} src={item.img} />
                  {/* {this.isSelected(item) && <div class={style['works-mask']} />}
                  {this.isSelected(item) && this.renderSelect} */}
                  {/* {item.isVip && <img class={style['works-vip']} src={require('./vip.png')} alt='vip' />} */}
                  {item.isVip && (
                    <van-tag class={style['works-vip']} type='warning '>
                      {this.text}
                    </van-tag>
                  )}
                </div>
              ))
            : this.renderNoData()}
        </div>
      </div>
    );
  }

  public renderNoData() {
    return (
      <div>
        <div class={style['works-mask']} />
        <span>暂无数据</span>
      </div>
    );
  }

  public renderDefaultTheme() {
    return (
      <div on-touchend={this.selectDefault} class={style['default-style']}>
        <span>默认风格</span>
        {this.isSelected() && <div class={style['works-mask']} />}
        {this.isSelected() && this.renderSelect}
      </div>
    );
  }

  public get renderSelect() {
    return <img class={style['works-ok']} src={require('./ok.png')} alt='ok' />;
  }

  public selectDefault() {
    this.$emit('selectDefault');
    this.currentIdx = 'default';
  }

  public isSelected(item?: ScrollItem) {
    return this.currentIdx === (item ? item.id : 'default');
  }

  public selected(item: ScrollItem) {
    return this.isSelected(item) ? style['works-selected'] : '';
  }

  public selectHandle(item: ScrollItem) {
    this.currentIdx = item.id;
    this.$emit('selectImg', item);
  }
}
