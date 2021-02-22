import { ExprotItem } from "../types/types";

export function initDefaultValue(value: string) {
  if (value === "false") {
    return false;
  } else if (value === "true") {
    return true;
  } else {
    return value;
  }
}

export function formatLabel(label: string) {
  if (label.includes("，可选值为")) {
    return label.substring(0, label.lastIndexOf("，可选值为")); // 去除可选为后面的字符串
  } else {
    return label;
  }
}

export function initExprotArr(): ExprotItem[] {
  return [
    { attrKey: "v-if", alias: "v-if指令", sortIdx: -1 },
    { attrKey: "v-show", alias: "v-show指令", sortIdx: -1 },
    { attrKey: "v-model", alias: "v-model指令", sortIdx: -1 },
  ];
}

export function initRenderTree(exportsArr: any, initData: any) {
  const data = [
    {
      id: 0,
      parentId: -1,
      ins_id: "Jzmwyr7eJBXCDCRC3dXzPwrcYFS58yTW",
      tag: "div",
      mini_method_uuid: -1,
      data: {
        $style: { width: "100%", height: "100%", overflow: "auto" },
      },
    },
    {
      id: 1,
      parentId: 0,
      ins_id: "C2y7Qek27ZyNKksaT34DhJpDZJ5s4dBH",
      tag: "van-cell",
      mini_method_uuid: -1,
      data: {
        $style: {},
        ...initData,
        $exports: exportsArr,
        $exportState: true,
      },
    },
  ];
  return data;
}

export function initOperationTree(arr: any, name: string) {
  const data = [
    {
      type: "PropSchema",
      schema: {
        type: "object",
        key: "schema",
        label: `${name}`,
        properties: [
          {
            label: `设置${name}`,
            key: "tabs",
            type: "object",
            properties: arr,
          },
        ],
      },
      label: `${name}`,
      render_tree_node: {
        ins_id: "",
        key: "schema",
      },
      code_tree_node: {
        ins_id: "",
        key: "schema",
      },
    },
  ];
  return data;
}

export function initEditChildNode(
  name: string,
  propertieArr: any,
  childExportsArr: any,
  childname: string,
  childData: any,
  childOperatonProp: any
) {
  const data = [
    {
      type: "PropSchema",
      schema: {
        type: "object",
        key: "schema",
        label: `${name}`,
        properties: [
          {
            label: `设置${name}`,
            key: "tabs",
            type: "object",
            properties: propertieArr,
          },
        ],
      },
      label: `${name}`,
      render_tree_node: {
        ins_id: "",
        key: "schema",
      },
      code_tree_node: {
        ins_id: "",
        key: "schema",
      },
    },
    {
      type: "EditChildNode",
      label: childname,
      node: [
        {
          tag: childname,
          alias: "标签项",
          prop: childOperatonProp,
          data: {
            $style: {},
            ...childData,
            $exports: childExportsArr,
          },
          children: [
            {
              tag: "GuiLayout",
              disabled: true,
              data: {
                $style: {},
                $exports: [],
              },
              children: [],
            },
          ],
        },
      ],
      render_tree_node: {
        ins_id: "",
        key: "",
      },
      code_tree_node: {
        ins_id: "",
        key: "",
      },
    },
  ];

  return data;
}
