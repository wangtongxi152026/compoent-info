import { Vue, Component, Prop } from 'vue-property-decorator';
import style from './search-question-result.module.less';
import navigation from '../base/navigation';
import TitleDescription from '../subtitle/TitleDescription';
import Empty from './empty.png';
import check from './check.svg';
const question = '//s2-cdn.oneitfarm.com/Fuh0hr1ky-ztzC7V4cxLX1zBNe_0';
export interface QuestionData {
  title: string;
  desciption: Array<{ text: string }>;
}
@Component({
  components: {
    navigation,
    'title-desc': TitleDescription,
  },
})
export default class SearchQuestionResult extends Vue {
  public number = [1, 2, 3];
  public currentIdx = 0;
  @Prop({
    default: () => [
      {
        title: '解析',
        desciption: [
          {
            text:
              '(1)利用ABC-A₁B₁C₁为直三棱柱,证明CC₁⊥AC, 利用AB²= AC²+BC², 说明AC⊥CB, 证明 AC⊥平面C₁CB₁B, 推出AC⊥BC₁.',
          },
          { text: '(2)设CB₁∩BC₁=E,说明E为C₁B的中点,说 明AC₁//DE,然后证明AC₁//CDB₁.' },
        ],
      },
      {
        title: '解答',
        desciption: [
          { text: '(1)利用ABC-A₁B₁C₁为直三棱柱,证明CC₁⊥AC,利用AB²=AC²+BC²,说明AC⊥CB,证明 AC⊥平面C₁CB₁B,推出AC⊥BC₁.' },
          { text: '(2)设CB₁∩BC₁=E,说明E为C₁B的中点,说 明AC₁//DE,然后证明AC₁//CDB₁.' },
        ],
      },
      {
        title: '知识点',
        desciption: [
          { text: '(1)利用ABC-A₁B₁C₁为直三棱柱,证明CC₁⊥AC,利用AB²=AC²+BC²,说明AC⊥CB,证明 AC⊥平面C₁CB₁B,推出AC⊥BC₁.' },
          { text: '(2)设CB₁∩BC₁=E,说明E为C₁B的中点,说 明AC₁//DE,然后证明AC₁//CDB₁.' },
        ],
      },
    ],
  })
  private answers: QuestionData[];
  public render() {
    return (
      <div class={style.container}>
        <navigation value={{ title: '搜题结果' }} />
        {false ? this.renderEmpty() : this.renderResult()}
        <div class={style.action}>
          <div class={style.left}>
            <img src={check} alt='check-icon' />
            <div class={style.desc}>查看原题</div>
          </div>
          <div class={style.button} onclick={this.rePhotography}>
            再拍一题
          </div>
        </div>
      </div>
    );
  }

  // 待评价
  public renderEmpty() {
    return (
      <div class={style.empty}>
        <img src={Empty} alt='empty' />
        <div class={style['no-result']}>没有搜到相关题目</div>
        <div class={style['help-text']}>赶紧求助老师吧</div>
        <div onClick={this.help} class={style['round-button']}>
          求助老师在线解答
        </div>
      </div>
    );
  }
  public currentQuestion(idx: number) {
    return { [style.active]: this.currentIdx === idx };
  }
  // 待评价
  public renderResult() {
    return (
      <div class={style.content}>
        <img src={question} alt='empty' />
        <div>
          <title-desc name='找到以下题目' description='' />
          <div>
            <div class={style['question-button']}>
              {this.number.map((item, idx) => {
                return (
                  <div
                    onClick={this.selectQuestion.bind(this, idx)}
                    class={[style['round-button'], this.currentQuestion(idx)]}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
            <div class={style['for-help']}>
              <div class={style.left}>
                <div class={style.title}>不是你想找的题？</div>
                <div class={style.desc}>老师提供免费的答题服务</div>
              </div>
              <div class={style.button}>在线解答</div>
            </div>
          </div>
        </div>
        <div class={style['question-wrapper']}>
          <title-desc name='题目' description='' isSmall />
          <div class={style['question-box']}>
            <img src={require('./title.png')} alt='question-img' />
            如图,在直三棱柱ABC-A₁B₁C₁中 AC=3, BC=4, AB=5, AA₁=4, 点D是AB的中点,
            <div>(1)求证:AC⊥BC₁；</div>
            <div class={style.margin}>(2)求证:AC₁//CDB₁.</div>
          </div>

          {this.answers.map((item) => {
            return (
              <div class={style['question-detail']}>
                <div class={style['question-title']}>{item.title}</div>
                {item.desciption.map((text, idx) => {
                  return <div class={[style.text, { [style.margin]: item.desciption.length - 1 === idx }]}>{text}</div>;
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  public selectQuestion(idx: number) {
    this.currentIdx = idx;
    this.$emit('selectQuestion', idx);
  }

  public rePhotography() {
    this.$emit('rePhotography');
  }

  public help() {
    this.$emit('help');
  }
}
