import { Vue, Component, Prop } from 'vue-property-decorator';
import style from './card-list.module.less';
import { AntCardItem } from '../../../../../interfaces/mobile-components/mobile-components';
@Component({})
export default class BottomBar extends Vue {
  @Prop({
    default: () => [
      {
        id: '0',
        img: '//s2-cdn.oneitfarm.com/Fs0ReLaUVM7YWg9gw5WPQlJnuM62',
        title: 'BG100酒店智能无人收货机',
        subtitle: '智能新零售，创业新风口',
        RegisteredCount: '47',
        priceRange: '1-10万',
        time: '1天前',
        tags: [
          { label: '实名微信群' },
          { label: '通信设备' },
          { label: '软件工程' },
          { label: '团队建设' },
          { label: '产品研发' },
        ],
      },
      {
        id: '1',
        img: '//s2-cdn.oneitfarm.com/Fs0ReLaUVM7YWg9gw5WPQlJnuM62',
        title: 'BG100酒店智能无人收货机',
        subtitle: '智能新零售，创业新风口',
        RegisteredCount: '47',
        priceRange: '1-10万',
        time: '1天前',
        tags: [
          { label: '实名微信群' },
          { label: '通信设备' },
          { label: '软件工程' },
          { label: '团队建设' },
          { label: '产品研发' },
        ],
      },
      {
        id: '2',
        img: '//s2-cdn.oneitfarm.com/Fs0ReLaUVM7YWg9gw5WPQlJnuM62',
        title: 'BG100酒店智能无人收货机',
        subtitle: '智能新零售，创业新风口',
        RegisteredCount: '47',
        priceRange: '1-10万',
        time: '1天前',
        tags: [
          { label: '实名微信群' },
          { label: '通信设备' },
          { label: '软件工程' },
          { label: '团队建设' },
          { label: '产品研发' },
        ],
      },
    ],
  })
  private listData: AntCardItem[];

  public render() {
    return (
      <div>
        {this.listData.map((item: any, index: number) => {
          const { img, title, subtitle, time, desc, corporation, tags, priceRange, unit, RegisteredCount } = item;
          return (
            <div
              onClick={() => this.clickCard(item)}
              class={[style['ant-card'], { [style.raduis]: true, [style.border]: index !== this.listData.length - 1 }]}
            >
              <div class={style['card-left']}>
                <div class={style['card-img']} style={{ 'background-image': `url(${img})` }} />
                <div class={style.count}>{RegisteredCount}已报名</div>
              </div>
              <div class={style['card-right']}>
                <div class={[style.title, style['two-line']]}>{title}</div>
                <div class={[style.subtitle, style['two-line']]}>{subtitle}</div>

                <div class={style.payInfo}>
                  {priceRange ? (
                    <div class={style.price}>
                      <span>{priceRange}</span>
                      {unit && <span class={style['price-unit']}>/{unit}</span>}
                    </div>
                  ) : (
                    <div />
                  )}
                  {time && <div class={style.action}>{time}</div>}
                </div>
                <div class={style.tags}>
                  {tags.length
                    ? tags.map((tag: any) => {
                        return (
                          <van-tag class={style['margin-l']} type='primary'>
                            {tag.label}
                          </van-tag>
                        );
                      })
                    : null}
                </div>
                {desc && (
                  <div class={style.desc}>
                    <div class={style['two-line']}>{desc}</div>
                  </div>
                )}
                <div class={style.corporation}>{corporation}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  public clickCard(value: AntCardItem) {
    this.$emit('clickCard', value);
  }
}
