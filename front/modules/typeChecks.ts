
export function hasValue(el: any | undefined | null): el is any{
  return el !== undefined && el !== null;
}

