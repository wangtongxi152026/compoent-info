export class ParseText {
  public paragraph: string = '';

  public parseText(content: cheerio.Element[]) {
    content.forEach((ele:any) => {
      if (ele.children && ele.children.length) {
        this.parseText(ele.children);
      }
      if (ele.data && ele.data.trim()) {
        this.paragraph += ele.data + ' ';
      }
    });
    return this.getParagraph();

  }

  public reset() {
    return this.paragraph = '';
  }

  private getParagraph() {
    return this.paragraph;
  }
}
