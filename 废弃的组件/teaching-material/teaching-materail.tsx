import { Vue, Component, Prop } from 'vue-property-decorator';
import style from './teaching-material.module.less';
import navigation from '../base/navigation';
import RowTestPaperCard from '../base/row-test-paper-card/row-test-paper-card';
import { SelectItem } from '../../../../../interfaces/mobile-components/mobile-components';
import ButtonTabs from '../button-tabs/button-tabs';
import tabs from '../tabs/tabs';
import SelectButton from '../base/select-button/select-button';
@Component({
  components: {
    navigation,
    'select-button': SelectButton,
    'button-tabs': ButtonTabs,
    tabs,
  },
})
export default class TeachingMaterial extends Vue {
  @Prop({ default: () => [{ label: '小学', value: 0 }, { label: '初中', value: 1 }, { label: '高中', value: 2 }] })
  private readonly tabs: SelectItem;
  @Prop({
    default: () => [
      { label: '期末冲刺', value: 0 },
      { label: '同步精讲', value: 1 },
      { label: '易错点睛', value: 3 },
      { label: '抢分秘籍', value: 4 },
    ],
  })
  private readonly buttonTabData: SelectItem;
  @Prop({
    default: () => [
      {
        id: '0',
        cover: '//s2-cdn.oneitfarm.com/Fue_2HH7-W3ZCu75DOvvmNCHrK_7',
        title: '[最新] 六年级上.英语.期末夺冠计划参考大全',
        subtitle: '看这里，阅读最后一练、学期重点词汇句型，百 分百助力期末!',
      },
      {
        id: '1',
        cover: '//s2-cdn.oneitfarm.com/Fue_2HH7-W3ZCu75DOvvmNCHrK_7',
        title: '[最新] 六年级上.英语.期末夺冠计划参考大全',
        subtitle: '看这里，阅读最后一练、学期重点词汇句型，百 分百助力期末!',
      },
      {
        id: '2',
        title: '[最新] 六年级上.英语.期末夺冠计划参考大全',
        cover: '//s2-cdn.oneitfarm.com/Fue_2HH7-W3ZCu75DOvvmNCHrK_7',
        subtitle: '看这里，阅读最后一练、学期重点词汇句型，百 分百助力期末!',
      },
      {
        id: '3',
        title: '[最新] 六年级上.英语.期末夺冠计划参考大全',
        cover: '//s2-cdn.oneitfarm.com/Fue_2HH7-W3ZCu75DOvvmNCHrK_7',
        subtitle: '看这里，阅读最后一练、学期重点词汇句型，百 分百助力期末!',
      },
      {
        id: '4',
        title: '[最新] 六年级上.英语.期末夺冠计划参考大全',
        cover: '//s2-cdn.oneitfarm.com/Fue_2HH7-W3ZCu75DOvvmNCHrK_7',
        subtitle: '看这里，阅读最后一练、学期重点词汇句型，百 分百助力期末!',
      },
      {
        id: '5',
        title: '[最新] 六年级上.英语.期末夺冠计划参考大全',
        cover: '//s2-cdn.oneitfarm.com/Fue_2HH7-W3ZCu75DOvvmNCHrK_7',
        subtitle: '看这里，阅读最后一练、学期重点词汇句型，百 分百助力期末!',
      },
      {
        id: '6',
        title: '[最新] 六年级上.英语.期末夺冠计划参考大全',
        cover: '//s2-cdn.oneitfarm.com/Fue_2HH7-W3ZCu75DOvvmNCHrK_7',
        subtitle: '看这里，阅读最后一练、学期重点词汇句型，百 分百助力期末!',
      },
    ],
  })
  private readonly rowTestPaperCard: RowTestPaperCard[];
  private tab: number = 0;

  public render() {
    return (
      <div class={style.container}>
        <navigation on={{ back: this.back }} value={{ title: '教辅资料' }} />
        <tabs class={style.margin} v-model={this.tab} tabs={this.tabs} activeColor={'#2D8CF0'} />
        <button-tabs on={{ clickButtonTab: this.clickButtonTab }} value={this.buttonTabData} class={style.white} />
        {this.renderColumnTestCard(this.rowTestPaperCard)}
        <van-divider>
          <span class={style['divider-text']}>没有更多了</span>
        </van-divider>
      </div>
    );
  }

  private renderColumnTestCard(data: any[]) {
    return (
      <div class={style['card-wrapper']}>
        {data.map((item: any, index) => {
          return (
            <div onClick={this.clickCardHandle.bind(this, item)} class={[style.card, { [style.padding]: index === 0 }]}>
              <div style={{ 'background-image': `url(${item.cover})` }} class={style['material-cover']} />
              <div>
                <div class={style.title}>{item.title}</div>
                <div class={style.subtitle}>{item.subtitle}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  private back() {
    this.$emit('back');
  }
  private clickCardHandle(item: any) {
    this.$emit('clickCardHandle', item);
  }

  private clickButtonTab(item: SelectItem) {
    this.$emit('clickButtonTab', item);
  }
}
