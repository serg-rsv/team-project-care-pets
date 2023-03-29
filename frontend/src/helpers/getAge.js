import { SET_LANGUAGES } from './getInitialLanguage';

const TEN = 10;
const ONE_HUNDRED = 100;
const LESS_THAN_TWENTY = {
  uk: [
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
  ],
  en: [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
  ],
};
const TENTHS_LESS_THAN_HUNDRED = {
  uk: [
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
  ],
  en: [
    'zero',
    'ten',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ],
};
const HUNDRED = {
  uk: 'сто',
  en: 'hundred',
};
const NEGATIVE = {
  uk: 'із майбутнього',
  en: 'from the future',
};

function generateWords(number, lang) {
  // Negative
  if (number < 0) {
    return NEGATIVE[lang];
  }
  // Turtle
  if (number > 99) {
    return HUNDRED[lang];
  }
  let remainder,
    word,
    words = arguments[2];

  // Done
  if (number === 0) {
    return !words
      ? LESS_THAN_TWENTY[lang][0]
      : words.join(' ').replace(/,$/, '');
  }
  // First run
  if (!words) {
    words = [];
  }

  if (number < 20) {
    remainder = 0;
    word = LESS_THAN_TWENTY[lang][number];
  } else if (number < ONE_HUNDRED) {
    remainder = number % TEN;
    word = TENTHS_LESS_THAN_HUNDRED[lang][Math.floor(number / TEN)];

    if (remainder) {
      switch (lang) {
        case 'uk':
          word += ' ' + LESS_THAN_TWENTY[lang][remainder];
          break;
        case 'en':
          word += '-' + LESS_THAN_TWENTY[lang][remainder];
          break;

        default:
          break;
      }
      remainder = 0;
    }
  }

  words.push(word);
  return generateWords(remainder, lang, words);
}

/**
 * Count age until now and transform to words.
 * @example
 * If today 2023
 * getAge('2022-01-01','en') => 'one year'
 * @param {string} birthday date string or year.
 * @param {string} language 'en' | 'uk'
 * @returns {string} phrase 'not born yet' | 'less one year' | '{quantity} years'.
 */
export const getAge = (birthday, language) => {
  let lang = language;
  if (!SET_LANGUAGES.includes(language)) {
    lang = 'en';
  }

  const years = new Date().getFullYear() - new Date(birthday).getFullYear();
  const words = generateWords(years, lang);

  if (words === NEGATIVE[lang]) {
    return NEGATIVE[lang];
  }

  if (words === LESS_THAN_TWENTY[lang][0]) {
    switch (lang) {
      case 'uk':
        return 'менше року';

      case 'en':
        return 'less one year';

      default:
        break;
    }
  }

  const last = words.split(' ').pop();

  switch (lang) {
    case 'uk':
      return last === 'один'
        ? words + ' рік'
        : last === 'два' || last === 'три' || last === 'чотири'
        ? words + ' роки'
        : words + ' років';

    case 'en':
      return last === 'one' ? words + ' year' : words + ' years';

    default:
      break;
  }
};
