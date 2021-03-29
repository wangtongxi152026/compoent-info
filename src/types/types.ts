export interface Minthods {
  key: string;
  label: string;
  type: string;
  default: string;
  enumList?: string[];
}

export interface Events {
  eventKey: string;
  label: string;
  param: string;
}

export interface Slots {
  slot: string;
  label: string;
}

export interface CompInfoResult {
  componentName: string,
  minthods: Minthods[];
  envets: Events[];
  slots: Slots[];
}

export interface ExprotItem {
  [key: string]: string|number;
}

