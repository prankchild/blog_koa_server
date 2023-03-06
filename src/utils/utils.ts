export const isExist = (param: any) => {
  return param || param === 0 || param === "0";
};
// 判断是否数组
export const isArray = (param: any) => {
  return Array.isArray(param);
};
// 浅拷贝对象
export const shallowCloneAssign = (obj: any, key: any, value: any) => {
  return isExist(key) && Object.assign(obj, { [key]: value });
};
// 循环浅拷贝对象
export const forShallowCloneAssign = (obj: any, newObj: any) => {
  for (const key in newObj) {
    shallowCloneAssign(obj, key, newObj[key]);
  }
};
