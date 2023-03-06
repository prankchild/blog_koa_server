import { instanceToPlain, plainToInstance } from "class-transformer";
import { cloneDeep } from "lodash";
import lodash = require("lodash");
import { isArray } from "./utils";

export const resultDataValues = (params: any) => {
  // 判断是否为数组
  if (Array.isArray(params)) {
    return params.map((param) => {
      return param["dataValues"];
    });
  }
  const result = instanceToPlain(params);

  if (!Array.isArray(result)) {
    return result ? result["dataValues"] : result;
  } else {
    return forDataValues(result);
  }
};
const forDataValues = (params: any) => {
  const result = [];
  for (const key in params) {
    params[key]["dataValues"] ? result.push(params[key]["dataValues"]) : "";
  }
  return result;
};
export const formatAttribute = (
  Raw: any,
  firstKey: string,
  secondKey: string
) => {
  Raw = lodash.cloneDeep(Raw);
  if (isArray(Raw)) {
    for (const key in Raw) {
      const params = update(Raw[key], firstKey, secondKey);
      Raw[key][firstKey] = params;
    }
    return Raw;
  } else {
    const params = update(Raw, firstKey, secondKey);
    Raw[firstKey] = params;
    return Raw;
  }
  function update(Raw: any, firstKey: string, secondKey: string) {
    const params = [];
    for (let index = 0; index < Raw[firstKey].length; index++) {
      params.push(Raw[firstKey][index]["dataValues"][secondKey]["dataValues"]);
    }
    return params;
  }
};
