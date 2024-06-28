function compareStringLength (string, maxLength) {
  return string.length <= maxLength;
}

compareStringLength('проверяемая строка', 20);
// console.log(compareStringLength('проверяемая строка', 18));
// console.log(compareStringLength('проверяемая строка', 10));

function checkPalindrome (string) {
  const formattedString = string.replaceAll(' ', '').toLowerCase();
  let newString = '';
  for (let i = formattedString.length - 1; i >= 0; i--) {
    newString += formattedString[i];
  }
  return newString === formattedString;
}

checkPalindrome('топот');
// console.log(checkPalindrome('ДовОд'));
// console.log(checkPalindrome('Кекс'));
// console.log(checkPalindrome('Лёша на полке клопа нашёл '));

function getNumbersFromString (string) {
  let stringCopy = string;
  let stringNumber = '';

  if (Number.isInteger(stringCopy)) {
    return Math.abs(stringCopy);
  }

  if (typeof stringCopy !== 'string') {
    stringCopy = stringCopy.toString();
  }

  for (let i = 0; i < stringCopy.length; i++) {
    const currentChar = parseInt(stringCopy[i], 10);

    if (!Number.isNaN(currentChar)) {
      stringNumber += stringCopy[i];
    }
  }

  return parseInt(stringNumber, 10) || NaN;
}

getNumbersFromString('2023 год');
// console.log(getNumbersFromString('ECMAScript 2022'));
// console.log(getNumbersFromString('1 кефир, 0.5 батона'));
// console.log(getNumbersFromString('агент 007'));
// console.log(getNumbersFromString('а я томат'));
// console.log(getNumbersFromString(2023));
// console.log(getNumbersFromString(-1));
// console.log(getNumbersFromString(1.5));


