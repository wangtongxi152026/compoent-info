import fs from 'fs';
import path from 'path';
import LeeAnalyzer from './dellAnalyzer';
import {
  compInfoResult, Minthods,
  Events,
  Slots
} from './types/types'
const html = `<section><h1>AddressEdit 地址编辑</h1>
<div class="card"><h3 id="jie-shao">介绍</h3>
<p>收货地址编辑组件，用于新建、更新、删除收货地址。</p>
</div><div class="card"><h3 id="yin-ru">引入</h3>
<pre><code class="language-js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> { AddressEdit } <span class="hljs-keyword">from</span> <span class="hljs-string">'vant'</span>;

Vue.use(AddressEdit);
</code></pre>
</div><h2 id="dai-ma-yan-shi">代码演示</h2>
<div class="card"><h3 id="ji-chu-yong-fa">基础用法</h3>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">van-address-edit</span>
  <span class="hljs-attr">:area-list</span>=<span class="hljs-string">"areaList"</span>
  <span class="hljs-attr">show-postal</span>
  <span class="hljs-attr">show-delete</span>
  <span class="hljs-attr">show-set-default</span>
  <span class="hljs-attr">show-search-result</span>
  <span class="hljs-attr">:search-result</span>=<span class="hljs-string">"searchResult"</span>
  <span class="hljs-attr">:area-columns-placeholder</span>=<span class="hljs-string">"['请选择', '请选择', '请选择']"</span>
  @<span class="hljs-attr">save</span>=<span class="hljs-string">"onSave"</span>
  @<span class="hljs-attr">delete</span>=<span class="hljs-string">"onDelete"</span>
  @<span class="hljs-attr">change-detail</span>=<span class="hljs-string">"onChangeDetail"</span>
/&gt;</span>
</code></pre>
<pre><code class="language-js"><span class="hljs-keyword">import</span> { Toast } <span class="hljs-keyword">from</span> <span class="hljs-string">'vant'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data() {
    <span class="hljs-keyword">return</span> {
      areaList,
      <span class="hljs-attr">searchResult</span>: [],
    };
  },
  <span class="hljs-attr">methods</span>: {
    onSave() {
      Toast(<span class="hljs-string">'save'</span>);
    },
    onDelete() {
      Toast(<span class="hljs-string">'delete'</span>);
    },
    onChangeDetail(val) {
      <span class="hljs-keyword">if</span> (val) {
        <span class="hljs-keyword">this</span>.searchResult = [
          {
            <span class="hljs-attr">name</span>: <span class="hljs-string">'黄龙万科中心'</span>,
            <span class="hljs-attr">address</span>: <span class="hljs-string">'杭州市西湖区'</span>,
          },
        ];
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>.searchResult = [];
      }
    },
  },
};
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
<td>area-list</td>
<td>地区列表</td>
<td><em>object</em></td>
<td>-</td>
</tr>
<tr>
<td>area-columns-placeholder</td>
<td>地区选择列占位提示文字</td>
<td><em>string[]</em></td>
<td><code>[]</code></td>
</tr>
<tr>
<td>area-placeholder <code>v2.6.1</code></td>
<td>地区输入框占位提示文字</td>
<td><em>string</em></td>
<td><code>选择省 / 市 / 区</code></td>
</tr>
<tr>
<td>address-info</td>
<td>收货人信息初始值</td>
<td><em>AddressInfo</em></td>
<td><code>{}</code></td>
</tr>
<tr>
<td>search-result</td>
<td>详细地址搜索结果</td>
<td><em>SearchResult[]</em></td>
<td><code>[]</code></td>
</tr>
<tr>
<td>show-postal</td>
<td>是否显示邮政编码</td>
<td><em>boolean</em></td>
<td><code>false</code></td>
</tr>
<tr>
<td>show-delete</td>
<td>是否显示删除按钮</td>
<td><em>boolean</em></td>
<td><code>false</code></td>
</tr>
<tr>
<td>show-set-default</td>
<td>是否显示默认地址栏</td>
<td><em>boolean</em></td>
<td><code>false</code></td>
</tr>
<tr>
<td>show-search-result</td>
<td>是否显示搜索结果</td>
<td><em>boolean</em></td>
<td><code>false</code></td>
</tr>
<tr>
<td>show-area</td>
<td>是否显示地区</td>
<td><em>boolean</em></td>
<td><code>true</code></td>
</tr>
<tr>
<td>show-detail</td>
<td>是否显示详细地址</td>
<td><em>boolean</em></td>
<td><code>true</code></td>
</tr>
<tr>
<td>disable-area <code>v2.5.0</code></td>
<td>是否禁用地区选择</td>
<td><em>boolean</em></td>
<td><code>false</code></td>
</tr>
<tr>
<td>save-button-text</td>
<td>保存按钮文字</td>
<td><em>string</em></td>
<td><code>保存</code></td>
</tr>
<tr>
<td>delete-button-text</td>
<td>删除按钮文字</td>
<td><em>string</em></td>
<td><code>删除</code></td>
</tr>
<tr>
<td>detail-rows</td>
<td>详细地址输入框行数</td>
<td><em>number | string</em></td>
<td><code>1</code></td>
</tr>
<tr>
<td>detail-maxlength</td>
<td>详细地址最大长度</td>
<td><em>number | string</em></td>
<td><code>200</code></td>
</tr>
<tr>
<td>is-saving</td>
<td>是否显示保存按钮加载动画</td>
<td><em>boolean</em></td>
<td><code>false</code></td>
</tr>
<tr>
<td>is-deleting</td>
<td>是否显示删除按钮加载动画</td>
<td><em>boolean</em></td>
<td><code>false</code></td>
</tr>
<tr>
<td>tel-validator</td>
<td>手机号格式校验函数</td>
<td><em>string =&gt; boolean</em></td>
<td>-</td>
</tr>
<tr>
<td>tel-maxlength <code>v2.10.0</code></td>
<td>手机号最大长度</td>
<td><em>number | string</em></td>
<td>-</td>
</tr>
<tr>
<td>postal-validator</td>
<td>邮政编码格式校验函数</td>
<td><em>string =&gt; boolean</em></td>
<td>-</td>
</tr>
<tr>
<td>validator</td>
<td>自定义校验函数</td>
<td><em>(key, val) =&gt; string</em></td>
<td>-</td>
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
<td>save</td>
<td>点击保存按钮时触发</td>
<td>content：表单内容</td>
</tr>
<tr>
<td>focus</td>
<td>输入框聚焦时触发</td>
<td>key: 聚焦的输入框对应的 key</td>
</tr>
<tr>
<td>delete</td>
<td>确认删除地址时触发</td>
<td>content：表单内容</td>
</tr>
<tr>
<td>cancel-delete</td>
<td>取消删除地址时触发</td>
<td>content：表单内容</td>
</tr>
<tr>
<td>select-search</td>
<td>选中搜索结果时触发</td>
<td>value: 搜索结果</td>
</tr>
<tr>
<td>click-area <code>v2.5.9</code></td>
<td>点击收件地区时触发</td>
<td>-</td>
</tr>
<tr>
<td>change-area</td>
<td>修改收件地区时触发</td>
<td>values: 地区信息</td>
</tr>
<tr>
<td>change-detail</td>
<td>修改详细地址时触发</td>
<td>value: 详细地址内容</td>
</tr>
<tr>
<td>change-default</td>
<td>切换是否使用默认地址时触发</td>
<td>value: 是否选中</td>
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
<td>在邮政编码下方插入内容</td>
</tr>
</tbody>
</table>
</div><div class="card"><h3 id="fang-fa">方法</h3>
<p>通过 ref 可以获取到 AddressEdit 实例并调用实例方法，详见<a href="#/zh-CN/advanced-usage#zu-jian-shi-li-fang-fa" target="_blank">组件实例方法</a>。</p>
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
<td>setAddressDetail</td>
<td>设置详细地址</td>
<td>addressDetail: string</td>
<td>-</td>
</tr>
</tbody>
</table>
</div><div class="card"><h3 id="addressinfo-shu-ju-ge-shi">AddressInfo 数据格式</h3>
<p>注意：AddressInfo 仅作为初始值传入，表单最终内容可以在 save 事件中获取</p>
<table>
<thead>
<tr>
<th>key</th>
<th>说明</th>
<th>类型</th>
</tr>
</thead>
<tbody>
<tr>
<td>id</td>
<td>每条地址的唯一标识</td>
<td><em>number | string</em></td>
</tr>
<tr>
<td>name</td>
<td>收货人姓名</td>
<td><em>string</em></td>
</tr>
<tr>
<td>tel</td>
<td>收货人手机号</td>
<td><em>string</em></td>
</tr>
<tr>
<td>province</td>
<td>省份</td>
<td><em>string</em></td>
</tr>
<tr>
<td>city</td>
<td>城市</td>
<td><em>string</em></td>
</tr>
<tr>
<td>county</td>
<td>区县</td>
<td><em>string</em></td>
</tr>
<tr>
<td>addressDetail</td>
<td>详细地址</td>
<td><em>string</em></td>
</tr>
<tr>
<td>areaCode</td>
<td>地区编码，通过<code>省市区选择</code>获取（必填）</td>
<td><em>string</em></td>
</tr>
<tr>
<td>postalCode</td>
<td>邮政编码</td>
<td><em>string</em></td>
</tr>
<tr>
<td>isDefault</td>
<td>是否为默认地址</td>
<td><em>boolean</em></td>
</tr>
</tbody>
</table>
</div><div class="card"><h3 id="searchresult-shu-ju-ge-shi">SearchResult 数据格式</h3>
<table>
<thead>
<tr>
<th>key</th>
<th>说明</th>
<th>类型</th>
</tr>
</thead>
<tbody>
<tr>
<td>name</td>
<td>地名</td>
<td><em>string</em></td>
</tr>
<tr>
<td>address</td>
<td>详细地址</td>
<td><em>string</em></td>
</tr>
</tbody>
</table>
</div><div class="card"><h3 id="sheng-shi-xian-lie-biao-shu-ju-ge-shi">省市县列表数据格式</h3>
<p>请参考 <a href="#/zh-CN/area" target="_blank">Area</a> 组件。</p>
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
<td>@address-edit-padding</td>
<td><code>@padding-sm</code></td>
<td>-</td>
</tr>
<tr>
<td>@address-edit-buttons-padding</td>
<td><code>@padding-xl @padding-base</code></td>
<td>-</td>
</tr>
<tr>
<td>@address-edit-button-margin-bottom</td>
<td><code>@padding-sm</code></td>
<td>-</td>
</tr>
<tr>
<td>@address-edit-detail-finish-color</td>
<td><code>@blue</code></td>
<td>-</td>
</tr>
<tr>
<td>@address-edit-detail-finish-font-size</td>
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
