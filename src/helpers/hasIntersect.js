// 2个函数是否有交集
export default function hasIntersect(a = [], b = []) {
  if (!Array.isArray(a) || !Array.isArray(b)) return false;

  for (let i = 0; i < a.length; i++) {
    const ai = a[i];
    if (b.includes(ai)) return true;
  }

  return false;
}
