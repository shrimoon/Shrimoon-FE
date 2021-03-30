// クソザコ | ザコ | 普通 | 強い | 神
export type Strength = 'poor' | 'weak' | 'normal' | 'good' | 'great';

const strengthMap: Strength[] = [
  'poor',
  'weak',
  'normal',
  'good',
  'great',
];

export const checkPasswordStrength = (password: string): Strength => {
  // パスワードを100点満点で点数つける
  // 0~19 poor
  // 20~39 weak
  // 40~59 normal
  // 60~79 good
  // 80~100 great
  // 文字数が16文字
  let power = 0;

  // 全部同じ文字種だったらpoor
  if (/^(\d+|[a-z]+|[A-Z]+)$/.test(password)) return 'poor';

  // 1文字あたり4点加点（60点満点）
  power += Math.min(60, 4 * password.length);

  // 大文字と小文字を混ぜていれば10点加点
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) power += 10;

  // 英字と数字を含めば15点加点
  if (/[a-zA-Z]/.test(password) && /\d/.test(password)) power += 15;

  // 記号を含めば25点加点
  if (/[!"#$%&'()=~|@`[\]{};:+*<>,.?_/]/.test(password)) power += 25;

  if (power < 0) power = 0;
  if (power > 99) power = 99;

  return strengthMap[Math.floor(power / 20)];
};