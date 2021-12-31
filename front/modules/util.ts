export function JSONPrettify(json:string){
  let result = JSON.stringify(json, null, 2);
  let height = (result.match(/\n/g) || []).length;
  result = result.replace(/: null/g, ": --").replace(/\"/g, "");
  return result;
}