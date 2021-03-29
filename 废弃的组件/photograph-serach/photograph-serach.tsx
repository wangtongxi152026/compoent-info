import { Vue, Component, Ref } from 'vue-property-decorator';
import style from './photograph-serach.module.less';
import close from './assets/close.svg';
import flashlight from './assets/flashlight.svg';
import flashlightOk from './assets/flashlight-ok.svg';
import takePhoto from './assets/take-photo.svg';
import select from './assets/select.svg';
import picture from './assets/picture.svg';
import retake from './assets/retake.svg';
import loading from './assets/loading.png';
type PictureStatus = 0 | 1 | 2;

/*  0 等待拍摄
 1 拍摄完成
 2 正在搜题*/

@Component({
  components: {},
})
export default class PhotographSerach extends Vue {
  private imageUrl: string = '//s2-cdn.oneitfarm.com/FjBKqJYNWg0i1QR1bZ4ol3YRFgbD';
  @Ref('myCanvas') private readonly $canvas: HTMLCanvasElement;
  private pictureStatus: PictureStatus = 0;
  private flashlightStatus: boolean = false;

  public mounted() {
    this.drawGrid();
  }

  public render() {
    const { imageUrl } = this;
    return (
      <div class={style.container}>
        {this.pictureStatus === 0 && (
          <div class={style.photo}>
            <canvas class={style.canvas} ref='myCanvas' width='500' height='500' />
            <img src={imageUrl} alt='img' />
            <img onClick={this.close} src={close} alt='close' />
            <div class={style['photo-tips']}>
              <span>请将文字尽可能对齐参考线，</span>
              <span onClick={this.toPhotographSkill}>拍题技巧</span>
            </div>
          </div>
        )}
        {this.pictureStatus !== 0 && this.renderReTakePhoto(this.imageUrl)}
        {this.renderAction()}
      </div>
    );
  }

  private renderReTakePhoto(imageUrl: string) {
    return (
      <div class={style['re-photo']}>
        <div>
          <img src={imageUrl} alt='img' />
        </div>
        <div class={style.hint}>一次只搜一题,更准确搜到答案</div>
      </div>
    );
  }
  private renderAction() {
    return (
      <div class={style.action}>
        <div class={style['action-button']}>
          {this.renderLeftIcon()}
          {this.renderMidIcon()}
          {this.renderRightIcon()}
        </div>
      </div>
    );
  }

  private renderRightIcon() {
    return this.pictureStatus === 0 ? (
      <img onClick={this.changeflashlightStats} src={this.flashlightIcon} alt='picture' />
    ) : (
      <img onClick={this.reTakePhoto} src={retake} alt='picture' />
    );
  }

  private renderLeftIcon() {
    return <img onClick={this.openFile} src={picture} alt='picture' />;
  }

  private renderMidIcon() {
    switch (this.pictureStatus) {
      case 0:
        return <img onClick={this.takePhoto} src={takePhoto} alt='takePhoto' />;
      case 1:
        return <img onClick={this.goSearchQuestion} src={select} alt='takePhoto' />;
      case 2:
        return <img onClick={this.turnHandle} class={style.turn} src={loading} alt='takePhoto' />;
      default:
        break;
    }
  }

  private turnHandle() {
    setTimeout(() => {
      this.pictureStatus = 0;
    }, 2000);
  }

  private reTakePhoto() {
    this.pictureStatus = 0;
    this.$emit('reTakePhoto');
  }

  private openFile() {
    this.$emit('openFile');
  }

  private takePhoto() {
    this.pictureStatus = 1;
    this.$emit('takePhoto');
  }

  private goSearchQuestion() {
    this.pictureStatus = 2;
    this.$emit('takePhoto');
  }

  private changeflashlightStats() {
    this.flashlightStatus = !this.flashlightStatus;
  }

  private get flashlightIcon() {
    return this.flashlightStatus ? flashlightOk : flashlight;
  }

  private toPhotographSkill() {
    //
  }
  private close() {
    this.$emit('close');
  }

  private drawGrid(color: string = 'rgba(255,255,255,0.60)') {
    const myCanvas = this.$canvas;
    /*获取绘图工具*/
    const ctx = myCanvas.getContext('2d');
    if (!ctx) {
      return;
    }
    ctx.lineWidth = 1;
    /*
    1. 设置网格的大小，gridSize用于确定网格之中的线之间的间隔
    2. 获取Canvas的宽度width、高度height，用于计算x轴、y轴需要绘画的条数
    3. 采用遍历的方式，绘画x轴的线条
    4. 采用遍历的方式，绘画y轴的线条
    */
    const CanvasWidth = ctx.canvas.width;
    const CanvasHeight = ctx.canvas.height;
    const girdWidthSize = CanvasWidth / 3;
    const girdHeightSize = CanvasHeight / 3;
    // 3. 采用遍历的方式，绘画x轴的线条
    const xLineTotals = Math.floor(CanvasHeight / girdWidthSize); // 计算需要绘画的x轴条数
    for (let i = 0; i < xLineTotals; i++) {
      ctx.beginPath(); // 开启路径，设置不同的样式
      ctx.moveTo(0, girdWidthSize * i); // -0.5是为了解决像素模糊问题
      ctx.lineTo(CanvasWidth, girdWidthSize * i);
      ctx.strokeStyle = color; // 设置每个线条的颜色
      ctx.stroke();
    }

    // 4.采用遍历的方式，绘画y轴的线条
    const yLineTotals = Math.floor(CanvasHeight / girdHeightSize); // 计算需要绘画y轴的条数
    for (let j = 0; j < yLineTotals; j++) {
      ctx.beginPath(); // 开启路径，设置不同的样式
      ctx.moveTo(girdHeightSize * j, 0);
      ctx.lineTo(girdHeightSize * j, CanvasHeight);
      ctx.strokeStyle = color; // 设置每个线条的颜色
      ctx.stroke();
    }
  }
}
