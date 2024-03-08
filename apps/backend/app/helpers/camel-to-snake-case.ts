export const camelToSnakeCase = (str) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)

// get in https://stackoverflow.com/questions/54246477/how-to-convert-camelcase-to-snake-case
