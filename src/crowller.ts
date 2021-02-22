import fs from 'fs';
import path from 'path';
import LeeAnalyzer from './dellAnalyzer';
import {
  compInfoResult, Minthods,
  Events,
  Slots
} from './types/types'
const html = `<section><h1>Tab-item 标签页</h1>
<div class="card"><h3 id="yin-ru">引入</h3>
<pre><code class="language-js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> { Tab, Tabs } <span class="hljs-keyword">from</span> <span class="hljs-string">'vant'</span>;

Vue.use(Tab);
Vue.use(Tabs);
</code></pre>
</div><h2 id="dai-ma-yan-shi">代码演示</h2>
<div class="card"><h3 id="ji-chu-yong-fa">基础用法</h3>
<p>通过 <code>v-model</code> 绑定当前激活标签对应的索引值，默认情况下启用第一个标签。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-tabs</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"active"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-tab</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"标签 1"</span>&gt;</span>内容 1<span class="hljs-tag">&lt;/<span class="hljs-name">van-tab</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-tab</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"标签 2"</span>&gt;</span>内容 2<span class="hljs-tag">&lt;/<span class="hljs-name">van-tab</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-tab</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"标签 3"</span>&gt;</span>内容 3<span class="hljs-tag">&lt;/<span class="hljs-name">van-tab</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-tab</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"标签 4"</span>&gt;</span>内容 4<span class="hljs-tag">&lt;/<span class="hljs-name">van-tab</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">van-tabs</span>&gt;</span>
</code></pre>
<pre><code class="language-js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">active</span>: <span class="hljs-number">2</span>,
    };
  },
};
</code></pre>
</div><div class="card"><h3 id="tong-guo-ming-cheng-pi-pei">通过名称匹配</h3>
<p>在标签指定 <code>name</code> 属性的情况下，<code>v-model</code> 的值为当前标签的 <code>name</code>（此时无法通过索引值来匹配标签）。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-tabs</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"activeName"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-tab</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"标签 1"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"a"</span>&gt;</span>内容 1<span class="hljs-tag">&lt;/<span class="hljs-name">van-tab</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-tab</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"标签 2"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"b"</span>&gt;</span>内容 2<span class="hljs-tag">&lt;/<span class="hljs-name">van-tab</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-tab</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"标签 3"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"c"</span>&gt;</span>内容 3<span class="hljs-tag">&lt;/<span class="hljs-name">van-tab</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">van-tabs</span>&gt;</span>
</code></pre>
<pre><code class="language-js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">activeName</span>: <span class="hljs-string">'a'</span>,
    };
  },
};
</code></pre>
</div><div class="card"><h3 id="biao-qian-lan-gun-dong">标签栏滚动</h3>
<p>标签数量超过 5 个时，标签栏可以在水平方向上滚动，切换时会自动将当前标签居中。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-tabs</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-tab</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"index in 8"</span> <span class="hljs-attr">:title</span>=<span class="hljs-string">"'标签 ' + index"</span>&gt;</span>
    内容 {{ index }}
  <span class="hljs-tag">&lt;/<span class="hljs-name">van-tab</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">van-tabs</span>&gt;</span>
</code></pre>
</div><div class="card"><h3 id="jin-yong-biao-qian">禁用标签</h3>
<p>设置 <code>disabled</code> 属性即可禁用标签，如果需要监听禁用标签的点击事件，可以在 <code>van-tabs</code> 上监听<code>disabled</code> 事件。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-tabs</span> @<span class="hljs-attr">disabled</span>=<span class="hljs-string">"onClickDisabled"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-tab</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"标签 1"</span>&gt;</span>内容 1<span class="hljs-tag">&lt;/<span class="hljs-name">van-tab</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-tab</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"标签 2"</span> <span class="hljs-attr">disabled</span>&gt;</span>内容 2<span class="hljs-tag">&lt;/<span class="hljs-name">van-tab</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-tab</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"标签 3"</span>&gt;</span>内容 3<span class="hljs-tag">&lt;/<span class="hljs-name">van-tab</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">van-tabs</span>&gt;</span>
</code></pre>
<pre><code class="language-js"><span class="hljs-keyword">import</span> { Toast } <span class="hljs-keyword">from</span> <span class="hljs-string">'vant'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">methods</span>: {
    onClickDisabled(name, title) {
      Toast(name + <span class="hljs-string">'已被禁用'</span>);
    },
  },
};
</code></pre>
</div><div class="card"><h3 id="yang-shi-feng-ge">样式风格</h3>
<p><code>Tab</code> 支持两种样式风格：<code>line</code> 和<code>card</code>，默认为 <code>line</code> 样式，可以通过 <code>type</code> 属性切换样式风格。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-tabs</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"card"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-tab</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"标签 1"</span>&gt;</span>内容 1<span class="hljs-tag">&lt;/<span class="hljs-name">van-tab</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-tab</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"标签 2"</span>&gt;</span>内容 2<span class="hljs-tag">&lt;/<span class="hljs-name">van-tab</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-tab</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"标签 3"</span>&gt;</span>内容 3<span class="hljs-tag">&lt;/<span class="hljs-name">van-tab</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">van-tabs</span>&gt;</span>
</code></pre>
</div><div class="card"><h3 id="dian-ji-shi-jian">点击事件</h3>
<p>可以在 <code>van-tabs</code> 上绑定 <code>click</code> 事件，事件传参为标签对应的标识符和标题。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-tabs</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"onClick"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-tab</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"标签 1"</span>&gt;</span>内容 1<span class="hljs-tag">&lt;/<span class="hljs-name">van-tab</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-tab</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"标签 2"</span>&gt;</span>内容 2<span class="hljs-tag">&lt;/<span class="hljs-name">van-tab</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">van-tabs</span>&gt;</span>
</code></pre>
<pre><code class="language-js"><span class="hljs-keyword">import</span> { Toast } <span class="hljs-keyword">from</span> <span class="hljs-string">'vant'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">methods</span>: {
    onClick(name, title) {
      Toast(title);
    },
  },
};
</code></pre>
</div><div class="card"><h3 id="nian-xing-bu-ju">粘性布局</h3>
<p>通过 <code>sticky</code> 属性可以开启粘性布局，粘性布局下，标签页滚动到顶部时会自动吸顶。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-tabs</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"active"</span> <span class="hljs-attr">sticky</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-tab</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"index in 4"</span> <span class="hljs-attr">:title</span>=<span class="hljs-string">"'选项 ' + index"</span>&gt;</span>
    内容 {{ index }}
  <span class="hljs-tag">&lt;/<span class="hljs-name">van-tab</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">van-tabs</span>&gt;</span>
</code></pre>
</div><div class="card"><h3 id="zi-ding-yi-biao-qian">自定义标签</h3>
<p>通过 <code>title</code> 插槽可以自定义标签内容。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-tabs</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"active"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-tab</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"index in 2"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"index"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">template</span> #<span class="hljs-attr">title</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">van-icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"more-o"</span> /&gt;</span>选项 <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    内容 {{ index }}
  <span class="hljs-tag">&lt;/<span class="hljs-name">van-tab</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">van-tabs</span>&gt;</span>
</code></pre>
</div><div class="card"><h3 id="qie-huan-dong-hua">切换动画</h3>
<p>通过 <code>animated</code> 属性可以开启切换标签内容时的转场动画。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-tabs</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"active"</span> <span class="hljs-attr">animated</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-tab</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"index in 4"</span> <span class="hljs-attr">:title</span>=<span class="hljs-string">"'选项 ' + index"</span>&gt;</span>
    内容 {{ index }}
  <span class="hljs-tag">&lt;/<span class="hljs-name">van-tab</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">van-tabs</span>&gt;</span>
</code></pre>
</div><div class="card"><h3 id="hua-dong-qie-huan">滑动切换</h3>
<p>通过 <code>swipeable</code> 属性可以开启滑动切换标签页。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-tabs</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"active"</span> <span class="hljs-attr">swipeable</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-tab</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"index in 4"</span> <span class="hljs-attr">:title</span>=<span class="hljs-string">"'选项 ' + index"</span>&gt;</span>
    内容 {{ index }}
  <span class="hljs-tag">&lt;/<span class="hljs-name">van-tab</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">van-tabs</span>&gt;</span>
</code></pre>
</div><div class="card"><h3 id="gun-dong-dao-hang">滚动导航</h3>
<p>通过 <code>scrollspy</code> 属性可以开启滚动导航模式，该模式下，内容将会平铺展示。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-tabs</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"active"</span> <span class="hljs-attr">scrollspy</span> <span class="hljs-attr">sticky</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-tab</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"index in 8"</span> <span class="hljs-attr">:title</span>=<span class="hljs-string">"'选项 ' + index"</span>&gt;</span>
    内容 {{ index }}
  <span class="hljs-tag">&lt;/<span class="hljs-name">van-tab</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">van-tabs</span>&gt;</span>
</code></pre>
</div><div class="card"><h3 id="yi-bu-qie-huan">异步切换</h3>
<p>通过 <code>before-change</code> 属性可以在切换标签前执行特定的逻辑。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-tabs</span> <span class="hljs-attr">:before-change</span>=<span class="hljs-string">"beforeChange"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">van-tab</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"index in 4"</span> <span class="hljs-attr">:title</span>=<span class="hljs-string">"'选项 ' + index"</span>&gt;</span>
    内容 {{ index }}
  <span class="hljs-tag">&lt;/<span class="hljs-name">van-tab</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">van-tabs</span>&gt;</span>
</code></pre>
<pre><code class="language-js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">methods</span>: {
    beforeChange(index) {
      <span class="hljs-comment">// 返回 false 表示阻止此次切换</span>
      <span class="hljs-keyword">if</span> (index === <span class="hljs-number">1</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
      }

      <span class="hljs-comment">// 返回 Promise 来执行异步逻辑</span>
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> {
        <span class="hljs-comment">// 在 resolve 函数中返回 true 或 false</span>
        resolve(index !== <span class="hljs-number">3</span>);
      });
    },
  },
};
</code></pre>
</div><h2 id="api">API</h2>
<div class="card"><h3 id="tabs-props">Tabs Props</h3>
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
<td>v-model</td>
<td>绑定当前选中标签的标识符</td>
<td><em>number | string</em></td>
<td><code>0</code></td>
</tr>
<tr>
<td>type</td>
<td>样式风格类型，可选值为 <code>card</code></td>
<td><em>string</em></td>
<td><code>line</code></td>
</tr>
<tr>
<td>color</td>
<td>标签主题色</td>
<td><em>string</em></td>
<td><code>#ee0a24</code></td>
</tr>
<tr>
<td>background</td>
<td>标签栏背景色</td>
<td><em>string</em></td>
<td><code>white</code></td>
</tr>
<tr>
<td>duration</td>
<td>动画时间，单位秒</td>
<td><em>number | string</em></td>
<td><code>0.3</code></td>
</tr>
<tr>
<td>line-width</td>
<td>底部条宽度，默认单位 <code>px</code></td>
<td><em>number | string</em></td>
<td><code>40px</code></td>
</tr>
<tr>
<td>line-height</td>
<td>底部条高度，默认单位 <code>px</code></td>
<td><em>number | string</em></td>
<td><code>3px</code></td>
</tr>
<tr>
<td>animated</td>
<td>是否开启切换标签内容时的转场动画</td>
<td><em>boolean</em></td>
<td><code>false</code></td>
</tr>
<tr>
<td>border</td>
<td>是否显示标签栏外边框，仅在 <code>type="line"</code> 时有效</td>
<td><em>boolean</em></td>
<td><code>false</code></td>
</tr>
<tr>
<td>ellipsis</td>
<td>是否省略过长的标题文字</td>
<td><em>boolean</em></td>
<td><code>true</code></td>
</tr>
<tr>
<td>sticky</td>
<td>是否使用粘性定位布局</td>
<td><em>boolean</em></td>
<td><code>false</code></td>
</tr>
<tr>
<td>swipeable</td>
<td>是否开启手势滑动切换</td>
<td><em>boolean</em></td>
<td><code>false</code></td>
</tr>
<tr>
<td>lazy-render</td>
<td>是否开启延迟渲染（首次切换到标签时才触发内容渲染）</td>
<td><em>boolean</em></td>
<td><code>true</code></td>
</tr>
<tr>
<td>scrollspy</td>
<td>是否开启滚动导航</td>
<td><em>boolean</em></td>
<td><code>false</code></td>
</tr>
<tr>
<td>offset-top <code>v2.8.7</code></td>
<td>粘性定位布局下与顶部的最小距离，支持 <code>px</code> <code>vw</code> <code>vh</code> <code>rem</code> 单位，默认 <code>px</code></td>
<td><em>number | string</em></td>
<td><code>0</code></td>
</tr>
<tr>
<td>swipe-threshold</td>
<td>滚动阈值，标签数量超过阈值且总宽度超过标签栏宽度时开始横向滚动</td>
<td><em>number | string</em></td>
<td><code>5</code></td>
</tr>
<tr>
<td>title-active-color</td>
<td>标题选中态颜色</td>
<td><em>string</em></td>
<td>-</td>
</tr>
<tr>
<td>title-inactive-color</td>
<td>标题默认态颜色</td>
<td><em>string</em></td>
<td>-</td>
</tr>
<tr>
<td>before-change <code>v2.9.3</code></td>
<td>切换标签前的回调函数，返回 <code>false</code> 可阻止切换，支持返回 Promise</td>
<td><em>(name) =&gt; boolean | Promise</em></td>
<td>-</td>
</tr>
</tbody>
</table>
</div><div class="card"><h3 id="tab-props">Tab Props</h3>
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
<td>title</td>
<td>标题</td>
<td><em>string</em></td>
<td>-</td>
</tr>
<tr>
<td>disabled</td>
<td>是否禁用标签</td>
<td><em>boolean</em></td>
<td><code>false</code></td>
</tr>
<tr>
<td>dot</td>
<td>是否在标题右上角显示小红点</td>
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
<td>name</td>
<td>标签名称，作为匹配的标识符</td>
<td><em>number | string</em></td>
<td>标签的索引值</td>
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
<tr>
<td>title-style</td>
<td>自定义标题样式</td>
<td><em>any</em></td>
<td>-</td>
</tr>
<tr>
<td>title-class</td>
<td>自定义标题类名</td>
<td><em>any</em></td>
<td>-</td>
</tr>
</tbody>
</table>
</div><div class="card"><h3 id="tabs-events">Tabs Events</h3>
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
<td>点击标签时触发</td>
<td>name：标识符，title：标题</td>
</tr>
<tr>
<td>change</td>
<td>当前激活的标签改变时触发</td>
<td>name：标识符，title：标题</td>
</tr>
<tr>
<td>disabled</td>
<td>点击被禁用的标签时触发</td>
<td>name：标识符，title：标题</td>
</tr>
<tr>
<td>rendered</td>
<td>标签内容首次渲染时触发（仅在开启延迟渲染后触发）</td>
<td>name：标识符，title：标题</td>
</tr>
<tr>
<td>scroll</td>
<td>滚动时触发，仅在 sticky 模式下生效</td>
<td>{ scrollTop: 距离顶部位置, isFixed: 是否吸顶 }</td>
</tr>
</tbody>
</table>
</div><div class="card"><h3 id="tabs-fang-fa">Tabs 方法</h3>
<p>通过 ref 可以获取到 Tabs 实例并调用实例方法，详见<a href="#/zh-CN/advanced-usage#zu-jian-shi-li-fang-fa" target="_blank">组件实例方法</a>。</p>
<table>
<thead>
<tr>
<th>方法名</th>
<th>说明</th>
<th>参数</th>
<th>返回值</th>
</tr>
</thead>
<tbody>
<tr>
<td>resize</td>
<td>外层元素大小或组件显示状态变化时，可以调用此方法来触发重绘</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>scrollTo <code>v2.9.3</code></td>
<td>滚动到指定的标签页，在滚动导航模式下可用</td>
<td>name: 标识符</td>
<td>-</td>
</tr>
</tbody>
</table>
</div><div class="card"><h3 id="tabs-slots">Tabs Slots</h3>
<table>
<thead>
<tr>
<th>名称</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>nav-left</td>
<td>标题左侧内容</td>
</tr>
<tr>
<td>nav-right</td>
<td>标题右侧内容</td>
</tr>
</tbody>
</table>
</div><div class="card"><h3 id="tab-slots">Tab Slots</h3>
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
<td>标签页内容</td>
</tr>
<tr>
<td>title</td>
<td>自定义标题</td>
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
<td>@tab-text-color</td>
<td><code>@gray-7</code></td>
<td>-</td>
</tr>
<tr>
<td>@tab-active-text-color</td>
<td><code>@text-color</code></td>
<td>-</td>
</tr>
<tr>
<td>@tab-disabled-text-color</td>
<td><code>@gray-5</code></td>
<td>-</td>
</tr>
<tr>
<td>@tab-font-size</td>
<td><code>@font-size-md</code></td>
<td>-</td>
</tr>
<tr>
<td>@tab-line-height</td>
<td><code>@line-height-md</code></td>
<td>-</td>
</tr>
<tr>
<td>@tabs-default-color</td>
<td><code>@red</code></td>
<td>-</td>
</tr>
<tr>
<td>@tabs-line-height</td>
<td><code>44px</code></td>
<td>-</td>
</tr>
<tr>
<td>@tabs-card-height</td>
<td><code>30px</code></td>
<td>-</td>
</tr>
<tr>
<td>@tabs-nav-background-color</td>
<td><code>@white</code></td>
<td>-</td>
</tr>
<tr>
<td>@tabs-bottom-bar-width</td>
<td><code>40px</code></td>
<td>-</td>
</tr>
<tr>
<td>@tabs-bottom-bar-height</td>
<td><code>3px</code></td>
<td>-</td>
</tr>
<tr>
<td>@tabs-bottom-bar-color</td>
<td><code>@tabs-default-color</code></td>
<td>-</td>
</tr>
</tbody>
</table>
</div><h2 id="chang-jian-wen-ti">常见问题</h2>
<div class="card"><h3 id="zu-jian-cong-yin-cang-zhuang-tai-qie-huan-dao-xian-shi-zhuang-tai-shi-di-bu-tiao-wei-zhi-cuo-wu">组件从隐藏状态切换到显示状态时，底部条位置错误？</h3>
<p>Tabs 组件在挂载时，会获取自身的宽度，并计算出底部条的位置。如果组件一开始处于隐藏状态，则获取到的宽度永远为 0，因此无法展示底部条位置。</p>
<h4 id="jie-jue-fang-fa">解决方法</h4>
<p>方法一，如果是使用 <code>v-show</code> 来控制组件展示的，则替换为 <code>v-if</code> 即可解决此问题：</p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Before --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">van-tabs</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"show"</span> /&gt;</span>
<span class="hljs-comment">&lt;!-- After --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">van-tabs</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"show"</span> /&gt;</span>
</code></pre>
<p>方法二，调用组件的 resize 方法来主动触发重绘：</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-tabs</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"show"</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"tabs"</span> /&gt;</span>
</code></pre>
<pre><code class="language-js"><span class="hljs-keyword">this</span>.$refs.tabs.resize();
</code></pre>
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
