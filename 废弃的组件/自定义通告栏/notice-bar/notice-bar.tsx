import { Vue, Component, Prop } from 'vue-property-decorator';
import style from './notice-bar.module.less';
interface ThemeItem {
  color: string;
  background: string;
  label: string;
}
@Component({})
export default class PopoverBar extends Vue {
  @Prop({ default: '技术是开发它的人的共同灵魂。' }) private readonly text: string;
  @Prop({ default: false }) private readonly scrollable: string;
  @Prop({ default: '' }) private readonly option: string;
  @Prop({ default: '' }) private readonly rightIcon: string;
  @Prop({ default: '' }) private readonly iconType: string;
  @Prop({ default: '' }) private readonly icon: string;
  private themeOptions: ThemeItem[] = [
    { color: '#f60', background: '#fff7cc', label: '普通' },
    { color: '#1989fa', background: '#ecf9ff', label: '消息' },
    { color: '#00b578', background: '#d4fff1', label: '嫩绿' },
    { color: '#ff6565', background: '#ffeeee', label: '粉色' },
    { color: '#00b7f4', background: '#e0f7ff', label: '天蓝' },
  ];

  public render() {
    const { text, scrollable } = this;
    return (
      <van-notice-bar
        class={style.container}
        left-icon={this.leftIcon}
        color={this.theme.color || '#f60'}
        background={this.theme.background || '#fff7cc'}
        mode={this.rightIcon}
        scrollable={scrollable}
        text={text}
      />
    );
  }

  public get theme(): ThemeItem {
    return this.themeOptions.filter((item) => item.label === this.option)[0];
  }

  private get leftIcon() {
    if (this.iconType === 'default') {
      return 'volume-o';
    } else if (this.iconType === 'null') {
      return '';
    } else if (this.iconType === 'customer') {
      return this.icon;
    }
  }
}
