// 是否是闰年
// 是 => true
// 否 => false
export default function isLeapYear(year) {
  // 1,能被4整除而不能被100整除.
  // 2,能被400整除.
  let c0 = year % 4 === 0;
  let c1 = year % 100 !== 0;
  let c2 = year % 400 === 0;

  return (c0 && c1) || c2;
}
