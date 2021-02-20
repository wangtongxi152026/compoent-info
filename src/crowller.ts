import fs from 'fs';
import path from 'path';
import LeeAnalyzer from './dellAnalyzer';
import {
  compInfoResult, Minthods,
  Events,
  Slots
} from './types/types'
const html = `<section><h1>Tag 标签</h1>
<div class="card"><h3 id="yin-ru">引入</h3>
<pre><code class="language-js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> { Tag } <span class="hljs-keyword">from</span> <span class="hljs-string">'vant'</span>;

Vue.use(Tag);
</code></pre>
</div><h2 id="dai-ma-yan-shi">代码演示</h2>
<div class="card"><h3 id="ji-chu-yong-fa">基础用法</h3>
<p>通过 <code>type</code> 属性控制标签颜色。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-tag</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span>&gt;</span>标签<span class="hljs-tag">&lt;/<span class="hljs-name">van-tag</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">van-tag</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"success"</span>&gt;</span>标签<span class="hljs-tag">&lt;/<span class="hljs-name">van-tag</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">van-tag</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"danger"</span>&gt;</span>标签<span class="hljs-tag">&lt;/<span class="hljs-name">van-tag</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">van-tag</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"warning"</span>&gt;</span>标签<span class="hljs-tag">&lt;/<span class="hljs-name">van-tag</span>&gt;</span>
</code></pre>
</div><div class="card"><h3 id="kong-xin-yang-shi">空心样式</h3>
<p>设置 <code>plain</code> 属性设置为空心样式。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-tag</span> <span class="hljs-attr">plain</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span>&gt;</span>标签<span class="hljs-tag">&lt;/<span class="hljs-name">van-tag</span>&gt;</span>
</code></pre>
</div><div class="card"><h3 id="yuan-jiao-yang-shi">圆角样式</h3>
<p>通过 <code>round</code> 设置为圆角样式。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-tag</span> <span class="hljs-attr">round</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span>&gt;</span>标签<span class="hljs-tag">&lt;/<span class="hljs-name">van-tag</span>&gt;</span>
</code></pre>
</div><div class="card"><h3 id="biao-ji-yang-shi">标记样式</h3>
<p>通过 <code>mark</code> 设置为标记样式(半圆角)。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-tag</span> <span class="hljs-attr">mark</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span>&gt;</span>标签<span class="hljs-tag">&lt;/<span class="hljs-name">van-tag</span>&gt;</span>
</code></pre>
</div><div class="card"><h3 id="ke-guan-bi-biao-qian">可关闭标签</h3>
<p>添加 <code>closeable</code> 属性表示标签是可关闭的，关闭标签时会触发 <code>close</code> 事件，在 <code>close</code> 事件中可以执行隐藏标签的逻辑。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-tag</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"show"</span> <span class="hljs-attr">closeable</span> <span class="hljs-attr">size</span>=<span class="hljs-string">"medium"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span> @<span class="hljs-attr">close</span>=<span class="hljs-string">"close"</span>&gt;</span>
  标签
<span class="hljs-tag">&lt;/<span class="hljs-name">van-tag</span>&gt;</span>
</code></pre>
<pre><code class="language-js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">show</span>: <span class="hljs-literal">true</span>,
    };
  },
  <span class="hljs-attr">methods</span>: {
    close() {
      <span class="hljs-keyword">this</span>.show = <span class="hljs-literal">false</span>;
    },
  },
};
</code></pre>
</div><div class="card"><h3 id="biao-qian-da-xiao">标签大小</h3>
<p>通过 <code>size</code> 属性调整标签大小。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-tag</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span>&gt;</span>标签<span class="hljs-tag">&lt;/<span class="hljs-name">van-tag</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">van-tag</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span> <span class="hljs-attr">size</span>=<span class="hljs-string">"medium"</span>&gt;</span>标签<span class="hljs-tag">&lt;/<span class="hljs-name">van-tag</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">van-tag</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span> <span class="hljs-attr">size</span>=<span class="hljs-string">"large"</span>&gt;</span>标签<span class="hljs-tag">&lt;/<span class="hljs-name">van-tag</span>&gt;</span>
</code></pre>
</div><div class="card"><h3 id="zi-ding-yi-yan-se">自定义颜色</h3>
<p>通过 <code>color</code> 和 <code>text-color</code> 属性设置标签颜色。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-tag</span> <span class="hljs-attr">color</span>=<span class="hljs-string">"#7232dd"</span>&gt;</span>标签<span class="hljs-tag">&lt;/<span class="hljs-name">van-tag</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">van-tag</span> <span class="hljs-attr">color</span>=<span class="hljs-string">"#ffe1e1"</span> <span class="hljs-attr">text-color</span>=<span class="hljs-string">"#ad0000"</span>&gt;</span>标签<span class="hljs-tag">&lt;/<span class="hljs-name">van-tag</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">van-tag</span> <span class="hljs-attr">color</span>=<span class="hljs-string">"#7232dd"</span> <span class="hljs-attr">plain</span>&gt;</span>标签<span class="hljs-tag">&lt;/<span class="hljs-name">van-tag</span>&gt;</span>
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
<td>type</td>
<td>类型，可选值为<code>primary</code> <code>success</code> <code>danger</code> <code>warning</code></td>
<td><em>string</em></td>
<td><code>default</code></td>
</tr>
<tr>
<td>size</td>
<td>大小, 可选值为<code>large</code> <code>medium</code></td>
<td><em>string</em></td>
<td>-</td>
</tr>
<tr>
<td>color</td>
<td>标签颜色</td>
<td><em>string</em></td>
<td>-</td>
</tr>
<tr>
<td>plain</td>
<td>是否为空心样式</td>
<td><em>boolean</em></td>
<td><code>false</code></td>
</tr>
<tr>
<td>round</td>
<td>是否为圆角样式</td>
<td><em>boolean</em></td>
<td><code>false</code></td>
</tr>
<tr>
<td>mark</td>
<td>是否为标记样式</td>
<td><em>boolean</em></td>
<td><code>false</code></td>
</tr>
<tr>
<td>text-color</td>
<td>文本颜色，优先级高于<code>color</code>属性</td>
<td><em>string</em></td>
<td><code>white</code></td>
</tr>
<tr>
<td>closeable</td>
<td>是否为可关闭标签</td>
<td><em>boolean</em></td>
<td><code>false</code></td>
</tr>
</tbody>
</table>
</div><div class="card"><h3 id="slots">Slots</h3>
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
<td>标签显示内容</td>
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
<td>点击时触发</td>
<td><em>event: Event</em></td>
</tr>
<tr>
<td>close</td>
<td>关闭标签时触发</td>
<td>-</td>
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
<td>@tag-padding</td>
<td><code>0 @padding-base</code></td>
<td>-</td>
</tr>
<tr>
<td>@tag-text-color</td>
<td><code>@white</code></td>
<td>-</td>
</tr>
<tr>
<td>@tag-font-size</td>
<td><code>@font-size-sm</code></td>
<td>-</td>
</tr>
<tr>
<td>@tag-border-radius</td>
<td><code>2px</code></td>
<td>-</td>
</tr>
<tr>
<td>@tag-line-height</td>
<td><code>16px</code></td>
<td>-</td>
</tr>
<tr>
<td>@tag-medium-padding</td>
<td><code>2px 6px</code></td>
<td>-</td>
</tr>
<tr>
<td>@tag-large-padding</td>
<td><code>@padding-base @padding-xs</code></td>
<td>-</td>
</tr>
<tr>
<td>@tag-large-border-radius</td>
<td><code>@border-radius-md</code></td>
<td>-</td>
</tr>
<tr>
<td>@tag-large-font-size</td>
<td><code>@font-size-md</code></td>
<td>-</td>
</tr>
<tr>
<td>@tag-round-border-radius</td>
<td><code>@border-radius-max</code></td>
<td>-</td>
</tr>
<tr>
<td>@tag-danger-color</td>
<td><code>@red</code></td>
<td>-</td>
</tr>
<tr>
<td>@tag-primary-color</td>
<td><code>@blue</code></td>
<td>-</td>
</tr>
<tr>
<td>@tag-success-color</td>
<td><code>@green</code></td>
<td>-</td>
</tr>
<tr>
<td>@tag-warning-color</td>
<td><code>@orange</code></td>
<td>-</td>
</tr>
<tr>
<td>@tag-default-color</td>
<td><code>@gray-6</code></td>
<td>-</td>
</tr>
<tr>
<td>@tag-plain-background-color</td>
<td><code>@white</code></td>
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
