import fs from 'fs';
import cheerio from 'cheerio';
import {
  Minthods,
  Events,
  Slots,
  CompInfoResult
} from './types/types'
import { ParseText } from './parseText'


export default class DellAnalyzer {
  private instance: ParseText;
  constructor() {
    this.instance = new ParseText();
  }

  public getMinthods(courseItems: any) {
    let arr: any[] = []
    courseItems.toArray().forEach((element: any, i: number) => {
      arr.push({
        key: '',
        label: '',
        type: '',
        default: ''
      })
      const tds = element.children.filter((value: any) => {
        return value.name === 'td'
      })
      tds.forEach((value: any, index: number) => {
        if (index === 0) {
          arr[i].key = value.children[0].data
        }
        if (index === 2) {
          arr[i].type = this.getParseText(value).trim()
          this.instance.reset()
        }
        if (index === 1) {
          arr[i].label = this.getParseText(value).trim()
          if (arr[i].label.includes('可选值为 ')) {
            let enumList: string[] = arr[i].label.split(' ')
            arr[i].type = 'enum'
            let start: any
            start = enumList.findIndex((item) => {
              return item.includes('可选值为')
            })
            // enumList.forEach((item, idx) => {
            //   if (item.includes('可选值为')) {
            //     start = idx
            //   }
            // })
            enumList = enumList.slice(start + 2, enumList.length)
            arr[i].enumList = [];
            enumList.forEach((item) => {
              arr[i].enumList.push({
                value: item,
                label: item,
              })

            })
          }
          this.instance.reset()
        }
        if (index === 3) {
          const defaultValue = this.getParseText(value).trim()
          arr[i].default = defaultValue
          if (arr[i].label.includes('可选值为 ')) {
            arr[i].enumList.push({
              value: defaultValue,
              label: defaultValue,
            })
          }
          this.instance.reset()
        }
      })
    });
    return arr
  }

  public getEnvets(courseItems: any) {
    let arr: Events[] = []
    courseItems.toArray().forEach((element: any, i: number) => {
      arr.push({
        eventKey: '',
        label: '',
        param: '',
      })
      const tds = element.children.filter((value: any) => {
        return value.name === 'td'
      })
      tds.forEach((value: any, index: number) => {
        if (index === 0) {
          arr[i].eventKey = value.children[0].data
        }
        if (index === 1) {
          arr[i].label = this.getParseText(value).trim()
          this.instance.reset()
        }
        if (index === 2) {
          arr[i].param = this.getParseText(value)
          this.instance.reset()
        }

      })
    });
    return arr
  }

  public getSlots(courseItems: any) {
    let arr: Slots[] = []
    courseItems.toArray().forEach((element: any, i: number) => {
      arr.push({
        slot: '',
        label: '',
      })
      const tds = element.children.filter((value: any) => {
        return value.name === 'td'
      })
      tds.forEach((value: any, index: number) => {
        if (index === 0) {
          arr[i].slot = value.children[0].data
        }
        if (index === 1) {
          arr[i].label = this.getParseText(value).trim()
          this.instance.reset()
        }
      })
    });
    return arr
  }



  public generateJsonContent(compInfo: CompInfoResult) {
    const { minthods, envets, slots } = compInfo;
    let fileContent: any = {};
    // if (fs.existsSync(filePath)) {
    //   fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    //   console.log('readFileSync', fileContent)
    // }
    fileContent[compInfo.componentName] = { minthods, envets, slots };
    return fileContent;
  }


  public analyze(html: string) {
    const compInfo: CompInfoResult = this.parseHtml(html);
    const fileContent = this.generateJsonContent(compInfo);
    console.log('fileContent', fileContent)
    return { content: fileContent, pathName: compInfo.componentName };
  }

  private parseHtml(html: string) {
    const $ = cheerio.load(html);
    let componentName = this.getParseText($('h1').toArray()[0]).trim()
    let minthodsHtml = $('#props').siblings().find('tbody').find('tr')
    let envetsHtml = $('#events').siblings().find('tbody').find('tr')
    let slotsHtml = $('#slots').siblings().find('tbody').find('tr')
    const minthods = this.getMinthods(minthodsHtml)
    const envets = this.getEnvets(envetsHtml)
    const slots = this.getSlots(slotsHtml)
    return {
      componentName,
      minthods,
      envets,
      slots
    }
  }

  public getParseText(value: any) {
    return this.instance.parseText(value.children)
  }
}

