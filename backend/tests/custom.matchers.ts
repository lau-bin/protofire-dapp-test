import { expect } from "@jest/globals";
import {MatcherState} from "expect";

expect.extend({
  toContainSameMembers(array1: Array<any>, array2: Array<any>){

    if (!Array.isArray(array1)){
      return {
        message: () => `expected ${JSON.stringify(array1, parser, 4)} to be an array`,
        pass: false,
      };
    }
    if (!Array.isArray(array2)) {
      return {
        message: () => `expected ${JSON.stringify(array2, parser, 4)} to be an array`,
        pass: false,
      };
    }

    let {missing, arr2, pass} = containsSameMembers.call(this, array1, array2);

    if (pass){
      return {
        message: () => `expected ${JSON.stringify(array1, parser, 4)} to not contain same members as ${JSON.stringify(array2, parser, 4)}`,
        pass: true,
      };
    }
    else{
      return {
        message: () => `expected ${JSON.stringify(array1, parser, 4)} to contain same members as ${JSON.stringify(array2, parser, 4)}, missing members: \n first: ${JSON.stringify(arr2, parser, 4)}\nsecond: ${JSON.stringify(missing, parser, 4)}`,
        pass: false,
      };
    }
  }
});

const isArray = (obj:any) => {
  return Object.prototype.toString.call(obj) === '[object Array]';
};
const getType = (obj:any) => {
  return Object.prototype.toString.call(obj);
};
const parser = (key: any, value: any) => {
  return typeof value === 'bigint'
  ? value.toString()
  : value // return everything else unchanged
}


export default undefined;
declare global {
  namespace jest {
    interface Matchers<R> {
      toContainSameMembers(arr: Array<any>): R;
    }
  }
}

function containsSameMembers(this:MatcherState, array1: Array<any>, array2: Array<any>){

  if (!Array.isArray(array1) || !Array.isArray(array2)){
    throw new Error("Expected array");
  }

  let missing: any[] = []
  let arr2 = array2.slice();
  array1.forEach(el=>{
    let i = 0;
    let found = false;
    while (i < arr2.length){
      if (Array.isArray(el)){
        if (Array.isArray(arr2[i]) && containsSameMembers.call(this, el, arr2[i]).pass){
          arr2.splice(i, 1);
          found = true;
          break;
        }
      }
      else{
        if (getType(el) === getType(arr2[i])){
          if (this.equals(el, arr2[i])){
            arr2.splice(i, 1);
            found = true;
            break;
          }
        }
      }

      i++;
    }
    if (!found){
      missing.push(el);
    }
  })

  if (missing.length == 0 && arr2.length == 0){
    return {
      missing,
      arr2,
      pass: true
    }
  }
  else{
    return {
      missing,
      arr2,
      pass: false
    }
  }
}
// function equals(obj1: Object, obj2: Object){
//   let keys1 = Object.keys(obj1);
//   let keys2 = Object.keys(obj2);

//   let missingKeys: any[] = []
//   let differentKeys: string[] = []
//   let missingMembers: any[] = []
//   let extraMembers: any[] = []

//   keys1.forEach(el =>{
//     let i = 0;
//     let found = false;
//     while (i < keys2.length){

//       if (keys1 === keys2){
//         if (Array.isArray(obj1[el])){
//           if (Array.isArray(obj2[keys2[i]])){
//             let {missing, arr2, pass} = containsSameMembers.call(this, el, keys2[i]);

//           }
//           else{
//             differentKeys.push(keys2[i]);
//           }
//         }
//         else{
//           if (getType(el) === getType(keys2[i])){
//             if (typeof el === 'object'){
//               if (this.equals(el, arr2[i])){
//                 arr2.splice(i, 1);
//                 found = true;
//                 break;
//               }
//             }
//           }
//         }
//         keys2.splice(i, 1);
//         found = true;
//         break;
//       }
//       i++;
//     }
//     if (!found){
//       missingKeys.push(el);
//     }
//   })

// }