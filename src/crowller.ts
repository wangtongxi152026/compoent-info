import fs from 'fs';
import path from 'path';
import LeeAnalyzer from './dellAnalyzer';
import {
  CompInfoResult, Minthods,
  Events,
  Slots
} from './types/types'
const html = `<section><h1>Icon 图标</h1>
<div class="card"><h3 id="jie-shao">介绍</h3>
<p>基于字体的图标集，可以通过 Icon 组件使用，也可以在其他组件中通过 <code>icon</code> 属性引用。</p>
</div><div class="card"><h3 id="yin-ru">引入</h3>
<pre><code class="language-js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> { Icon } <span class="hljs-keyword">from</span> <span class="hljs-string">'vant'</span>;

Vue.use(Icon);
</code></pre>
</div><h2 id="dai-ma-yan-shi">代码演示</h2>
<div class="card"><h3 id="ji-chu-yong-fa">基础用法</h3>
<p><code>Icon</code> 的 <code>name</code> 属性支持传入图标名称或图片链接，所有可用的图标名称见右侧示例。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"chat-o"</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">van-icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"https://b.yzcdn.cn/vant/icon-demo-1126.png"</span> /&gt;</span>
</code></pre>
</div><div class="card"><h3 id="hui-biao-ti-shi">徽标提示</h3>
<p>设置 <code>dot</code> 属性后，会在图标右上角展示一个小红点；设置 <code>badge</code> 属性后，会在图标右上角展示相应的徽标。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"chat-o"</span> <span class="hljs-attr">dot</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">van-icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"chat-o"</span> <span class="hljs-attr">badge</span>=<span class="hljs-string">"9"</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">van-icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"chat-o"</span> <span class="hljs-attr">badge</span>=<span class="hljs-string">"99+"</span> /&gt;</span>
</code></pre>
</div><div class="card"><h3 id="tu-biao-yan-se">图标颜色</h3>
<p><code>Icon</code> 的 <code>color</code> 属性用来设置图标的颜色。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"cart-o"</span> <span class="hljs-attr">color</span>=<span class="hljs-string">"#1989fa"</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">van-icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"fire-o"</span> <span class="hljs-attr">color</span>=<span class="hljs-string">"#ee0a24"</span> /&gt;</span>
</code></pre>
</div><div class="card"><h3 id="tu-biao-da-xiao">图标大小</h3>
<p><code>Icon</code> 的 <code>size</code> 属性用来设置图标的尺寸大小，默认单位为 <code>px</code>。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"chat-o"</span> <span class="hljs-attr">size</span>=<span class="hljs-string">"40"</span> /&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">van-icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"chat-o"</span> <span class="hljs-attr">size</span>=<span class="hljs-string">"3rem"</span> /&gt;</span>
</code></pre>
</div><div class="card"><h3 id="shi-yong-ben-di-zi-ti-wen-jian">使用本地字体文件</h3>
<p>Icon 组件默认引用有赞 CDN 提供的字体文件，并通过网络下载。如果需要在项目中使用本地字体文件，请引入下面的 CSS 文件，并在项目中配置 <code>url-loader</code>。</p>
<pre><code class="language-js"><span class="hljs-keyword">import</span> <span class="hljs-string">'vant/lib/icon/local.css'</span>;
</code></pre>
<blockquote>
<p>Tips: 从 2.10.13 版本开始，Vant 会默认使用 woff2 格式的本地字体文件，只有在不支持 woff2 字体的低端浏览器上才会加载有赞 CDN 的网络图标。</p>
</blockquote>
</div><div class="card"><h3 id="zi-ding-yi-tu-biao">自定义图标</h3>
<p>如果需要在现有 Icon 的基础上使用更多图标，可以引入第三方 iconfont 对应的字体文件和 CSS 文件，之后就可以在 Icon 组件中直接使用。</p>
<pre><code class="language-css"><span class="hljs-comment">/* 引入第三方或自定义的字体图标样式 */</span>
<span class="hljs-keyword">@font-face</span> {
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">'my-icon'</span>;
  <span class="hljs-attribute">src</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">'./my-icon.ttf'</span>) <span class="hljs-built_in">format</span>(<span class="hljs-string">'truetype'</span>);
}

<span class="hljs-selector-class">.my-icon</span> {
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">'my-icon'</span>;
}

<span class="hljs-selector-class">.my-icon-extra</span><span class="hljs-selector-pseudo">::before</span> {
  <span class="hljs-attribute">content</span>: <span class="hljs-string">'\e626'</span>;
}
</code></pre>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- 通过 class-prefix 指定类名为 my-icon --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">van-icon</span> <span class="hljs-attr">class-prefix</span>=<span class="hljs-string">"my-icon"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"extra"</span> /&gt;</span>
</code></pre>
</div><h2 id="api">API</h2>
<div class="card"><h3 id="props">Props</h3>
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
<td>name</td>
<td>图标名称或图片链接</td>
<td><em>string</em></td>
<td>-</td>
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
<td>info</td>
<td>图标右上角徽标的内容（已废弃，请使用 badge 属性）</td>
<td><em>number | string</em></td>
<td>-</td>
</tr>
<tr>
<td>color</td>
<td>图标颜色</td>
<td><em>string</em></td>
<td><code>inherit</code></td>
</tr>
<tr>
<td>size</td>
<td>图标大小，如 <code>20px</code> <code>2em</code>，默认单位为<code>px</code></td>
<td><em>number | string</em></td>
<td><code>inherit</code></td>
</tr>
<tr>
<td>class-prefix</td>
<td>类名前缀，用于使用自定义图标</td>
<td><em>string</em></td>
<td><code>van-icon</code></td>
</tr>
<tr>
<td>tag</td>
<td>HTML 标签</td>
<td><em>string</em></td>
<td><code>i</code></td>
</tr>
</tbody>
</table>
</div><div class="card"><h3 id="events">Events</h3>
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
<td>点击图标时触发</td>
<td><em>event: Event</em></td>
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
    const { minthods, envets, slots }: CompInfoResult = content[this.pathName];
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
