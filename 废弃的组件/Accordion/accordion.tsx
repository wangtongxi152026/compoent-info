import { Vue, Component, Prop } from 'vue-property-decorator';
import style from './catalogue.module.less';
import AccordtionTitle from './accordtion-title';
@Component({
  components: { AccordtionTitle },
})
export default class PayResultPage extends Vue {
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
  private readonly catalogue: any;
  private isActive: boolean = false;
  public render() {
    return (
      <div class={style.catalogue}>
        {this.catalogue.map((item: any, index: number) => {
          return (
            <AccordtionTitle
              ref={`AccordtionTitle${index}`}
              on={{ accordion: () => this.doAccordion(index) }}
              key={item.title}
              value={item}
            />
          );
        })}
      </div>
    );
  }

  public toggle() {
    this.isActive = !this.isActive;
  }

  public doAccordion(currentIdx: number) {
    this.catalogue.forEach(({}, idx: number) => {
      if (currentIdx !== idx) {
        (this.$refs[`AccordtionTitle${idx}`] as AccordtionTitle).changeActive();
      }
    });
  }
}
