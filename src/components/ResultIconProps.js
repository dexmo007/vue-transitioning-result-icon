import Color from 'color-js/color';

function validateColor(value) {
  try {
    Color(value);
    return true;
  } catch (e) {
    return false;
  }
}

export default {
  error: Boolean,
  duration: {
    type: Number,
    default: 500,
    validator(value) {
      return value > 0 && Number.isInteger(value);
    },
  },
  successColor: {
    type: String,
    default: 'green',
    validator(value) {
      return validateColor(value);
    },
  },
  errorColor: {
    type: String,
    default: 'red',
    validator(value) {
      return validateColor(value);
    },
  },
};
