import { Vue, Component } from 'vue-property-decorator';
import style from './photograph-skill.module.less';
import navigation from '../base/navigation';
import TitleDescription from '../subtitle/TitleDescription';
@Component({
  components: {
    navigation,
    'title-desc': TitleDescription,
  },
})
export default class Popover extends Vue {
  public skill: any[] = [
    {
      title: '1、题目要清晰',
      imgs: [
        '//s2-cdn.oneitfarm.com/FjXYj2539fRt0uesFpSrQhXH08QO',
        '//s2-cdn.oneitfarm.com/Fi8bihKydguX0_cvdOwnyfG9amOs',
      ],
    },
    {
      title: '2、仅支持印刷题',
      imgs: [
        '//s2-cdn.oneitfarm.com/Fh1gKZ963P-t23qyTTT_k1tyQJhf',
        '//s2-cdn.oneitfarm.com/FvYyrRc22M4MlPqOum8zboz5nuKH',
      ],
    },
    {
      title: '3、只选一道题',
      imgs: [
        '//s2-cdn.oneitfarm.com/FnaD0hKevUcjMoGouXY8Srh22K9t',
        '//s2-cdn.oneitfarm.com/FqE7t7Iz8WOyVUYMv_e3JU0i9x7H',
      ],
    },
  ];
  public render() {
    const { skill } = this;
    return (
      <div class={style.container}>
        <navigation value={{ title: '搜题结果' }} />
        {skill.map((item) => {
          return (
            <div class={style.card}>
              <title-desc name={item.title} isSmall description='' />
              <div class={style.imgs}>
                {item.imgs.map((ele: string) => {
                  return <img class={style.img} src={ele} alt='img' />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
