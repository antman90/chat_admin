const strategies: any = {
  isNotEmpty: (value: string, errMsg: string) => {
    if (value === "") {
      return errMsg;
    }
  },
  isNotNumeric: (value: string, errMsg: string) => {
    if (!/^\d+$/.test(value)) {
      return errMsg;
    }
  },
  minLenth: (value: string, length: number, errMsg: string) => {
    if (value.length < length) {
      return errMsg;
    }
  },
  isMobile: (value: string, errMsg: string) => {
    if (!/^1[3|5|8][0-9]{9}$/.test(value)) {
      return errMsg;
    }
  },
};

export default class Validator {
  public cache: any;
  constructor() {
    this.cache = [];
  }

  // validator.add(form.userName, 'isNonEmpty', '用户名不能为空');
  // validator.add(form.password, 'minLength:6', '密码长度不能少于6位');
  add(value: string, rule: string, errMsg: string) {
    const arr = rule.split(":");
    this.cache.push(() => {
      const strategy: any = arr.shift();
      arr.unshift(value);
      arr.push(errMsg);
      return strategies[strategy].apply(value, arr);
    });
  }

  validate() {
    for (let i = 0; i < this.cache.length; i++) {
      const errMsg = this.cache[i]();
      if (errMsg) return errMsg;
    }
    return false;
  }
}
