import fs from 'fs';
import path from 'path';
import {
  ExprotItem,
  Minthods,
  Events,
} from '../types/types'
import { initExprotArr, initRenderTree, initOperationTree, initDefaultValue, formatLabel } from './initData'

export default class DellAnalyzer {
  private pathName = 'ContactList 联系人列表'
  private folder = '业务组件'
  constructor() {
    this.readCompInfo()
  }

  private filePath() {
    const pathx = `../../data/${this.folder}/${this.pathName}.json`
    return path.resolve(__dirname, pathx);
  }

  public readCompInfo() {
    const filePath = this.filePath();
    let fileContent: any = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const { minthods, envets, slots } = fileContent[this.pathName]
      this.getRenderTree(minthods, envets)
      this.getOperationTree(minthods)
    }
  }

  public getRenderTree(minthods: any, envets: any) {
    let exprotArr = initExprotArr()
    let data: any = {}
    envets.forEach((item: Events) => {
      const exprotItem: ExprotItem = {
        eventKey: item.eventKey.trim(),
        alias: item.label,
        sortIdx: -1,
      }
      exprotArr.unshift(exprotItem)
    });
    minthods.forEach((item: Minthods) => {
      const exprotItem: ExprotItem = {
        attrKey: item.key,
        alias: item.label,
        sortIdx: -1,
      }
      const value = initDefaultValue(item.default)
      if (value !== '-') {
        data[item.key] = value
      }
      exprotArr.unshift(exprotItem)
    });
    this.writeRenderTree(exprotArr, data)

  }

  public getOperationTree(minthods: any) {
    let optiontree: any = []
    minthods.forEach((item: Minthods) => {
      let { key, label, type } = item;
      label = formatLabel(label)
      let optionItem = {}
      if (item.enumList) {
        optionItem = {
          "key": key.trim(),
          "bindProp": key.trim(),
          "label": label,
          "type": 'string',
          enumList: item.enumList
        }
      } else {
        optionItem = {
          "key": key.trim(),
          "bindProp": key.trim(),
          "label": label,
          "type": type
        }
      }
      optiontree.push(optionItem)
    });
    const content = JSON.stringify(initOperationTree(optiontree, this.pathName))
    const pathx = path.resolve(__dirname, `../operationTree/${this.folder}/${this.pathName}.json`);
    fs.writeFileSync(pathx, content);
  }

  private writeRenderTree(exprotArr: any, data: any) {
    const pathx = path.resolve(__dirname, `../renderTree/${this.folder}/${this.pathName}.json`);
    const content = JSON.stringify(initRenderTree(exprotArr, data))
    fs.writeFileSync(pathx, content);
  }


}
new DellAnalyzer()



