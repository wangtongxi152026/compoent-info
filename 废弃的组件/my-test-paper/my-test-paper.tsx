import { Vue, Component, Prop } from 'vue-property-decorator';
import style from './my-test-paper.module.less';
import RowTestPaperCard from '../base/row-test-paper-card/row-test-paper-card';
import navigation from '../base/navigation';
import { RowTestPaperCardType } from '../../../../../interfaces/mobile-components/mobile-components';
import tabs from '../tabs/tabs';
import Empty from './empty.png';
@Component({
  components: {
    'row-test-paper-card': RowTestPaperCard,
    navigation,
    tabs,
  },
})
export default class PopoverBar extends Vue {
  @Prop({
    default: () => [
      {
        id: '0',
        tagText: '数',
        year: '2020学年·高一上学期',
        times: 26576,
        title: '【掌门】2020-2021学年江苏省高一上数学期末考前 押题密卷',
      },
      {
        id: '1',
        tagText: '语',
        year: '2020学年·高一上学期',
        times: 26576,
        title: '【掌门】2020-2021学年江苏省高一上数学期末考前 押题密卷',
      },
      {
        id: '2',
        tagText: '英',
        year: '2020学年·高一上学期',
        times: 26576,
        title: '【掌门】2020-2021学年江苏省高一上数学期末考前 押题密卷',
      },
      {
        id: '3',
        tagText: '数',
        year: '2020学年·高一上学期',
        times: 26576,
        title: '【掌门】2020-2021学年江苏省高一上数学期末考前 押题密卷',
      },
      {
        id: '4',
        tagText: '数',
        year: '2020学年·高一上学期',
        times: 26576,
        title: '【掌门】2020-2021学年江苏省高一上数学期末考前 押题密卷',
      },
      {
        id: '5',
        tagText: '数',
        year: '2020学年·高一上学期',
        times: 26576,
        title: '【掌门】2020-2021学年江苏省高一上数学期末考前 押题密卷',
      },
    ],
  })
  private readonly convertedData: RowTestPaperCardType[];
  @Prop({
    default: () => [
      {
        id: '0',
        tagText: '数',
        year: '2020学年·高一上学期',
        times: 26576,
        title: '【掌门】2020-2021学年江苏省高一上数学期末考前 押题密卷',
      },
      {
        id: '1',
        tagText: '语',
        year: '2020学年·高一上学期',
        times: 26576,
        title: '【掌门】2020-2021学年江苏省高一上数学期末考前 押题密卷',
      },
      {
        id: '2',
        tagText: '英',
        year: '2020学年·高一上学期',
        times: 26576,
        title: '【掌门】2020-2021学年江苏省高一上数学期末考前 押题密卷',
      },
      {
        id: '3',
        tagText: '数',
        year: '2020学年·高一上学期',
        times: 26576,
        title: '【掌门】2020-2021学年江苏省高一上数学期末考前 押题密卷',
      },
    ],
  })
  private readonly collectedData: RowTestPaperCardType[];
  private tabs = [{ label: '已收藏', value: 0 }, { label: '已兑换', value: 1 }];
  private tab: number = 0;

  public render() {
    return (
      <div class={style.container}>
        <navigation
          on={{ back: this.back }}
          value={{
            title: '我的试卷',
          }}
        />
        <tabs v-model={this.tab} tabs={this.tabs} activeColor={'#2D8CF0'} />
        {this.renderCard(this.cardData)}
      </div>
    );
  }

  public get cardData() {
    return this.tab === 0 ? this.collectedData : this.convertedData;
  }

  public back() {
    //
  }

  public renderCard(data: RowTestPaperCardType[]) {
    return data.length === 0
      ? this.renderEmpty()
      : data.map((item, idx) => {
          return <row-test-paper-card on={{ clickRowTestCard: this.clickRowTestCard }} key={item.id} value={item} />;
        });
  }

  public renderEmpty() {
    return (
      <div class={style.empty}>
        <img src={Empty} alt='empty' />
        <div class={style['help-text']}>暂无相关资料</div>
      </div>
    );
  }

  public clickRowTestCard(value: RowTestPaperCard) {
    this.$emit('clickRowTestCard', value);
  }
}
