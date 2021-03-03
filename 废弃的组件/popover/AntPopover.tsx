import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import style from './popover.module.less';
@Component({})
export default class Popover extends Vue {
  public get renderActions() {
    return this.actions.map((item: any) => {
      if (this.hasIcon) {
        return {
          text: item.text,
          icon: this.theme === 'dark' ? item.darkIcon : item.lightIcon,
          disbled: item.disbled,
        };
      } else {
        return {
          text: item.text,
          disbled: item.disbled,
        };
      }
    });
  }
  @Prop({
    default: () => [
      {
        text: '添加子钱包',
        lightIcon: '//s2-cdn.oneitfarm.com/FqtQM6GD65QcG-p1K4HBhrAujK5t',
        darkIcon: '//s2-cdn.oneitfarm.com/Fmi9g_dqJuOsy0VqHCrZ2d1NeSw-',
        disbled: true,
      },
      {
        text: '添加资产',
        lightIcon: '//s2-cdn.oneitfarm.com/FkrZRUTN49iD1GOrlAIj68K-VDos',
        darkIcon: '//s2-cdn.oneitfarm.com/FtpMWUfCKHzfAmbrajoZAZfdBbwr',
        disbled: true,
      },
      {
        text: '导入资产',
        lightIcon: '//s2-cdn.oneitfarm.com/FhV22188-1Bo-NxyvYRBE2aAl3c_',
        darkIcon: '//s2-cdn.oneitfarm.com/Fk4qh69het-F_A2GupZGgzhKuDDD',
        disbled: true,
      },
      {
        text: '收付款',
        lightIcon: '//s2-cdn.oneitfarm.com/Fhvql-4WKIfJlalXQeLSZ0QhZCJw',
        darkIcon: '//s2-cdn.oneitfarm.com/FvOVqQF_YHVEjJtipeVi377sF5zL',
        disbled: true,
      },
      {
        text: '钱包设置',
        lightIcon: '//s2-cdn.oneitfarm.com/Fign8TSDbyH80CBKsvFa81QEam5w',
        darkIcon: '//s2-cdn.oneitfarm.com/FjzIISpVKHqcdtwr3L1OXsTleAWR',
        disbled: true,
      },
    ],
  })
  private readonly actions: any;
  @Prop({ default: false }) private readonly showPopover: boolean;
  @Prop({ default: 'bottom' }) private readonly placement:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end';
  @Prop({ default: false }) private readonly overlay: boolean;
  @Prop({ default: 'dark' }) private readonly theme: 'dark' | 'light';
  @Prop({ default: true }) private readonly hasIcon: boolean;
  private showoverlay: boolean = true;
  private show: boolean = true;
  @Watch('showPopover')
  public watchshowPopover(val: boolean) {
    this.show = val;
  }

  @Watch('overlay')
  public watchoverlay(val: boolean) {
    this.showoverlay = val;
  }

  public data() {
    return {
      show: this.showPopover,
      showoverlay: this.overlay,
    };
  }

  public mounted() {
    this.changeBorder();
  }

  public updated() {
    this.changeBorder();
  }

  public changeBorder() {
    const $popovers = document.querySelectorAll('.van-popover__action');
    if ($popovers) {
      $popovers.forEach((item: any) => {
        item.style.cssText += 'width: 100% ;padding:0;margin: 0 12px';
        const $icon: HTMLImageElement = item.querySelector('img');
        $icon.style.cssText = 'vertical-align:inherit;width:22px;height:22px;';
      });
    }
  }

  public render() {
    const { theme, renderActions, showoverlay, reference, placement } = this;
    return (
      <van-popover
        class={style.container}
        scopedSlots={{ reference }}
        value={this.show}
        theme={theme}
        overlay={showoverlay}
        placement={placement}
        trigger='click'
        actions={renderActions}
      >
        {/* <template /> */}
      </van-popover>
    );
  }

  public reference() {
    return <button onclick={() => this.trigger()}>开启气泡</button>;
  }
  public trigger() {
    this.show = !this.show;
  }
}
