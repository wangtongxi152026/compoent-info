import fs from "fs";
import path from "path";
import { ExprotItem, Minthods, Events } from "../types/types";
import {
  initExprotArr,
  initRenderTree,
  initOperationTree,
  initDefaultValue,
  formatLabel,
  initEditChildNode,
} from "./initData";

export default class DellAnalyzer {
  private pathName = "RadioGroup";
  private ChildCompName = "Radio 单选框";
  private folder = "表单组件";
  private parentOpertion: any;
  constructor() {
    this.readCompInfo();
    this.readChildCompInfo();
  }

  private filePath(pathName: string) {
    const pathx = `../../data/${this.folder}/${pathName}.json`;
    return path.resolve(__dirname, pathx);
  }

  private readCompInfo() {
    const filePath = this.filePath(this.pathName);
    let fileContent: any = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      const { minthods, envets, slots } = fileContent[this.pathName];
      this.getRenderTree(minthods, envets);
      this.parentOpertion = this.getOperationTree(minthods);
    }
  }
  private readChildCompInfo() {
    const filePath = this.filePath(this.ChildCompName);
    let fileContent: any = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      const { minthods, envets, slots } = fileContent[this.ChildCompName];
      this.getRenderTree(minthods, envets);
      this.getChildCompOperationTree(minthods, envets);
    }
  }

  private getRenderTree(minthods: any, envets: any) {
    let exprotArr = initExprotArr();
    let data: any = {};
    envets.forEach((item: Events) => {
      const exprotItem: ExprotItem = {
        eventKey: item.eventKey.trim(),
        alias: item.label,
        sortIdx: -1,
      };
      exprotArr.unshift(exprotItem);
    });
    minthods.forEach((item: Minthods) => {
      const exprotItem: ExprotItem = {
        attrKey: item.key,
        alias: item.label,
        sortIdx: -1,
      };
      const value = initDefaultValue(item.default);
      if (value !== "-") {
        data[item.key] = value;
      }
      exprotArr.unshift(exprotItem);
    });
    this.writeRenderTree(exprotArr, data);
  }

  private getChildCompOperationTree(minthods: any, envets: any) {
    // 生成 prop
    let optionPropObj: any = {};
    // 生成 $export
    let childexprots = initExprotArr();
    // 生成 data 各个数据
    let childData: any = {};

    // 生成 data 里面 $export
    envets.forEach((item: Events) => {
      const exprotItem: ExprotItem = {
        eventKey: item.eventKey.trim(),
        alias: item.label.trim(),
        sortIdx: -1,
      };
      childexprots.unshift(exprotItem);
    });
    minthods.forEach((item: Minthods) => {
      const exprotItem: ExprotItem = {
        attrKey: item.key,
        alias: item.label.trim(),
        sortIdx: -1,
      };
      const value = initDefaultValue(item.default);
      if (value !== "-") {
        childData[item.key] = value;
      }
      childexprots.unshift(exprotItem);
    });

    // 生成prop
    minthods.forEach((item: Minthods) => {
      let { key, label, type } = item;
      label = formatLabel(label.trim());
      key = key.trim();
      if (item.enumList) {
        optionPropObj[key] = {
          alias: label,
          type: "string",
          value: initDefaultValue(item.default),
          enumList: item.enumList,
        };
      } else {
        optionPropObj[key] = {
          alias: label,
          type: type,
          value: initDefaultValue(item.default),
        };
      }
    });

    const childContent = initEditChildNode(
      this.pathName,
      this.parentOpertion,
      childexprots,
      this.ChildCompName,
      childData,
      optionPropObj
    );
    const pathx = path.resolve(
      __dirname,
      `../operationTree/${this.folder}/${this.pathName}.json`
    );
    const content = JSON.stringify(childContent);
    fs.writeFileSync(pathx, content);
  }

  private getOperationTree(minthods: any) {
    let optiontree: any = [];
    minthods.forEach((item: Minthods) => {
      let { key, label, type } = item;
      label = formatLabel(label);
      let optionItem = {};
      if (item.enumList) {
        optionItem = {
          key: key.trim(),
          bindProp: key.trim(),
          label: label,
          type: "string",
          enumList: item.enumList,
        };
      } else {
        optionItem = {
          key: key.trim(),
          bindProp: key.trim(),
          label: label,
          type: type,
        };
      }
      optiontree.push(optionItem);
    });
    return optiontree;
  }

  private writeRenderTree(exprotArr: any, data: any) {
    const pathx = path.resolve(
      __dirname,
      `../renderTree/${this.folder}/${this.pathName}.json`
    );
    const content = JSON.stringify(initRenderTree(exprotArr, data));
    fs.writeFileSync(pathx, content);
  }
}
new DellAnalyzer();
