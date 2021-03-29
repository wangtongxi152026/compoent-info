import { Vue, Component, Prop } from 'vue-property-decorator';
import style from './materail-details.module.less';
import navigation from '../base/navigation';
import ReadMore from '../base/read-more/read-more';
import RoundButton from '../base/round-button/round-button';
import { SelectItem } from '../../../../../interfaces/mobile-components/mobile-components';
import ButtonTabs from '../button-tabs/button-tabs';
import collect from '../test-paper-info/collect.svg';
import collected from '../test-paper-info/collected.svg';
import TitleDescription from '../subtitle/TitleDescription';
import tabs from '../tabs/tabs';
interface BookInfo {
  title: string;
  img: string;
  tags: Array<{ value: string }>;
}
import SelectButton from '../base/select-button/select-button';
@Component({
  components: {
    navigation,
    tabs,
    ReadMore,
    RoundButton,
    'select-button': SelectButton,
    'button-tabs': ButtonTabs,
    'title-desc': TitleDescription,
  },
})
export default class TeachingMaterial extends Vue {
  private get collectImg() {
    return this.isCollected ? collect : collected;
  }
  @Prop({
    default: () => [
      {
        title: '学期词汇大盘点',
        contents: [{ text: '搞定重点词汇', isLock: false }],
      },
      {
        title: '必考语法全突破',
        contents: [{ text: '搞定重点词汇', isLock: true }, { text: '搞定重点词汇', isLock: true }],
      },
    ],
  })
  public readonly catalogue: any;
  @Prop({
    default: () => ({
      img: '//s2-cdn.oneitfarm.com/Fue_2HH7-W3ZCu75DOvvmNCHrK_7',
      title: '[最新] 六年级上.英语.期末夺冠计划参考大全',
      tags: [{ value: '共3章' }, { value: '12348次阅读' }],
    }),
  })
  private readonly bookInfo: BookInfo;
  @Prop({
    default: () => [
      { label: '1.本书适用于所有即将参加期末考试的六年级学生。' },
      { label: '2.本书通过图片注解，帮助学生高效记忆六年级上的重 点单词、词组，同时配以习题，及时检测学习效果。' },
      { label: '3.本书帮助学生拎出六年级整个学期的重点句型，...' },
    ],
  })
  private readonly bookDescription: Array<{ label: string }>;
  private isCollected: boolean = false;
  public render() {
    const { bookInfo, bookDescription, checkMore } = this;
    return (
      <div class={style.container}>
        <navigation
          on={{ back: this.back }}
          value={{
            title: bookInfo.title,
            rightIcon: '//s2-cdn.oneitfarm.com/FufMbJPvTsyhCid1UHvrAVOro-0l',
          }}
        />
        <div class={style.card}>
          <div class={style['card-left']}>
            <div class={style['card-img']} style={{ 'background-image': `url(${bookInfo.img})` }} />
          </div>
          <div class={style['card-right']}>
            <div class={[style.title, style['two-line']]}>{bookInfo.title}</div>
            <div class={style.detail}>
              {bookInfo.tags.length
                ? bookInfo.tags.map((item, idx) => {
                    return (
                      <div class={style['detail-wrapper']}>
                        <div class={style['detail-item']}>
                          <span>{item.value}</span>
                        </div>
                        {idx !== bookInfo.tags.length - 1 && <span class={style.divider}>|</span>}
                      </div>
                    );
                  })
                : null}
            </div>
            <div class={style.action}>
              <div class={style['action-item']} onClick={this.changeCollectStatus}>
                <img src={this.collectImg} alt='collect-icon' />
                <span class={style.desc}>{this.isCollected ? '收藏' : '已收藏'}</span>
              </div>
              <RoundButton on={{ clickButton: this.clickButton }} text={'开始阅读'} />
            </div>
          </div>
        </div>
        <div class={style['book-description']}>
          <title-desc hasBottom name={'书籍介绍'} description='' />
          <div class={style.descriptions}>
            {bookDescription.length &&
              bookDescription.map((item, index) => {
                return (
                  <div
                    key={index}
                    class={[style.description, { [style.margin]: index + 1 !== bookDescription.length }]}
                  >
                    {item.label}
                  </div>
                );
              })}
          </div>
          <read-more on={{ checkMore }} />
        </div>
        <div class={style.catalogue}>
          <div class={style['catalogue-title']}>
            <div class={style.title}>目录</div>
            <div class={style.right}>
              <div class={style.desc}>需1张兑换券</div>
              <van-tag plain type='primary'>
                解锁全部
              </van-tag>
            </div>
          </div>
          <unm-accordion class='my-accordion' defaultActiveKey='1' onChange='onChange'>
            <unm-panel header='Title 1' name='1'>
              <unm-list class='my-list'>
                <unm-list-item>content 1</unm-list-item>
                <unm-list-item>content 2</unm-list-item>
                <unm-list-item>content 3</unm-list-item>
              </unm-list>
            </unm-panel>
            <unm-panel header='Title 2' class='pad' name='2'>
              this is panel content2 or other
            </unm-panel>
            <unm-panel header='Title 3' class='pad' name='3'>
              text text text text text text text text
            </unm-panel>
          </unm-accordion>
        </div>
      </div>
    );
  }

  private changeCollectStatus() {
    this.isCollected = !this.isCollected;
  }

  private back() {
    this.$emit('back');
  }
  private checkMore() {
    this.$emit('checkMore');
  }
  private clickButton(bookInfo: SelectItem) {
    this.$emit('clickButton', bookInfo);
  }
}
