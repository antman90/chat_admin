import { dateObjInterFace } from "../interface";
import { siteName, apiSiteName } from "./config";

// 9 => 09
export const timeToTwo = (number: number) => {
  return number * 1 > 9 ? "" + number : "0" + number;
};

// format Y-m-d H:i:s same as PHP
export const formatDate = (time: number | string, format: string): string => {
  if (isNaN(Number(time))) {
    return "";
  }
  const d = new Date(time);
  const store: dateObjInterFace = {
    y: d.getFullYear(),
    m: d.getMonth() + 1,
    d: d.getDate(),
    h: d.getHours(),
    i: d.getMinutes(),
    s: d.getSeconds(),
  };

  if (!format) {
    return `${store.y}.${timeToTwo(store.m)}.${timeToTwo(store.d)} ${timeToTwo(
      store.h
    )}:${timeToTwo(store.i)}:${timeToTwo(store.s)}`;
  }
  const formatReg =
    /^(?:([a-z])([-/.]))?(?:([a-z])([-/.]))?([a-z])?\s?(?:([a-z])([:/]))?(?:([a-z])([:/]))?([a-z])?$/i;
  if (formatReg.test(format)) {
    let formatArr = format.match(formatReg);

    if (!formatArr) {
      return "";
    }

    formatArr = formatArr.slice(1);
    formatArr = formatArr.filter((item) => item && item.trim());
    let retArr = "";
    formatArr.map((item) => {
      const itemLower = item.toLowerCase();
      const code = itemLower.charCodeAt(0);
      // 97:a, 122:z
      if (code > 97 && code < 122) {
        let cur = timeToTwo(store[itemLower]);
        if (itemLower !== item) {
          cur = " " + cur;
        }
        retArr += cur;
      } else {
        retArr += item;
      }
    });
    return retArr.trim();
  } else {
    console.log(format + " is invalid");
    return "";
  }
};


// 1000 => 1,000
export const formatNumber = (number: number) => {
  if (isNaN(number)) {
    return number;
  }
  if (number * 1 >= 10000000) {
    return number / 10000 + "만";
  }
  let numStr = number.toString();
  const numArr = numStr.match(/(\d+(?:\.\d{1,2})?)\d*/) || [];
  return numArr[1].replace(/(\d)(?=(?:\d{3})+(?:\.\d{1,2})?$)/g, "$1,");
};

export const getPageTitle = (pageTitle?: string) => {
  if (pageTitle) {
    return `${pageTitle}-${siteName}`;
  }
  return `${siteName}`;
};

// 1 => 0001
export const formatIndexNumber = (number: number): string => {
  if (number < 10) {
    return "000" + number.toString();
  }
  if (number < 100) {
    return "00" + number.toString();
  }
  if (number < 1000) {
    return "0" + number.toString();
  }
  return number.toString();
};

// 3 day is new
export const isNewBoard = (date: string): boolean => {
  const dateTime = +new Date(date);
  const now = +new Date();
  const newTime = 3 * 24 * 3600 * 1000;
  return now - dateTime < newTime;
};

export const renderAvatar = (avatar: string) => {
  if (avatar) {
    return avatar;
  }
  return "/src/assets/img/avatar-default.svg";
};

export const calcIndexDesc = (total: number, page: number, pageSize: number, index: number) => {
  return total - (page - 1) * pageSize - index
}

export const chatMsgObj = (obj: any) => {
  const retObj = Object.assign(obj, { siteName: apiSiteName })
  return JSON.stringify(retObj)
}

export const retObjectType = (obj: any) => {
  const _type = Object.prototype.toString.call(obj)
  return _type.slice(7, -1).toLowerCase()
}

export const objArrayToString = (obj: any) => {
  for (let i in obj) {
    if (retObjectType(obj[i]) === 'array') {
      obj[i] = obj[i].join(',')
    }
  }
  return obj
}

export const sliceStr = (str: string, num: number) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...'
}