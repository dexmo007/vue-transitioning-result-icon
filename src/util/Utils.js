const alphabeticChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const alphaNumericChars = `${alphabeticChars}0123456789`;

function generate(possible, n) {
  let text = '';
  for (let i = 0; i < n; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function generateAlphanumeric(n) {
  return generate(alphaNumericChars, n);
}

export function generateAlphabetic(n) {
  return generate(alphabeticChars, n);
}

export function generateDomId() {
  return generateAlphabetic(1) + generateAlphanumeric(9);
}
