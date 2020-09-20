// 2个数组是否有交集
export default function hasIntersect(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    for (const item of a) {
      if (b.includes(item)) return true;
    }
  }

  return false;
}
