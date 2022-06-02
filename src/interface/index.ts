export interface objInterface {
  [key: string]: string;
}

interface radioRadioInterface {
  value: string;
  title: string;
}

export interface radioInterface {
  title: string;
  radio: radioRadioInterface[];
  class?: string;
  model: string;
}

export interface dateObjInterFace {
  [y: string]: number;
}

export interface pageInterface {
  pageNum: number;
  pageArr: number[];
  showFirst: boolean;
  showLast: boolean;
  showPrev: boolean;
  showNext: boolean;
}

export interface calenderTableInterface {
  id: number; // key
  day: number; // 日期
  status: number; // 0: 不填充, 1: 已签到, 2:未签到
}

export interface msgInterface {
  [key: string]: string;
}

export interface registerInterface {
  userName: string;
  nickName: string;
  password: string;
  password_confirmation: string;
  phone: string;
}

export interface loginInterface {
  avatar: string;
  e_token: number;
  expires: number;
  nickName: string;
  point: number;
  token: string;
  userId: number;
  userName: string;
  notice: number;
}

export interface modifyUserInfoInterface {
  userName: string;
  password?: string;
  nickName?: string;
  avatar?: string;
}

export interface siteStoreInterface extends objInterface {
  site: string;
  contact: string;
  type: string;
  date: string;
  rechargeFirst: string;
  rechargeAgain: string;
  extraScore: string;
  maxOddAndAward: string;
  miniGame: string;
  isGoingAmount: string;
  siteUserName: string;
  sitePassword: string;
}

export interface checkInInterface {
  userName: string;
  content: string;
}

export interface checkInListInterface {
  page: number;
  pageSize: number;
}

export interface checkInCalenderInterface {
  userName: string;
  date?: string;
}

export interface checkInCalenderRetInterface {
  date: number;
}

export interface boardListInterface {
  page: number;
  pageSize: number;
  model: string;
  type?: number;
}

export interface boardContentInterface {
  id: number;
  model: string;
}

export interface boardReplyInterface {
  content: string;
  boardId: number;
  replyId?: number;
  replyLevel?: number;
  toName?: string;
  type: string;
  boardType: string;
}

export interface boardReplyListInterface {
  boardId: number;
  type: string;
}
