type DigitValidator = (char: string) => boolean;

const anyValidator = char => true;
const numericValidator = char => /[0-9]/.test(char);
const lowerCaseValidator = char => /[a-z]/.test(char);
const upperCaseValidator = char => /[A-Z]/.test(char);
const numberRangeValidator = (maxValue: number, char: string) => numericValidator(char) && parseInt(char) <= maxValue;

export const dateValidator = (date) => /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/.test(date);
export const neverValidator = char => false;
export const maskDigitValidators: { [key: string]: DigitValidator } = {
  'a': lowerCaseValidator,
  'A': upperCaseValidator,
  '*': anyValidator
};

for (let i = 0; i <= 9; i++) {
  maskDigitValidators[i] = numberRangeValidator.bind(undefined, i);
}
