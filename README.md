```
export enum Sex {
  female,
  male,
}

export interface UserInfo {
  name: string;
  sex: Sex;
}

export const fetchUserInfo = (userId: string): Promise<UserInfo> =>
  new Promise((rev) => {
    setTimeout(() => rev({ name: "Zhang san", sex: Sex.male }), 500);
  });

export const updateUserInfo = (params: UserInfo): Promise<boolean> =>
  Promise.resolve(true);

export const fetchUserList = (): Promise<UserInfo[]> =>
  new Promise((rev) => {
    setTimeout(() => {
      rev([
        { name: "Zhang san", sex: Sex.male },
        { name: "Li si", sex: Sex.female },
        { name: "Wang wu", sex: Sex.male },
      ]);
    }, 500);
  });
```
