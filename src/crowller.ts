import fs from 'fs';
import path from 'path';
import LeeAnalyzer from './dellAnalyzer';
import {
  compInfoResult, Minthods,
  Events,
  Slots
} from './types/types'
const html = `<section><h1>ActionSheet 动作面板</h1>
<div class="card"><h3 id="jie-shao">介绍</h3>
<p>底部弹起的模态面板，包含与当前情境相关的多个选项。</p>
</div><div class="card"><h3 id="yin-ru">引入</h3>
<pre><code class="language-js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> { ActionSheet } <span class="hljs-keyword">from</span> <span class="hljs-string">'vant'</span>;

Vue.use(ActionSheet);
</code></pre>
</div><h2 id="dai-ma-yan-shi">代码演示</h2>
<div class="card"><h3 id="ji-chu-yong-fa">基础用法</h3>
<p>动作面板通过 <code>actions</code> 属性来定义选项，<code>actions</code> 属性是一个由对象构成的数组，数组中的每个对象配置一列，对象格式见文档下方表格。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-cell</span> <span class="hljs-attr">is-link</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"基础用法"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"show = true"</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">van-action-sheet</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"show"</span> <span class="hljs-attr">:actions</span>=<span class="hljs-string">"actions"</span> @<span class="hljs-attr">select</span>=<span class="hljs-string">"onSelect"</span> /&gt;</span>
</code></pre>
<pre><code class="language-js"><span class="hljs-keyword">import</span> { Toast } <span class="hljs-keyword">from</span> <span class="hljs-string">'vant'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">show</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">actions</span>: [{ <span class="hljs-attr">name</span>: <span class="hljs-string">'选项一'</span> }, { <span class="hljs-attr">name</span>: <span class="hljs-string">'选项二'</span> }, { <span class="hljs-attr">name</span>: <span class="hljs-string">'选项三'</span> }],
    };
  },
  <span class="hljs-attr">methods</span>: {
    onSelect(item) {
      <span class="hljs-comment">// 默认情况下点击选项时不会自动收起</span>
      <span class="hljs-comment">// 可以通过 close-on-click-action 属性开启自动收起</span>
      <span class="hljs-keyword">this</span>.show = <span class="hljs-literal">false</span>;
      Toast(item.name);
    },
  },
};
</code></pre>
</div><div class="card"><h3 id="zhan-shi-qu-xiao-an-niu">展示取消按钮</h3>
<p>设置 <code>cancel-text</code> 属性后，会在底部展示取消按钮，点击后关闭当前面板并触发 <code>cancel</code> 事件。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-action-sheet</span>
  <span class="hljs-attr">v-model</span>=<span class="hljs-string">"show"</span>
  <span class="hljs-attr">:actions</span>=<span class="hljs-string">"actions"</span>
  <span class="hljs-attr">cancel-text</span>=<span class="hljs-string">"取消"</span>
  <span class="hljs-attr">close-on-click-action</span>
  @<span class="hljs-attr">cancel</span>=<span class="hljs-string">"onCancel"</span>
/&gt;</span>
</code></pre>
<pre><code class="language-js"><span class="hljs-keyword">import</span> { Toast } <span class="hljs-keyword">from</span> <span class="hljs-string">'vant'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">show</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">actions</span>: [{ <span class="hljs-attr">name</span>: <span class="hljs-string">'选项一'</span> }, { <span class="hljs-attr">name</span>: <span class="hljs-string">'选项二'</span> }, { <span class="hljs-attr">name</span>: <span class="hljs-string">'选项三'</span> }],
    };
  },
  <span class="hljs-attr">methods</span>: {
    onCancel() {
      Toast(<span class="hljs-string">'取消'</span>);
    },
  },
};
</code></pre>
</div><div class="card"><h3 id="zhan-shi-miao-shu-xin-xi">展示描述信息</h3>
<p>通过 <code>description</code> 可以在菜单顶部显示描述信息，通过选项的 <code>subname</code> 属性可以在选项文字的右侧展示描述信息。</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-action-sheet</span>
  <span class="hljs-attr">v-model</span>=<span class="hljs-string">"show"</span>
  <span class="hljs-attr">:actions</span>=<span class="hljs-string">"actions"</span>
  <span class="hljs-attr">cancel-text</span>=<span class="hljs-string">"取消"</span>
  <span class="hljs-attr">description</span>=<span class="hljs-string">"这是一段描述信息"</span>
  <span class="hljs-attr">close-on-click-action</span>
/&gt;</span>
</code></pre>
<pre><code class="language-js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">show</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">actions</span>: [
        { <span class="hljs-attr">name</span>: <span class="hljs-string">'选项一'</span> },
        { <span class="hljs-attr">name</span>: <span class="hljs-string">'选项二'</span> },
        { <span class="hljs-attr">name</span>: <span class="hljs-string">'选项三'</span>, <span class="hljs-attr">subname</span>: <span class="hljs-string">'描述信息'</span> },
      ],
    };
  },
};
</code></pre>
</div><div class="card"><h3 id="xuan-xiang-zhuang-tai">选项状态</h3>
<p>可以通过 <code>loading</code> 和 <code>disabled</code> 将选项设置为加载状态或禁用状态，或者通过<code>color</code>设置选项的颜色</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-action-sheet</span>
  <span class="hljs-attr">v-model</span>=<span class="hljs-string">"show"</span>
  <span class="hljs-attr">:actions</span>=<span class="hljs-string">"actions"</span>
  <span class="hljs-attr">cancel-text</span>=<span class="hljs-string">"取消"</span>
  <span class="hljs-attr">close-on-click-action</span>
/&gt;</span>
</code></pre>
<pre><code class="language-js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">show</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">actions</span>: [
        { <span class="hljs-attr">name</span>: <span class="hljs-string">'着色选项'</span>, <span class="hljs-attr">color</span>: <span class="hljs-string">'#ee0a24'</span> },
        { <span class="hljs-attr">name</span>: <span class="hljs-string">'禁用选项'</span>, <span class="hljs-attr">disabled</span>: <span class="hljs-literal">true</span> },
        { <span class="hljs-attr">name</span>: <span class="hljs-string">'加载选项'</span>, <span class="hljs-attr">loading</span>: <span class="hljs-literal">true</span> },
      ],
    };
  },
};
</code></pre>
</div><div class="card"><h3 id="zi-ding-yi-mian-ban">自定义面板</h3>
<p>通过插槽可以自定义面板的展示内容，同时可以使用<code>title</code>属性展示标题栏</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-action-sheet</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"show"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"标题"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span>内容<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">van-action-sheet</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.content</span> {
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">16px</span> <span class="hljs-number">16px</span> <span class="hljs-number">160px</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
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
<td>v-model (value)</td>
<td>是否显示动作面板</td>
<td><em>boolean</em></td>
<td><code>false</code></td>
</tr>
<tr>
<td>actions</td>
<td>面板选项列表</td>
<td><em>Action[]</em></td>
<td><code>[]</code></td>
</tr>
<tr>
<td>title</td>
<td>顶部标题</td>
<td><em>string</em></td>
<td>-</td>
</tr>
<tr>
<td>cancel-text</td>
<td>取消按钮文字</td>
<td><em>string</em></td>
<td>-</td>
</tr>
<tr>
<td>description</td>
<td>选项上方的描述信息</td>
<td><em>string</em></td>
<td>-</td>
</tr>
<tr>
<td>closeable <code>v2.10.5</code></td>
<td>是否显示关闭图标</td>
<td><em>boolean</em></td>
<td><code>true</code></td>
</tr>
<tr>
<td>close-icon</td>
<td>关闭<a href="#/zh-CN/icon" target="_blank">图标名称</a>或图片链接</td>
<td><em>string</em></td>
<td><code>cross</code></td>
</tr>
<tr>
<td>duration</td>
<td>动画时长，单位秒</td>
<td><em>number | string</em></td>
<td><code>0.3</code></td>
</tr>
<tr>
<td>round</td>
<td>是否显示圆角</td>
<td><em>boolean</em></td>
<td><code>true</code></td>
</tr>
<tr>
<td>overlay</td>
<td>是否显示遮罩层</td>
<td><em>boolean</em></td>
<td><code>true</code></td>
</tr>
<tr>
<td>lock-scroll</td>
<td>是否锁定背景滚动</td>
<td><em>boolean</em></td>
<td><code>true</code></td>
</tr>
<tr>
<td>lazy-render</td>
<td>是否在显示弹层时才渲染节点</td>
<td><em>boolean</em></td>
<td><code>true</code></td>
</tr>
<tr>
<td>close-on-popstate <code>v2.5.3</code></td>
<td>是否在页面回退时自动关闭</td>
<td><em>boolean</em></td>
<td><code>false</code></td>
</tr>
<tr>
<td>close-on-click-action</td>
<td>是否在点击选项后关闭</td>
<td><em>boolean</em></td>
<td><code>false</code></td>
</tr>
<tr>
<td>close-on-click-overlay</td>
<td>是否在点击遮罩层后关闭</td>
<td><em>boolean</em></td>
<td><code>true</code></td>
</tr>
<tr>
<td>safe-area-inset-bottom</td>
<td>是否开启<a href="#/zh-CN/advanced-usage#di-bu-an-quan-qu-gua-pei" target="_blank">底部安全区适配</a></td>
<td><em>boolean</em></td>
<td><code>true</code></td>
</tr>
<tr>
<td>get-container</td>
<td>指定挂载的节点，<a href="#/zh-CN/popup#zhi-ding-gua-zai-wei-zhi" target="_blank">用法示例</a></td>
<td><em>string | () =&gt; Element</em></td>
<td>-</td>
</tr>
</tbody>
</table>
</div><div class="card"><h3 id="action-shu-ju-jie-gou">Action 数据结构</h3>
<p><code>actions</code> 属性是一个由对象构成的数组，数组中的每个对象配置一列，对象可以包含以下值：</p>
<table>
<thead>
<tr>
<th>键名</th>
<th>说明</th>
<th>类型</th>
</tr>
</thead>
<tbody>
<tr>
<td>name</td>
<td>标题</td>
<td><em>string</em></td>
</tr>
<tr>
<td>subname</td>
<td>二级标题</td>
<td><em>string</em></td>
</tr>
<tr>
<td>color</td>
<td>选项文字颜色</td>
<td><em>string</em></td>
</tr>
<tr>
<td>className</td>
<td>为对应列添加额外的 class</td>
<td><em>any</em></td>
</tr>
<tr>
<td>loading</td>
<td>是否为加载状态</td>
<td><em>boolean</em></td>
</tr>
<tr>
<td>disabled</td>
<td>是否为禁用状态</td>
<td><em>boolean</em></td>
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
<td>select</td>
<td>点击选项时触发，禁用或加载状态下不会触发</td>
<td><em>action: Action, index: number</em></td>
</tr>
<tr>
<td>cancel</td>
<td>点击取消按钮时触发</td>
<td>-</td>
</tr>
<tr>
<td>open</td>
<td>打开面板时触发</td>
<td>-</td>
</tr>
<tr>
<td>close</td>
<td>关闭面板时触发</td>
<td>-</td>
</tr>
<tr>
<td>opened</td>
<td>打开面板且动画结束后触发</td>
<td>-</td>
</tr>
<tr>
<td>closed</td>
<td>关闭面板且动画结束后触发</td>
<td>-</td>
</tr>
<tr>
<td>click-overlay</td>
<td>点击遮罩层时触发</td>
<td>-</td>
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
<td>自定义面板的展示内容</td>
</tr>
<tr>
<td>description <code>v2.10.4</code></td>
<td>自定义描述文案</td>
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
<td>@action-sheet-max-height</td>
<td><code>80%</code></td>
<td>-</td>
</tr>
<tr>
<td>@action-sheet-header-height</td>
<td><code>48px</code></td>
<td>-</td>
</tr>
<tr>
<td>@action-sheet-header-font-size</td>
<td><code>@font-size-lg</code></td>
<td>-</td>
</tr>
<tr>
<td>@action-sheet-description-color</td>
<td><code>@gray-6</code></td>
<td>-</td>
</tr>
<tr>
<td>@action-sheet-description-font-size</td>
<td><code>@font-size-md</code></td>
<td>-</td>
</tr>
<tr>
<td>@action-sheet-description-line-height</td>
<td><code>@line-height-md</code></td>
<td>-</td>
</tr>
<tr>
<td>@action-sheet-item-background</td>
<td><code>@white</code></td>
<td>-</td>
</tr>
<tr>
<td>@action-sheet-item-font-size</td>
<td><code>@font-size-lg</code></td>
<td>-</td>
</tr>
<tr>
<td>@action-sheet-item-line-height</td>
<td><code>@line-height-lg</code></td>
<td>-</td>
</tr>
<tr>
<td>@action-sheet-item-text-color</td>
<td><code>@text-color</code></td>
<td>-</td>
</tr>
<tr>
<td>@action-sheet-item-disabled-text-color</td>
<td><code>@gray-5</code></td>
<td>-</td>
</tr>
<tr>
<td>@action-sheet-subname-color</td>
<td><code>@gray-6</code></td>
<td>-</td>
</tr>
<tr>
<td>@action-sheet-subname-font-size</td>
<td><code>@font-size-sm</code></td>
<td>-</td>
</tr>
<tr>
<td>@action-sheet-subname-line-height</td>
<td><code>@line-height-sm</code></td>
<td>-</td>
</tr>
<tr>
<td>@action-sheet-close-icon-size</td>
<td><code>22px</code></td>
<td>-</td>
</tr>
<tr>
<td>@action-sheet-close-icon-color</td>
<td><code>@gray-5</code></td>
<td>-</td>
</tr>
<tr>
<td>@action-sheet-close-icon-active-color</td>
<td><code>@gray-6</code></td>
<td>-</td>
</tr>
<tr>
<td>@action-sheet-close-icon-padding</td>
<td><code>0 @padding-md</code></td>
<td>-</td>
</tr>
<tr>
<td>@action-sheet-cancel-text-color</td>
<td><code>@gray-7</code></td>
<td>-</td>
</tr>
<tr>
<td>@action-sheet-cancel-padding-top</td>
<td><code>@padding-xs</code></td>
<td>-</td>
</tr>
<tr>
<td>@action-sheet-cancel-padding-color</td>
<td><code>@background-color</code></td>
<td>-</td>
</tr>
<tr>
<td>@action-sheet-loading-icon-size</td>
<td><code>22px</code></td>
<td>-</td>
</tr>
</tbody>
</table>
</div><h2 id="chang-jian-wen-ti">常见问题</h2>
<div class="card"><h3 id="yin-ru-shi-ti-shi-dependencies-not-found">引入时提示 dependencies not found？</h3>
<p>在 v1 版本中，动作面板的组件名为<code>Actionsheet</code>，从 2.0 版本开始更名为<code>ActionSheet</code>，请注意区分。</p>
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
