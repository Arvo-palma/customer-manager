export const snakeToCamel = (string) => string.replace(/(_\w)/g, (k) => k[1].toUpperCase())

// get in Nick Grealy answer: https://stackoverflow.com/questions/40710628/how-to-convert-snake-case-to-camelcase
