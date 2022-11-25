const TEN = 10;
const ONE_HUNDRED = 100;
const LESS_THAN_TWENTY = [
  'нуль',
  'один',
  'два',
  'три',
  'чотири',
  "п'ять",
  'шість',
  'сім',
  'вісім',
  'девять',
  'десять',
  'одинадцять',
  'дванатцять',
  'тринадцять',
  'чотирнадцять',
  "п'ятнадцять",
  'шістнадцять',
  'сімнадцять',
  'вісімнадцять',
  'девятнадцять',
];
// const LESS_THAN_TWENTY = [
//   'zero',
//   'one',
//   'two',
//   'three',
//   'four',
//   'five',
//   'six',
//   'seven',
//   'eight',
//   'nine',
//   'ten',
//   'eleven',
//   'twelve',
//   'thirteen',
//   'fourteen',
//   'fifteen',
//   'sixteen',
//   'seventeen',
//   'eighteen',
//   'nineteen',
// ];
const TENTHS_LESS_THAN_HUNDRED = [
  'нуль',
  'десять',
  'двадцять',
  'трирдцять',
  'сорок',
  "п'ятдесят",
  'шістдесят',
  'сімдесят',
  'вісімдесят',
  "дев'яносто",
];
// const TENTHS_LESS_THAN_HUNDRED = [
//   'zero',
//   'ten',
//   'twenty',
//   'thirty',
//   'forty',
//   'fifty',
//   'sixty',
//   'seventy',
//   'eighty',
//   'ninety',
// ];
const HUNDRED = 'сто';
const NEGATIVE = 'negative number';

function generateWords(number) {
  // Negative
  if (number < 0) {
    return NEGATIVE;
  }
  // Turtle
  if (number > 99) {
    return HUNDRED;
  }
  let remainder,
    word,
    words = arguments[1];

  // Done
  if (number === 0) {
    return !words ? 'нуль' : words.join(' ').replace(/,$/, '');
  }
  // First run
  if (!words) {
    words = [];
  }

  if (number < 20) {
    remainder = 0;
    word = LESS_THAN_TWENTY[number];
  } else if (number < ONE_HUNDRED) {
    remainder = number % TEN;
    word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / TEN)];
    // Add the "-"
    if (remainder) {
      word += ' ' + LESS_THAN_TWENTY[remainder];
      remainder = 0;
    }
  }

  words.push(word);
  return generateWords(remainder, words);
}

/**
 * Count age until now and transform to words.
 * @example
 * If today 2023
 * getAge('2022-01-01') => 'one year'
 * @param {string} birthday date string or year.
 * @returns {string} phrase 'not born yet' | 'less one year' | '{quantity} years'.
 */
export const getAge = birthday => {
  const years = new Date().getFullYear() - new Date(birthday).getFullYear();
  const words = generateWords(years);
  if (words === NEGATIVE) {
    return 'не народжений';
  }
  if (words === 'нуль') {
    return 'менше року';
  }
  const last = words.split(' ').pop();
  return last === 'один'
    ? words + ' рік'
    : last === 'два' || last === 'три' || last === 'чотири'
    ? words + ' роки'
    : words + ' років';
};
