import fs from 'fs';
import path from 'path';
import LeeAnalyzer from './dellAnalyzer';
import {
  compInfoResult, Minthods,
  Events,
  Slots
} from './types/types'
const html = `<section><h1>Grid 宫格</h1>
<div class="card"><h3 id="jie-shao">介绍</h3>
<p>宫格可以在水平方向上把页面分隔成等宽度的区块，用于展示内容或进行页面导航。</p>
</div><div class="card"><h3 id="yin-ru">引入</h3>
<pre><code class="language-js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> { Grid, GridItem } <span class="hljs-keyword">from</span> <span class="hljs-string">'vant'</span>;

Vue.use(Grid);
Vue.use(GridItem);
</code></pre>
</div><h2 id="dai-ma-yan-shi">代码演示</h2>
<div class="card"><h3 id="ji-chu-yong-fa">基础用法</h3>
<p>通过 <code>icon</code> 属性设置格子内的图标，<code>text</code> 属性设置文字内容。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-grid</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-grid-item</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"photo-o"</span> <span class="hljs-attr">text</span>=<span class="hljs-string">"文字"</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-grid-item</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"photo-o"</span> <span class="hljs-attr">text</span>=<span class="hljs-string">"文字"</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-grid-item</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"photo-o"</span> <span class="hljs-attr">text</span>=<span class="hljs-string">"文字"</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-grid-item</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"photo-o"</span> <span class="hljs-attr">text</span>=<span class="hljs-string">"文字"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">van-grid</span>&gt;</span>
</code></pre>
</div><div class="card"><h3 id="zi-ding-yi-lie-shu">自定义列数</h3>
<p>默认一行展示四个格子，可以通过 <code>column-num</code> 自定义列数。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-grid</span> <span class="hljs-attr">:column-num</span>=<span class="hljs-string">"3"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-grid-item</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"value in 6"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"value"</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"photo-o"</span> <span class="hljs-attr">text</span>=<span class="hljs-string">"文字"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">van-grid</span>&gt;</span>
</code></pre>
</div><div class="card"><h3 id="zi-ding-yi-nei-rong">自定义内容</h3>
<p>通过插槽可以自定义格子展示的内容。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-grid</span> <span class="hljs-attr">:border</span>=<span class="hljs-string">"false"</span> <span class="hljs-attr">:column-num</span>=<span class="hljs-string">"3"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-grid-item</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">van-image</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://img01.yzcdn.cn/vant/apple-1.jpg"</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">van-grid-item</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-grid-item</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">van-image</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://img01.yzcdn.cn/vant/apple-2.jpg"</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">van-grid-item</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-grid-item</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">van-image</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://img01.yzcdn.cn/vant/apple-3.jpg"</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">van-grid-item</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">van-grid</span>&gt;</span>
</code></pre>
</div><div class="card"><h3 id="zheng-fang-xing-ge-zi">正方形格子</h3>
<p>设置 <code>square</code> 属性后，格子的高度会和宽度保持一致。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-grid</span> <span class="hljs-attr">square</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-grid-item</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"value in 8"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"value"</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"photo-o"</span> <span class="hljs-attr">text</span>=<span class="hljs-string">"文字"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">van-grid</span>&gt;</span>
</code></pre>
</div><div class="card"><h3 id="ge-zi-jian-ju">格子间距</h3>
<p>通过 <code>gutter</code> 属性设置格子之间的距离。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-grid</span> <span class="hljs-attr">:gutter</span>=<span class="hljs-string">"10"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-grid-item</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"value in 8"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"value"</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"photo-o"</span> <span class="hljs-attr">text</span>=<span class="hljs-string">"文字"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">van-grid</span>&gt;</span>
</code></pre>
</div><div class="card"><h3 id="nei-rong-heng-pai">内容横排</h3>
<p>将 <code>direction</code> 属性设置为 <code>horizontal</code>，可以让宫格的内容呈横向排列。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-grid</span> <span class="hljs-attr">direction</span>=<span class="hljs-string">"horizontal"</span> <span class="hljs-attr">:column-num</span>=<span class="hljs-string">"2"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-grid-item</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"photo-o"</span> <span class="hljs-attr">text</span>=<span class="hljs-string">"文字"</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-grid-item</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"photo-o"</span> <span class="hljs-attr">text</span>=<span class="hljs-string">"文字"</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-grid-item</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"photo-o"</span> <span class="hljs-attr">text</span>=<span class="hljs-string">"文字"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">van-grid</span>&gt;</span>
</code></pre>
</div><div class="card"><h3 id="ye-mian-dao-hang">页面导航</h3>
<p>通过 <code>to</code> 属性设置 <code>vue-router</code> 跳转链接，通过 <code>url</code> 属性设置 URL 跳转链接。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-grid</span> <span class="hljs-attr">clickable</span> <span class="hljs-attr">:column-num</span>=<span class="hljs-string">"2"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-grid-item</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"home-o"</span> <span class="hljs-attr">text</span>=<span class="hljs-string">"路由跳转"</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/"</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-grid-item</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"search"</span> <span class="hljs-attr">text</span>=<span class="hljs-string">"URL 跳转"</span> <span class="hljs-attr">url</span>=<span class="hljs-string">"/vant/mobile.html"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">van-grid</span>&gt;</span>
</code></pre>
</div><div class="card"><h3 id="hui-biao-ti-shi">徽标提示</h3>
<p>设置 <code>dot</code> 属性后，会在图标右上角展示一个小红点。设置 <code>badge</code> 属性后，会在图标右上角展示相应的徽标。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-grid</span> <span class="hljs-attr">:column-num</span>=<span class="hljs-string">"2"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-grid-item</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"home-o"</span> <span class="hljs-attr">text</span>=<span class="hljs-string">"文字"</span> <span class="hljs-attr">dot</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-grid-item</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"search"</span> <span class="hljs-attr">text</span>=<span class="hljs-string">"文字"</span> <span class="hljs-attr">badge</span>=<span class="hljs-string">"99+"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">van-grid</span>&gt;</span>
</code></pre>
</div><h2 id="api">API</h2>
<div class="card"><h3 id="grid-props">Grid Props</h3>
<table>
<thead>
<tr>
<th>参数</th>
<th>说明</th>
<th>类型</th>
<th>默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td>column-num</td>
<td>列数</td>
<td><em>number | string</em></td>
<td><code>4</code></td>
</tr>
<tr>
<td>icon-size</td>
<td>图标大小，默认单位为<code>px</code></td>
<td><em>number | string</em></td>
<td><code>28px</code></td>
</tr>
<tr>
<td>gutter</td>
<td>格子之间的间距，默认单位为<code>px</code></td>
<td><em>number | string</em></td>
<td><code>0</code></td>
</tr>
<tr>
<td>border</td>
<td>是否显示边框</td>
<td><em>boolean</em></td>
<td><code>true</code></td>
</tr>
<tr>
<td>center</td>
<td>是否将格子内容居中显示</td>
<td><em>boolean</em></td>
<td><code>true</code></td>
</tr>
<tr>
<td>square</td>
<td>是否将格子固定为正方形</td>
<td><em>boolean</em></td>
<td><code>false</code></td>
</tr>
<tr>
<td>clickable</td>
<td>是否开启格子点击反馈</td>
<td><em>boolean</em></td>
<td><code>false</code></td>
</tr>
<tr>
<td>direction <code>v2.8.2</code></td>
<td>格子内容排列的方向，可选值为 <code>horizontal</code></td>
<td><em>string</em></td>
<td><code>vertical</code></td>
</tr>
</tbody>
</table>
</div><div class="card"><h3 id="griditem-props">GridItem Props</h3>
<table>
<thead>
<tr>
<th>参数</th>
<th>说明</th>
<th>类型</th>
<th>默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td>text</td>
<td>文字</td>
<td><em>string</em></td>
<td>-</td>
</tr>
<tr>
<td>icon</td>
<td><a href="#/zh-CN/icon" target="_blank">图标名称</a>或图片链接</td>
<td><em>string</em></td>
<td>-</td>
</tr>
<tr>
<td>icon-prefix <code>v2.5.3</code></td>
<td>图标类名前缀，同 Icon 组件的 <a href="#/zh-CN/icon#props" target="_blank">class-prefix 属性</a></td>
<td><em>string</em></td>
<td><code>van-icon</code></td>
</tr>
<tr>
<td>dot</td>
<td>是否显示图标右上角小红点</td>
<td><em>boolean</em></td>
<td><code>false</code></td>
</tr>
<tr>
<td>badge <code>v2.5.6</code></td>
<td>图标右上角徽标的内容</td>
<td><em>number | string</em></td>
<td>-</td>
</tr>
<tr>
<td>info <code>2.2.1</code></td>
<td>图标右上角徽标的内容（已废弃，请使用 badge 属性）</td>
<td><em>number | string</em></td>
<td>-</td>
</tr>
<tr>
<td>url</td>
<td>点击后跳转的链接地址</td>
<td><em>string</em></td>
<td>-</td>
</tr>
<tr>
<td>to</td>
<td>点击后跳转的目标路由对象，同 vue-router 的 <a href="https://router.vuejs.org/zh/api/#to" target="_blank">to 属性</a></td>
<td><em>string | object</em></td>
<td>-</td>
</tr>
<tr>
<td>replace</td>
<td>是否在跳转时替换当前页面历史</td>
<td><em>boolean</em></td>
<td><code>false</code></td>
</tr>
</tbody>
</table>
</div><div class="card"><h3 id="griditem-events">GridItem Events</h3>
<table>
<thead>
<tr>
<th>事件名</th>
<th>说明</th>
<th>回调参数</th>
</tr>
</thead>
<tbody>
<tr>
<td>click</td>
<td>点击格子时触发</td>
<td><em>event: Event</em></td>
</tr>
</tbody>
</table>
</div><div class="card"><h3 id="griditem-slots">GridItem Slots</h3>
<table>
<thead>
<tr>
<th>名称</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>default</td>
<td>自定义宫格的所有内容</td>
</tr>
<tr>
<td>icon</td>
<td>自定义图标</td>
</tr>
<tr>
<td>text</td>
<td>自定义文字</td>
</tr>
</tbody>
</table>
</div><div class="card"><h3 id="yang-shi-bian-liang">样式变量</h3>
<p>组件提供了下列 Less 变量，可用于自定义样式，使用方法请参考<a href="#/zh-CN/theme" target="_blank">主题定制</a>。</p>
<table>
<thead>
<tr>
<th>名称</th>
<th>默认值</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>@grid-item-content-padding</td>
<td><code>@padding-md @padding-xs</code></td>
<td>-</td>
</tr>
<tr>
<td>@grid-item-content-background-color</td>
<td><code>@white</code></td>
<td>-</td>
</tr>
<tr>
<td>@grid-item-content-active-color</td>
<td><code>@active-color</code></td>
<td>-</td>
</tr>
<tr>
<td>@grid-item-icon-size</td>
<td><code>28px</code></td>
<td>-</td>
</tr>
<tr>
<td>@grid-item-text-color</td>
<td><code>@gray-7</code></td>
<td>-</td>
</tr>
<tr>
<td>@grid-item-text-font-size</td>
<td><code>@font-size-sm</code></td>
<td>-</td>
</tr>
</tbody>
</table>
</div></section>`;

const attrObj = (item: Minthods) => {
  const { key, label, type } = item;
  let schema = {}
  if (item.enumList) {
    schema = {
      type: 'enum',
      enumList: item.enumList
    }
  } else {
    schema = {
      type,
    }
  }
  return {
    key,
    label,
    category: "attr",
    schema: schema,
    default: "",
    isExoprt: true
  }
}
const eventObj = (item: Events) => {
  const { eventKey, label, } = item;
  return {
    "key": eventKey,
    "label": label,
    "category": "event",
    "task": {
      "label": `绑定事件${eventKey}`,
      "process": {
        "type": "bind_method",
        "defaultMethods": [],
        "custom_access": true
      }
    },
    "isExoprt": true
  }
}

const slot = (item: Slots) => {
  const { slot, label, } = item;
  return {
    "key": slot,
    "label": label,
    "category": "slot",
    "isExoprt": true
  }
}

class Crowller {
  private analyzer: LeeAnalyzer = new LeeAnalyzer();
  private pathName: string = '';
  constructor() {
    this.initSpiderProcess();
  }

  async initSpiderProcess() {
    this.analyzer = new LeeAnalyzer()
    const { content, pathName } = this.analyzer.analyze(html);
    this.pathName = pathName;
    this.genMinMethods(content)
    this.writeFile(JSON.stringify(content));
  }

  private genMinMethods(content: any) {
    let arr: any = []
    const { minthods, envets, slots }: compInfoResult = content[this.pathName];
    minthods.forEach((item: Minthods) => {
      arr.push(attrObj(item))
    })
    envets.forEach((item: Events) => {
      arr.push(eventObj(item))
    })
    slots.forEach((item: Slots) => {
      arr.push(slot(item))
    })
    fs.writeFileSync(this.minMethodsFilePath(), JSON.stringify(arr));
  }

  private writeFile(content: string) {
    fs.writeFileSync(this.configFilePath(), content);
  }


  private minMethodsFilePath() {
    const pathx = `../data/min-methods/${this.pathName}.json`
    return path.resolve(__dirname, pathx);
  }

  private configFilePath() {
    const pathx = `../data/${this.pathName}.json`
    return path.resolve(__dirname, pathx);
  }

}


new Crowller();
