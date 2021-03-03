import { Vue, Component, Prop } from 'vue-property-decorator';
import style from './avatar-list.module.less';
import AntTag from '../tag/AntTag';
interface AvatarCard {
  name: string;
  tag: string;
  img: string;
  detail: string[];
  descripiton: string;
  tags: Array<{ label: string }>;
}
@Component({
  components: { AntTag },
})
export default class AvatarList extends Vue {
  @Prop({
    default: () => [
      {
        name: '阮新梦',
        tag: '最近活跃',
        img: '//s2-cdn.oneitfarm.com/Fir346p_8mbdQBZ8O5CPEd5x_E9Y',
        detail: [{ label: '通信' }, { label: '通信设备' }],
        tags: [
          { label: '实名微信群' },
          { label: '通信设备' },
          { label: '软件工程' },
          { label: '团队建设' },
          { label: '产品研发' },
        ],
        descripiton:
          '要求合伙人能力，想创业可以投点资金的，经验不足没关系，只要对行业有热爱，我相信我们一定可以经营好的非…',
      },
      {
        name: '小明',
        tag: '最近活跃',
        img: '//s2-cdn.oneitfarm.com/Fir346p_8mbdQBZ8O5CPEd5x_E9Y',
        detail: [{ label: '通信' }, { label: '通信设备' }],
        tags: [
          { label: '实名微信群' },
          { label: '通信设备' },
          { label: '软件工程' },
          { label: '团队建设' },
          { label: '产品研发' },
        ],
        descripiton:
          '要求合伙人能力，想创业可以投点资金的，经验不足没关系，只要对行业有热爱，我相信我们一定可以经营好的非…',
      },
      {
        name: '小红',
        tag: '最近活跃',
        img: '//s2-cdn.oneitfarm.com/Fir346p_8mbdQBZ8O5CPEd5x_E9Y',
        detail: [{ label: '通信' }, { label: '通信设备' }],
        tags: [
          { label: '实名微信群' },
          { label: '通信设备' },
          { label: '软件工程' },
          { label: '团队建设' },
          { label: '产品研发' },
        ],
        descripiton:
          '要求合伙人能力，想创业可以投点资金的，经验不足没关系，只要对行业有热爱，我相信我们一定可以经营好的非…',
      },
    ],
  })
  private listData: AvatarCard[];

  public render() {
    return (
      <div>
        {this.listData.map((ele, index) => {
          const { name, tag, img, detail, tags, descripiton } = ele;
          return (
            <div
              key={index}
              onClick={() => this.clickCard(ele)}
              class={[style['ant-card'], { [style.raduis]: true, [style.border]: index !== this.listData.length - 1 }]}
            >
              <div class={style['card-left']}>
                <div class={style['card-img']} style={{ 'background-image': `url(${img})` }} />
              </div>
              <div class={style['card-right']}>
                <div class={style.header}>
                  <div class={[style.title, style['two-line']]}>{name}</div>
                  <AntTag class={style['margin-l']} size='' themeColor={'蓝色'} text={tag} type='light' />
                </div>
                <div class={style.detail}>
                  {detail.length
                    ? detail.map((item: any, idx: number) => {
                        return (
                          <div class={style['detail-wrapper']}>
                            <div class={style['detail-item']}>
                              <span>{item.label} </span>
                            </div>
                            {idx !== detail.length - 1 && <span class={style.divider}>|</span>}
                          </div>
                        );
                      })
                    : null}
                </div>
                <div class={[style.title, style['margin-y'], style['two-line']]}>{descripiton}</div>
                <div class={style.tags}>
                  {tags.length
                    ? tags.map((item) => {
                        return (
                          <AntTag
                            class={style['margin-l']}
                            size='large'
                            themeColor={'蓝色'}
                            text={item.label}
                            type='light'
                          />
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  public clickCard(value: AvatarCard) {
    this.$emit('clickCard', value);
  }
}
