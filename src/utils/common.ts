export function SubnetId(name: string, i: number) {
  return `${name}Subnet${i + 1}`;
}
export function ObjToStrMap(obj: any) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

export type Modify<T, R> = Omit<T, keyof R> & R;