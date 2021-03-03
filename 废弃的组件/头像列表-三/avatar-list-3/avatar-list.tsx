import { Vue, Component, Prop } from 'vue-property-decorator';
import style from './avatar-list.module.less';
import AntTag from '../tag/AntTag';
interface AvatarCard {
  name: string;
  tag: string;
  img: string;
  detail: string[];
  descripiton: string[];
}
@Component({
  components: { AntTag },
})
export default class AvatarList extends Vue {
  @Prop({
    default: () => [
      {
        name: '阮新梦',
        tag: 'VIP投资人',
        img: '//s2-cdn.oneitfarm.com/Fir346p_8mbdQBZ8O5CPEd5x_E9Y',
        detail: [{ label: '浙商创投' }, { label: '投资总监' }],
        descripiton: [
          { label: '投资领域：创页服务、高科技、SaaS、物联网' },
          { label: '投资轮次：A轮、B轮、B+轮、C轮' },
        ],
      },
      {
        name: '小明',
        tag: 'VIP投资人',
        img: '//s2-cdn.oneitfarm.com/Fir346p_8mbdQBZ8O5CPEd5x_E9Y',
        detail: [{ label: '浙商创投' }, { label: '投资总监' }],
        descripiton: [
          { label: '投资领域：创页服务、高科技、SaaS、物联网' },
          { label: '投资轮次：A轮、B轮、B+轮、C轮' },
        ],
      },
      {
        name: '小红',
        tag: 'VIP投资人',
        img: '//s2-cdn.oneitfarm.com/Fir346p_8mbdQBZ8O5CPEd5x_E9Y',
        detail: [{ label: '浙商创投' }, { label: '投资总监' }],
        descripiton: [
          { label: '投资领域：创页服务、高科技、SaaS、物联网' },
          { label: '投资轮次：A轮、B轮、B+轮、C轮' },
        ],
      },
    ],
  })
  private avatarList: AvatarCard[];

  public render() {
    return (
      <div>
        {this.avatarList.map((ele, index) => {
          const { name, tag, img, detail, descripiton } = ele;
          return (
            <div
              key={index}
              onClick={() => this.clickCard(ele)}
              class={[
                style['ant-card'],
                { [style.raduis]: true, [style.border]: index !== this.avatarList.length - 1 },
              ]}
            >
              <div class={style['card-left']}>
                <div class={style['card-img']} style={{ 'background-image': `url(${img})` }} />
              </div>
              <div class={style['card-right']}>
                <div class={style.header}>
                  <div class={[style.title, style['two-line']]}>{name}</div>
                  <AntTag class={style['margin-l']} size='' themeColor={'橘黄'} text={tag} type='light' />
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
                {descripiton.map((item: any) => {
                  return <div class={style.corporation}>{item.label}</div>;
                })}
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
