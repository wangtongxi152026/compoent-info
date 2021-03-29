import { Vue, Component, Prop } from 'vue-property-decorator';
import style from './deatail-header-info.module.less';
@Component({
  components: {},
})
export default class TitleDesc extends Vue {
  @Prop({
    default: () => ({
      id: '0',
      img: '//s2-cdn.oneitfarm.com/Fs0ReLaUVM7YWg9gw5WPQlJnuM62',
      newPrice: '12',
      oldPrice: '26',
      leftText: '左侧文本',
      rightText: '右侧文本',
      title: '写给孩子中国文化给孩子的汉字世界益智书籍写给孩子中国文化给孩子的汉字世界益智书',
      subtitle: '写给孩子中国文化给孩子的汉字世界益智书籍写给孩子写给孩子中国文化给孩子的汉字世界益智书籍写给孩子',
    }),
  })
  private readonly cardData: any;

  public render() {
    const { newPrice, title, subtitle, oldPrice, img, leftText, rightText } = this.cardData;
    return (
      <div class={style.container}>
        <div class={style.advertisement}>
          <div class={style['card-img']} style={{ 'background-image': `url(${img})` }} />
          {(leftText || rightText) && (
            <div class={style.times}>
              <div>{leftText}</div>
              <div>{rightText}</div>
            </div>
          )}
        </div>
        <div class={style['card-right']}>
          {newPrice && (
            <div class={style.price}>
              <span class={style['new-price']}>{newPrice}</span>
              <span class={style['old-price']}>{oldPrice}</span>
            </div>
          )}
          <div class={style.title}>{title}</div>
          <div class={style.subtitle}>{subtitle}</div>
        </div>
      </div>
    );
  }
}
